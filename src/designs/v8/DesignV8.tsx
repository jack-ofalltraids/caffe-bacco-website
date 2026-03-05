import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v8.css';
gsap.registerPlugin(ScrollTrigger);

import heroPlaceholder from '../../assets/placeholders/hero.jpg';
import foodPlaceholder from '../../assets/placeholders/food.jpg';
import locationPlaceholder from '../../assets/placeholders/location.jpg';
import gallery1 from '../../assets/placeholders/gallery-1.jpg';
import gallery2 from '../../assets/placeholders/gallery-2.jpg';
import gallery3 from '../../assets/placeholders/gallery-3.jpg';
import gallery4 from '../../assets/placeholders/gallery-4.jpg';

const HERO = heroPlaceholder, TEAM = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.19%20(11).jpeg/picture-2600?_=190c56695e8', FOOD = foodPlaceholder, LOCATION = locationPlaceholder;
const MAPS = 'https://www.google.com/maps?daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

function useReveal(ref: React.RefObject<HTMLElement | null>) {
    useGSAP(() => { if (!ref.current) return; ref.current.querySelectorAll('.v8-reveal').forEach(el => { gsap.fromTo(el, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }); }); }, { scope: ref });
}

function Header({ onOpen }: { onOpen: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const ref = useRef<HTMLElement>(null);
    useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
    useGSAP(() => { gsap.fromTo(ref.current, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.1 }); }, { scope: ref });
    return (
        <header ref={ref} className={`v8-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="v8-header-inner">
                <div><div className="v8-logo">Caffe Bacco</div><span className="v8-logo-sub">Trattoria · Wien</span></div>
                <nav className="v8-nav">
                    <a href="#filosofia" className="v8-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="v8-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="v8-nav-link">Kontakt</a>
                    <button onClick={onOpen} className="v8-btn-primary" style={{ padding: '0.6rem 1.25rem' }}>Reservieren</button>
                </nav>
            </div>
        </header>
    );
}

function Hero({ onOpen }: { onOpen: () => void }) {
    const ref = useRef<HTMLElement>(null);
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo('.v8-hero-label', { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.3)
            .fromTo('.v8-hero-title', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
            .fromTo('.v8-hero-sub', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.55)
            .fromTo('.v8-hero-actions', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.7)
            .fromTo('.v8-hero-arches', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.5);
    }, { scope: ref });

    return (
        <section ref={ref} className="v8-hero">
            <div className="v8-hero-inner">
                <div className="v8-hero-label v8-label" style={{ opacity: 0, marginBottom: '1rem' }}>Seit 2002 · Wien IV</div>
                <h1 className="v8-hero-title v8-display" style={{ opacity: 0 }}>
                    Autentica Cucina<br /><span className="v8-display-italic">Toscana.</span>
                </h1>
                <p className="v8-hero-sub v8-body v8-hero-subtitle" style={{ opacity: 0 }}>
                    Keine Speisekarte – nur das Beste, was Markt und Saison heute hergeben.
                </p>
                <div className="v8-hero-actions" style={{ opacity: 0 }}>
                    <button onClick={onOpen} className="v8-btn-primary">Tisch reservieren <ArrowRight size={14} /></button>
                    <a href="#filosofia" className="v8-btn-ghost">Mehr erfahren</a>
                </div>
                <div className="v8-hero-arches" style={{ opacity: 0 }}>
                    <div className="v8-arch v8-hero-arch-short"><img src={FOOD} alt="Frische Küche" /></div>
                    <div className="v8-arch v8-hero-arch-tall"><img src={HERO} alt="Caffe Bacco" /></div>
                    <div className="v8-arch v8-hero-arch-short"><img src={LOCATION} alt="Interior" /></div>
                </div>
            </div>
        </section>
    );
}

function Filosofia() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <section ref={ref} id="filosofia" className="v8-filosofia" style={{ scrollMarginTop: '5rem' }}>
            <div className="v8-filosofia-inner">
                <div className="v8-arch v8-filosofia-image v8-reveal"><img src={FOOD} alt="Frische Pasta" /></div>
                <div style={{ maxWidth: 480 }}>
                    <span className="v8-label v8-reveal" style={{ display: 'block', marginBottom: '1rem' }}>La Filosofia</span>
                    <h2 className="v8-filosofia-title v8-display v8-reveal">Kochen ist <span className="v8-display-italic">Vertrauenssache.</span></h2>
                    <p className="v8-body v8-reveal">Warum wir keine Karte haben? Weil echtes Handwerk keinen Katalog braucht. Mino kommt an deinen Tisch und erzählt, was die Küche heute gezaubert hat.</p>
                    <p className="v8-filosofia-quote v8-reveal">„Wir servieren nur, was wir auch unseren besten Freunden vorsetzen würden."</p>
                    <div className="v8-filosofia-note v8-reveal"><span>🦪</span> Dienstag: Frische Miesmuscheln 12–17 Uhr</div>
                </div>
            </div>
        </section>
    );
}

function GallerySection() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <section ref={ref} className="v8-gallery">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                <span className="v8-label v8-reveal" style={{ display: 'block', marginBottom: '0.75rem' }}>Impressioni</span>
                <h2 className="v8-display v8-reveal" style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)' }}>Dalle nostre <span className="v8-display-italic">tavole.</span></h2>
            </div>
            <div className="v8-gallery-mosaic v8-reveal">
                {[gallery1, gallery2, gallery3, gallery4].map((src, i) => <div key={i} className="v8-gallery-item"><img src={src} alt={`Gallery ${i + 1}`} /></div>)}
            </div>
        </section>
    );
}

function TeamSection() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <section ref={ref} id="chi-siamo" className="v8-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v8-team-inner">
                <div className="v8-arch v8-team-image v8-reveal"><img src={TEAM} alt="Mino und Tibor" /></div>
                <div className="v8-team-text">
                    <span className="v8-label v8-reveal" style={{ display: 'block', marginBottom: '1rem' }}>La Famiglia</span>
                    <h2 className="v8-team-title v8-display v8-reveal">Mino <span className="v8-display-italic">&</span> Tibor.</h2>
                    <p className="v8-body v8-reveal">Kein anonymer Gastro-Betrieb – eine Familie. Mino (Padrone) und Tibor (Küchenchef seit 20+ Jahren) kochen mit Hingabe, ohne Chichi, mit viel Amore.</p>
                    <p className="v8-display-italic v8-reveal" style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)', lineHeight: 1.6, marginTop: '1rem' }}>„Komm vorbei, lass den Alltag draußen."</p>
                </div>
            </div>
        </section>
    );
}

function LocationSection() { const ref = useRef<HTMLElement>(null); useReveal(ref); return (<section ref={ref} className="v8-location"><div className="v8-location-image v8-reveal"><img src={LOCATION} alt="Caffe Bacco" /></div></section>); }

function FooterSection() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <footer ref={ref} id="kontakt" className="v8-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v8-footer-inner">
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                    <span className="v8-label v8-reveal" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--v8-sienna-light)' }}>Kontakt</span>
                    <h2 className="v8-display v8-reveal" style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)' }}>Vieni a <span className="v8-display-italic">trovarci.</span></h2>
                </div>
                <div className="v8-footer-top">
                    <div className="v8-footer-col v8-reveal"><div className="v8-footer-col-title"><MapPin size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} /> Adresse</div><p><strong>Caffe Bacco</strong><br />Margaretenstraße 25<br />1040 Wien</p><a href={MAPS} target="_blank" rel="noopener noreferrer" className="v8-footer-route">Route <ArrowRight size={11} /></a></div>
                    <div className="v8-footer-col v8-reveal"><div className="v8-footer-col-title"><Clock size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} /> Öffnungszeiten</div><p><strong>Mo – Fr: 12:00 – 24:00</strong><br /><span style={{ fontSize: '0.75rem', opacity: 0.5 }}>(Küche bis 21:30)</span><br /><br />Sa, So & Feiertage:<br /><strong>Geschlossen</strong></p></div>
                    <div className="v8-footer-col v8-reveal"><div className="v8-footer-col-title"><Phone size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} /> Reservierung</div><p>Persönlich per Telefon:</p><a href="tel:+4315856690" className="v8-footer-phone">+43 1 585 66 90</a><div className="v8-footer-cash"><AlertCircle size={11} /> Nur Barzahlung</div></div>
                </div>
                <div className="v8-footer-bottom v8-reveal"><p>© {new Date().getFullYear()} Caffe Bacco · Trattoria · Wien</p></div>
            </div>
        </footer>
    );
}

function MobileBar({ onOpen }: { onOpen: () => void }) {
    return (
        <nav className="v8-mobile-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                <a href="tel:+4315856690" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', color: 'var(--v8-ink-40)', textDecoration: 'none', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}><Phone size={22} /><span>Anrufen</span></a>
                <button onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: '3rem', height: '3rem', marginTop: '-1.5rem', borderRadius: '50%', background: 'var(--v8-sienna)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(160,82,45,0.3)' }}><CalendarDays size={22} color="white" /></div>
                    <span style={{ fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--v8-sienna)', fontWeight: 600 }}>Reservieren</span>
                </button>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', color: 'var(--v8-ink-40)', textDecoration: 'none', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}><MapPin size={22} /><span>Route</span></a>
            </div>
        </nav>
    );
}

export default function DesignV8() {
    const [open, setOpen] = useState(false);
    return (
        <div className="design-v8" style={{ paddingBottom: '5rem' }}>
            <Header onOpen={() => setOpen(true)} />
            <main><Hero onOpen={() => setOpen(true)} /><Filosofia /><GallerySection /><TeamSection /><LocationSection /></main>
            <FooterSection />
            <div className="md:hidden"><MobileBar onOpen={() => setOpen(true)} /></div>
            <ReservationModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    );
}
