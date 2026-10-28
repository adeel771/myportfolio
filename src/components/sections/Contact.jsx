import { useState, useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import { SectionHeader } from '../common/Section';
import { Button } from '../common/Button';
import { personal } from '../../data/content';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrppkzzj';

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const emailConfigured = personal.email && !personal.email.includes('example');
  const mailtoHref = emailConfigured
    ? `mailto:${personal.email}`
    : '#';

  useGSAP(
    ({ gsap: g }) => {
      const targets = ref.current?.querySelectorAll('.reveal, .reveal--stagger');
      if (!targets || !targets.length) return;

      g.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(formRef.current),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = result.errors?.map((item) => item.message).join(' ');
        throw new Error(message || 'Unable to send your message. Please try again.');
      }

      formRef.current.reset();
      setStatus('sent');
    } catch (submissionError) {
      setError(
        submissionError instanceof TypeError
          ? 'Unable to send your message. Check your connection and try again.'
          : submissionError.message || 'Unable to send your message. Please try again.'
      );
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="section">
      <div className="container">
        <SectionHeader
          kicker="Get in touch"
          heading="Let&rsquo;s build something."
          description="Open to full-time roles, freelance projects, and collaborations."
        />

        <div className="contact__grid">
          <div className="card reveal--stagger contact__form">
            {status === 'sent' ? (
              <div className="form__sent" role="status" aria-live="polite">
                <strong>Thanks!</strong> Your message has been sent. I&rsquo;ll be in touch soon.
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New portfolio contact form message" />
                <div className="form__group">
                  <label className="form__label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form__input"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form__input"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form__input"
                    rows={5}
                    placeholder="What are you working on?"
                    required
                  />
                </div>
                {error && (
                  <p className="form__error" role="alert" aria-live="assertive">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  arrow
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

          <div className="reveal--stagger contact__info">
            <div className="contact__item">
              <span className="contact__label">Email</span>
              <a
                href={mailtoHref}
                className="contact__value"
                title={emailConfigured ? `Send email to ${personal.email}` : 'Email not configured'}
              >
                {emailConfigured ? personal.email : '[not configured]'}
              </a>
            </div>
            <div className="contact__item">
              <span className="contact__label">Location</span>
              <span className="contact__value">{personal.location}</span>
            </div>
            <div className="contact__item">
              <span className="contact__label">Focus</span>
              <span className="contact__value">{personal.focus}</span>
            </div>
            <div className="contact__item contact__social">
              <span className="contact__label">Socials</span>
              <div className="contact__links">
                {personal.socials.map((social) => {
                  const isPlaceholder = social.placeholder || !social.url || social.url === '#' || social.url.startsWith('[');
                  return (
                    <a
                      key={social.name}
                      href={isPlaceholder ? '#' : social.url}
                      target={!isPlaceholder && /^https?:\/\//i.test(social.url) ? '_blank' : undefined}
                      rel={!isPlaceholder && /^https?:\/\//i.test(social.url) ? 'noopener noreferrer' : undefined}
                      className="contact__link"
                      title={isPlaceholder ? 'Not configured yet' : undefined}
                      aria-label={social.name}
                      onClick={(e) => {
                        if (isPlaceholder) e.preventDefault();
                      }}
                    >
                      {social.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
