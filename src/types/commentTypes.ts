export interface CommentsSearchParams {
  page?: number;
  sortBy?: 'createdAt' | 'userName' | 'email';
  orderBy?: 'asc' | 'desc';
  parentId?: number | null;
}

export interface CreateCommentClientPayload {
  body: string;
  userId: number;
  parentId: number | null;
  userName: string;
  email: string;
  avatarUrl: string;
  file?: CreateFileClientPayload;
}

export interface CreateFileClientPayload {
  fileName: string;
  dataUrl: string;
}
