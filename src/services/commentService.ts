import { Comment, File, PrismaClient } from '@prisma/client';
import {
  CommentsSearchParams,
  CreateCommentClientPayload,
} from '../types/commentTypes';

const prisma = new PrismaClient();

class CommentService {
  async getCommentById(id: number): Promise<Comment | null> {
    const dbComment = await prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!dbComment) {
      return null;
    }

    return dbComment;
  }
  async getComments(params: CommentsSearchParams): Promise<Comment[]> {
    const {
      page = 1,
      sortBy = 'createdAt',
      orderBy = 'desc',
      parentId = null,
    } = params;

    const comments = (await prisma.comment.findMany({
      where: { parentId },
      skip: (page - 1) * 25,
      take: 25,
      orderBy: { [sortBy]: orderBy },
      include: {
        user: true,
        children: true,
        file: true,
      },
    })) as Comment[] &
      { children: Comment[]; childrenCount: number; file: File | null }[];

    return comments;
  }

  async createComment(data: CreateCommentClientPayload): Promise<Comment> {
    const { body, userId, parentId, userName, email, avatarUrl } = data;
    return prisma.comment.create({
      data: {
        body,
        userId,
        parentId,
        userName,
        avatarUrl,
        email,
      },
    });
  }

  async getAnswers(parentId: number): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: { parentId },
    });
  }

  async getCommentsCount(): Promise<number> {
    return prisma.comment.count({ where: { parentId: null } });
  }
}

export default new CommentService();
