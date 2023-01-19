# SUPPLEX API

This is a Gateway service with Apollo Federation support. It has the purpose of connecting GraphQL Apis and serving some resources with REST endpoints. Additionally, the service includes the "main" microservice, which is a GraphQL API in charge of the SUPPLEX main user-related features such as authentication, notifications and billing

## Local Setup

Before starting development, get familiar with the following:
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [Prisma](https://www.prisma.io/)
* [Apollo Federation](https://www.apollographql.com/docs/federation/)
* [Jest](https://jestjs.io/)
* [TypeGraphql](https://typegraphql.com/)


### Files (S3 bucket)
To locally support file-related features like utility packages, install [Minio](https://docs.min.io/docs/minio-quickstart-guide.html) on your machine.
```bash
# Install with brew for MacOS
brew install minio/stable/minio

# Start the server with a local path for storing the files
minio server ~/minio
```
Once the server is running, you should be able to see the UI on http://127.0.0.1:54339/login and use the credentials that appear on the terminal. 

Go to the [region settings](http://127.0.0.1:54339/settings/region) and set server location to "us-east-1". Save the changes and wait for the service to fully restart.

For utility packages make sure you set the following on your ".env" file. With this, the Accounts microservice will communicate with your local minio for all S3 operations.
```.env
PCKG_S3_ENDPOINT="http://127.0.0.1:9000"
PCKG_S3_ACCESS_KEY_ID="minioadmin"
PCKG_S3_SECRET_KEY_ID="minioadmin"
PCKG_S3_BUCKET="packages"
PCKG_S3_REGION="us-east-1"
```

### Mailer
For locally testing the mail features, you must have a mail server.
You can install [MailHub](https://github.com/mailhog/MailHog)
```bash
# Install with brew for mac
brew update && brew install mailhog

# Start the service
brew services start mailhog
```
After the service has started, you can open the mail UI on your browser with http://0.0.0.0:8025. There, you will be able to see any attempt to send an email but without actually sending it to the address.

Then, on your .env file of the API add the following configuration
```.env
MAIL_HOST="0.0.0.0"
MAIL_PORT=1025
```


## Troubleshooting

### Cross-api data references (ex. user details from service A on query of service B)
Apollo Federation supports resolving entities across services automatically. For example, a user.
Accounts service has things like email, firstName, username and more. 
If you have another service like Agents API, you can just:
- On the subgraph, declare a User resolver that has the id matching with the id on the Accounts service. 
- Ensure that by calling the subgraph directly a User entity returns an object containing the id and __typeName
- Make sure the service with the rest of details has a reference resolver (check schema.ts file).
- Regenerate the gateway supergraph to be aware about the data reference.