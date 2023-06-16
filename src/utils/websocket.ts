import { WebSocketServer } from 'ws';
import commentController from '../controllers/commentController';
import broadcast from './broadcast';

const WS_PORT = Number(process.env.PORT);

const webSocketServer = () => {
  const wss = new WebSocketServer({ port: WS_PORT }, () => {
    console.log(`WS server is listening on port ${WS_PORT}`);
  });

  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const { event, data } = JSON.parse(message.toString());

      if (!event || !data) {
        ws.send(JSON.stringify({ error: 'Event or data is not provided' }));
        return;
      }

      const clientPayload = { ...data };

      switch (event) {
        case 'getComments':
          commentController.getComments(ws, clientPayload);
          break;

        case 'createComment':
          broadcast.comment(clientPayload, wss, ws);
          break;

        case 'createAnswer':
          broadcast.answer(clientPayload, wss, ws);
          break;

        case 'getAnswers':
          commentController.getAnswers(clientPayload, ws);
          break;

        case 'getCommentsCount':
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
