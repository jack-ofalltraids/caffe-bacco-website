import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, CalendarDays, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, X, Plus, Sun, Moon, Send } from 'lucide-react';
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
// SCROLL PROGRESS BAR
// ============================================
function ScrollProgress() {
    const [w, setW] = useState(0);
    useEffect(() => {
        const h = () => { const d = document.documentElement; setW((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100); };
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);
    return <div className="v10-progress" style={{ width: `${w}%` }} />;
}

// ============================================
// BACK TO TOP
// ============================================
function BackToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const h = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);
    if (!show) return null;
    return (
        <button className="v10-back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Nach oben">
            <ArrowUp size={16} />
        </button>
    );
}

// ============================================
// SOCIAL PROOF POPUP
// ============================================
function SocialProof() {
    const [current, setCurrent] = useState<number | null>(null);
    const proofs = [
        { name: 'Sandra K.', action: 'hat reserviert', emoji: '🍷', time: 'vor 3 min' },
        { name: 'Thomas R.', action: 'hat reserviert', emoji: '🍝', time: 'vor 8 min' },
        { name: 'Julia M.', action: 'hat eine Bewertung hinterlassen', emoji: '⭐', time: 'vor 12 min' },
        { name: 'Markus W.', action: 'hat reserviert', emoji: '🥂', time: 'vor 15 min' },
    ];

    useEffect(() => {
        let idx = 0;
        const show = () => { setCurrent(idx); setTimeout(() => setCurrent(null), 4000); idx = (idx + 1) % proofs.length; };
        const t1 = setTimeout(show, 6000);
        const t2 = setInterval(show, 12000);
        return () => { clearTimeout(t1); clearInterval(t2); };
    }, [proofs.length]);

    if (current === null) return null;
    const p = proofs[current];
    return (
        <div className="v10-social-proof" key={current}>
            <div className="v10-social-proof-avatar">{p.emoji}</div>
            <div>
                <div className="v10-social-proof-text"><strong>{p.name}</strong> {p.action}</div>
                <div className="v10-social-proof-time">{p.time}</div>
            </div>
        </div>
    );
}

// ============================================
// HEADER
// ============================================
function Header({ onOpen, dark, onToggleDark }: { onOpen: () => void; dark: boolean; onToggleDark: () => void }) {
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
                    <button className="v10-darkmode-toggle" onClick={onToggleDark}>
                        {dark ? <Sun size={12} /> : <Moon size={12} />}
                        {dark ? 'Light' : 'Dark'}
                    </button>
                    <button onClick={onOpen} className="v10-btn v10-btn-primary" style={{ padding: '0.5rem 1rem' }}>Reservieren</button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO
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
                    Interaktive Features die über Text & Bilder hinausgehen. Scrolle nach unten und entdecke 15+ Features.
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
    useGSAP(() => { if (!ref.current) return; ScrollTrigger.create({ trigger: ref.current, start: 'top 80%', onEnter: () => setTriggered(true) }); }, { scope: ref });
    return (
        <section ref={ref} className="v10-section">
            <div className="v10-feature-tag">📊 Animierte Zahlen</div>
            <div className="v10-stats">
                {stats.map((s, i) => (<div key={i} className="v10-stat"><div className="v10-stat-value">{s.display || (triggered ? <Counter to={s.value} /> : '0')}{s.suffix}</div><div className="v10-stat-label">{s.label}</div></div>))}
            </div>
        </section>
    );
}

