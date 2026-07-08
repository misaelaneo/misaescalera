import { profile } from '../../data/profile';
import { ExternalLinkIcon, GitHubIcon, LinkedInIcon } from '../icons';
import { CareerFeed } from './CareerFeed';
import { TitleCarousel } from './TitleCarousel';

type HomeSectionProps = {
  onContact: () => void;
};

function socialIcon(icon: string) {
  switch (icon) {
    case 'linkedin':
      return <LinkedInIcon />;
    case 'github':
      return <GitHubIcon />;
    default:
      return <ExternalLinkIcon />;
  }
}

export function HomeSection({ onContact }: HomeSectionProps) {
  return (
    <section id="home" className="section">
      <div className="hero">
        <h1 className="hero-name">{profile.name}</h1>
        <TitleCarousel titles={profile.titles} />
        <div className="hero-actions">
          {profile.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="icon-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.label} profile`}
            >
              {socialIcon(link.icon)}
            </a>
          ))}
          <button className="btn btn-primary" onClick={onContact}>
            Get in Touch
          </button>
        </div>
      </div>
      <CareerFeed />
    </section>
  );
}
