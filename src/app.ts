import webSocketServer from './utils/websocket';
import express from 'express';
import cors from 'cors';

async function main() {
  const app = express();

  webSocketServer();

  app.use(cors());
}

main();
