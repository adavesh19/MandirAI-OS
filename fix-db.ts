import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fix() {
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
  const oldContent = homePage.content as any;

  // Check if it's already fixed
  if (oldContent && oldContent.html) {
    console.log("Already fixed");
    return;
  }

  // Wrap it properly
  const newContent = {
    title: {},
    description: {},
    html: oldContent
  };

  await prisma.templePage.update({
    where: { id: homePage.id },
    data: { content: newContent }
  });

  console.log("Successfully fixed database structure for temple:", temple.slug);
}

fix().catch(console.error).finally(() => prisma.$disconnect());
