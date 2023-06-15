import { CreateFileClientPayload } from '../types/commentTypes';
import { PrismaClient } from '@prisma/client';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';

const prisma = new PrismaClient();
const s3Client = new S3({});

class FileService {
  async uploadFile(fileName: string, dataUrl: string) {
    const data = dataUrl.split(',')[1];
    const buffer = Buffer.from(data, 'base64');

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: 'dzen-bucket',
          Key: fileName,
          Body: buffer,
        })
      );
      console.log('Successfully created ');
    } catch (err) {
      console.log('Error', err);
    }
  }

  async createFile(file: CreateFileClientPayload, commentId: number) {
    const { dataUrl, fileName, fileType, fileSize } = file;
    const safeName = new Date().getTime().toString().slice(0, 13) + fileName;

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
        await this.uploadFile(safeName, dataUrl),
      ]);

      return createdFileAll[0];
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
