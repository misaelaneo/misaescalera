import type { MediaJournalEntry } from '../types';

// TODO(content): replace sample entries with real media journal content (PRD §22).
// TODO(parked, PRD §22): replace featuredQuote with the real favorite quote or poem excerpt.
export const featuredQuote = {
  text: 'Placeholder quote — swap this with a favorite line, poem excerpt, or reflection.',
  attribution: 'Attribution TBD',
};

export const mediaJournal: MediaJournalEntry[] = [
  {
    id: 'creative-act',
    title: 'The Creative Act',
    type: 'Book',
    creator: 'Rick Rubin',
    year: 2025,
    dateCompleted: 'March 2025',
    summary: 'A calming and generous book about creative attention.',
    review:
      'A thoughtful meditation on creativity, attention, and the discipline of noticing. (Sample entry — replace with your own thoughts.)',
    keyTakeaway: 'Creativity is a practice of paying attention, not a talent you either have or lack.',
    tags: ['Creativity', 'Art', 'Process'],
    rating: 4.5,
    recommended: true,
  },
  {
    id: 'aftersun',
    title: 'Aftersun',
    type: 'Movie',
    creator: 'Charlotte Wells',
    year: 2024,
    summary: 'Quiet, devastating, and emotionally precise.',
    review:
      'One of the strongest films about memory. (Sample entry — replace with your own thoughts.)',
    recommended: true,
    favorite: true,
  },
  {
    id: 'sample-podcast',
    title: 'Sample Podcast',
    type: 'Podcast',
    creator: 'Host Name',
    year: 2026,
    summary: 'Placeholder — replace with a real podcast entry.',
  },
  {
    id: 'sample-show',
    title: 'Sample Show',
    type: 'Show',
    creator: 'Creator Name',
    year: 2026,
    summary: 'Placeholder — replace with a real show entry.',
  },
];
