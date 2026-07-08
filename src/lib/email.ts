import emailjs from '@emailjs/browser';
import { profile } from '../data/profile';

// EmailJS decision (PRD §11): client-side sending via public key keeps the
// site fully static (GitHub Pages). Free tier: 200 emails/mo — revisit
// Resend + serverless hosting if usage grows past that.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export const CONTACT_EMAIL = profile.email;

export function isEmailConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  sourceSection: string;
};

export async function sendContactEmail(input: ContactMessage): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Email service is not configured.');
  }
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: input.name,
      reply_to: input.email,
      message: input.message,
      source_section: input.sourceSection,
      submitted_at: new Date().toLocaleString(),
    },
    { publicKey: PUBLIC_KEY },
  );
}
