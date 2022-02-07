FROM node:16-alpine as production

WORKDIR /discord-bot/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run start:prod