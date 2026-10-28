interface ProjectThumbnailProps {
  variant: 'taksi' | 'vip' | 'restoran' | 'default';
  device?: 'laptop' | 'phone' | 'card';
  className?: string;
}

export function ProjectThumbnail({
  variant,
  device = 'card',
  className = '',
}: ProjectThumbnailProps) {
  const themes: Record<string, { bg: string; primary: string; text: string; accent: string }> = {
    taksi: { bg: '#101828', primary: '#2563EB', text: '#fff', accent: '#F59E0B' },
    vip: { bg: '#0A0F1C', primary: '#C4CCD8', text: '#fff', accent: '#2563EB' },
    restoran: { bg: '#1A120B', primary: '#D97706', text: '#fff', accent: '#F59E0B' },
    default: { bg: '#F5F7FA', primary: '#2563EB', text: '#101828', accent: '#2563EB' },
  };

  const t = themes[variant];

  const isSmall = device === 'phone' || device === 'card';

  const headerHeight = isSmall ? '6%' : '7%';
  const titleSize = isSmall ? '8px' : '14px';
  const textSize = isSmall ? '5px' : '10px';
  const cardHeight = isSmall ? '18%' : '22%';
  const pillWidth = isSmall ? '40%' : '50%';

  return (
    <div
      className={`w-full h-full flex flex-col ${className}`}
      style={{ backgroundColor: t.bg }}
    >
      <div
        className="flex items-center px-[4%] gap-[3%]"
        style={{ height: headerHeight, borderBottom: `1px solid ${t.primary}22` }}
      >
        <div
          style={{
            width: isSmall ? '12px' : '20px',
            height: isSmall ? '12px' : '20px',
            borderRadius: '4px',
            backgroundColor: t.primary,
          }}
        />
        <div
          style={{
            fontSize: titleSize,
            color: t.text,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {variant === 'taksi' && 'Silopi Taksi'}
          {variant === 'vip' && 'VIP Araç'}
          {variant === 'restoran' && 'Restoran'}
          {variant === 'default' && 'Web Sitesi'}
        </div>
        {!isSmall && (
          <div className="flex gap-3 ml-auto">
            <div style={{ width: 30, height: 4, backgroundColor: `${t.text}40`, borderRadius: 2 }} />
            <div style={{ width: 30, height: 4, backgroundColor: `${t.text}40`, borderRadius: 2 }} />
            <div style={{ width: 30, height: 4, backgroundColor: `${t.text}40`, borderRadius: 2 }} />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-[6%] gap-[4%]">
        <div
          style={{
            fontSize: isSmall ? '10px' : '24px',
            color: t.text,
            fontWeight: 800,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {variant === 'taksi' && 'Hızlı & Güvenli Taksi'}
          {variant === 'vip' && 'VIP Transfer Hizmeti'}
          {variant === 'restoran' && 'Lezzetli Yemekler'}
          {variant === 'default' && 'İşletmenizi Dijitale Taşıyın'}
        </div>
        <div
          style={{
            width: pillWidth,
            height: isSmall ? '10px' : '32px',
            backgroundColor: t.primary,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: textSize,
            color: t.bg === '#F5F7FA' ? '#fff' : t.text,
            fontWeight: 600,
          }}
        >
          {variant === 'taksi' && 'Ara'}
          {variant === 'vip' && 'Rezerve Et'}
          {variant === 'restoran' && 'Menüyü Gör'}
          {variant === 'default' && 'İncele'}
        </div>
      </div>

      <div className="px-[5%] pb-[5%] space-y-[3%]">
        <div
          style={{
            height: cardHeight,
            backgroundColor: `${t.primary}15`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4%',
            gap: '3%',
          }}
        >
          <div
            style={{
              width: isSmall ? '16px' : '32px',
              height: isSmall ? '16px' : '32px',
              borderRadius: '6px',
              backgroundColor: t.primary,
              flexShrink: 0,
            }}
          />
          <div className="flex flex-col gap-1 flex-1">
            <div
              style={{
                width: '70%',
                height: isSmall ? '4px' : '8px',
                backgroundColor: `${t.text}30`,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: '50%',
                height: isSmall ? '3px' : '6px',
                backgroundColor: `${t.text}20`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
