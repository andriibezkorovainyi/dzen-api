import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserInput } from '../types/userTypes';

const prisma = new PrismaClient();

class UserService {
  async getUsers() {
    return prisma.user.findMany();
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: CreateUserInput) {
    const { userName, email, password } = data;
    const avatarUrl = `https://api.multiavatar.com/${email}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
        avatarUrl,
      },
    });
  }
}

export default new UserService();
