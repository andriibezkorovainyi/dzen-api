export interface BodyErrors {
  tooLong?: string;
  empty?: string;
  invalidTag?: string;
  closeTag?: string;
}

export interface FileErrors {
  txtSize?: string;
  fileType?: string;
  fileExtension?: string;
}
