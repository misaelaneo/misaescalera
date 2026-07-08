import { about } from '../../data/about';
import { thingsIUse } from '../../data/thingsIUse';
import { ContactForm } from '../contact/ContactForm';

export function AboutSection() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About</h2>
      <p className="section-subtitle">A little more about who I am outside of work.</p>

      <div className="about-layout">
        {about.photoUrl ? (
          <img className="about-photo" src={about.photoUrl} alt="Misael Escalera" />
        ) : (
          <div className="about-photo-placeholder" aria-hidden="true">
            ME
          </div>
        )}
        <p className="about-intro">{about.intro}</p>
      </div>

      <div className="subsection">
        <h3>Outside of Work</h3>
        <div className="chip-grid">
          {about.hobbies.map((hobby) => (
            <span key={hobby} className="chip">
              {hobby}
            </span>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Languages</h3>
        <div className="chip-grid">
          {about.languages.map((item) => (
            <span key={item.language} className="chip">
              {item.language} — {item.proficiency}
            </span>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Things I Use</h3>
        <div className="tiles-grid">
          {thingsIUse.map((item) => (
            <div key={item.id} className="card tile">
              <span className="tile-category">{item.category}</span>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              {item.externalUrl && (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Get in Touch</h3>
        <ContactForm sourceSection="About section" />
      </div>
    </section>
  );
}
