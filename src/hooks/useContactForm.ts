import { useCallback, useRef, useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export type ContactStatus = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<ContactStatus>('idle');

  const isConfigured =
    EMAILJS_SERVICE_ID.trim().length > 0 &&
    EMAILJS_TEMPLATE_ID.trim().length > 0 &&
    EMAILJS_PUBLIC_KEY.trim().length > 0;

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!isConfigured) {
      setStatus('not-configured');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('sent');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  }, [isConfigured]);

  return { formRef, handleSubmit, status, isConfigured };
}