function Counter({ to }: { to: number }) {
    const [v, setV] = useState(0);
    useEffect(() => { let s = 0; const step = 2000 / to; const t = setInterval(() => { s++; setV(s); if (s >= to) clearInterval(t); }, step); return () => clearInterval(t); }, [to]);
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
            <div className="v10-carousel-dots">{images.map((_, i) => <button key={i} className={`v10-carousel-dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />)}</div>
        </section>
    );
}

// ============================================
// PARALLAX SECTION
// ============================================
function ParallaxSection() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    return (
        <section ref={ref}>
            <div className="v10-feature-tag v10-reveal" style={{ margin: '0 0 0 clamp(1.25rem,4vw,2.5rem)' }}>🏔️ Parallax-Scrolling</div>
            <div className="v10-parallax" style={{ marginTop: '1rem' }}>
                <div className="v10-parallax-bg" style={{ backgroundImage: `url(${heroPlaceholder})` }} />
                <div className="v10-parallax-overlay" />
                <div className="v10-parallax-content">
                    <p style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>Seit 2002</p>
                    <h2 className="v10-display" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: 'white', marginBottom: '1rem' }}>La vera cucina<br /><i>di casa nostra.</i></h2>
                    <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', maxWidth: '450px', margin: '0 auto' }}>Das Bild bleibt fixiert während du scrollst – ein beliebter Effekt für emotionale Sektionen.</p>
                </div>
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
    useEffect(() => { if (!lightbox) return; const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); }; window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc); }, [lightbox]);
    return (
        <section ref={ref} className="v10-section">
            <div className="v10-feature-tag v10-reveal">🔍 Lightbox-Galerie (Klick zum Vergrößern)</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>Galleria</h2>
            <div className="v10-gallery-grid v10-reveal">
                {images.map((src, i) => (<div key={i} className="v10-gallery-thumb" onClick={() => setLightbox(src)}><img src={src} alt={`Gallery ${i + 1}`} /></div>))}
            </div>
            {lightbox && (<div className="v10-lightbox" onClick={() => setLightbox(null)}><img src={lightbox} alt="Vergrößert" onClick={e => e.stopPropagation()} /><button className="v10-lightbox-close" onClick={() => setLightbox(null)}><X size={18} /></button></div>)}
        </section>
    );
}

// ============================================
// EVENT COUNTDOWN
// ============================================
function EventCountdown() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

    useEffect(() => {
        // Next Friday at 18:00
        const getNext = () => {
            const now = new Date();
            const target = new Date(now);
            target.setDate(target.getDate() + ((5 - target.getDay() + 7) % 7 || 7));
            target.setHours(18, 0, 0, 0);
            if (target <= now) target.setDate(target.getDate() + 7);
            return target;
        };
        const update = () => {
            const ms = getNext().getTime() - Date.now();
            if (ms <= 0) return;
            setDiff({ d: Math.floor(ms / 86400000), h: Math.floor((ms % 86400000) / 3600000), m: Math.floor((ms % 3600000) / 60000), s: Math.floor((ms % 60000) / 1000) });
        };
        update();
        const t = setInterval(update, 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <section ref={ref} className="v10-section" style={{ textAlign: 'center' }}>
            <div className="v10-feature-tag v10-reveal" style={{ margin: '0 auto 1rem' }}>⏳ Event-Countdown (Live)</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '0.5rem' }}>Nächster Freitags-Abend</h2>
            <p className="v10-body v10-reveal" style={{ marginBottom: '2rem' }}>Live-Countdown zum nächsten Event – erzeugt Dringlichkeit.</p>
            <div className="v10-countdown v10-reveal">
                {[{ v: diff.d, l: 'Tage' }, { v: diff.h, l: 'Stunden' }, { v: diff.m, l: 'Minuten' }, { v: diff.s, l: 'Sekunden' }].map((u, i) => (
                    <div key={i} className="v10-countdown-unit"><div className="v10-countdown-value">{String(u.v).padStart(2, '0')}</div><div className="v10-countdown-label">{u.l}</div></div>
                ))}
            </div>
        </section>
    );
}

// ============================================
// REVIEWS
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
// INSTAGRAM MOCK
// ============================================
function InstagramFeed() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const images = [gallery1, foodPlaceholder, gallery2, heroPlaceholder, gallery3, locationPlaceholder, gallery4, foodPlaceholder, heroPlaceholder];
    return (
        <section ref={ref} className="v10-section" style={{ textAlign: 'center' }}>
            <div className="v10-feature-tag v10-reveal" style={{ margin: '0 auto 1rem' }}>📸 Instagram Feed (Mock)</div>
            <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '0.5rem' }}>@caffebacco</h2>
            <p className="v10-body v10-reveal" style={{ marginBottom: '1.5rem' }}>Eingebetteter Instagram-Grid – zeigt Social Media Präsenz.</p>
            <div className="v10-ig-grid v10-reveal">
                {images.map((src, i) => <div key={i} className="v10-ig-item"><img src={src} alt={`Post ${i + 1}`} /></div>)}
            </div>
        </section>
    );
}

// ============================================
// MENU TABS
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
            <div className="v10-reveal">
                <div className="v10-tabs">{days.map((d, i) => <button key={i} className={`v10-tab ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)}>{d.day}</button>)}</div>
                <div style={{ padding: '0.5rem 0' }}>
                    {days[tab].items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 0', borderBottom: i < days[tab].items.length - 1 ? '1px solid var(--v10-ink-05)' : 'none' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--v10-accent)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.9375rem' }}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// FAQ
