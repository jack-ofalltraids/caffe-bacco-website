import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v4.css';

gsap.registerPlugin(ScrollTrigger);

// ── Placeholder images
import heroPlaceholder from '../../assets/placeholders/hero.jpg';
import foodPlaceholder from '../../assets/placeholders/food.jpg';
import locationPlaceholder from '../../assets/placeholders/location.jpg';
import gallery1 from '../../assets/placeholders/gallery-1.jpg';
import gallery2 from '../../assets/placeholders/gallery-2.jpg';
import gallery3 from '../../assets/placeholders/gallery-3.jpg';
import gallery4 from '../../assets/placeholders/gallery-4.jpg';

// ── Constants
const HERO_IMAGE = heroPlaceholder;
const TEAM_IMAGE = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.19%20(11).jpeg/picture-2600?_=190c56695e8';
const FOOD_IMAGE = foodPlaceholder;
const LOCATION_IMAGE = locationPlaceholder;
const GOOGLE_MAPS_URL = 'https://www.google.com/maps?daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

// ============================================
// SCROLL REVEAL
// ============================================
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useGSAP(() => {
        if (!ref.current) return;
        const els = ref.current.querySelectorAll('.v4-reveal');
        els.forEach((el) => {
            gsap.fromTo(el,
                { autoAlpha: 0, y: 25 },
                {
                    autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                }
            );
        });
    }, { scope: ref });
}

