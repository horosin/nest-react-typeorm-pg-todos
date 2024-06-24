FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV VITE_API_PATH /api

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx /etc/nginx/conf.d

EXPOSE 80
