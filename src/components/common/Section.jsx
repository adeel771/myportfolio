/**
 * Section wrapper: container, heading block, and GSAP reveal on enter.
 * Children should be a single section header + content grid.
 */
export function Section({ id, children, className }) {
  return (
    <section id={id} className={['section', className].filter(Boolean).join(' ')}>
      <div className="container">{children}</div>
    </section>
  );
}

/**
 * SectionHeader: kicker, heading, optional description. Centered.
 */
export function SectionHeader({ kicker, heading, description, className }) {
  return (
    <div className={['section-header', className].filter(Boolean).join(' ')}>
      {kicker && (
        <div className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          {kicker}
        </div>
      )}
      {heading && <h2>{heading}</h2>}
      {description && <p className="lead">{description}</p>}
    </div>
  );
}

/**
 * TextReveal: word/character reveal animation via GSAP when scrolled into view.
 * Wraps children so GSAP can animate opacity/translate of inner spans.
 */
export function TextReveal({ children, className, tag = 'span' }) {
  const Tag = tag;
  return (
    <Tag
      className={['reveal', className].filter(Boolean).join(' ')}
      style={{ display: 'inline-block', minHeight: '1em' }}
    >
      {children}
    </Tag>
  );
}
