import { useMemo, useState } from 'react';
import { Camera } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { CTA } from '@/components/CTA';
import { useProjects } from '@/hooks/useProjects';

export function ProjectsPage() {
  useSEO({
    title: 'Projeler | Silopi Dijital',
    description: 'Silopi Dijital web tasarım portföyü. İşletmeler için hazırlanan web siteleri ve dijital projeler.',
    canonicalPath: '/projeler',
  });

  const { projects: allProjects, loading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const categories = useMemo(() => ['Tümü', ...new Set(allProjects.map((project) => project.category))], [allProjects]);
  const filteredProjects = useMemo(() => selectedCategory === 'Tümü' ? allProjects : allProjects.filter((project) => project.category === selectedCategory), [selectedCategory, allProjects]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#071225] py-16 text-white lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200"><Camera className="h-4 w-4"/> Portföyümüz</span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">İşlerimiz, <span className="text-blue-300">özenle tasarlandı.</span></h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Farklı sektörler için hazırladığımız web sitelerini incele. Proje ekranlarını görüntüleyebilir ve yayındaki siteleri ziyaret ederek ayrıntıları keşfedebilirsin.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-300"><span className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2">Mobil uyumlu tasarım</span><span className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2">Proje önizlemeleri</span><span className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2">Yerel işletmelerden başlayan yolculuk</span></div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Seçili çalışmalar</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Projeleri keşfet</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Her çalışma, işletmenin ihtiyaçlarına göre tasarlanan kullanıcı deneyimini ve dijital sunum yaklaşımımızı yansıtır.</p></div>

          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${selectedCategory === category ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10' : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700'}`}>{category}</button>
            ))}
          </div>

          {loading && allProjects.length === 0 ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{[0,1,2].map((item) => <div key={item} className="h-96 animate-pulse rounded-3xl bg-slate-100" />)}</div> : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => <FadeIn key={project.id} delay={index * 60}><ProjectCard project={project} /></FadeIn>)}
            </div>
          )}
          {filteredProjects.length === 0 && !loading && <div className="rounded-3xl border border-dashed border-slate-300 py-16 text-center"><p className="text-lg font-bold text-slate-700">Yeni çalışmalarımız yakında burada</p><p className="mt-2 text-sm text-slate-500">Portföyümüzü yeni projelerle düzenli olarak güncelliyoruz.</p></div>}
        </div>
      </section>
      <CTA title="Sıradaki proje seninki olsun" description="İşletmen için modern ve işlevsel bir web sitesi hazırlayalım." />
    </>
  );
}
