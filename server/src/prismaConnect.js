import priscli from "@prisma/client";

const { PrismaClient } = priscli;

const prismaConnect = async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  return prisma;
}

export default prismaConnect;
