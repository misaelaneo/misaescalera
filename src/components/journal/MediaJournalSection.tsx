import { useMemo, useState } from 'react';
import { featuredQuote, mediaJournal } from '../../data/mediaJournal';
import type { MediaJournalEntry } from '../../types';
import { MediaCard } from './MediaCard';

// MVP filters per PRD FR3.3
const FILTERS = ['All', 'Books', 'Movies', 'Shows', 'Podcasts', 'Favorites'] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_PREDICATES: Record<Filter, (entry: MediaJournalEntry) => boolean> = {
  All: () => true,
  Books: (e) => e.type === 'Book',
  Movies: (e) => e.type === 'Movie',
  Shows: (e) => e.type === 'Show',
  Podcasts: (e) => e.type === 'Podcast',
  Favorites: (e) => Boolean(e.favorite),
};

export function MediaJournalSection() {
  const [filter, setFilter] = useState<Filter>('All');

  const byYear = useMemo(() => {
    const filtered = mediaJournal.filter(FILTER_PREDICATES[filter]);
    const groups = new Map<number, MediaJournalEntry[]>();
    for (const entry of filtered) {
      const list = groups.get(entry.year) ?? [];
      list.push(entry);
      groups.set(entry.year, list);
    }
    return [...groups.entries()].sort(([a], [b]) => b - a);
  }, [filter]);

  return (
    <section id="journal" className="section">
      <h2 className="section-title">Media Journal</h2>
      <p className="section-subtitle">
        A living archive of what I’m reading, watching, listening to, and thinking about.
      </p>

      <blockquote className="journal-quote glass">
        “{featuredQuote.text}”
        <footer>— {featuredQuote.attribution}</footer>
      </blockquote>

      <div className="filters" role="group" aria-label="Filter media entries">
        {FILTERS.map((f) => (
          <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {byYear.length === 0 && <p className="section-subtitle">No entries for this filter yet.</p>}

      {byYear.map(([year, entries]) => (
        <div key={year}>
          <h3 className="year-heading">{year}</h3>
          <div className="media-grid">
            {entries.map((entry) => (
              <MediaCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
