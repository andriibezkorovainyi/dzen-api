import commentService from '../services/commentService';
import { WebSocket } from 'ws';
import {
  CommentsSearchParams,
  CreateCommentClientPayload,
} from '../types/commentTypes';
import { validateCommentBody } from '../validators/validateCommentBody';
import fileService from '../services/fileService';
import { validateCommentFile } from '../validators/validateCommentFile';

class CommentController {
  async getComments(ws: WebSocket, params: CommentsSearchParams) {
    try {
      const comments = await commentService.getComments(params);
      const message = {
        event: 'getComments',
        data: comments,
      };

      ws.send(JSON.stringify(message));
    } catch (err) {
      console.log(err);
    }
  }

  async createComment(commentData: CreateCommentClientPayload, ws: WebSocket) {
    const { file, body } = commentData;

    let errors = {
      ...validateCommentBody(body),
    };

    if (file) {
      errors = {
        ...errors,
        ...validateCommentFile(file),
      };
    }

    if (Object.keys(errors).length) {
      const message = {
        event: 'createCommentError',
        data: {
          errors,
        },
      };

      console.log('message: ', message);

      ws.send(JSON.stringify(message));

      return;
    }

    try {
      const createdComment = await commentService.createComment(commentData);

      const createdFile = file
        ? await fileService.createFile(file, createdComment.id)
        : null;

      return {
        ...createdComment,
        file: createdFile,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getAnswers(params: CommentsSearchParams, ws?: WebSocket) {
    try {
      const comments = await commentService.getComments(params);
      const message = {
        event: 'getAnswers',
        data: {
          parentId: params.parentId,
          children: comments,
        },
      };

      if (ws) {
        ws.send(JSON.stringify(message));
        return;
      }

      return message;
    } catch (err) {
      console.log(err);
    }
  }

  async getCommentsCount(ws: WebSocket) {
    try {
      const count = await commentService.getCommentsCount();
      const message = {
        event: 'getCommentsCount',
        data: count,
      };

      ws.send(JSON.stringify(message));
      console.log('getCommentsCount: ', message);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CommentController();
