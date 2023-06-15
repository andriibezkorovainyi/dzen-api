import { CreateFileClientPayload } from '../types/commentTypes';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

class FileService {
  async createFile(file: CreateFileClientPayload, commentId: number) {
    const { dataUrl, fileName, fileType, fileSize } = file;
    const safeName = new Date().getTime().toString().slice(0, 13) + fileName;
    console.log('file: ', file);

    try {
      const createdFileAll = await Promise.all([
        await prisma.file.create({
          data: {
            name: safeName,
            type: fileType,
            size: +fileSize,
            url: '/' + safeName,
            commentId,
          },
        }),
        await axios.post(process.env.HTTP + `/file/${safeName}`, {
          dataUrl,
        }),
      ]);

      return createdFileAll[0];
    } catch (e) {
      // console.log(e);
    }
  }
}

export default new FileService();
