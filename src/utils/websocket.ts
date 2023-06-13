import { WebSocketServer } from 'ws';
import commentController from '../controllers/commentController';
import broadcast from './broadcast';

const PORT = Number(process.env.WS_PORT || 8080);

const webSocketServer = () => {
  const wss = new WebSocketServer({ port: PORT }, () => {
    console.log(`WS server is listening at ws://localhost:${PORT}`);
  });

  wss.on('connection', (ws) => {
    console.log('New connection');
    ws.on('message', async (message) => {
      const { event, data } = JSON.parse(message.toString());

      console.log('New Message: ', message.toString());

      if (!event || !data) {
        ws.send(JSON.stringify({ error: 'Event or data is not provided' }));
        return;
      }

      const clientPayload = { ...data };

      switch (event) {
        case 'getComments':
          console.log('getComments');
          commentController.getComments(ws, clientPayload);
          break;

        case 'createComment':
          console.log('createComment');
          broadcast.comment(clientPayload, wss, ws);
          break;

        case 'createAnswer':
          console.log('createAnswer');
          broadcast.answer(clientPayload, wss, ws);
          break;

        case 'getAnswers':
          console.log('getAnswers');
          commentController.getAnswers(clientPayload, ws);
          break;

        case 'getCommentsCount':
          console.log('getCommentsCount');
          commentController.getCommentsCount(ws);
          break;

        default:
          ws.send('Unknown event');
      }
    });

    ws.on('close', () => {
      console.log('Connection closed');
      ws.terminate();
    });

    ws.on('error', (err) => {
      console.log('Error: ', err);
      ws.terminate();
    });
  });
};
export default webSocketServer;
