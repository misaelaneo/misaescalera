import { useState } from 'react';
import { AboutSection } from './components/about/AboutSection';
import { ContactModal } from './components/contact/ContactModal';
import { HomeSection } from './components/home/HomeSection';
import { MediaJournalSection } from './components/journal/MediaJournalSection';
import { NavigationRail } from './components/navigation/NavigationRail';
import { WorkSection } from './components/work/WorkSection';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';

const SECTION_IDS = ['home', 'work', 'journal', 'about'];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeId = useActiveSection(SECTION_IDS);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <NavigationRail
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
        onContact={() => setContactOpen(true)}
      />
      <main className="app-main">
        <HomeSection onContact={() => setContactOpen(true)} />
        <WorkSection />
        <MediaJournalSection />
        <AboutSection />
      </main>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
