// Content models from PRD §15

export type Profile = {
  name: string;
  titles: string[];
  location?: string;
  email: string;
  resumeUrl: string;
  portraitUrl: string;
  linkedInUrl: string;
  socialLinks: SocialLink[];
};

export type SocialLink = {
  label: string;
  url: string;
  icon: string;
};

export type CareerUpdate = {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  linkLabel?: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  description: string;
  achievements?: string[];
  logoUrl?: string;
  companyUrl?: string;
};

export type EducationItem = {
  id: string;
  institution: string;
  credential: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
};

export type PublicEvent = {
  id: string;
  title: string;
  organization?: string;
  role: string;
  dateLabel: string;
  description: string;
  linkUrl?: string;
  imageUrl?: string;
};

export type TechStackItem = {
  id: string;
  name: string;
  category: 'Design' | 'Development' | 'Productivity' | 'Analytics' | 'AI' | 'Collaboration' | 'Other';
  icon?: string;
};

export type MediaType =
  | 'Book'
  | 'Movie'
  | 'Show'
  | 'Podcast'
  | 'Essay'
  | 'Article'
  | 'Poem'
  | 'Quote'
  | 'Album'
  | 'Game'
  | 'Course'
  | 'Other';

export type MediaJournalEntry = {
  id: string;
  title: string;
  type: MediaType;
  creator?: string;
  year: number;
  dateCompleted?: string;
  imageUrl?: string;
  summary: string;
  review?: string;
  keyTakeaway?: string;
  favoriteQuote?: string;
  tags?: string[];
  rating?: number;
  recommended?: boolean;
  favorite?: boolean;
  externalUrl?: string;
  featured?: boolean;
};

export type AboutContent = {
  intro: string;
  photoUrl: string;
  hobbies: string[];
  languages: LanguageItem[];
};

export type LanguageItem = {
  language: string;
  proficiency: string;
};

export type ThingIUse = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  externalUrl?: string;
};
