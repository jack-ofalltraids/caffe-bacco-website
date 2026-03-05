import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v3.css';

gsap.registerPlugin(ScrollTrigger);

// ── Placeholder images
import heroPlaceholder from '../../assets/placeholders/hero.jpg';
import foodPlaceholder from '../../assets/placeholders/food.jpg';
import locationPlaceholder from '../../assets/placeholders/location.jpg';
import gallery1 from '../../assets/placeholders/gallery-1.jpg';
import gallery2 from '../../assets/placeholders/gallery-2.jpg';
import gallery3 from '../../assets/placeholders/gallery-3.jpg';
import gallery4 from '../../assets/placeholders/gallery-4.jpg';

// ── Image constants
const HERO_IMAGE = locationPlaceholder;
const TEAM_IMAGE = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.19%20(11).jpeg/picture-2600?_=190c56695e8';
const FOOD_IMAGE = foodPlaceholder;
const LOCATION_IMAGE = heroPlaceholder;

// ── Google Maps
const GOOGLE_MAPS_URL = 'https://www.google.com/maps?daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

// ============================================
// SCROLL REVEAL HOOK
// ============================================
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useGSAP(() => {
        if (!ref.current) return;
        const elements = ref.current.querySelectorAll('.v3-reveal');
        elements.forEach((el) => {
            gsap.fromTo(
                el,
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power2.out',
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
function V3Header({ onOpenReservation }: { onOpenReservation: () => void }) {
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
            { autoAlpha: 0, y: -10 },
            { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
        );
    }, { scope: headerRef });

    return (
        <header
            ref={headerRef}
            className={`v3-header ${scrolled ? 'scrolled' : ''}`}
            style={{ opacity: 0 }}
        >
            <div className="v3-header-inner">
                <div>
                    <div className="v3-logo">
                        Caffe <strong>Bacco</strong>
                    </div>
                    <span className="v3-logo-sub">Trattoria · Wien</span>
                </div>

                <nav className="v3-nav">
                    <a href="#filosofia" className="v3-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="v3-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="v3-nav-link">Kontakt</a>
                    <button onClick={onOpenReservation} className="v3-btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                        Reservieren
                    </button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO – Split layout, bright & airy
// ============================================
function V3Hero({ onOpenReservation }: { onOpenReservation: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo('.v3-hero-tagline', { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.3)
            .fromTo('.v3-hero-title', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.4)
            .fromTo('.v3-hero-subtitle', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.6)
            .fromTo('.v3-hero-actions', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.75)
            .fromTo('.v3-hero-image', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.3);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="v3-hero">
            <div className="v3-hero-inner">
                {/* Text */}
                <div className="v3-hero-text">
                    <div className="v3-hero-tagline v3-label" style={{ opacity: 0 }}>
                        Seit 2002 · Wien IV
                    </div>

                    <h1 className="v3-hero-title v3-display" style={{ opacity: 0 }}>
                        Autentica<br />
                        Cucina Toscana.
                    </h1>

                    <p className="v3-hero-subtitle v3-body" style={{ opacity: 0 }}>
                        Keine Speisekarte – nur das Beste, was Markt und Saison
                        heute hergeben. Mino & sein Team kochen mit Leidenschaft
                        und servieren dir Authentizität.
                    </p>

                    <div className="v3-hero-actions" style={{ opacity: 0, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button onClick={onOpenReservation} className="v3-btn-primary">
                            Tisch reservieren
                            <ArrowRight size={15} />
                        </button>
                        <a href="#filosofia" className="v3-btn-outline">
                            Mehr erfahren
                        </a>
                    </div>
                </div>

                {/* Image */}
                <div className="v3-hero-image" style={{ opacity: 0 }}>
                    <div className="v3-hero-image-main">
                        <img src={HERO_IMAGE} alt="Caffe Bacco – Atmosphäre" />
                    </div>
                    <div className="v3-hero-accent">
                        <img src={FOOD_IMAGE} alt="Frische Küche" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// HORIZONTAL RULE
// ============================================
function V3Rule() {
    return (
        <div className="v3-rule">
            <div className="v3-rule-line" />
        </div>
    );
}

// ============================================
// FILOSOFIA
// ============================================
function V3Filosofia() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="filosofia" className="v3-filosofia" style={{ scrollMarginTop: '5rem' }}>
            <div className="v3-filosofia-inner">
                {/* Image */}
                <div className="v3-filosofia-image v3-reveal">
                    <img src={FOOD_IMAGE} alt="Frische Pasta auf handbemaltem Porzellan" />
                </div>

                {/* Text */}
                <div className="v3-filosofia-text">
                    <span className="v3-label v3-reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
                        La Filosofia
                    </span>

                    <h2 className="v3-filosofia-title v3-display-medium v3-reveal">
                        Kochen ist Vertrauenssache.
                    </h2>

                    <p className="v3-filosofia-body v3-body v3-reveal">
                        Warum wir keine Karte haben? Weil echtes Handwerk keinen Katalog
                        braucht. Mino kommt an deinen Tisch und erzählt dir, was die Küche
                        heute gezaubert hat. Wir jagen keinen Trends hinterher – sondern
                        der Qualität.
                    </p>

                    <p className="v3-filosofia-quote v3-body-accent v3-reveal">
                        „Wir servieren nur, was wir auch unseren besten Freunden vorsetzen würden."
                    </p>

                    <div className="v3-filosofia-note v3-reveal">
                        <span>🦪</span>
                        <span>Dienstag: Frische Miesmuscheln 12–17 Uhr</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// GALLERY
// ============================================
function V3Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v3-gallery">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <span className="v3-label v3-reveal" style={{ display: 'block', marginBottom: '0.75rem' }}>
                    Impressioni
                </span>
                <h2 className="v3-display-medium v3-reveal" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                    Ein Blick in unsere Welt.
                </h2>
            </div>

            <div className="v3-gallery-grid v3-reveal">
                <div className="v3-gallery-item">
                    <img src={gallery1} alt="Wein & Atmosphäre" />
                </div>
                <div className="v3-gallery-item">
                    <img src={gallery2} alt="Antipasti" />
                </div>
                <div className="v3-gallery-item">
                    <img src={gallery3} alt="Handwerk in der Küche" />
                </div>
                <div className="v3-gallery-item">
                    <img src={gallery4} alt="Gedeckter Tisch" />
                </div>
            </div>
        </section>
    );
}

// ============================================
// TEAM
// ============================================
function V3Team() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="chi-siamo" className="v3-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v3-team-inner">
                {/* Image */}
                <div className="v3-team-image v3-reveal">
                    <img src={TEAM_IMAGE} alt="Mino und Tibor – das Herz des Caffe Bacco" />
                </div>

                {/* Text */}
                <div className="v3-team-text">
                    <span className="v3-label v3-reveal" style={{ display: 'block', marginBottom: '1.25rem' }}>
                        Handwerk & Herzblut
                    </span>

                    <h2 className="v3-team-title v3-display-medium v3-reveal">
                        Mino & Tibor.
                    </h2>

                    <p className="v3-team-body v3-body v3-reveal">
                        Wir sind kein anonymer Gastro-Betrieb – wir sind eine Familie.
                        Mino (Padrone) und Tibor (Küchenchef seit über 20 Jahren) sind
                        ein eingespieltes Team. Hier wird noch mit echter Hingabe gekocht,
                        ohne Chichi, aber mit viel Amore.
                    </p>

                    <p className="v3-body-accent v3-reveal" style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}>
                        „Komm vorbei, lass den Alltag draußen.<br />
                        Wie bei Freunden zu Hause."
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============================================
// LOCATION IMAGE
// ============================================
function V3Location() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v3-location">
            <div className="v3-location-image v3-reveal">
                <img src={LOCATION_IMAGE} alt="Das Caffe Bacco – Innenansicht" />
            </div>
        </section>
    );
}

// ============================================
// FOOTER
// ============================================
function V3Footer() {
    const footerRef = useRef<HTMLElement>(null);
    useScrollReveal(footerRef);

    return (
        <footer ref={footerRef} id="kontakt" className="v3-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v3-footer-inner">
                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
                    <span className="v3-label v3-reveal" style={{ display: 'block', marginBottom: '0.75rem' }}>
                        Kontakt
                    </span>
                    <h2 className="v3-display-medium v3-reveal" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}>
                        Vieni a trovarci.
                    </h2>
                </div>

                {/* Grid */}
                <div className="v3-footer-top">
                    {/* Address */}
                    <div className="v3-footer-col v3-reveal">
                        <div className="v3-footer-col-title">
                            <MapPin size={13} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: '-2px' }} />
                            Adresse
                        </div>
                        <p>
                            <strong>Caffe Bacco</strong><br />
                            Margaretenstraße 25<br />
                            1040 Wien
                        </p>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="v3-footer-route-btn">
                            Route planen
                            <ArrowRight size={13} />
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="v3-footer-col v3-reveal">
                        <div className="v3-footer-col-title">
                            <Clock size={13} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: '-2px' }} />
                            Öffnungszeiten
                        </div>
                        <p>
                            <strong>Mo – Fr: 12:00 – 24:00</strong><br />
                            <span style={{ fontSize: '0.8125rem', color: 'var(--v3-ink-subtle)' }}>
                                (Küche bis 21:30)
                            </span><br /><br />
                            Sa, So & Feiertage:<br />
                            <strong>Geschlossen</strong>
                        </p>
                    </div>

                    {/* Reservation */}
                    <div className="v3-footer-col v3-reveal">
                        <div className="v3-footer-col-title">
                            <Phone size={13} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: '-2px' }} />
                            Reservierung
                        </div>
                        <p>Am besten persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="v3-footer-phone">
                            +43 1 585 66 90
                        </a>
                        <div className="v3-footer-cash-notice">
                            <AlertCircle size={13} />
                            Nur Barzahlung
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="v3-footer-bottom v3-reveal">
                    <p>
                        © {new Date().getFullYear()} Caffe Bacco · Trattoria · Wien
                    </p>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE BAR
