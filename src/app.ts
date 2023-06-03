import { PrismaClient } from '@prisma/client';
import webSocketServer from './utils/websocket';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const avatarApi = process.env.AVATAR_API || 'https://api.multiavatar.com/';

async function main() {
  const app = express();

  webSocketServer();

  app.use(cors());
}

main();
