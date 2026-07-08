import { education } from '../../data/education';
import { profile } from '../../data/profile';
import { publicEvents } from '../../data/publicEvents';
import { skills } from '../../data/skills';
import { ContactForm } from '../contact/ContactForm';
import { ExperienceTimeline } from './ExperienceTimeline';
import { TechStackGrid } from './TechStackGrid';

// TODO(content): replace placeholder summary with the real professional summary (PRD §22)
const PROFESSIONAL_SUMMARY =
  'I am a Product Manager with experience in learning management systems. My work focuses on ' +
  'delivering products at the intersection of user needs, business goals, and technical delivery. ' +
  '(Placeholder summary — replace with the real one, 75–150 words.)';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

export function WorkSection() {
  return (
    <section id="work" className="section">
      <h2 className="section-title">Work</h2>
      <p className="section-subtitle">Professional background, experience, and skills.</p>

      <div className="profile-area">
        {profile.portraitUrl ? (
          <img className="portrait" src={profile.portraitUrl} alt={`Portrait of ${profile.name}`} />
        ) : (
          <div className="portrait-placeholder" aria-hidden="true">
            {initials(profile.name)}
          </div>
        )}
        <div className="profile-links">
          {profile.resumeUrl && (
            <a
              className="btn btn-primary"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume"
            >
              View Resume
            </a>
          )}
          <a
            className="btn btn-ghost"
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="subsection">
        <p className="summary">{PROFESSIONAL_SUMMARY}</p>
      </div>

      <div className="subsection">
        <h3>Experience</h3>
        <ExperienceTimeline />
      </div>

      <div className="subsection">
        <h3>Skills</h3>
        <div className="chip-grid">
          {skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Education</h3>
        {education.map((item) => (
          <div key={item.id} className="timeline-item" style={{ paddingBottom: 16 }}>
            <h4>{item.institution}</h4>
            <div className="timeline-meta">
              {item.credential}
              {item.field ? ` — ${item.field}` : ''} · {item.startYear} – {item.endYear}
            </div>
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>

      <div className="subsection">
        <h3>Volunteering &amp; Public Events</h3>
        {publicEvents.map((event) => (
          <div key={event.id} className="timeline-item" style={{ paddingBottom: 16 }}>
            <h4>{event.title}</h4>
            <div className="timeline-meta">
              {event.role} · {event.dateLabel}
            </div>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      <div className="subsection">
        <h3>Technical Stack</h3>
        <TechStackGrid />
      </div>

      <div className="subsection">
        <h3>Contact</h3>
        <ContactForm sourceSection="Work section" />
      </div>
    </section>
  );
}
