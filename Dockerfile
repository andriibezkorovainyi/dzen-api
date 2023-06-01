FROM node

WORKDIR /dzen-api

COPY package.json /dzen-api

RUN npm install

COPY . .

EXPOSE env.PORT

CMD ["node", "dist/app.js"]
