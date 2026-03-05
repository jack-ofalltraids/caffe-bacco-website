import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v7.css';
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
    useGSAP(() => { if (!ref.current) return; ref.current.querySelectorAll('.v7-reveal').forEach(el => { gsap.fromTo(el, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }); }); }, { scope: ref });
}

function Header({ onOpen }: { onOpen: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const ref = useRef<HTMLElement>(null);
    useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
    useGSAP(() => { gsap.fromTo(ref.current, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.1 }); }, { scope: ref });
    return (
        <header ref={ref} className={`v7-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="v7-header-inner">
                <div><div className="v7-logo">Caffe Bacco</div><span className="v7-logo-sub">Trattoria · Wien</span></div>
                <nav className="v7-nav">
                    <a href="#filosofia" className="v7-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="v7-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="v7-nav-link">Kontakt</a>
                    <button onClick={onOpen} className="v7-btn-primary" style={{ padding: '0.6rem 1.25rem' }}>Reservieren</button>
                </nav>
            </div>
        </header>
    );
}

function Hero({ onOpen }: { onOpen: () => void }) {
    const ref = useRef<HTMLElement>(null);
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo('.v7-hero-label', { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 0.3)
            .fromTo('.v7-hero-title', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.35)
            .fromTo('.v7-hero-sub', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.55)
            .fromTo('.v7-hero-actions', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.7)
            .fromTo('.v7-hero-visual', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3);
    }, { scope: ref });

    return (
        <section ref={ref} className="v7-hero">
            <div className="v7-hero-inner">
                <div style={{ maxWidth: 500 }}>
                    <div className="v7-hero-label v7-label" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{ width: '1.5rem', height: '1.5px', background: 'var(--v7-cobalt)' }} /> Seit 2002 · Wien IV
                    </div>
                    <h1 className="v7-hero-title v7-display" style={{ opacity: 0 }}>Autentica<br /><span className="v7-italic">Cucina Toscana.</span></h1>
                    <p className="v7-hero-sub v7-body" style={{ opacity: 0 }}>Keine Speisekarte – nur das Beste, was Markt und Saison heute hergeben. Mino kommt an deinen Tisch und erzählt dir, was die Küche gezaubert hat.</p>
                    <div className="v7-hero-actions" style={{ opacity: 0, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button onClick={onOpen} className="v7-btn-primary">Tisch reservieren <ArrowRight size={14} /></button>
                        <a href="#filosofia" className="v7-btn-ghost">Mehr erfahren</a>
                    </div>
                </div>
                <div className="v7-hero-visual" style={{ opacity: 0, position: 'relative' }}>
                    <div className="v7-arch"><img src={HERO} alt="Caffe Bacco" /></div>
                    <div className="v7-hero-accent"><div className="v7-circle"><img src={FOOD} alt="Frische Küche" /></div></div>
                </div>
            </div>
        </section>
    );
}

function Filosofia() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <section ref={ref} id="filosofia" className="v7-filosofia" style={{ scrollMarginTop: '5rem' }}>
            <div className="v7-filosofia-inner">
                <div className="v7-circle v7-reveal" style={{ aspectRatio: '1', maxWidth: '450px' }}><img src={FOOD} alt="Frische Pasta" /></div>
                <div style={{ maxWidth: 480 }}>
                    <span className="v7-label v7-reveal" style={{ display: 'block', marginBottom: '1rem' }}>La Filosofia</span>
                    <h2 className="v7-filosofia-title v7-display v7-reveal">Kochen ist <span className="v7-italic">Vertrauenssache.</span></h2>
                    <p className="v7-body v7-reveal">Warum wir keine Karte haben? Weil echtes Handwerk keinen Katalog braucht. Wir jagen keinen Trends hinterher – sondern der Qualität.</p>
                    <p className="v7-filosofia-quote v7-reveal">„Wir servieren nur, was wir auch unseren besten Freunden vorsetzen würden."</p>
                    <div className="v7-filosofia-note v7-reveal"><span>🦪</span> Dienstag: Frische Miesmuscheln 12–17 Uhr</div>
                </div>
            </div>
        </section>
    );
}

function Gallery() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <section ref={ref} className="v7-gallery">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                <span className="v7-label v7-reveal" style={{ display: 'block', marginBottom: '0.75rem' }}>Impressioni</span>
                <h2 className="v7-display v7-reveal" style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)' }}>Un mondo di <span className="v7-italic">sapori.</span></h2>
            </div>
            <div className="v7-gallery-grid v7-reveal">
                {[gallery1, gallery2, gallery3, gallery4].map((src, i) => <div key={i} className="v7-gallery-item"><img src={src} alt={`Gallery ${i + 1}`} /></div>)}
            </div>
        </section>
    );
}

function Team() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <section ref={ref} id="chi-siamo" className="v7-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v7-team-inner">
                <div className="v7-team-image v7-arch v7-reveal" style={{ aspectRatio: '3/4' }}><img src={TEAM} alt="Mino und Tibor" /></div>
                <div className="v7-team-text">
                    <span className="v7-label v7-reveal" style={{ display: 'block', marginBottom: '1rem' }}>La Famiglia</span>
                    <h2 className="v7-team-title v7-display v7-reveal">Mino <span className="v7-italic">&</span> Tibor.</h2>
                    <p className="v7-body v7-reveal">Kein anonymer Gastro-Betrieb – eine Familie. Mino (Padrone) und Tibor (Küchenchef seit 20+ Jahren) kochen mit echter Hingabe, ohne Chichi, mit viel Amore.</p>
                    <p className="v7-italic v7-reveal" style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)', lineHeight: 1.6, marginTop: '1rem' }}>„Komm vorbei, lass den Alltag draußen."</p>
                </div>
            </div>
        </section>
    );
}

function Location() { const ref = useRef<HTMLElement>(null); useReveal(ref); return (<section ref={ref} className="v7-location"><div className="v7-location-image v7-reveal"><img src={LOCATION} alt="Caffe Bacco" /></div></section>); }

function Footer() {
    const ref = useRef<HTMLElement>(null); useReveal(ref);
    return (
        <footer ref={ref} id="kontakt" className="v7-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v7-footer-inner">
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
                    <span className="v7-label v7-reveal" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--v7-ochre)' }}>Kontakt</span>
                    <h2 className="v7-display v7-reveal" style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)' }}>Vieni a <span className="v7-italic">trovarci.</span></h2>
                </div>
                <div className="v7-footer-top">
                    <div className="v7-footer-col v7-reveal">
                        <div className="v7-footer-col-title"><MapPin size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} /> Adresse</div>
                        <p><strong>Caffe Bacco</strong><br />Margaretenstraße 25<br />1040 Wien</p>
                        <a href={MAPS} target="_blank" rel="noopener noreferrer" className="v7-footer-route">Route <ArrowRight size={11} /></a>
                    </div>
                    <div className="v7-footer-col v7-reveal">
                        <div className="v7-footer-col-title"><Clock size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} /> Öffnungszeiten</div>
                        <p><strong>Mo – Fr: 12:00 – 24:00</strong><br /><span style={{ fontSize: '0.75rem', opacity: 0.5 }}>(Küche bis 21:30)</span><br /><br />Sa, So & Feiertage:<br /><strong>Geschlossen</strong></p>
                    </div>
                    <div className="v7-footer-col v7-reveal">
                        <div className="v7-footer-col-title"><Phone size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} /> Reservierung</div>
                        <p>Persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="v7-footer-phone">+43 1 585 66 90</a>
                        <div className="v7-footer-cash"><AlertCircle size={11} /> Nur Barzahlung</div>
                    </div>
                </div>
                <div className="v7-footer-bottom v7-reveal"><p>© {new Date().getFullYear()} Caffe Bacco · Trattoria · Wien</p></div>
            </div>
        </footer>
    );
}

function MobileBar({ onOpen }: { onOpen: () => void }) {
    return (
        <nav className="v7-mobile-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                <a href="tel:+4315856690" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', color: 'var(--v7-ink-40)', textDecoration: 'none', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}><Phone size={22} /><span>Anrufen</span></a>
                <button onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <div style={{ width: '3rem', height: '3rem', marginTop: '-1.5rem', borderRadius: '50%', background: 'var(--v7-cobalt)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(43,90,140,0.3)' }}><CalendarDays size={22} color="white" /></div>
                    <span style={{ fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--v7-cobalt)', fontWeight: 600 }}>Reservieren</span>
                </button>
                <a href={MAPS} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', color: 'var(--v7-ink-40)', textDecoration: 'none', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}><MapPin size={22} /><span>Route</span></a>
            </div>
        </nav>
    );
}

export default function DesignV7() {
    const [open, setOpen] = useState(false);
    return (
        <div className="design-v7" style={{ paddingBottom: '5rem' }}>
            <Header onOpen={() => setOpen(true)} />
            <main><Hero onOpen={() => setOpen(true)} /><div className="v7-wave" /><Filosofia /><Gallery /><Team /><Location /></main>
            <Footer />
            <div className="md:hidden"><MobileBar onOpen={() => setOpen(true)} /></div>
            <ReservationModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    );
}
