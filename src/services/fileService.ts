import 'path';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as mime from 'mime';

class StaticFilesService {
  async getStaticFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', '..', 'public', fileName);
    console.log('GetStaticFile');

    try {
      const storedFile = await fs.readFile(filePath);
      const base64String = storedFile.toString('base64');
      const mimeType = mime.getType(filePath);
      const dataURL = `data:${mimeType};base64,${base64String}`;

      console.log(dataURL);

      return dataURL;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new StaticFilesService();
