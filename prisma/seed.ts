import { PrismaClient } from "@prisma/client";
import { accessProfile } from "../data/accessProfile";
import { users } from '../data/users';

const prisma = new PrismaClient();

async function main() {
  await prisma.accessProfile.deleteMany({});
  await prisma.accessProfile.createMany({
    data: accessProfile,
  });

  await prisma.users.deleteMany({});
  await prisma.users.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
