import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { PrismaClient } from '@prisma/client';
import webSocketServer from './utils/websocket';

const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(cors());
  app.use(compression());

  webSocketServer();
}

main();
