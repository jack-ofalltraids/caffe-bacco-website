import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v5.css';

gsap.registerPlugin(ScrollTrigger);

// ── Images
import heroPlaceholder from '../../assets/placeholders/hero.jpg';
import foodPlaceholder from '../../assets/placeholders/food.jpg';
import locationPlaceholder from '../../assets/placeholders/location.jpg';
import gallery1 from '../../assets/placeholders/gallery-1.jpg';
import gallery2 from '../../assets/placeholders/gallery-2.jpg';
import gallery3 from '../../assets/placeholders/gallery-3.jpg';
import gallery4 from '../../assets/placeholders/gallery-4.jpg';

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
        ref.current.querySelectorAll('.v5-reveal').forEach((el) => {
            gsap.fromTo(el,
                { autoAlpha: 0, y: 20 },
                {
                    autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                }
            );
        });
    }, { scope: ref });
}

// ============================================
// HEADER
// ============================================
function V5Header({ onOpenReservation }: { onOpenReservation: () => void }) {
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.fromTo(headerRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, delay: 0.1, ease: 'power2.out' }
        );
    }, { scope: headerRef });

    return (
        <header ref={headerRef} className={`v5-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="v5-header-inner">
                <div className="v5-logo">
                    Caffe Bacco<span className="v5-logo-dot" />
                </div>

                <nav className="v5-nav">
                    <a href="#filosofia" className="v5-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="v5-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="v5-nav-link">Kontakt</a>
                    <button onClick={onOpenReservation} className="v5-btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                        Reservieren
                    </button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO – Giant typography
// ============================================
function V5Hero({ onOpenReservation }: { onOpenReservation: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.v5-hero-overline', { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.2)
            .fromTo('.v5-hero-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3)
            .fromTo('.v5-hero-bottom', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.6)
            .fromTo('.v5-hero-image-strip', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.5);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="v5-hero">
            <div className="v5-hero-inner">
                {/* Overline */}
                <div className="v5-hero-overline v5-label" style={{ opacity: 0 }}>
                    Wien IV · Seit 2002
                </div>

                {/* Title */}
                <h1 className="v5-hero-title v5-display" style={{ opacity: 0 }}>
                    Autentica<br />
                    <span className="v5-serif">Cucina</span> Toscana
                </h1>

                {/* Bottom row */}
                <div className="v5-hero-bottom" style={{ opacity: 0 }}>
                    <p className="v5-hero-desc v5-body">
                        Keine Speisekarte. Mino kommt an deinen Tisch und erzählt dir,
                        was Markt und Saison heute hergeben. Authentisch, ehrlich, gut.
                    </p>

                    <div className="v5-hero-actions">
                        <button onClick={onOpenReservation} className="v5-btn-primary">
                            Reservieren
                            <ArrowRight size={14} />
                        </button>
                        <a href="#filosofia" className="v5-btn-ghost">
                            Erfahre mehr
                        </a>
                    </div>
                </div>

                {/* Image strip */}
                <div className="v5-hero-image-strip" style={{ opacity: 0 }}>
                    <div className="v5-hero-image-strip-item">
                        <img src={HERO_IMAGE} alt="Caffe Bacco – Eingang" />
                    </div>
                    <div className="v5-hero-image-strip-item">
                        <img src={FOOD_IMAGE} alt="Frische Küche" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// FILOSOFIA – Numbered section
// ============================================
function V5Filosofia() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="filosofia" className="v5-section" style={{ scrollMarginTop: '5rem' }}>
            <div className="v5-section-numbered">
                <div className="v5-number v5-reveal">01</div>
                <div>
                    <span className="v5-label v5-reveal" style={{ display: 'block', marginBottom: '1rem' }}>
                        La Filosofia
                    </span>
                    <h2 className="v5-section-title v5-display v5-reveal">
                        Kochen ist<br />
                        <span className="v5-serif">Vertrauenssache.</span>
                    </h2>
                    <p className="v5-body v5-reveal">
                        Warum wir keine Karte haben? Weil echtes Handwerk keinen
                        Katalog braucht. Wir jagen keinen Trends hinterher – sondern
                        der Qualität.
                    </p>
                    <p className="v5-section-quote v5-reveal">
                        „Wir servieren nur, was wir auch unseren besten Freunden
                        vorsetzen würden."
                    </p>
                    <div className="v5-section-note v5-reveal">
                        <span>—</span>
                        <span>Dienstag: Frische Miesmuscheln 12–17 Uhr</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// DIVIDER
// ============================================
function V5Divider() {
    return (
        <div className="v5-divider">
            <div className="v5-divider-line" />
        </div>
    );
}

// ============================================
// GALLERY – Minimal grid, B&W → color
// ============================================
function V5Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v5-gallery">
            <div className="v5-gallery-grid v5-reveal">
                <div className="v5-gallery-item">
                    <img src={gallery1} alt="Wein" />
                </div>
                <div className="v5-gallery-item">
                    <img src={gallery2} alt="Antipasti" />
                </div>
                <div className="v5-gallery-item">
                    <img src={gallery3} alt="Handwerk" />
                </div>
                <div className="v5-gallery-item">
                    <img src={gallery4} alt="Gedeckter Tisch" />
                </div>
            </div>
        </section>
    );
}

// ============================================
// TEAM – Numbered section
// ============================================
function V5Team() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="chi-siamo" className="v5-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v5-team-inner">
                <div className="v5-team-image v5-reveal">
                    <img src={TEAM_IMAGE} alt="Mino und Tibor" />
                </div>
                <div className="v5-team-text">
                    <div className="v5-number v5-reveal" style={{ fontSize: '5rem' }}>02</div>
                    <span className="v5-label v5-reveal" style={{ display: 'block', marginBottom: '1rem' }}>
                        Chi Siamo
                    </span>
                    <h2 className="v5-team-title v5-display v5-reveal">
                        Mino <span className="v5-serif">&</span> Tibor
                    </h2>
                    <p className="v5-body v5-reveal">
                        Kein anonymer Gastro-Betrieb. Mino (Padrone) und Tibor
                        (Küchenchef seit 20+ Jahren) sind ein eingespieltes Team.
                        Echte Hingabe, ohne Chichi, mit viel Amore.
                    </p>
                    <p className="v5-reveal" style={{
                        fontFamily: 'var(--v5-font-serif)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                        lineHeight: 1.6,
                        marginTop: '1rem',
                        color: 'var(--v5-ink)',
                    }}>
                        „Komm vorbei, lass den Alltag draußen.<br />
                        Wie bei Freunden zu Hause."
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============================================
// LOCATION – Full-bleed B&W
// ============================================
function V5Location() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v5-location">
            <div className="v5-location-image v5-reveal">
                <img src={LOCATION_IMAGE} alt="Das Caffe Bacco" />
            </div>
        </section>
    );
}

// ============================================
// FOOTER
// ============================================
function V5Footer() {
    const footerRef = useRef<HTMLElement>(null);
    useScrollReveal(footerRef);

    return (
        <footer ref={footerRef} id="kontakt" className="v5-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v5-footer-inner">
                <div className="v5-footer-top">
                    {/* Address */}
                    <div className="v5-footer-col v5-reveal">
                        <div className="v5-footer-col-title">
                            <MapPin size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Adresse
                        </div>
                        <p>
                            <strong>Caffe Bacco</strong><br />
                            Margaretenstraße 25<br />
                            1040 Wien
                        </p>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="v5-footer-route-btn">
                            Route <ArrowRight size={11} />
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="v5-footer-col v5-reveal">
                        <div className="v5-footer-col-title">
                            <Clock size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Öffnungszeiten
                        </div>
                        <p>
                            <strong>Mo – Fr: 12:00 – 24:00</strong><br />
                            <span style={{ fontSize: '0.75rem', color: 'var(--v5-ink-40)' }}>(Küche bis 21:30)</span><br /><br />
                            Sa, So & Feiertage:<br />
                            <strong>Geschlossen</strong>
                        </p>
                    </div>

                    {/* Reservation */}
                    <div className="v5-footer-col v5-reveal">
                        <div className="v5-footer-col-title">
                            <Phone size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Reservierung
                        </div>
                        <p>Persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="v5-footer-phone">
                            +43 1 585 66 90
                        </a>
                        <div className="v5-footer-cash-notice">
                            <AlertCircle size={11} />
                            Nur Barzahlung
                        </div>
                    </div>
                </div>

                <div className="v5-footer-bottom v5-reveal">
                    <p>© {new Date().getFullYear()} Caffe Bacco</p>
                    <div className="v5-footer-accent-line" />
                    <p>Wien · Trattoria</p>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE BAR
// ============================================
function V5MobileBar({ onOpenReservation }: { onOpenReservation: () => void }) {
    return (
        <nav className="v5-mobile-bar" style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
            paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <a href="tel:+4315856690" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--v5-ink-40)', textDecoration: 'none',
                    fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontWeight: 500,
                }}>
                    <Phone size={20} />
                    <span>Anrufen</span>
                </a>

                <button onClick={onOpenReservation} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                }}>
                    <div style={{
                        width: '2.75rem', height: '2.75rem', marginTop: '-1.25rem',
                        background: 'var(--v5-ink)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CalendarDays size={20} color="var(--v5-bg)" />
                    </div>
                    <span style={{
                        fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: 'var(--v5-ink)', fontWeight: 600, marginTop: '0',
                    }}>
                        Reservieren
                    </span>
                </button>

                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--v5-ink-40)', textDecoration: 'none',
                    fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontWeight: 500,
                }}>
                    <MapPin size={20} />
                    <span>Route</span>
                </a>
            </div>
        </nav>
    );
}

// ============================================
// MAIN EXPORT
// ============================================
export default function DesignV5() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const handleOpen = () => setIsReservationOpen(true);
    const handleClose = () => setIsReservationOpen(false);

    return (
        <div className="design-v5" style={{ paddingBottom: '5rem' }}>
            <V5Header onOpenReservation={handleOpen} />
            <main>
                <V5Hero onOpenReservation={handleOpen} />
                <V5Divider />
                <V5Filosofia />
                <V5Gallery />
                <V5Divider />
                <V5Team />
                <V5Location />
            </main>
            <V5Footer />

            <div className="md:hidden">
                <V5MobileBar onOpenReservation={handleOpen} />
            </div>

            <ReservationModal isOpen={isReservationOpen} onClose={handleClose} />
        </div>
    );
}
