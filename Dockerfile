FROM node:10-alpine

ENV FORCE_COLOR true

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add ffmpeg
RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon", "index.js"]