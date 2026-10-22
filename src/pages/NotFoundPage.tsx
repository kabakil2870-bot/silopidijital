import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

export function NotFoundPage() {
  useSEO({
    title: 'Sayfa Bulunamadı | Silopi Dijital',
    description: 'Aradığınız sayfa bulunamadı. Silopi Dijital ana sayfasına dönebilirsiniz.',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <span className="font-heading text-8xl sm:text-9xl font-bold text-primary-900 leading-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center font-heading text-8xl sm:text-9xl font-bold text-primary-500 leading-none opacity-20 blur-sm">
            404
          </span>
        </div>
        <h1 className="font-heading text-2xl font-bold text-neutral-900 mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-neutral-500 leading-relaxed mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Aşağıdaki
          bağlantılardan devam edebilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-primary-500 text-white px-6 py-3.5 text-base hover:bg-primary-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl border-2 border-neutral-200 text-neutral-700 px-6 py-3.5 text-base hover:border-primary-300 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Git
          </button>
        </div>
      </div>
    </div>
  );
}
