import Navbar from './components/layout/Navbar';
import SiteFooter from './components/layout/SiteFooter';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import HeroSection from './components/sections/HeroSection';
import BrandsSection from './components/sections/BrandsSection';
import PhotographySection from './components/sections/PhotographySection';
import SkillsSection from './components/sections/SkillsSection';
import WorkSection from './components/sections/WorkSection';
import CareerJourneySection from './components/sections/CareerJourneySection';
import WebAppsSection from './components/sections/WebAppsSection';
import {
  navLinks,
  personalInfo,
  aboutStats,
  experienceItems,
  careerJourney,
  skillGroups,
  brandItems,
  projectItems,
  webAppItems,
  photoItems,
  socialLinks,
} from './data/portfolio';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar links={navLinks} theme={theme} onToggleTheme={toggleTheme} person={personalInfo} />
      <main id="main-content">
        <HeroSection person={personalInfo} />
        <CareerJourneySection journey={careerJourney} />
        <AboutSection person={personalInfo} stats={aboutStats} experienceItems={experienceItems} />
        <BrandsSection brands={brandItems} theme={theme} />
        <SkillsSection groups={skillGroups} />
        <WorkSection projects={projectItems} />
        <WebAppsSection items={webAppItems} />
        <PhotographySection photos={photoItems} />
        <ContactSection person={personalInfo} socials={socialLinks} />
      </main>
      <SiteFooter person={personalInfo} theme={theme} />
    </div>
  );
}
