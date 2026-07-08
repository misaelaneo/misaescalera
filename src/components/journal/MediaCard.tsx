import { useState } from 'react';
import type { MediaJournalEntry } from '../../types';

type MediaCardProps = {
  entry: MediaJournalEntry;
};

export function MediaCard({ entry }: MediaCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = Boolean(
    entry.review || entry.keyTakeaway || entry.favoriteQuote || entry.recommended !== undefined,
  );

  return (
    <article className="card media-card">
      <div className="media-card-header">
        <span className="media-type-badge">{entry.type}</span>
        {entry.favorite && <span className="favorite-badge">Favorite</span>}
      </div>
      {entry.imageUrl ? (
        <img src={entry.imageUrl} alt="" className="media-cover-placeholder" />
      ) : (
        <div className="media-cover-placeholder" aria-hidden="true">
          {entry.title[0]}
        </div>
      )}
      <h4>{entry.title}</h4>
      <div className="media-meta">
        {entry.creator && <>{entry.creator} · </>}
        {entry.year}
        {entry.rating !== undefined && <> · {entry.rating}/5</>}
      </div>
      <p className="media-note">{entry.summary}</p>

      {hasDetails && (
        <>
          <div style={{ marginTop: 12 }}>
            <button
              className="chip"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          </div>
          {expanded && (
            <div className="media-details">
              {entry.review && (
                <p>
                  <strong>My thoughts:</strong> {entry.review}
                </p>
              )}
              {entry.keyTakeaway && (
                <p>
                  <strong>Key takeaway:</strong> {entry.keyTakeaway}
                </p>
              )}
              {entry.favoriteQuote && (
                <p>
                  <strong>Favorite line:</strong> “{entry.favoriteQuote}”
                </p>
              )}
              {entry.recommended !== undefined && (
                <p>
                  <strong>Would I recommend it?</strong> {entry.recommended ? 'Yes' : 'No'}
                </p>
              )}
              {entry.tags && entry.tags.length > 0 && (
                <div className="chip-grid">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {entry.externalUrl && (
                <a href={entry.externalUrl} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}
