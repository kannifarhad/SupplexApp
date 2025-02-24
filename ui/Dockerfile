# Use a lighter version of Node as a parent image
FROM node:14.18.1-alpine as frontend-build

# Args to env variables
ARG REACT_ENV
ENV REACT_ENV $REACT_ENV

# Set the working directory to /frontend
WORKDIR /frontend

COPY package*.json /frontend/
COPY yarn.lock /frontend/
COPY .npmrc /frontend/

RUN yarn install --network-timeout 100000

COPY . /frontend/

RUN yarn build

FROM nginx:alpine
COPY --from=frontend-build /frontend/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]