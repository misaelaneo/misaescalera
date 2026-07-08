import { Modal } from '../ui/Modal';
import { ContactForm } from './ContactForm';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Get in Touch">
      <ContactForm sourceSection="Contact modal" />
    </Modal>
  );
}
