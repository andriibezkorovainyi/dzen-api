FROM node

WORKDIR /dzen-api

COPY package.json /dzen-api

RUN npm install

COPY . .

EXPOSE 80

EXPOSE 8080

CMD npm run start
