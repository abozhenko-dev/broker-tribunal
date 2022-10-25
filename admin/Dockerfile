FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

RUN yarn build


FROM nginx:alpine AS production

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD nginx -g "daemon off;"
