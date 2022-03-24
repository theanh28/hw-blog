import { PrismaClient } from "@prisma/client";

const prismaConnect = () =>
  new Promise((resolve) => {
    const prisma = new PrismaClient();
    prisma.$connect().then((status) => {
      resolve(prisma);
    });
  });

export default prismaConnect;
