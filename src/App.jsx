import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import HeroSection from './components/sections/HeroSection';
import PhotographySection from './components/sections/PhotographySection';
import SkillsSection from './components/sections/SkillsSection';
import WorkSection from './components/sections/WorkSection';
import {
  navLinks,
  personalInfo,
  aboutStats,
  experienceItems,
  skillGroups,
  projectItems,
  photoItems,
  socialLinks,
} from './data/portfolio';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <Navbar links={navLinks} theme={theme} onToggleTheme={toggleTheme} />
      <main id="top">
        <HeroSection person={personalInfo} />
        <AboutSection person={personalInfo} stats={aboutStats} experienceItems={experienceItems} />
        <SkillsSection groups={skillGroups} />
        <WorkSection projects={projectItems} />
        <PhotographySection photos={photoItems} />
        <ContactSection person={personalInfo} socials={socialLinks} />
      </main>
      <Footer person={personalInfo} />
    </div>
  );
}
