import type { Profile } from '../types';

// TODO(parked, PRD §22): finalize title carousel values and resume URL
export const profile: Profile = {
  name: 'Misael Escalera',
  titles: ['Product Manager', 'Builder', 'Strategist'],
  email: 'misaelaneo@gmail.com',
  resumeUrl: '',
  portraitUrl: '',
  linkedInUrl: 'https://linkedin.com/in/misaelescalera',
  socialLinks: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/misaelescalera', icon: 'linkedin' },
    { label: 'GitHub', url: 'https://github.com/misaelaneo', icon: 'github' },
  ],
};
