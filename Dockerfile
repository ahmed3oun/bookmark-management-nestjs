FROM node:20-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json yarn.lock

RUN yarn install

COPY . .

COPY  .env .

EXPOSE 3000:3000

RUN yarn install

CMD [ "yarn", "start:dev" ]