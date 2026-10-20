import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Send, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '@/config/site';
import { services } from '@/data/services';

interface FormErrors {
  name?: string;
  service?: string;
  description?: string;
  kvkk?: string;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    service: '',
    phone: '',
    budget: '',
    description: '',
    kvkk: false,
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Ad soyad zorunludur.';
    if (!formData.service) newErrors.service = 'Lütfen bir hizmet seçin.';
    if (!formData.description.trim()) newErrors.description = 'Proje açıklaması zorunludur.';
    if (!formData.kvkk) newErrors.kvkk = 'KVKK bilgilendirmesini okuduğunuzun onayı zorunludur.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const waLink = getWhatsAppLink(
      `Merhaba ${siteConfig.name}, web tasarım teklifi almak istiyorum.\n\n` +
        `Ad Soyad: ${formData.name}\n` +
        (formData.business ? `İşletme: ${formData.business}\n` : '') +
        `Hizmet: ${formData.service}\n` +
        (formData.phone ? `Telefon: ${formData.phone}\n` : '') +
        (formData.budget ? `Bütçe: ${formData.budget}\n` : '') +
        `Açıklama: ${formData.description}`
    );

    if (waLink) {
      setSubmitted(true);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } else {
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    const waConfigured = !!siteConfig.whatsappNumber;
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
            waConfigured ? 'bg-success-500' : 'bg-warning-500'
          }`}
        >
          {waConfigured ? (
            <CheckCircle2 className="w-7 h-7 text-white" />
          ) : (
            <Info className="w-7 h-7 text-white" />
          )}
        </div>
        {waConfigured ? (
          <>
            <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
              Teklif talebiniz hazırlanıyor
            </h3>
            <p className="text-neutral-500 leading-relaxed mb-6">
              Bilgileriniz WhatsApp mesajına dönüştürüldü. Açılan pencereden mesajınızı
              göndererek teklif sürecini başlatabilirsiniz. Mesaj siz gönderene kadar
              tarafımıza iletilmez.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-heading text-xl font-bold text-neutral-900 mb-2">
              Form dolduruldu ancak iletilmedi
            </h3>
            <p className="text-neutral-500 leading-relaxed mb-6">
              Form bilgileriniz hiçbir sunucuya gönderilmedi ve hiçbir yerde kaydedilmedi.
              WhatsApp numarası yapılandırılmadığından mesajınız iletilemedi. İletişim
              bilgileri güncellenene kadar lütfen bizimle doğrudan iletişime geçiniz.
            </p>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              business: '',
              service: '',
              phone: '',
              budget: '',
              description: '',
              kvkk: false,
            });
          }}
          className="inline-flex items-center justify-center font-semibold rounded-xl border-2 border-neutral-200 text-neutral-700 px-6 py-3 text-sm hover:bg-neutral-50 transition-colors"
        >
          Yeni talep oluştur
        </button>
      </div>
    );
  }

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border ${
      hasError ? 'border-error-500' : 'border-neutral-200'
    } bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 space-y-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          Ad Soyad <span className="text-error-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass(errors.name)}
          placeholder="Adınız ve soyadınız"
          aria-required="true"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-error-500 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="business" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          İşletme Adı
        </label>
        <input
          type="text"
          id="business"
          name="business"
          value={formData.business}
          onChange={handleChange}
          className={inputClass()}
          placeholder="İşletme adınız (isteğe bağlı)"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          İstenen Hizmet <span className="text-error-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={inputClass(errors.service)}
          aria-required="true"
          aria-invalid={!!errors.service}
        >
          <option value="">Bir hizmet seçin</option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Diğer">Diğer / Emin değilim</option>
        </select>
        {errors.service && (
          <p className="mt-1.5 text-sm text-error-500 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            {errors.service}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass()}
            placeholder="Telefon numaranız (isteğe bağlı)"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Tahmini Bütçe
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputClass()}
            placeholder="Tahmini bütçe (isteğe bağlı)"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          Proje Açıklaması <span className="text-error-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={inputClass(errors.description)}
          placeholder="Projeniz hakkında bilgi verin: ne tür bir site istiyorsunuz, hangi sayfalar olmasını bekliyorsunuz, özel istekleriniz neler?"
          aria-required="true"
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="mt-1.5 text-sm text-error-500 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="kvkk"
            checked={formData.kvkk}
            onChange={handleChange}
            className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
            aria-required="true"
            aria-invalid={!!errors.kvkk}
          />
          <span className="text-sm text-neutral-600 leading-relaxed">
            <Link to="/kvkk-aydinlatma" target="_blank" className="text-primary-500 font-medium underline">
              KVKK aydınlatma metnini
            </Link>{' '}
            okudum, formdaki bilgilerimin teklif sürecinde kullanılmasını kabul ediyorum.{' '}
            <span className="text-error-500">*</span>
          </span>
        </label>
        {errors.kvkk && (
          <p className="mt-1.5 text-sm text-error-500 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            {errors.kvkk}
          </p>
        )}
      </div>

      {!siteConfig.whatsappNumber && (
        <div className="flex items-start gap-3 bg-warning-500/10 border border-warning-500/20 rounded-xl p-4">
          <Info className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-neutral-700 leading-relaxed">
            WhatsApp numarası henüz yapılandırılmamıştır. Form gönderildiğinde bilgileriniz
            hazırlanacak ancak iletilmesi için iletişim bilgilerinin güncellenmesi gerekecektir.
          </p>
        </div>
      )}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-primary-500 text-white px-6 py-4 text-base hover:bg-primary-600 active:bg-primary-700 transition-colors shadow-sm"
      >
        <Send className="w-5 h-5" />
        Teklif Talebi Gönder
      </button>

      <p className="text-xs text-neutral-400 text-center">
        Bu form verilerinizi sunucuya göndermez. Bilgileriniz WhatsApp mesajına dönüştürülerek
        sizin tarafınızdan gönderilir.
      </p>
    </form>
  );
}
