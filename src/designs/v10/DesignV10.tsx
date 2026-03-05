import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, CalendarDays, ArrowRight, ChevronLeft, ChevronRight, X, Plus } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v10.css';
gsap.registerPlugin(ScrollTrigger);

import heroPlaceholder from '../../assets/placeholders/hero.jpg';
import foodPlaceholder from '../../assets/placeholders/food.jpg';
import locationPlaceholder from '../../assets/placeholders/location.jpg';
import gallery1 from '../../assets/placeholders/gallery-1.jpg';
import gallery2 from '../../assets/placeholders/gallery-2.jpg';
import gallery3 from '../../assets/placeholders/gallery-3.jpg';
import gallery4 from '../../assets/placeholders/gallery-4.jpg';

const TEAM = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.19%20(11).jpeg/picture-2600?_=190c56695e8';
const MAPS = 'https://www.google.com/maps?daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

function useReveal(ref: React.RefObject<HTMLElement | null>) {
    useGSAP(() => { if (!ref.current) return; ref.current.querySelectorAll('.v10-reveal').forEach(el => { gsap.fromTo(el, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }); }); }, { scope: ref });
}

// ============================================
// HEADER
// ============================================
function Header({ onOpen }: { onOpen: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const ref = useRef<HTMLElement>(null);
    useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
    useGSAP(() => { gsap.fromTo(ref.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 0.1 }); }, { scope: ref });
    return (
        <header ref={ref} className={`v10-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="v10-header-inner">
                <div className="v10-logo">Caffe Bacco</div>
                <nav className="v10-nav">
                    <a href="#carousel" className="v10-nav-link">Galerie</a>
                    <a href="#reviews" className="v10-nav-link">Bewertungen</a>
                    <a href="#map" className="v10-nav-link">Karte</a>
                    <a href="#faq" className="v10-nav-link">FAQ</a>
                    <button onClick={onOpen} className="v10-btn v10-btn-primary" style={{ padding: '0.5rem 1rem' }}>Reservieren</button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO – Simple but labeled as "Feature Showcase"
// ============================================
function Hero({ onOpen }: { onOpen: () => void }) {
    const ref = useRef<HTMLElement>(null);
    useGSAP(() => {
        gsap.timeline({ defaults: { ease: 'power2.out' } })
            .fromTo('.v10-hero-tag', { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.2)
            .fromTo('.v10-hero-title', { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.3)
            .fromTo('.v10-hero-sub', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.5)
            .fromTo('.v10-hero-actions', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.65);
    }, { scope: ref });
    return (
        <section ref={ref} style={{ minHeight: '80dvh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
            <div className="v10-section" style={{ width: '100%', textAlign: 'center' }}>
                <div className="v10-hero-tag v10-feature-tag" style={{ opacity: 0, margin: '0 auto 1rem' }}>⚡ Feature Showcase</div>
                <h1 className="v10-hero-title v10-display" style={{ opacity: 0, fontSize: 'clamp(2.5rem,5vw,4.5rem)', marginBottom: '1.5rem' }}>
                    Was eine Restaurant-Website <br />alles <i>können</i> kann.
                </h1>
                <p className="v10-hero-sub v10-body" style={{ opacity: 0, maxWidth: '550px', margin: '0 auto 2rem' }}>
                    Interaktive Features die über Text & Bilder hinausgehen: Carousel, Lightbox, Rezensionen, Karte, FAQ, animierte Zahlen und mehr.
                </p>
                <div className="v10-hero-actions" style={{ opacity: 0, display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={onOpen} className="v10-btn v10-btn-primary">Tisch reservieren <ArrowRight size={14} /></button>
                    <a href="#carousel" className="v10-btn v10-btn-outline">Features ansehen</a>
                </div>
            </div>
        </section>
    );
}

// ============================================
// ANIMATED STATS
// ============================================
function AnimatedStats() {
    const ref = useRef<HTMLElement>(null);
    const [triggered, setTriggered] = useState(false);
    const stats = [
        { value: 20, suffix: '+', label: 'Jahre Erfahrung' },
        { value: 0, suffix: '', label: 'Speisekarten', display: 'Keine' },
        { value: 5, suffix: '★', label: 'Google Bewertung' },
        { value: 100, suffix: '%', label: 'Barzahlung' },
    ];

    useGSAP(() => {
        if (!ref.current) return;
        ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 80%',
            onEnter: () => setTriggered(true),
        });
    }, { scope: ref });

    return (
        <section ref={ref} className="v10-section">
            <div className="v10-feature-tag">📊 Animierte Zahlen</div>
            <div className="v10-stats">
                {stats.map((s, i) => (
                    <div key={i} className="v10-stat">
                        <div className="v10-stat-value">
                            {s.display || (triggered ? <Counter to={s.value} /> : '0')}{s.suffix}
                        </div>
                        <div className="v10-stat-label">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Counter({ to }: { to: number }) {
    const [v, setV] = useState(0);
    useEffect(() => {
        let start = 0;
        const dur = 2000;
        const step = dur / to;
        const timer = setInterval(() => { start++; setV(start); if (start >= to) clearInterval(timer); }, step);
        return () => clearInterval(timer);
    }, [to]);
    return <>{v}</>;
}

// ============================================
// IMAGE CAROUSEL
// ============================================
function ImageCarousel() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [idx, setIdx] = useState(0);
    const images = [heroPlaceholder, foodPlaceholder, gallery1, gallery2, gallery3, locationPlaceholder, gallery4];
    const total = images.length;

    const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);
    const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);

    useEffect(() => { const t = setInterval(next, 4000); return () => clearInterval(t); }, [next]);

    return (
        <section ref={ref} id="carousel" className="v10-section" style={{ scrollMarginTop: '5rem' }}>
            <div className="v10-feature-tag v10-reveal">🖼️ Bild-Carousel mit Auto-Play</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>Impressioni</h2>

            <div className="v10-carousel v10-reveal" style={{ aspectRatio: '16/9' }}>
                <div className="v10-carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
                    {images.map((src, i) => <div key={i} className="v10-carousel-slide"><img src={src} alt={`Slide ${i + 1}`} /></div>)}
                </div>
                <button className="v10-carousel-btn v10-carousel-btn-prev" onClick={prev}><ChevronLeft size={18} /></button>
                <button className="v10-carousel-btn v10-carousel-btn-next" onClick={next}><ChevronRight size={18} /></button>
            </div>

            <div className="v10-carousel-dots">
                {images.map((_, i) => <button key={i} className={`v10-carousel-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />)}
            </div>
        </section>
    );
}

