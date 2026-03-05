import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v2.css';

gsap.registerPlugin(ScrollTrigger);

// ── Placeholder images (replace with real photos later)
import heroPlaceholder from '../../assets/placeholders/hero.jpg';
import foodPlaceholder from '../../assets/placeholders/food.jpg';
import locationPlaceholder from '../../assets/placeholders/location.jpg';
import gallery1 from '../../assets/placeholders/gallery-1.jpg';
import gallery2 from '../../assets/placeholders/gallery-2.jpg';
import gallery3 from '../../assets/placeholders/gallery-3.jpg';
import gallery4 from '../../assets/placeholders/gallery-4.jpg';

// ── Image constants
const HERO_IMAGE = heroPlaceholder;
const TEAM_IMAGE = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.19%20(11).jpeg/picture-2600?_=190c56695e8';
const FOOD_IMAGE = foodPlaceholder;
const LOCATION_IMAGE = locationPlaceholder;

// ── Google Maps
const GOOGLE_MAPS_URL = 'https://www.google.com/maps?daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

// ============================================
// SCROLL REVEAL HOOK
// ============================================
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useGSAP(() => {
        if (!ref.current) return;
        const elements = ref.current.querySelectorAll('.v2-reveal');
        elements.forEach((el) => {
            gsap.fromTo(
                el,
                { autoAlpha: 0, y: 40 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });
    }, { scope: ref });
}

// ============================================
// HEADER
// ============================================
function V2Header({ onOpenReservation }: { onOpenReservation: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.fromTo(
            headerRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.2, delay: 0.3, ease: 'power2.out' }
        );
    }, { scope: headerRef });

    return (
        <header
            ref={headerRef}
            className={`v2-header ${scrolled ? 'scrolled' : ''}`}
            style={{ opacity: 0 }}
        >
            <div className="v2-header-inner">
                <div className="v2-logo">
                    Caffe <strong>Bacco</strong>
                </div>

                <nav className="v2-nav">
                    <a href="#filosofia" className="v2-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="v2-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="v2-nav-link">Kontakt</a>
                    <button onClick={onOpenReservation} className="v2-btn-primary" style={{ padding: '0.7rem 1.5rem' }}>
                        Reservieren
                    </button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO – Cinematic full-bleed
// ============================================
function V2Hero({ onOpenReservation }: { onOpenReservation: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.v2-hero-tagline', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.5)
            .fromTo('.v2-hero-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.7)
            .fromTo('.v2-hero-subtitle', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1)
            .fromTo('.v2-hero-actions', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.2);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="v2-hero">
            {/* Background Image */}
            <div className="v2-hero-bg">
                <img src={HERO_IMAGE} alt="" aria-hidden="true" />
            </div>
            <div className="v2-hero-overlay" />

            {/* Content */}
            <div className="v2-hero-content">
                <span className="v2-hero-tagline v2-label" style={{ opacity: 0 }}>
                    Trattoria · Wien 1040 · Seit 2002
                </span>

                <h1 className="v2-hero-title v2-display" style={{ opacity: 0 }}>
                    Autentica<br />
                    Cucina<br />
                    Toscana.
                </h1>

                <p className="v2-hero-subtitle v2-body" style={{ opacity: 0, color: 'var(--v2-cream-muted)' }}>
                    Keine Speisekarte. Nur das Beste, was Markt und Saison
                    heute hergeben. Mino & sein Team kochen mit Leidenschaft.
                </p>

                <div className="v2-hero-actions" style={{ opacity: 0 }}>
                    <button onClick={onOpenReservation} className="v2-btn-primary">
                        Tisch reservieren
                        <ArrowRight size={16} />
                    </button>
                    <a href="#filosofia" className="v2-btn-ghost">
                        Mehr erfahren
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: 'clamp(1.5rem, 4vw, 3rem)',
                writingMode: 'vertical-rl',
                fontSize: '0.6875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--v2-cream-subtle)',
                opacity: 0.5,
            }}>
                Scroll
            </div>
        </section >
    );
}

// ============================================
// DIVIDER
// ============================================
function V2Divider() {
    return (
        <div className="v2-divider v2-reveal" style={{ padding: '2rem 0' }}>
            <span className="v2-divider-icon">✦</span>
        </div>
    );
}

