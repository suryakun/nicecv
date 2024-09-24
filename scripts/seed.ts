import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const getDirectories = (source: string): string[] => {
  return fs.readdirSync(source).filter((name) => {
    return fs.statSync(path.join(source, name)).isDirectory();
  });
};

const truncateTable = async (tableName: string) => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`,
  );
};

const resetSequence = async (sequenceName: string) => {
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "${sequenceName}" RESTART WITH 1;`,
  );
};

async function main() {
  const sourceDirectory = './templates';
  const directories = getDirectories(sourceDirectory);
  await truncateTable('Template');
  await resetSequence('Template_id_seq');
  for (const dif of directories) {
    const templatePath = path.join(sourceDirectory, dif, 'index.handlebars');
    const template = fs.readFileSync(templatePath, 'utf-8');
    await prisma.template.create({
      data: {
        name: dif,
        fileName: template,
      },
    });
  }

  console.log('Templates seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
