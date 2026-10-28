import { Link } from 'react-router-dom';
import {
  Smartphone,
  Settings,
  MessageSquareText,
  Layers,
  LifeBuoy,
  ArrowRight,
  Phone,
  Palette,
  Code2,
  CheckCircle2,
  Package,
  HelpCircle,
  MapPin,
  Globe2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { ButtonLink } from '@/components/Button';
import { services } from '@/data/services';
import { faqItems } from '@/data/faq';
import { packages } from '@/data/packages';
import { siteConfig, getWhatsAppLink } from '@/config/site';
import { useProjects } from '@/hooks/useProjects';

const advantages = [
  {
    icon: Smartphone,
    title: 'Mobil Uyumlu Tasarım',
    description:
      'Tüm siteler telefon, tablet ve masaüstünde kusursuz çalışacak şekilde tasarlanır.',
  },
  {
    icon: Settings,
    title: 'İşletmeye Özel Çalışma',
    description:
      'Tasarım, içerik ve özellikleri işletmenizin ihtiyacına göre özelleştiririz.',
  },
  {
    icon: MessageSquareText,
    title: 'Kolay İletişim',
    description:
      'WhatsApp ve telefon entegrasyonu ile müşterilerinize en hızlı yoldan ulaşın.',
  },
  {
    icon: Layers,
    title: 'İhtiyaca Göre Kapsam',
    description:
      'Tek sayfalık tanıtım sitesi veya çok sayfalı kurumsal site — karar sizin.',
  },
  {
    icon: LifeBuoy,
    title: 'Teslim Sonrası Destek',
    description:
      'Sitenizi teslim aldıktan sonra nasıl yöneteceğiniz konusunda destek sağlıyoruz.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'İhtiyaçları Konuşalım',
    description:
      'İşletmenizi, beklentilerinizi ve ihtiyaçlarınızı dinleriz. Hangi sayfalar gerekli, hangi işlevler önemli birlikte belirleriz.',
    icon: Phone,
  },
  {
    number: '02',
    title: 'Tasarımı Planlayalım',
    description:
      'Renk, tipografi ve sayfa yapısı planını oluştururuz. İşletmenize uygun görsel dili birlikte netleştiririz.',
    icon: Palette,
  },
  {
    number: '03',
    title: 'Siteyi Geliştirelim',
    description:
      'Tasarımı koda döker, mobil uyumlu hale getirir ve içeriği yerleştiririz. Süreç boyunca sizden geri bildirim alırız.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Kontrol Edip Teslim Edelim',
    description:
      'Siteyi tüm cihazlarda test eder, son düzenlemeleri yapar ve yayınlanmaya hazır şekilde teslim ederiz.',
    icon: CheckCircle2,
  },
];

export function HomePage() {
  useSEO({
    title: 'Silopi Dijital | Silopi ve Cizre Web Tasarım',
    description:
      "Silopi ve Cizre'deki işletmeler için modern, hızlı ve mobil uyumlu web siteleri tasarlıyoruz. Kurumsal siteler, restoran siteleri, taksi siteleri ve daha fazlası.",
    canonicalPath: '/',
  });

  const { projects: publicProjects } = useProjects();
  const featuredProjects = publicProjects.filter((project) => project.featured && project.published).slice(0, 2);
  const waLink = getWhatsAppLink(
    `Merhaba ${siteConfig.name}, web tasarım hizmeti hakkında bilgi almak istiyorum.`
  );

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#071225] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.13]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.35) 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full bg-blue-600/25 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />
                Silopi, Şırnak · Web tasarım
              </span>
              <h1 className="mt-7 max-w-2xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[4.2rem]">
                İyi bir işletme,
                <span className="mt-1 block bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-400 bg-clip-text text-transparent">iyi bir dijital</span>
                <span className="block">ilk izlenimi hak eder.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Silopi ve Cizre'deki işletmeler için modern, mobil uyumlu ve amaca yönelik web siteleri tasarlıyorum. İlk fikirden yayına kadar, anlaşılır iletişim ve net bir süreç.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/iletisim" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-400">
                  Projemi konuşalım <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link to="/projeler" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/[0.09]">
                  Projeleri incele <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-semibold text-slate-300 sm:text-sm">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Silopi, Şırnak</span>
                <span className="inline-flex items-center gap-2"><Smartphone className="h-4 w-4 text-cyan-300" /> Mobil öncelikli</span>
                <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-300" /> İşletmeye özel</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 to-cyan-300/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#0d1a31] p-2 shadow-[0_35px_100px_-35px_rgba(0,0,0,.8)] sm:p-3">
                <div className="flex h-10 items-center gap-2 rounded-t-2xl border-b border-white/10 px-3 sm:px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 flex h-6 min-w-0 flex-1 items-center rounded-md border border-white/10 bg-white/[0.04] px-3 text-[10px] text-slate-400">silopidijital.vercel.app</div>
                  <Globe2 className="h-4 w-4 text-slate-400" />
                </div>
                <div className="overflow-hidden rounded-b-2xl bg-white p-2 sm:p-3">
                  <div className="relative min-h-[270px] overflow-hidden rounded-xl bg-[#101828] sm:min-h-[340px]">
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 78% 18%, #38BDF8 0, transparent 34%), radial-gradient(circle at 15% 90%, #2563EB 0, transparent 38%)' }} />
                    <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7 sm:py-5"><span className="text-[11px] font-extrabold tracking-wide text-white">İŞLETMENİZ<span className="text-blue-300">.COM</span></span><div className="hidden gap-3 sm:flex"><span className="h-1.5 w-10 rounded-full bg-white/50"/><span className="h-1.5 w-10 rounded-full bg-white/20"/><span className="h-1.5 w-10 rounded-full bg-white/20"/></div><span className="rounded-lg bg-blue-500 px-3 py-2 text-[10px] font-bold text-white">İletişim</span></div>
                    <div className="relative grid gap-5 px-5 py-8 sm:grid-cols-[1fr_0.8fr] sm:items-center sm:px-7 sm:py-10"><div><span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">DİJİTALDE YENİ BİR BAŞLANGIÇ</span><h3 className="mt-3 max-w-[250px] font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl">Markanızı daha iyi anlatın.</h3><p className="mt-3 max-w-[250px] text-[10px] leading-5 text-slate-300 sm:text-xs">Modern görünüm. Kolay iletişim. Mobil uyumlu deneyim.</p><span className="mt-5 inline-flex rounded-lg bg-white px-3 py-2 text-[10px] font-extrabold text-slate-900">Projeyi keşfet <ArrowRight className="ml-2 h-3 w-3"/></span></div><div className="relative hidden h-40 rounded-2xl border border-white/15 bg-white/[0.07] p-3 sm:block"><div className="flex h-full flex-col justify-between rounded-xl bg-gradient-to-br from-blue-500/40 to-cyan-300/10 p-4"><div className="flex items-center gap-2"><span className="h-8 w-8 rounded-lg bg-white/20"/><div><span className="block h-2 w-16 rounded-full bg-white/70"/><span className="mt-1.5 block h-1.5 w-10 rounded-full bg-white/35"/></div></div><div className="grid grid-cols-2 gap-2"><span className="h-10 rounded-lg bg-white/15"/><span className="h-10 rounded-lg bg-white/10"/></div></div><div className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#071225] text-cyan-300 shadow-xl"><Code2 className="h-6 w-6"/></div></div></div>
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-200 bg-slate-50 p-3 sm:p-4">{['Mobil uyumlu', 'Hızlı erişim', 'Özgün tasarım'].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white px-2 py-3 text-center text-[9px] font-bold text-slate-600 sm:text-[10px]">{item}</div>)}</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#10213f]/95 p-4 shadow-2xl backdrop-blur sm:flex lg:-left-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300"><CheckCircle2 className="h-5 w-5"/></span><span><b className="block text-sm text-white">Her ekranda uyumlu</b><small className="mt-1 block text-[11px] text-slate-400">Telefon · Tablet · Bilgisayar</small></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Yaklaşımımız"
            title="İşletmenize değer katan çalışma prensipleri"
            description="Her projede önemsediğimiz şey; işletmenizi doğru yansıtan, mobil cihazlarda sorunsuz çalışan ve ziyaretçilerin ihtiyacını karşılayan siteler üretmek."
            center
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {advantages.map((adv, i) => (
              <FadeIn key={adv.title} delay={i * 80}>
                <div className="text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                    <adv.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-neutral-900 mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{adv.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Hizmetler"
              title="İşletmenize uygun web çözümleri"
              description="Kurumsal sitelerden restoran menülerine, taksi sitelerinden bakım hizmetlerine kadar geniş bir yelpazede hizmet sunuyoruz."
            />
            <Link
              to="/hizmetler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:gap-3 transition-all whitespace-nowrap flex-shrink-0"
            >
              Tüm Hizmetler
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.id} delay={i * 80}>
                <ServiceCard service={service} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Portföy"
              title="Öne çıkan projeler"
              description="Tamamladığımız ve yayında olan projelerden bir seçki. Tüm projeleri görmek için portföy sayfasını inceleyin."
            />
            <Link
              to="/projeler"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:gap-3 transition-all whitespace-nowrap flex-shrink-0"
            >
              Tüm Projeler
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 100}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
          {featuredProjects.length === 0 && (
            <p className="text-center text-neutral-400 py-12">Öne çıkan proje bulunmamaktadır.</p>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-section bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Çalışma Süreci"
            title="Projeleriniz nasıl ilerliyor?"
            description="İlk görüşmeden teslime kadar süreci açık ve anlaşılır tutuyoruz. Her aşamada sizinle iletişimde kalıyoruz."
            center
            className="[&_h2]:text-white [&_p]:text-neutral-300"
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 100}>
                <div className="relative bg-primary-800/50 border border-primary-700 rounded-2xl p-6 h-full">
                  <span className="text-4xl font-heading font-bold text-primary-600/60 mb-3 block">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-primary-300" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Paketler"
            title="İhtiyacınıza uygun çalışma kapsamı"
            description="Üç farklı kapsam sunuyoruz. Nihai fiyat, projenin kapsamına göre birlikte belirlenir — sabit fiyat uydurmuyoruz."
            center
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.id} delay={i * 100}>
                <div
                  className={`relative h-full rounded-2xl p-7 border transition-all ${
                    pkg.highlight
                      ? 'border-primary-500 bg-white shadow-card-hover lg:scale-105'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      En Popüler
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                    <Package className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-5">
                    {pkg.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-600 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.note && (
                    <p className="text-xs text-neutral-400 italic mb-4">{pkg.note}</p>
                  )}
                  <Link
                    to="/iletisim"
                    className={`block w-full text-center font-semibold rounded-xl px-6 py-3 text-sm transition-colors ${
                      pkg.highlight
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'border-2 border-neutral-200 text-neutral-700 hover:border-primary-300 hover:text-primary-500'
                    }`}
                  >
                    Teklif Al
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-neutral-400">
            Nihai fiyat, proje kapsamının birlikte netleştirilmesiyle belirlenir. Yukarıdaki paketler
            çalışma kapsamını ifade eder, sabit fiyat içermez.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="SSS"
            title="Sık sorulan sorular"
            description="Web sitesi süreci hakkında en çok merak edilen sorular ve dürüst cevaplar."
            center
          />
          <div className="mt-10">
            <FAQ items={faqItems} />
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-neutral-400">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Başka sorunuz mu var?</span>
            </div>
            <div className="mt-4">
              {waLink ? (
                <ButtonLink
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                >
                  WhatsApp'tan Sorun
                </ButtonLink>
              ) : (
                <Link
                  to="/iletisim"
                  className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl border-2 border-primary-500 text-primary-500 px-6 py-3 text-base hover:bg-primary-50 transition-colors"
                >
                  İletişime Geçin
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
