import { careerUpdates } from '../../data/careerUpdates';

export function CareerFeed() {
  return (
    <div className="subsection">
      <h3>Recent Updates</h3>
      <div className="feed">
        {careerUpdates.map((update) => (
          <article key={update.id} className="card feed-item">
            <span className="feed-date">{update.dateLabel}</span>
            <h3>{update.title}</h3>
            <p>{update.description}</p>
            {update.linkUrl && (
              <a href={update.linkUrl} target="_blank" rel="noopener noreferrer">
                {update.linkLabel ?? 'Learn more'}
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