// ============================================
// LIGHTBOX GALLERY
// ============================================
function LightboxGallery() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [lightbox, setLightbox] = useState<string | null>(null);
    const images = [gallery1, gallery2, gallery3, gallery4, heroPlaceholder, foodPlaceholder, locationPlaceholder, TEAM];

    useEffect(() => {
        if (!lightbox) return;
        const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
        window.addEventListener('keydown', esc);
        return () => window.removeEventListener('keydown', esc);
    }, [lightbox]);

    return (
        <section ref={ref} className="v10-section">
            <div className="v10-feature-tag v10-reveal">🔍 Lightbox-Galerie (Klick zum Vergrößern)</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>Galleria</h2>

            <div className="v10-gallery-grid v10-reveal">
                {images.map((src, i) => (
                    <div key={i} className="v10-gallery-thumb" onClick={() => setLightbox(src)}>
                        <img src={src} alt={`Gallery ${i + 1}`} />
                    </div>
                ))}
            </div>

            {lightbox && (
                <div className="v10-lightbox" onClick={() => setLightbox(null)}>
                    <img src={lightbox} alt="Vergrößert" onClick={e => e.stopPropagation()} />
                    <button className="v10-lightbox-close" onClick={() => setLightbox(null)}><X size={18} /></button>
                </div>
            )}
        </section>
    );
}

