FROM node:16.15.0-slim as builder
WORKDIR /srv
ADD package*.json /srv/
RUN npm i -qy
RUN npm install -g gatsby-cli
COPY . .
