import { experience } from '../../data/experience';

export function ExperienceTimeline() {
  return (
    <div className="timeline">
      {experience.map((item) => (
        <div key={item.id} className="timeline-item">
          <h4>
            {item.companyUrl ? (
              <a href={item.companyUrl} target="_blank" rel="noopener noreferrer">
                {item.company}
              </a>
            ) : (
              item.company
            )}
          </h4>
          <div className="timeline-meta">
            {item.role} · {item.startDate} – {item.isCurrent ? 'Present' : item.endDate}
            {item.location ? ` · ${item.location}` : ''}
          </div>
          <p>{item.description}</p>
          {item.achievements && item.achievements.length > 0 && (
            <ul>
              {item.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