// ============================================
// REVIEWS / TESTIMONIALS
// ============================================
function Reviews() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [idx, setIdx] = useState(0);

    const reviews = [
        { text: 'Bestes italienisches Restaurant in Wien. Keine Karte, aber Mino weiß immer genau, was man braucht. Absolute Empfehlung!', author: 'Markus W.', stars: 5 },
        { text: 'Wie bei Freunden zu Hause essen – nur besser. Die Pasta ist unglaublich, der Wein perfekt ausgesucht. Wir kommen immer wieder.', author: 'Sandra K.', stars: 5 },
        { text: 'Authentisch, ehrlich, fantastisch. Dienstags die Miesmuscheln sind ein absolutes Highlight. 20 Jahre Qualität!', author: 'Thomas R.', stars: 5 },
        { text: 'Mino und Tibor sind ein Dream-Team. Die Atmosphäre ist gemütlich und das Essen herausragend. Nur Barzahlung – aber das ist es wert!', author: 'Julia M.', stars: 5 },
    ];

    useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % reviews.length), 5000); return () => clearInterval(t); }, [reviews.length]);

    return (
        <section ref={ref} id="reviews" className="v10-section-dark" style={{ scrollMarginTop: '5rem' }}>
            <div style={{ maxWidth: 'var(--v10-max-w)', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="v10-feature-tag v10-reveal" style={{ margin: '0 auto 1rem' }}>💬 Rezensionen-Slider</div>
                    <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}>Was unsere Gäste sagen.</h2>
                </div>

                <div className="v10-reviews v10-reveal">
                    <div className="v10-review-card" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                        <div className="v10-review-stars">{'★'.repeat(reviews[idx].stars)}</div>
                        <p className="v10-review-text" style={{ color: 'rgba(255,255,255,0.85)' }}>„{reviews[idx].text}"</p>
                        <p className="v10-review-author" style={{ color: 'rgba(255,255,255,0.4)' }}>{reviews[idx].author} · Google</p>
                    </div>
                    <div className="v10-carousel-dots" style={{ marginTop: '1rem' }}>
                        {reviews.map((_, i) => <button key={i} className={`v10-carousel-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} style={{ background: i === idx ? 'var(--v10-accent-light)' : 'rgba(255,255,255,0.15)' }} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// DAILY MENU TABS
// ============================================
function MenuTabs() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [tab, setTab] = useState(0);

    const days = [
        { day: 'Montag', items: ['Ribollita (Toskanische Brotsuppe)', 'Tagliata di Manzo', 'Panna Cotta'] },
        { day: 'Dienstag', items: ['🦪 Frische Miesmuscheln (12–17 Uhr)', 'Risotto ai Frutti di Mare', 'Tiramisù'] },
        { day: 'Mittwoch', items: ['Bruschetta al Pomodoro', 'Ossobuco alla Milanese', 'Semifreddo'] },
        { day: 'Donnerstag', items: ['Carpaccio di Manzo', 'Pappardelle al Ragù', 'Affogato'] },
        { day: 'Freitag', items: ['Burrata con Pomodorini', 'Branzino al Forno', 'Cannoli Siciliani'] },
    ];

    return (
        <section ref={ref} className="v10-section">
            <div className="v10-feature-tag v10-reveal">📋 Interaktive Tages-Tabs</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>Was gibt's heute?</h2>
            <p className="v10-body v10-reveal" style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
                Auch ohne Speisekarte – ein Beispiel wie man ein tägliches Angebot interaktiv darstellen könnte:
            </p>

            <div className="v10-reveal">
                <div className="v10-tabs">
                    {days.map((d, i) => <button key={i} className={`v10-tab ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)}>{d.day}</button>)}
                </div>
                <div style={{ padding: '0.5rem 0' }}>
                    {days[tab].items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 0', borderBottom: i < days[tab].items.length - 1 ? '1px solid var(--v10-ink-05)' : 'none' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--v10-accent)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.9375rem', fontWeight: 400 }}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// FAQ ACCORDION
