import path = require('path');
import { CreateFileClientPayload } from '../types/commentTypes';
import * as fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FileService {
  async createFile(file: CreateFileClientPayload, commentId: number) {
    const { fileName, dataUrl } = file;

    const uniqueFileName = `${Date.now()}-${fileName}`;
    const safeFileName = uniqueFileName
      .replace(/[^a-z0-9.]/gi, '_')
      .toLowerCase();
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'public',
      safeFileName
    );
    const mimeType = dataUrl.split(';')[0].split(':')[1];
    const base64String = dataUrl.split(',')[1];
    const binaryData = Buffer.from(base64String, 'base64');

    try {
      const fileData = await Promise.all([
        await prisma.file.create({
          data: {
            name: safeFileName,
            commentId,
            size: binaryData.length,
            type: mimeType,
            url: `/${safeFileName}`,
          },
        }),
        await fs.writeFile(filePath, binaryData),
      ]);

      console.log('create File', fileData[0]);

      return fileData[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
