import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const seedHeaderMenu = async () => {
  await prisma.headerMenuItem.create({
    data: {
      collapsible: true,
      order: 0,
      title: 'expertise',
      content: {
        header: 'Our Expertise',
        genericLink: {
          href: '#',
          title: 'View All Projects',
        },
        description:
          'Explore the people, projects, and solutions that make QualTech a global engineering leader.',
      },
      imagesHeader: 'Global Initiatives',
      images: {
        create: [
          {
            title: 'Nature-based Solutions',
            href: '#',
            imgUrl: '/header1.jpg',
            imgAlt: 'A scenic view of nature-based engineering solutions',
          },
          {
            title: 'Energy Abundance',
            href: '#',
            imgUrl: '/header2.jpg',
            imgAlt:
              'Renewable energy infrastructure showcasing energy abundance',
          },
          {
            title: 'Clean Environment',
            href: '#',
            imgUrl: '/header3.jpg',
            imgAlt:
              'Sustainable environmental practices for a clean environment',
          },
          {
            title: 'Climate Solutions',
            href: '#',
            imgUrl: '/header4.jpg',
            imgAlt:
              'Innovative climate change mitigation and adaptation solutions',
          },
        ],
      },
      links: {
        create: [
          { href: '#', title: 'Buildings' },
          { href: '#', title: 'Energy' },
          { href: '#', title: 'Renewable Energy' },
          { href: '#', title: 'Transportation' },
          { href: '#', title: 'Water' },
          { href: '#', title: 'Waste' },
          { href: '#', title: 'Infrastructure' },
          { href: '#', title: 'Systems' },
          { href: '#', title: 'Industrial' },
        ],
      },
    },
  });

  await prisma.headerMenuItem.create({
    data: {
      collapsible: true,
      order: 1,
      title: 'locations',
      content: {
        header: 'Our Locations',
        genericLink: {
          href: '#',
          title: 'View All Locations',
        },
        description:
          'Discover where we operate and how we support projects worldwide.',
      },
      links: {
        create: [
          { href: '#', title: 'North America' },
          { href: '#', title: 'Europe' },
          { href: '#', title: 'Middle East' },
          { href: '#', title: 'Asia Pacific' },
          { href: '#', title: 'Africa' },
          { href: '#', title: 'Latin America' },
        ],
      },
    },
  });

  await prisma.headerMenuItem.create({
    data: {
      collapsible: true,
      order: 2,
      title: 'about',
      content: {
        header: 'About QualTech',
        genericLink: {
          href: '#',
          title: 'Learn More',
        },
        description: 'Learn who we are, what we do, and how we deliver impact.',
      },
      links: {
        create: [
          { href: '#', title: 'Company' },
          { href: '#', title: 'Leadership' },
          { href: '#', title: 'Values' },
          { href: '#', title: 'Careers' },
          { href: '#', title: 'Sustainability' },
          { href: '#', title: 'History' },
        ],
      },
    },
  });

  await prisma.headerMenuItem.create({
    data: {
      collapsible: false,
      order: 3,
      links: { create: [{ title: 'news', href: '#' }] },
    },
  });
};

const seedCarouselCardsData = async () => {
  await prisma.carouselCardData.create({
    data: {
      about: 'Global',
      header: 'Responsible Power Generation',
      description:
        'Next-generation nuclear technology built for stability, sustainability, and minimal environmental impact.',
      imgUrl: '/carousel1.jpg',
      imgAlt: 'Advanced nuclear reactor within eco-balanced surroundings',
      order: 0,
    },
  });

  await prisma.carouselCardData.create({
    data: {
      about: 'Mobility',
      header: 'Modern Rail Systems',
      description:
        'Clean, efficient rail infrastructure designed to move people reliably while reducing environmental impact.',
      imgUrl: '/carousel2.jpg',
      imgAlt: 'Modern high-speed train with clean and contemporary design',
      order: 1,
    },
  });

  await prisma.carouselCardData.create({
    data: {
      about: 'Public Sector',
      header: 'Government Collaboration',
      description:
        'Senior engineering leaders partnering with governments to deliver solutions to complex national challenges.',
      imgUrl: '/carousel3.jpg',
      imgAlt:
        'Engineering executives finalizing agreements with government officials',
      order: 2,
    },
  });

  await prisma.carouselCardData.create({
    data: {
      about: 'Energy',
      header: 'Resilient Power Networks',
      description:
        'High-voltage transmission systems engineered to perform reliably in demanding and complex environments.',
      imgUrl: '/carousel4.jpg',
      imgAlt:
        'Electricity transmission towers built across challenging terrain',
      order: 3,
    },
  });

  await prisma.carouselCardData.create({
    data: {
      about: 'Architecture',
      header: 'Human-Centered Buildings',
      description:
        'Advanced building designs that prioritize comfort, natural light, and long-term environmental performance.',
      imgUrl: '/carousel5.jpg',
      imgAlt: 'Modern building designed for natural light and occupant comfort',
      order: 4,
    },
  });
};