// ============================================
function FAQ() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [open, setOpen] = useState<number | null>(0);

    const items = [
        { q: 'Gibt es eine Speisekarte?', a: 'Nein! Bei uns kocht Tibor nach Markt und Saison. Mino kommt an euren Tisch und erzählt, was die Küche heute gezaubert hat. Echtes Handwerk statt Katalog.' },
        { q: 'Muss ich reservieren?', a: 'Empfohlen, ja! Am besten telefonisch unter +43 1 585 66 90. Spontane Besuche sind natürlich auch willkommen – es kann aber sein, dass kein Tisch frei ist.' },
        { q: 'Kann ich mit Karte zahlen?', a: 'Nein, wir akzeptieren ausschließlich Barzahlung. Es gibt einen Bankomat in der Nähe (ca. 2 Minuten zu Fuß).' },
        { q: 'Gibt es vegetarische Optionen?', a: 'Natürlich! Tibor ist flexibel. Sagt beim Bestellen einfach Bescheid – die Küche zaubert immer was Passendes.' },
        { q: 'Wie finde ich euch?', a: 'Margaretenstraße 25, 1040 Wien. Direkt bei der U4-Station Kettenbrückengasse. Es gibt auch Parkplätze in der Umgebung.' },
    ];

    return (
        <section ref={ref} id="faq" className="v10-section" style={{ scrollMarginTop: '5rem' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="v10-feature-tag v10-reveal">❓ FAQ Accordion</div>
                <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>Häufige Fragen</h2>

                <div className="v10-reveal">
                    {items.map((item, i) => (
                        <div key={i} className="v10-faq-item">
                            <button className="v10-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                                {item.q}
                                <div className={`v10-faq-icon ${open === i ? 'open' : ''}`}><Plus size={14} /></div>
                            </button>
                            <div className="v10-faq-a" style={{ maxHeight: open === i ? '200px' : '0', padding: open === i ? '0 0 1.25rem' : '0' }}>
                                <p className="v10-body">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// GOOGLE MAP
// ============================================
function MapSection() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    return (
        <section ref={ref} id="map" className="v10-section" style={{ scrollMarginTop: '5rem' }}>
            <div className="v10-feature-tag v10-reveal">📍 Interaktive Google Maps Karte</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>So findest du uns.</h2>

            <div className="v10-map v10-reveal">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.8!2d16.3575!3d48.1925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079e0e2f82af%3A0x2a0e7c8e0f44b7b2!2sMargaretenstrase%2025%2C%201040%20Wien!5e0!3m2!1sde!2sat!4v1"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Caffe Bacco Standort"
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="v10-btn v10-btn-outline" style={{ fontSize: '0.625rem' }}>
                    <MapPin size={14} /> Route in Google Maps
                </a>
            </div>
        </section>
    );
}

// ============================================
// TEAM (compact)
// ============================================
function TeamCompact() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    return (
        <section ref={ref} className="v10-section" style={{ textAlign: 'center' }}>
            <div className="v10-feature-tag v10-reveal" style={{ margin: '0 auto 1rem' }}>👨‍🍳 Team-Profil</div>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div className="v10-reveal" style={{ maxWidth: '280px' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '3px solid var(--v10-ink-10)' }}>
                        <img src={TEAM} alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--v10-font-display)', fontSize: '1.375rem', marginBottom: '0.25rem' }}>Mino & Tibor</h3>
                    <p className="v10-body" style={{ fontSize: '0.8125rem' }}>Padrone & Küchenchef – seit 20+ Jahren ein eingespieltes Dream-Team.</p>
                </div>
            </div>
        </section>
    );
}

// ============================================
// FOOTER
// ============================================
function Footer() {
    return (
        <footer className="v10-footer">
            <div className="v10-footer-inner">
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
                    Caffe Bacco · Margaretenstraße 25, 1040 Wien · <a href="tel:+4315856690" style={{ color: 'inherit' }}>+43 1 585 66 90</a>
                </p>
                <p>© {new Date().getFullYear()} Caffe Bacco · Feature Showcase Demo</p>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE BAR
// ============================================
function MobileBar({ onOpen }: { onOpen: () => void }) {
    return (
        <nav className="v10-mobile-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                <a href="tel:+4315856690" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', color: 'var(--v10-ink-40)', textDecoration: 'none', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}><Phone size={22} /><span>Anrufen</span></a>
                <button onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: '3rem', height: '3rem', marginTop: '-1.5rem', borderRadius: '50%', background: 'var(--v10-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(139,37,0,0.3)' }}><CalendarDays size={22} color="white" /></div>
                    <span style={{ fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--v10-accent)', fontWeight: 600 }}>Reservieren</span>
                </button>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', color: 'var(--v10-ink-40)', textDecoration: 'none', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}><MapPin size={22} /><span>Route</span></a>
            </div>
        </nav>
    );
}

// ============================================
// MAIN EXPORT
// ============================================
export default function DesignV10() {
    const [open, setOpen] = useState(false);
    return (
        <div className="design-v10" style={{ paddingBottom: '5rem' }}>
            <Header onOpen={() => setOpen(true)} />
            <main>
                <Hero onOpen={() => setOpen(true)} />
                <AnimatedStats />
                <ImageCarousel />
                <LightboxGallery />
                <Reviews />
                <MenuTabs />
                <FAQ />
                <MapSection />
                <TeamCompact />
            </main>
            <Footer />
            <div className="md:hidden"><MobileBar onOpen={() => setOpen(true)} /></div>
            <ReservationModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    );
}
