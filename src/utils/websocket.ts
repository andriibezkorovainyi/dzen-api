import { WebSocketServer } from 'ws';
import userController from '../controllers/userController';
import commentController from '../controllers/commentController';

const port = Number(process.env.WS_PORT || 5000);

const webSocketServer = () => {
  const wss = new WebSocketServer({ port }, () => {
    console.log(
      `WS server is listening at ws://localhost:${process.env.WS_PORT || 5000}`
    );
  });

  wss.on('connection', (ws, req) => {
    commentController.getComments(ws, {});

    ws.on('message', (message) => {
      const { event, data } = JSON.parse(message.toString());

      const userSessionData = {
        ...data,
        ip: req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      };

      switch (event) {
        case 'createUser':
          userController.createUser(ws, userSessionData);
          break;

        case 'getUser':
          userController.getUser(ws, userSessionData);
          break;

        case 'getComments':
          commentController.getComments(ws, data);
          break;

        case 'createComment':
          commentController.createComment(ws, data);
          break;

        default:
          break;
      }
    });
  });
};

export default webSocketServer;
