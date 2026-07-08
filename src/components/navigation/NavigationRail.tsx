import type { ComponentType, SVGProps } from 'react';
import { BookIcon, BriefcaseIcon, HouseIcon, MailIcon, MoonIcon, SunIcon, UserIcon } from '../icons';

type NavigationRailProps = {
  activeId: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onContact: () => void;
};

const SECTIONS: { id: string; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { id: 'home', label: 'Home', Icon: HouseIcon },
  { id: 'work', label: 'Work', Icon: BriefcaseIcon },
  { id: 'journal', label: 'Journal', Icon: BookIcon },
  { id: 'about', label: 'About', Icon: UserIcon },
];

export function NavigationRail({ activeId, theme, onToggleTheme, onContact }: NavigationRailProps) {
  return (
    <nav className="nav-rail" aria-label="Primary">
      <a className="nav-logo" href="#home" aria-label="Go to top">
        ME
      </a>
      <div className="nav-group">
        {SECTIONS.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-btn${activeId === id ? ' active' : ''}`}
            aria-label={`Go to ${label} section`}
            aria-current={activeId === id ? 'true' : undefined}
          >
            <Icon />
            <span className="nav-label">{label}</span>
          </a>
        ))}
      </div>
      <div className="nav-group">
        <button className="nav-btn" onClick={onContact} aria-label="Open contact form">
          <MailIcon />
          <span className="nav-label">Contact</span>
        </button>
        <button
          className="nav-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span className="nav-label">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </nav>
  );
}
