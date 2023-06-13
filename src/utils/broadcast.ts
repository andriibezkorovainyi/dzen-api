import { CreateCommentClientPayload } from '../types/commentTypes';
import commentController from '../controllers/commentController';
import WebSocket from 'ws';

class Broadcast {
  async answer(
    data: CreateCommentClientPayload,
    wss: WebSocket.Server,
    ws: WebSocket
  ) {
    const newComment = await commentController.createComment(data, ws);
    console.log('newComment: ', newComment);
    const parentId = newComment?.parentId;

    const message = {
      event: 'createAnswer',
      data: {
        parentId,
        newComment: newComment,
      },
    };

    if (!message) {
      console.log('Error getting answers: ', message);
      return;
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  async comment(
    data: CreateCommentClientPayload,
    wss: WebSocket.Server,
    ws: WebSocket
  ) {
    const message = await commentController.createComment(data, ws);

    if (!message) {
      console.log('Error creating comment: ', message);
      return;
    }

    const messageToSend = {
      event: 'createComment',
      data: message,
    };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messageToSend));
      }
    });
  }
}

export default new Broadcast();
