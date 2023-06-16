import { CreateFileClientPayload } from '../types/commentTypes';
import { FileErrors } from '../types/Errors';

export function validateCommentFile(file: CreateFileClientPayload | undefined) {
  if (!file) return {};

  const { fileName, dataUrl } = file;
  const errors: FileErrors = {};
  const mimeType = dataUrl.split(';')[0].split(':')[1];
  const segments = fileName.split('.');
  const fileExtension = segments[segments.length - 1].toLowerCase();
  const supportedExtensions = ['txt', 'png', 'jpeg', 'jpg', 'gif'];

  if (
    mimeType !== 'text/plain' &&
    mimeType !== 'image/png' &&
    mimeType !== 'image/jpeg' &&
    mimeType !== 'image/jpg' &&
    mimeType !== 'image/gif'
  ) {
    errors.fileType = `Неподдерживаемый тип файла ${mimeType}`;
  }

  if (!supportedExtensions.includes(fileExtension)) {
    errors.fileExtension = `Неподдерживаемое расширение файла: .${fileExtension}`;
  }

  if (mimeType === 'text/plain') {
    const fileBinary = atob(dataUrl.split(',')[1]);

    if (fileBinary.length > 102400) {
      errors.txtSize = 'Текстовый файл не должен превышать 100 КБ';
    }
  }

  return errors;
}
