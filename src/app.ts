import express from 'express';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import webSocketServer from './utils/websocket';
import fileController from './controllers/fileController';
import axios from 'axios';
import userController from './controllers/userController';

async function main() {
  const app = express();
  const publicPath = path.join(__dirname, '..', 'public');

  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(express.static(publicPath));

  webSocketServer();

  app.get('/files/:fileName', fileController.getFile);

  app.post('/verify-token', async (req, res) => {
    console.log('VerifyToken');
    try {
      const { token, secret } = req.body;

      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
      );
      return res.status(200).json({
        success: true,
        message: 'Token successfully verified',
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Error verifying token',
      });
    }
  });

  app.post('/get-user', userController.getUser);

  app.post('/create-user', userController.createUser);

  app.listen(process.env.HTTP_PORT || 7070, () => {
    console.log(
      `HTTP server is listening at http://localhost:${
        process.env.HTTP_PORT || 7070
      }`
    );
  });
}

main();
