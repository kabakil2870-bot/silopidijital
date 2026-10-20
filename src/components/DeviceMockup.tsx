import { type ReactNode } from 'react';

interface DeviceMockupProps {
  type: 'laptop' | 'phone';
  children: ReactNode;
  className?: string;
}

export function DeviceMockup({ type, children, className = '' }: DeviceMockupProps) {
  if (type === 'laptop') {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-neutral-900 rounded-t-2xl p-2 shadow-hero">
          <div className="bg-white rounded-lg overflow-hidden aspect-[16/10]">
            {children}
          </div>
        </div>
        <div className="bg-neutral-800 h-3 rounded-b-xl mx-0" />
        <div className="bg-neutral-700 h-1.5 w-24 mx-auto rounded-b-lg" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-neutral-900 rounded-[2rem] p-2 shadow-hero border border-neutral-700">
        <div className="bg-neutral-800 rounded-[1.6rem] p-1">
          <div className="bg-white rounded-[1.3rem] overflow-hidden aspect-[9/19] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-neutral-900 rounded-b-xl z-10" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
