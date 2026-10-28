import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '@/data/faq';

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export function FAQ({ items, className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-neutral-200 rounded-xl bg-white overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-neutral-900 text-base">{item.question}</span>
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                {isOpen ? (
                  <Minus className="w-4 h-4 text-primary-500" />
                ) : (
                  <Plus className="w-4 h-4 text-primary-500" />
                )}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-smooth"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-neutral-500 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
