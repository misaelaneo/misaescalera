import { useId, useState, type FormEvent } from 'react';
import { CONTACT_EMAIL, sendContactEmail } from '../../lib/email';
import { validateContactForm, type FieldErrors } from '../../lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type ContactFormProps = {
  sourceSection: string;
};

export function ContactForm({ sourceSection }: ContactFormProps) {
  const uid = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Bots that fill the hidden field get a silent "success"
    if (honeypot) {
      setStatus('success');
      return;
    }

    const fieldErrors = validateContactForm({ name, email, message });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('submitting');
    try {
      await sendContactEmail({ name, email, message, sourceSection });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="form-status success" role="status">
        Thanks — your message has been sent!
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor={`${uid}-name`}>Name</label>
        <input
          id={`${uid}-name`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          required
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor={`${uid}-email`}>Email</label>
        <input
          id={`${uid}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          required
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor={`${uid}-message`}>Message</label>
        <textarea
          id={`${uid}-message`}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          required
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <p className="form-status error" role="alert">
          Something went wrong sending your message. You can reach me directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}

      <div>
        <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  );
}
