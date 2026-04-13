import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, CalendarDays } from 'lucide-react';

interface NewsData {
  active: boolean;
  title?: string;
  text: string;
  date?: string;
}

export function NewsPopup() {
  const [news, setNews] = useState<NewsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/news.json?t=${new Date().getTime()}`);
        if (!response.ok) return;
        
        // Guard against HTML responses (World4You redirect)
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
          return;
        }
        
        const raw = await response.json();
        const data: NewsData = Array.isArray(raw) ? raw[0] : raw;
        if (!data) return;
        
        // Normalize ISO date strings to dd.MM.yyyy
        if (data.date && data.date.includes('T')) {
          const d = new Date(data.date);
          data.date = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
        }
        
        if (data.active && data.text) {
          setNews(data);
          setIsVisible(true);
        }
      } catch {
        // Silently fail – no news is fine, the popup just stays hidden
      }
    };
    
    fetchNews();
  }, []);

  useGSAP(() => {
    if (isVisible && popupRef.current) {
        // Subtle slide up and fade in
        gsap.fromTo(popupRef.current, 
            { y: 30, autoAlpha: 0 }, 
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 1.5 } 
        );
    }
  }, [isVisible]);

  const handleClose = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        y: 15,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible || !news) return null;

  return (
    <div 
      ref={popupRef}
      className="fixed z-[100] bg-[var(--color-primary)] text-[var(--color-parchment)] 
                 p-6 sm:p-8 rounded-sm shadow-2xl border border-[var(--color-parchment)]/30
                 bottom-24 right-4 left-4 md:bottom-8 md:right-8 md:left-auto md:w-[400px]
                 invisible"
    >
      <button 
        onClick={handleClose}
        className="absolute top-3 right-3 text-[var(--color-parchment)]/60 hover:text-[var(--color-parchment)] transition-colors p-1"
        aria-label="Schließen"
      >
        <X size={20} />
      </button>

      <div className="text-center mb-3">
        <h3 className="font-heading text-sm tracking-widest uppercase text-[#B08D57] m-0">
          {news.title || 'Novità'}
        </h3>
      </div>
      
      <p className="font-heading text-xl leading-relaxed text-center m-0 mb-4">
        {news.text}
      </p>

      {news.date && (
        <div className="flex items-center justify-center gap-2 opacity-70 text-xs font-body uppercase tracking-wider">
          <CalendarDays size={14} />
          <span>{news.date}</span>
        </div>
      )}
    </div>
  );
}