// ============================================
// FILOSOFIA SECTION
// ============================================
function V2Filosofia() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="filosofia" className="v2-filosofia" style={{ scrollMarginTop: '5rem' }}>
            <div className="v2-filosofia-inner">
                {/* Text */}
                <div className="v2-filosofia-text">
                    <span className="v2-label v2-reveal" style={{ display: 'block', marginBottom: '1.5rem' }}>
                        La Filosofia
                    </span>

                    <h2 className="v2-filosofia-title v2-display-bold v2-reveal">
                        Kochen ist<br />Vertrauenssache.
                    </h2>

                    <p className="v2-filosofia-body v2-body v2-reveal">
                        Warum wir keine Karte haben? Weil echtes Handwerk keinen Katalog braucht.
                        Mino kommt an deinen Tisch und erzählt dir, was die Küche heute gezaubert hat.
                        Wir jagen keinen Trends hinterher – sondern der Qualität.
                    </p>

                    <p className="v2-filosofia-quote v2-body-accent v2-reveal">
                        „Egal ob frische Trüffel, handverlesenes Gemüse oder der Fang des Tages –
                        wir servieren nur, was wir auch unseren besten Freunden vorsetzen würden."
                    </p>

                    <div className="v2-filosofia-note v2-reveal">
                        <span>🦪</span>
                        <span>Dienstags-Highlight: Frische Miesmuscheln (12–17 Uhr)</span>
                    </div>
                </div>

                {/* Image */}
                <div className="v2-filosofia-image v2-reveal">
                    <img
                        src={FOOD_IMAGE}
                        alt="Frische Pasta auf handbemaltem Porzellan"
                    />
                    <div className="v2-filosofia-image-frame" />
                </div>
            </div>
        </section>
    );
}

// ============================================
// IMAGE BAND – Editorial grid
// ============================================
function V2ImageBand() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v2-image-band">
            <div className="v2-image-band-inner v2-reveal">
                <div className="v2-image-band-item">
                    <img src={gallery1} alt="Wein & Atmosphäre" />
                </div>
                <div className="v2-image-band-item">
                    <img src={gallery2} alt="Antipasti" />
                </div>
                <div className="v2-image-band-item">
                    <img src={gallery3} alt="Handwerk in der Küche" />
                </div>
                <div className="v2-image-band-item">
                    <img src={gallery4} alt="Gedeckter Tisch" />
                </div>
            </div>
        </section>
    );
}

// ============================================
// TEAM SECTION
// ============================================
function V2Team() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="chi-siamo" className="v2-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v2-team-inner">
                {/* Image */}
                <div className="v2-team-image v2-reveal">
                    <img
                        src={TEAM_IMAGE}
                        alt="Mino und Tibor – das Herz des Caffe Bacco"
                    />
                </div>

                {/* Text */}
                <div className="v2-team-text">
                    <span className="v2-label v2-reveal" style={{ display: 'block', marginBottom: '1.5rem' }}>
                        Handwerk & Herzblut
                    </span>

                    <h2 className="v2-team-title v2-display-bold v2-reveal">
                        Mino & Tibor.
                    </h2>

                    <p className="v2-team-body v2-body v2-reveal">
                        Wir sind kein anonymer Gastro-Betrieb, wir sind eine Familie.
                        Mino (Padrone) und Tibor (Küchenchef seit über 20 Jahren) sind
                        ein eingespieltes Team. Hier wird noch mit echter Hingabe gekocht
                        – ohne Chichi, aber mit viel Amore.
                    </p>

                    <p className="v2-body-accent v2-reveal" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)' }}>
                        „Komm vorbei, lass den Alltag draußen.<br />
                        Wie bei Freunden zu Hause."
                    </p>
                </div>
            </div>
        </section>
    );
}
// ============================================
// LOCATION ATMOSPHERE – Full-width image
// ============================================
function V2LocationAtmosphere() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} style={{ padding: 'var(--v2-section-gap) 0' }}>
            <div className="v2-reveal" style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '0 clamp(1.5rem, 4vw, 3rem)',
            }}>
                <div style={{
                    position: 'relative',
                    aspectRatio: '21/9',
                    overflow: 'hidden',
                }}>
                    <img
                        src={LOCATION_IMAGE}
                        alt="Das Caffe Bacco – Innenansicht"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'saturate(0.7) contrast(1.1)',
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: '1rem',
                        border: '1px solid rgba(240, 232, 216, 0.1)',
                        pointerEvents: 'none',
                    }} />
                </div>
            </div>
        </section>
    );
}

