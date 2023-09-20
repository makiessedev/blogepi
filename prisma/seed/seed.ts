import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

import { posts } from './post';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: 'kudika',
      email: 'admin@kudika.com',
      password: hashSync('kudika', 8),
      isAdmin: true,
    },
  });

  const raw = posts.map(
    async ({ author, authorUrl, content, imageUrl, description, isPublish, title }) => {
      return await prisma.post.create({
        data: {
          userId: admin.id,
          author,
          authorUrl,
          imageUrl,
          content,
          description,
          isPublish,
          title,
        },
      });
    },
  );

  console.log({ admin, raw });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
