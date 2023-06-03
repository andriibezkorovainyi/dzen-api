import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserSessionService {
  async createUserSession(id: number, ip: string, userAgent: string) {
    const ipv4Address = ip.replace('::ffff:', '');

    return prisma.userSession.create({
      data: {
        userId: id,
        ip: ipv4Address,
        userAgent,
      },
    });
  }
}

export default new UserSessionService();