// ============================================
// FOOTER
// ============================================
function V2Footer() {
    const footerRef = useRef<HTMLElement>(null);
    useScrollReveal(footerRef);

    return (
        <footer ref={footerRef} id="kontakt" className="v2-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v2-footer-inner">
                {/* Section title */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
                    <span className="v2-label v2-reveal" style={{ display: 'block', marginBottom: '1rem' }}>
                        Dein Weg zu uns
                    </span>
                    <h2 className="v2-display-bold v2-reveal" style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: 'var(--v2-cream)',
                    }}>
                        Vieni a trovarci.
                    </h2>
                </div>

                {/* Grid */}
                <div className="v2-footer-top">
                    {/* Address */}
                    <div className="v2-footer-col v2-reveal">
                        <div className="v2-footer-col-title">
                            <MapPin size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-2px' }} />
                            Adresse
                        </div>
                        <p>
                            <strong>Caffe Bacco</strong><br />
                            Margaretenstraße 25<br />
                            1040 Wien
                        </p>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="v2-footer-route-btn">
                            Route planen
                            <ArrowRight size={14} />
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="v2-footer-col v2-reveal">
                        <div className="v2-footer-col-title">
                            <Clock size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-2px' }} />
                            Öffnungszeiten
                        </div>
                        <p>
                            <strong>Mo – Fr: 12:00 – 24:00</strong><br />
                            <span style={{ fontSize: '0.8125rem', color: 'var(--v2-cream-subtle)' }}>
                                (Küche bis 21:30)
                            </span><br /><br />
                            Sa, So & Feiertage:<br />
                            <strong>Geschlossen</strong>
                        </p>
                    </div>

                    {/* Reservation */}
                    <div className="v2-footer-col v2-reveal">
                        <div className="v2-footer-col-title">
                            <Phone size={14} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-2px' }} />
                            Reservierung
                        </div>
                        <p>Am besten persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="v2-footer-phone">
                            +43 1 585 66 90
                        </a>
                        <div className="v2-footer-cash-notice">
                            <AlertCircle size={14} />
                            Nur Barzahlung
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="v2-footer-bottom v2-reveal">
                    <p>
                        © {new Date().getFullYear()} Caffe Bacco · Trattoria · Wien
                    </p>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE ACTION BAR
// ============================================
function V2MobileBar({ onOpenReservation }: { onOpenReservation: () => void }) {
    return (
        <nav
            className="v2-mobile-bar"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 90,
                background: 'var(--v2-bg-warm)',
                borderTop: '1px solid rgba(240, 232, 216, 0.08)',
                paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            aria-label="Mobile Schnellaktionen"
        >
            {/* Only show on mobile */}
            <div
                className="v2-mobile-bar-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                }}
            >
                {/* Call */}
                <a
                    href="tel:+4315856690"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem',
                        gap: '0.25rem',
                        color: 'var(--v2-cream-muted)',
                        textDecoration: 'none',
                        fontSize: '0.625rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                    }}
                >
                    <Phone size={22} />
                    <span>Anrufen</span>
                </a>

                {/* Reservieren */}
                <button
                    onClick={onOpenReservation}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem',
                        gap: '0.25rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                    }}
                >
                    <div
                        className="v2-mobile-bar-center"
                        style={{
                            width: '3rem',
                            height: '3rem',
                            marginTop: '-1.5rem',
                            borderRadius: '50%',
                            background: 'var(--v2-terracotta)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(196, 103, 58, 0.4)',
                        }}
                    >
                        <CalendarDays size={22} color="var(--v2-cream)" />
                    </div>
                    <span style={{
                        fontSize: '0.625rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--v2-terracotta-light)',
                        fontWeight: 600,
                        marginTop: '-0.125rem',
                    }}>
                        Reservieren
                    </span>
                </button>

                {/* Route */}
                <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem',
                        gap: '0.25rem',
                        color: 'var(--v2-cream-muted)',
                        textDecoration: 'none',
                        fontSize: '0.625rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                    }}
                >
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
export default function DesignV2() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);

    const handleOpen = () => setIsReservationOpen(true);
    const handleClose = () => setIsReservationOpen(false);

    return (
        <div className="design-v2" style={{ paddingBottom: '5rem' }}>
            {/* Film grain overlay */}
            <div className="v2-grain" />

            <V2Header onOpenReservation={handleOpen} />
            <main>
                <V2Hero onOpenReservation={handleOpen} />
                <V2Divider />
                <V2Filosofia />
                <V2ImageBand />
                <V2Team />
                <V2LocationAtmosphere />
            </main>
            <V2Footer />

            {/* Mobile bar – hidden on md+ via CSS in v2.css */}
            <div className="md:hidden">
                <V2MobileBar onOpenReservation={handleOpen} />
            </div>

            <ReservationModal
                isOpen={isReservationOpen}
                onClose={handleClose}
            />
        </div>
    );
}
