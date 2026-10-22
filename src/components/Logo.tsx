import { useId } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showText?: boolean;
}

/** Compact, custom Silopi Dijital brand mark. Kept as SVG for sharp rendering at any size. */
export function Logo({ className = '', variant = 'dark', showText = true }: LogoProps) {
  const textColor = variant === 'light' ? '#F8FAFC' : '#0F172A';
  const subtitleColor = variant === 'light' ? '#94A3B8' : '#64748B';
  const gradientId = `sd-mark-gradient-${useId().replace(/:/g, '')}`;

  return (
    <svg
      className={className}
      viewBox={showText ? '0 0 248 54' : '0 0 48 48'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Silopi Dijital"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="2" x2="43" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="15" fill={variant === 'light' ? '#172554' : '#0F172A'} />
      <path d="M15 15.5C15 12.9 17.1 11 20 11H31V17H21.5V20.5H27.7C31.7 20.5 34 23.1 34 27C34 31.6 30.6 35 25.7 35H15V29H25.4C27 29 28 28.3 28 27C28 25.8 27.2 25.2 25.7 25.2H21.2C17.3 25.2 15 22.7 15 19.2V15.5Z" fill={`url(#${gradientId})`} />
      <path d="M35.5 10.5L39 14L35.5 17.5L32 14L35.5 10.5Z" fill="#22D3EE" />
      {showText && (
        <>
          <text x="60" y="27" fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontSize="22" fontWeight="800" letterSpacing="-0.8" fill={textColor}>Silopi</text>
          <text x="119" y="27" fontFamily="Plus Jakarta Sans, Inter, sans-serif" fontSize="22" fontWeight="800" letterSpacing="-0.8" fill="#3B82F6">Dijital</text>
          <rect x="60" y="35" width="20" height="2.5" rx="1.25" fill="#22D3EE" />
          <text x="85" y="39" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="1.5" fill={subtitleColor}>WEB TASARIM STÜDYOSU</text>
        </>
      )}
    </svg>
  );
}
