import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  LayoutTemplate,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/data/services';

const serviceIconMap: Record<string, LucideIcon> = {
  Building2,
  UtensilsCrossed,
  Car,
  LayoutTemplate,
  Wrench,
};

function getServiceIcon(iconName: string): LucideIcon {
  return serviceIconMap[iconName] ?? LayoutTemplate;
}

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className = '' }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <article
      className={`group bg-white border border-neutral-200 rounded-2xl p-6 lg:p-7 hover:border-primary-300 hover:shadow-card-hover transition-all duration-300 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">{service.title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed mb-4">{service.shortDescription}</p>
      <Link
        to={`/hizmetler#${service.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:gap-2.5 transition-all"
      >
        Detaylı Bilgi
        <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}

interface ServiceDetailCardProps {
  service: Service;
  index: number;
}

export function ServiceDetailCard({ service, index }: ServiceDetailCardProps) {
  const Icon = getServiceIcon(service.icon);
  const isReversed = index % 2 === 1;

  return (
    <article
      id={service.id}
      className="scroll-mt-24 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 lg:py-14 border-b border-neutral-100 last:border-0"
    >
      <div className={isReversed ? 'lg:order-2' : ''}>
        <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-primary-500" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-3">{service.title}</h3>
        <p className="text-neutral-500 leading-relaxed mb-5">{service.fullDescription}</p>
        <div className="bg-neutral-50 rounded-xl p-5 mb-5">
          <p className="text-sm font-semibold text-neutral-700 mb-1">Kime uygun?</p>
          <p className="text-sm text-neutral-500 leading-relaxed">{service.suitableFor}</p>
        </div>
        <Link
          to="/iletisim"
          className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-primary-500 text-white px-6 py-3 text-sm hover:bg-primary-600 transition-colors"
        >
          Bu hizmet için teklif al
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className={isReversed ? 'lg:order-1' : ''}>
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">
            Kapsam Dahil
          </h4>
          <ul className="space-y-3">
            {service.includedFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-success-500 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </span>
                <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
