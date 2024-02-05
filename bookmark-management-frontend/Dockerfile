
FROM beevelop/ionic:latest

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8100:8100

ENTRYPOINT [ "ionic" ]

CMD [ "serve", "--external" , "--no-open" ]
#CMD [ "serve" ]
