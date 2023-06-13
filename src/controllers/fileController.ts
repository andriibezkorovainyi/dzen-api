import staticFilesService from '../services/fileService';
import { Request, Response } from 'express';

class FilesController {
  async getFile(req: Request, res: Response) {
    console.log('GetStaticFile');

    try {
      const dataUrl = await staticFilesService.getFile(req.params.fileName);

      console.log(dataUrl);

      res.status(200).send(dataUrl).setHeader('Content-Type', 'text/plain');
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
}

export default new FilesController();