// ============================================
function V3MobileBar({ onOpenReservation }: { onOpenReservation: () => void }) {
    return (
        <nav
            className="v3-mobile-bar"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 90,
                paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            aria-label="Mobile Schnellaktionen"
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <a
                    href="tel:+4315856690"
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                        color: 'var(--v3-ink-muted)', textDecoration: 'none',
                        fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}
                >
                    <Phone size={22} />
                    <span>Anrufen</span>
                </a>

                <button
                    onClick={onOpenReservation}
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                        background: 'none', border: 'none', cursor: 'pointer',
                    }}
                >
                    <div style={{
                        width: '3rem', height: '3rem', marginTop: '-1.5rem', borderRadius: '50%',
                        background: 'var(--v3-olive)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', boxShadow: '0 4px 15px rgba(122, 139, 98, 0.3)',
                    }}>
                        <CalendarDays size={22} color="white" />
                    </div>
                    <span style={{
                        fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'var(--v3-olive)', fontWeight: 600, marginTop: '-0.125rem',
                    }}>
                        Reservieren
                    </span>
                </button>

                <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                        color: 'var(--v3-ink-muted)', textDecoration: 'none',
                        fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase',
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
export default function DesignV3() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const handleOpen = () => setIsReservationOpen(true);
    const handleClose = () => setIsReservationOpen(false);

    return (
        <div className="design-v3" style={{ paddingBottom: '5rem' }}>
            <V3Header onOpenReservation={handleOpen} />
            <main>
                <V3Hero onOpenReservation={handleOpen} />
                <V3Rule />
                <V3Filosofia />
                <V3Gallery />
                <V3Team />
                <V3Location />
            </main>
            <V3Footer />

            <div className="md:hidden">
                <V3MobileBar onOpenReservation={handleOpen} />
            </div>

            <ReservationModal isOpen={isReservationOpen} onClose={handleClose} />
        </div>
    );
}
