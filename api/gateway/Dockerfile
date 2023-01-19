FROM node:14.18.1-alpine

RUN apk update
RUN apk add --no-cache git curl

WORKDIR /supplex-api

COPY . .

RUN yarn install --network-timeout 100000 --silent

RUN yarn build

EXPOSE 4000
EXPOSE 4001

CMD ["yarn", "start"]
