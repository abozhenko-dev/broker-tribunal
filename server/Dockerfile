FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build

