FROM node

WORKDIR /dzen-api

COPY package.json /dzen-api
COPY package-lock.json /dzen-api

RUN npm clean-install

COPY . .

EXPOSE 9090

CMD npm run start
