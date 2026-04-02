import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { personal } from '../../data/personal';

// Replace with your EmailJS credentials
const EMAILJS_SERVICE  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EMAILJS_KEY      = 'YOUR_PUBLIC_KEY';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--outline-var)',
  padding: '0.875rem 0',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  color: 'var(--on-surface)',
  outline: 'none',
  transition: 'border-color var(--trans-base)',
};

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_KEY);
      setStatus('sent');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...INPUT_STYLE,
    borderBottomColor: focused === name ? 'var(--primary)' : 'var(--outline-var)',
  });

  return (
    <section
      id="contact"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem)',
        background: 'var(--bg)',
        borderRadius: '16px 16px 0 0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >

        {/* ── Left — headline + info ── */}
        <div>
          <div className="split-line-wrap" style={{ marginBottom: '1.25rem' }}>
            <span
              className="split-line"
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.68rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
              }}
            >
              Get in touch
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-headline)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
              lineHeight: 0.95,
              color: 'var(--on-surface)',
              marginBottom: '2.5rem',
            }}
          >
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: '80ms' }}>Let's work</span>
            </div>
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: '180ms' }}>
                <span style={{ color: 'var(--primary)' }}>together.</span>
              </span>
            </div>
          </h2>

          {/* Email direct */}
          <div className="fade-up" style={{ transitionDelay: '250ms', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </span>
            <a
              href={`mailto:${personal.hireEmail}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                color: 'var(--on-surface-var)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--outline-var)',
                paddingBottom: '2px',
                transition: 'color var(--trans-base), border-color var(--trans-base)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'var(--primary)';
                el.style.borderBottomColor = 'var(--primary)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'var(--on-surface-var)';
                el.style.borderBottomColor = 'var(--outline-var)';
              }}
            >
              {personal.hireEmail}
            </a>
          </div>

          {/* Social */}
          <div className="fade-up" style={{ transitionDelay: '350ms' }}>
            <span
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Socials
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {Object.entries(personal.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--on-surface-var)',
                    textDecoration: 'none',
                    textTransform: 'capitalize',
                    transition: 'color var(--trans-fast)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--on-surface-var)'; }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '1px',
                      background: 'currentColor',
                      display: 'block',
                      flexShrink: 0,
                    }}
                  />
                  {key}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — form ── */}
        <div className="fade-up" style={{ transitionDelay: '150ms' }}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {/* Name */}
            <div style={{ position: 'relative' }}>
              <label
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: focused === 'name' ? 'var(--primary)' : 'var(--outline)',
                  display: 'block',
                  marginBottom: '0.5rem',
                  transition: 'color var(--trans-base)',
                }}
              >
                Name
              </label>
              <input
                name="user_name"
                type="text"
                required
                placeholder="Your name"
                style={fieldStyle('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Email */}
            <div style={{ position: 'relative' }}>
              <label
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: focused === 'email' ? 'var(--primary)' : 'var(--outline)',
                  display: 'block',
                  marginBottom: '0.5rem',
                  transition: 'color var(--trans-base)',
                }}
              >
                Email
              </label>
              <input
                name="user_email"
                type="email"
                required
                placeholder="your@email.com"
                style={fieldStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Subject */}
            <div style={{ position: 'relative' }}>
              <label
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: focused === 'subject' ? 'var(--primary)' : 'var(--outline)',
                  display: 'block',
                  marginBottom: '0.5rem',
                  transition: 'color var(--trans-base)',
                }}
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                style={fieldStyle('subject')}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Message */}
            <div style={{ position: 'relative' }}>
              <label
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: focused === 'message' ? 'var(--primary)' : 'var(--outline)',
                  display: 'block',
                  marginBottom: '0.5rem',
                  transition: 'color var(--trans-base)',
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                style={{
                  ...fieldStyle('message'),
                  resize: 'none',
                  display: 'block',
                }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.875rem 2.5rem',
                  background: status === 'sending' ? 'var(--primary-dim)' : 'var(--primary)',
                  color: '#003010',
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all var(--trans-base)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
                onMouseEnter={e => {
                  if (status === 'sending') return;
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--primary-dim)';
                  el.style.boxShadow = '0 0 30px rgba(67,254,109,0.35)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'var(--primary)';
                  el.style.boxShadow = 'none';
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {status === 'sent' && (
                <span
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.7rem',
                    color: 'var(--primary)',
                    letterSpacing: '0.1em',
                  }}
                >
                  ✓ Message sent!
                </span>
              )}
              {status === 'error' && (
                <span
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.7rem',
                    color: 'var(--secondary-dim)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Something went wrong. Try again.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ── Footer line ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: 'clamp(2rem, 6vw, 6rem)',
          right: 'clamp(2rem, 6vw, 6rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--outline)',
          }}
        >
          © {new Date().getFullYear()} Anthony Avila
        </span>
        <span
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--outline)',
          }}
        >
          Built with Astro + Three.js
        </span>
      </div>
    </section>
  );
}

