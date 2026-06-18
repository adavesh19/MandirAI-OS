import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const temple = await prisma.temple.findFirst({
    include: {
      pages: {
        where: { pageType: 'HOME' }
      }
    }
  });

  if (!temple || temple.pages.length === 0) {
    console.log("No temple or home page found");
    return;
  }

  const homePage = temple.pages[0];
  console.log("Temple:", temple.slug);
  console.log("HomePage ID:", homePage.id);
  console.log("Content Structure:", JSON.stringify(homePage.content, null, 2));

  // Also simulate what page.tsx does
  const pageContent = homePage.content as any;
  const serializablePage = pageContent
    ? {
        title: pageContent.title || {},
        description: pageContent.description || {},
        content: pageContent.html || '',
      }
    : null;

  console.log("Serializable Page Extracted:", JSON.stringify(serializablePage, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
