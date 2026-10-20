import { type ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.5s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
