FROM node:14.15.0-alpine3.10
WORKDIR /app
ADD ./package.json ./
ADD ./yarn.lock ./
RUN yarn && yarn cache clean
ADD . .
CMD ["yarn", "dev"]
