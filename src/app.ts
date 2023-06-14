import express from 'express';
import cors from 'cors';
import compression from 'compression';
import webSocketServer from './utils/websocket';

async function main() {
  const app = express();

  app.use(cors());
  app.use(compression());

  webSocketServer();
}

main();
