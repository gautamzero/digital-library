FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app

COPY ./backend/package.json .

RUN npm install

WORKDIR /app/client

COPY ./frontend .

RUN npm install

RUN npm run build

WORKDIR /app

COPY ./backend .

EXPOSE 5000

CMD [ "npm", "start" ]