// ============================================
// HEADER
// ============================================
function V4Header({ onOpenReservation }: { onOpenReservation: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.fromTo(headerRef.current,
            { autoAlpha: 0, y: -10 },
            { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' }
        );
    }, { scope: headerRef });

    return (
        <header ref={headerRef} className={`v4-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="v4-gingham-border-thick" />
            <div className="v4-header-bar">
                <div className="v4-header-inner">
                    <div className="v4-logo-wrap">
                        <div className="v4-logo">Caffe Bacco</div>
                        <div className="v4-logo-tagline">Autentica Cucina Toscana · Wien</div>
                    </div>

                    <nav className="v4-nav">
                        <a href="#filosofia" className="v4-nav-link">Filosofia</a>
                        <a href="#chi-siamo" className="v4-nav-link">Chi Siamo</a>
                        <a href="#kontakt" className="v4-nav-link">Kontakt</a>
                        <button onClick={onOpenReservation} className="v4-btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                            Reservieren
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}

// ============================================
// HERO – Bold retro split
// ============================================
function V4Hero({ onOpenReservation }: { onOpenReservation: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo('.v4-hero-badge', { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.3)
            .fromTo('.v4-hero-title', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.35)
            .fromTo('.v4-hero-subtitle', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.55)
            .fromTo('.v4-hero-actions', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.7)
            .fromTo('.v4-hero-image-wrap', { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 1 }, 0.25);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="v4-hero">
            <div className="v4-hero-inner">
                {/* Text */}
                <div className="v4-hero-text">
                    <div className="v4-hero-badge v4-label" style={{ opacity: 0 }}>
                        🍷 Seit 2002 · Wien IV
                    </div>

                    <h1 className="v4-hero-title v4-display" style={{ opacity: 0 }}>
                        La vera cucina<br />
                        <span className="v4-rosso-text">di casa nostra.</span>
                    </h1>

                    <p className="v4-hero-subtitle v4-body" style={{ opacity: 0 }}>
                        Keine Speisekarte – nur das Beste, was Markt und Saison
                        heute hergeben. Mino kommt an deinen Tisch und erzählt
                        dir, was die Küche gezaubert hat.
                    </p>

                    <div className="v4-hero-actions" style={{ opacity: 0 }}>
                        <button onClick={onOpenReservation} className="v4-btn-primary">
                            Tisch reservieren
                            <ArrowRight size={15} />
                        </button>
                        <a href="#filosofia" className="v4-btn-outline">
                            Mehr erfahren
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="v4-hero-image-wrap" style={{ opacity: 0 }}>
                    <div className="v4-hero-image">
                        <img src={HERO_IMAGE} alt="Caffe Bacco – Atmosphäre" />
                    </div>
                    <div className="v4-hero-accent-photo">
                        <img src={FOOD_IMAGE} alt="Frische Küche" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// FILOSOFIA – Card with gingham border
// ============================================
function V4Filosofia() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="filosofia" className="v4-filosofia" style={{ scrollMarginTop: '5rem' }}>
            <div className="v4-filosofia-card v4-reveal">
                <div className="v4-filosofia-card-gingham" />
                <div className="v4-filosofia-card-inner">
                    <div className="v4-filosofia-image">
                        <img src={FOOD_IMAGE} alt="Frische Pasta" />
                    </div>
                    <div className="v4-filosofia-text">
                        <span className="v4-label" style={{ display: 'block', marginBottom: '1rem' }}>
                            La Filosofia
                        </span>
                        <h2 className="v4-filosofia-title v4-display">
                            Kochen ist Vertrauenssache.
                        </h2>
                        <p className="v4-filosofia-body v4-body">
                            Warum wir keine Karte haben? Weil echtes Handwerk keinen
                            Katalog braucht. Mino kommt an deinen Tisch und erzählt dir,
                            was die Küche heute gezaubert hat.
                        </p>
                        <p className="v4-filosofia-quote v4-body-accent">
                            „Wir servieren nur, was wir auch unseren besten Freunden vorsetzen würden."
                        </p>
                        <div className="v4-filosofia-note">
                            <span>🦪</span>
                            <span>Dienstag: Frische Miesmuscheln 12–17 Uhr</span>
                        </div>
                    </div>
                </div>
                <div className="v4-filosofia-card-gingham" />
            </div>
        </section>
    );
}

// ============================================
// GALLERY – Polaroid cards
// ============================================
function V4Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    const items = [
        { src: gallery1, label: "L'atmosfera" },
        { src: gallery2, label: 'Il momento' },
        { src: gallery3, label: 'A tavola' },
        { src: gallery4, label: 'La serata' },
    ];

    return (
        <section ref={sectionRef} className="v4-gallery">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <span className="v4-label v4-reveal" style={{ display: 'block', marginBottom: '0.625rem' }}>
                    Impressioni
                </span>
                <h2 className="v4-display v4-reveal" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
                    Dalle nostre <span className="v4-rosso-text">tavole.</span>
                </h2>
            </div>

            <div className="v4-gallery-grid">
                {items.map((item, i) => (
                    <div key={i} className="v4-gallery-item v4-reveal">
                        <div className="v4-gallery-item-image">
                            <img src={item.src} alt={item.label} />
                        </div>
                        <p className="v4-gallery-item-label">{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ============================================
// TEAM
// ============================================
function V4Team() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="chi-siamo" className="v4-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v4-team-inner">
                <div className="v4-team-image v4-reveal">
                    <img src={TEAM_IMAGE} alt="Mino und Tibor" />
                </div>
                <div className="v4-team-text">
                    <span className="v4-label v4-reveal" style={{ display: 'block', marginBottom: '1rem' }}>
                        La Famiglia
                    </span>
                    <h2 className="v4-team-title v4-display v4-reveal">
                        Mino & Tibor.
                    </h2>
                    <p className="v4-team-body v4-body v4-reveal">
                        Wir sind kein anonymer Gastro-Betrieb – wir sind eine Familie.
                        Mino (Padrone) und Tibor (Küchenchef seit über 20 Jahren) sind
                        ein eingespieltes Team. Hier wird noch mit echter Hingabe gekocht,
                        ohne Chichi, aber mit viel Amore.
                    </p>
                    <p className="v4-body-accent v4-reveal" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.125rem)' }}>
                        „Komm vorbei, lass den Alltag draußen.<br />
                        Wie bei Freunden zu Hause."
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============================================
// LOCATION
// ============================================
function V4Location() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v4-location">
            <div className="v4-location-image v4-reveal">
                <img src={LOCATION_IMAGE} alt="Das Caffe Bacco" />
            </div>
        </section>
    );
}

// ============================================
// FOOTER
// ============================================
function V4Footer() {
    const footerRef = useRef<HTMLElement>(null);
    useScrollReveal(footerRef);

    return (
        <footer ref={footerRef} id="kontakt" className="v4-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v4-footer-gingham" />
            <div className="v4-footer-inner">
                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                    <span className="v4-label v4-reveal" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--v4-rosso-light)' }}>
                        Kontakt
                    </span>
                    <h2 className="v4-display-light v4-reveal" style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        color: 'var(--v4-cream)',
                    }}>
                        Vieni a trovarci!
                    </h2>
                </div>

                <div className="v4-footer-top">
                    {/* Address */}
                    <div className="v4-footer-col v4-reveal">
                        <div className="v4-footer-col-title">
                            <MapPin size={12} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-2px' }} />
                            Adresse
                        </div>
                        <p>
                            <strong>Caffe Bacco</strong><br />
                            Margaretenstraße 25<br />
                            1040 Wien
                        </p>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="v4-footer-route-btn">
                            Route planen <ArrowRight size={12} />
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="v4-footer-col v4-reveal">
                        <div className="v4-footer-col-title">
                            <Clock size={12} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-2px' }} />
                            Öffnungszeiten
                        </div>
                        <p>
                            <strong>Mo – Fr: 12:00 – 24:00</strong><br />
                            <span style={{ fontSize: '0.8125rem', opacity: 0.6 }}>(Küche bis 21:30)</span><br /><br />
                            Sa, So & Feiertage:<br />
                            <strong>Geschlossen</strong>
                        </p>
                    </div>

                    {/* Reservation */}
                    <div className="v4-footer-col v4-reveal">
                        <div className="v4-footer-col-title">
                            <Phone size={12} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-2px' }} />
                            Reservierung
                        </div>
                        <p>Am besten persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="v4-footer-phone">
                            +43 1 585 66 90
                        </a>
                        <div className="v4-footer-cash-notice">
                            <AlertCircle size={12} />
                            Nur Barzahlung
                        </div>
                    </div>
                </div>

                <div className="v4-footer-bottom v4-reveal">
                    <p>© {new Date().getFullYear()} Caffe Bacco · Trattoria · Wien</p>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE BAR
// ============================================
function V4MobileBar({ onOpenReservation }: { onOpenReservation: () => void }) {
    return (
        <nav className="v4-mobile-bar" style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
            paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <a href="tel:+4315856690" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--v4-ink-muted)', textDecoration: 'none',
                    fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    fontWeight: 500,
                }}>
                    <Phone size={22} />
                    <span>Anrufen</span>
                </a>

                <button onClick={onOpenReservation} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                }}>
                    <div style={{
                        width: '3rem', height: '3rem', marginTop: '-1.5rem', borderRadius: '50%',
                        background: 'var(--v4-rosso)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', boxShadow: '0 4px 15px rgba(192,51,40,0.3)',
                    }}>
                        <CalendarDays size={22} color="white" />
                    </div>
                    <span style={{
                        fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'var(--v4-rosso)', fontWeight: 700, marginTop: '-0.125rem',
                    }}>
                        Reservieren
                    </span>
                </button>

                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--v4-ink-muted)', textDecoration: 'none',
                    fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    fontWeight: 500,
                }}>
                    <MapPin size={22} />
                    <span>Route</span>
                </a>
            </div>
        </nav>
    );
}

// ============================================
// MAIN EXPORT
// ============================================
export default function DesignV4() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const handleOpen = () => setIsReservationOpen(true);
    const handleClose = () => setIsReservationOpen(false);

    return (
        <div className="design-v4" style={{ paddingBottom: '5rem' }}>
            <V4Header onOpenReservation={handleOpen} />
            <main>
                <V4Hero onOpenReservation={handleOpen} />
                <V4Filosofia />
                <V4Gallery />
                <V4Team />
                <V4Location />
            </main>
            <V4Footer />

            <div className="md:hidden">
                <V4MobileBar onOpenReservation={handleOpen} />
            </div>

            <ReservationModal isOpen={isReservationOpen} onClose={handleClose} />
        </div>
    );
}
