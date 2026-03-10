const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Hero = require('./models/Hero');
const About = require('./models/About');
const Contact = require('./models/Contact');

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Seed admin user
    const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingUser) {
      await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Seed Hero section
    const existingHero = await Hero.findOne();
    if (!existingHero) {
      await Hero.create({
        greeting: "Hello, I'm",
        name: 'Dhanush Kumar S R',
        titles: ['AI Engineer', 'Full-Stack Developer', 'Problem Solver'],
        subtitle: 'Passionate about building intelligent systems and beautiful web experiences.',
      });
      console.log('✅ Hero section seeded');
    } else {
      console.log('ℹ️  Hero section already exists');
    }

    // Seed About section
    const existingAbout = await About.findOne();
    if (!existingAbout) {
      await About.create({
        description: 'I am an AI Engineer with a passion for building intelligent systems. Update this section from the admin panel with your own content.',
        highlights: [
          { label: 'Projects', value: '10+' },
          { label: 'Experience', value: '2+ Years' },
          { label: 'Technologies', value: '15+' },
        ],
      });
      console.log('✅ About section seeded');
    } else {
      console.log('ℹ️  About section already exists');
    }

    // Seed Contact section
    const existingContact = await Contact.findOne();
    if (!existingContact) {
      await Contact.create({
        email: 'your.email@example.com',
        location: 'India',
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        tagline: "Let's build something amazing together!",
      });
      console.log('✅ Contact section seeded');
    } else {
      console.log('ℹ️  Contact section already exists');
    }

    console.log('\n🎉 Seeding complete!');
    console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'}`);
    console.log(`🔑 Admin password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
