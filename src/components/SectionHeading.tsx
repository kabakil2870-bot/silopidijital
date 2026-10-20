interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3 ${
            center ? 'mx-auto' : ''
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-neutral-500 text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
