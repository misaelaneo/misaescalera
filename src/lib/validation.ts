export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!fields.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) {
    errors.message = 'Please enter a message.';
  }
  return errors;
}