// ============================================
function FAQ() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [open, setOpen] = useState<number | null>(0);
    const items = [
        { q: 'Gibt es eine Speisekarte?', a: 'Nein! Bei uns kocht Tibor nach Markt und Saison. Mino kommt an euren Tisch und erzählt, was die Küche heute gezaubert hat.' },
        { q: 'Muss ich reservieren?', a: 'Empfohlen, ja! Am besten telefonisch unter +43 1 585 66 90. Spontane Besuche sind natürlich auch willkommen.' },
        { q: 'Kann ich mit Karte zahlen?', a: 'Nein, wir akzeptieren ausschließlich Barzahlung. Es gibt einen Bankomat in der Nähe (ca. 2 Minuten zu Fuß).' },
        { q: 'Gibt es vegetarische Optionen?', a: 'Natürlich! Tibor ist flexibel. Sagt beim Bestellen einfach Bescheid – die Küche zaubert immer was Passendes.' },
        { q: 'Wie finde ich euch?', a: 'Margaretenstraße 25, 1040 Wien. Direkt bei der U4-Station Kettenbrückengasse.' },
    ];
    return (
        <section ref={ref} id="faq" className="v10-section" style={{ scrollMarginTop: '5rem' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="v10-feature-tag v10-reveal">❓ FAQ Accordion</div>
                <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '1.5rem' }}>Häufige Fragen</h2>
                <div className="v10-reveal">
                    {items.map((item, i) => (
                        <div key={i} className="v10-faq-item">
                            <button className="v10-faq-q" onClick={() => setOpen(open === i ? null : i)}>{item.q}<div className={`v10-faq-icon ${open === i ? 'open' : ''}`}><Plus size={14} /></div></button>
                            <div className="v10-faq-a" style={{ maxHeight: open === i ? '200px' : '0', padding: open === i ? '0 0 1.25rem' : '0' }}><p className="v10-body">{item.a}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// NEWSLETTER
// ============================================
function Newsletter() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const handle = (e: React.FormEvent) => { e.preventDefault(); if (email) { setSent(true); setEmail(''); } };
    return (
        <section ref={ref} className="v10-section-dark" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: 'var(--v10-max-w)', margin: '0 auto' }}>
                <div className="v10-feature-tag v10-reveal" style={{ margin: '0 auto 1rem' }}>📰 Newsletter Signup</div>
                <h2 className="v10-display v10-reveal" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', marginBottom: '0.5rem' }}>Bleib auf dem Laufenden.</h2>
                <p className="v10-body v10-reveal" style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>E-Mail Capture mit Animations-Feedback.</p>
                <div className="v10-reveal">
                    {sent ? (
                        <div className="v10-newsletter-success" style={{ margin: '0 auto' }}>✅ Erfolgreich angemeldet! Danke für dein Interesse.</div>
                    ) : (
                        <form className="v10-newsletter-form" onSubmit={handle}>
                            <input className="v10-newsletter-input" type="email" placeholder="deine@email.at" value={email} onChange={e => setEmail(e.target.value)} required style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: 'white' }} />
                            <button type="submit" className="v10-btn v10-btn-primary"><Send size={14} /> Anmelden</button>
                        </form>
                    )}
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.8!2d16.3575!3d48.1925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079e0e2f82af%3A0x2a0e7c8e0f44b7b2!2sMargaretenstrase%2025%2C%201040%20Wien!5e0!3m2!1sde!2sat!4v1" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Caffe Bacco Standort" />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" className="v10-btn v10-btn-outline" style={{ fontSize: '0.625rem' }}><MapPin size={14} /> Route in Google Maps</a>
            </div>
        </section>
    );
}

// ============================================
// TEAM
// ============================================
function TeamCompact() {
    const ref = useRef<HTMLElement>(null);
    useReveal(ref);
    return (
        <section ref={ref} className="v10-section" style={{ textAlign: 'center' }}>
            <div className="v10-feature-tag v10-reveal" style={{ margin: '0 auto 1rem' }}>👨‍🍳 Team-Profil</div>
            <div className="v10-reveal" style={{ maxWidth: '280px', margin: '0 auto' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '3px solid var(--v10-ink-10)' }}><img src={TEAM} alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <h3 style={{ fontFamily: 'var(--v10-font-display)', fontSize: '1.375rem', marginBottom: '0.25rem' }}>Mino & Tibor</h3>
                <p className="v10-body" style={{ fontSize: '0.8125rem' }}>Padrone & Küchenchef – seit 20+ Jahren ein eingespieltes Dream-Team.</p>
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
    const [dark, setDark] = useState(false);
    return (
        <div className={`design-v10 ${dark ? 'v10-dark' : ''}`} style={{ paddingBottom: '5rem' }}>
            <ScrollProgress />
            <Header onOpen={() => setOpen(true)} dark={dark} onToggleDark={() => setDark(!dark)} />
            <main>
                <Hero onOpen={() => setOpen(true)} />
                <AnimatedStats />
                <ImageCarousel />
                <ParallaxSection />
                <LightboxGallery />
                <EventCountdown />
                <Reviews />
                <InstagramFeed />
                <MenuTabs />
                <Newsletter />
                <FAQ />
                <MapSection />
                <TeamCompact />
            </main>
            <Footer />
            <SocialProof />
            <BackToTop />
            <div className="md:hidden"><MobileBar onOpen={() => setOpen(true)} /></div>
            <ReservationModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    );
}