const seedExperienceCardsData = async () => {
  await prisma.experienceCardData.create({
    data: {
      title: 'Efficient',
      header: 'Fast delivery, lasting quality',
      description:
        'Establishing a solid project management systems enabled one of the best efficiencies in the industry.',
      order: 0,
    },
  });

  await prisma.experienceCardData.create({
    data: {
      title: 'Reliable',
      header: 'Engineered for certainty',
      description:
        'Delivering complex projects with predictable outcomes through disciplined planning and execution.',
      order: 1,
    },
  });

  await prisma.experienceCardData.create({
    data: {
      title: 'Scalable',
      header: 'Built to grow with demand',
      description:
        'Designing systems and infrastructure that adapt seamlessly to long-term operational and capacity needs.',
      order: 2,
    },
  });

  await prisma.experienceCardData.create({
    data: {
      title: 'Resilient',
      header: 'Performance under pressure',
      description:
        'Engineering solutions that maintain reliability and safety in the most demanding environments.',
      order: 3,
    },
  });

  await prisma.experienceCardData.create({
    data: {
      title: 'Sustainable',
      header: 'Designed for the future',
      description:
        'Integrating environmental responsibility into every stage of planning, design, and delivery.',
      order: 4,
    },
  });
};

const seedFooterColumns = async () => {
  await prisma.footerColumn.create({
    data: {
      header: 'About',
      order: 0,
      items: {
        create: [
          { href: '#', title: 'Contact Us' },
          { href: '#', title: 'Company Overview' },
          { href: '#', title: 'Leadership' },
          { href: '#', title: 'Board of Directors' },
          { href: '#', title: 'News' },
          { href: '#', title: 'Find an Office' },
          { href: '#', title: 'Supplier Information' },
        ],
      },
    },
  });

  await prisma.footerColumn.create({
    data: {
      header: 'Expertise',
      order: 1,
      items: {
        create: [
          { href: '#', title: 'Projects' },
          { href: '#', title: 'Environment' },
          { href: '#', title: 'Water' },
          { href: '#', title: 'Energy' },
          { href: '#', title: 'Infrastructure' },
        ],
      },
    },
  });

  await prisma.footerColumn.create({
    data: {
      header: 'Careers',
      order: 2,
      items: {
        create: [
          { href: '#', title: 'Our Greener Future Culture' },
          { href: '#', title: 'Our Values' },
          { href: '#', title: 'Veterans & Military' },
          { href: '#', title: 'Students & Graduates' },
          { href: '#', title: 'Search & Apply' },
        ],
      },
    },
  });
};

const seedAdmin = async () => {
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!plainPassword) {
    throw new Error(
      'ADMIN_PASSWORD environment variable is not set in the .env file',
    );
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.create({
    data: {
      name: 'Thomas Ghali',
      username: 'thomas-ghali',
      password: hashedPassword,
    },
  });
};

async function main() {
  console.log('Starting database seeding...');

  await prisma.$transaction([
    prisma.headerMenuItem.deleteMany(),
    prisma.carouselCardData.deleteMany(),
    prisma.experienceCardData.deleteMany(),
    prisma.footerColumn.deleteMany(),
    prisma.admin.deleteMany(),
  ]);
  console.log('Cleaned existing data...');

  await seedAdmin();
  console.log('Admin seeded...', '1/5');

  await seedHeaderMenu();
  console.log('Header menu seeded...', '2/5');

  await seedCarouselCardsData();
  console.log('Carousel cards seeded...', '3/5');

  await seedExperienceCardsData();
  console.log('Experience cards seeded...', '4/5');

  await seedFooterColumns();
  console.log('Footer columns seeded...', '5/5');

  console.log('Seeding finished successfully.');
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
