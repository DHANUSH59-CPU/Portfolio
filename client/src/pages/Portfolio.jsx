import { useEffect, useState } from 'react';
import { publicAPI } from '../services/api';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Education from '../components/Education/Education';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import CustomCursor from '../components/CustomCursor/CustomCursor';

const Portfolio = () => {
  const [data, setData] = useState({
    hero: null,
    about: null,
    skills: [],
    projects: [],
    experience: [],
    education: [],
    contact: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hero, about, skills, projects, experience, education, contact] = await Promise.all([
          publicAPI.getHero(),
          publicAPI.getAbout(),
          publicAPI.getSkills(),
          publicAPI.getProjects(),
          publicAPI.getExperience(),
          publicAPI.getEducation(),
          publicAPI.getContact(),
        ]);

        setData({
          hero: hero.data.data,
          about: about.data.data,
          skills: skills.data.data,
          projects: projects.data.data,
          experience: experience.data.data,
          education: education.data.data,
          contact: contact.data.data,
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <Experience data={data.experience} />
        <Education data={data.education} />
        <Contact data={data.contact} />
      </main>
      <Footer contact={data.contact} />
    </>
  );
};

export default Portfolio;
