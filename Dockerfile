FROM node

WORKDIR /dzen-api

COPY package.json /dzen-api
COPY package-lock.json /dzen-api

RUN npm clean-install

COPY . .

EXPOSE 8080 7070


RUN npm run build

CMD npm run start
