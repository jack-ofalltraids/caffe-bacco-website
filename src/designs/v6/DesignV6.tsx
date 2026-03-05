import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { ReservationModal } from '../../components/ReservationModal';
import './v6.css';

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
        ref.current.querySelectorAll('.v6-reveal').forEach((el) => {
            gsap.fromTo(el,
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                }
            );
        });
    }, { scope: ref });
}

// ============================================
// HEADER
// ============================================
function V6Header({ onOpenReservation }: { onOpenReservation: () => void }) {
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
            { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' }
        );
    }, { scope: headerRef });

    return (
        <header ref={headerRef} className={`v6-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="v6-header-inner">
                <div className="v6-logo">
                    <div className="v6-logo-name">Caffe Bacco</div>
                    <div className="v6-logo-sub">Trattoria · Wien</div>
                </div>

                <nav className="v6-nav">
                    <a href="#filosofia" className="v6-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="v6-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="v6-nav-link">Kontakt</a>
                    <button onClick={onOpenReservation} className="v6-btn-gold" style={{ padding: '0.6rem 1.25rem' }}>
                        Reservieren
                    </button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO – Cinematic fullbleed with gold
// ============================================
function V6Hero({ onOpenReservation }: { onOpenReservation: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo('.v6-hero-deco', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.3)
            .fromTo('.v6-hero-label', { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.4)
            .fromTo('.v6-hero-title', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.5)
            .fromTo('.v6-hero-subtitle', { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
            .fromTo('.v6-hero-actions', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.85);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="v6-hero">
            <div className="v6-hero-bg">
                <img src={HERO_IMAGE} alt="" />
            </div>
            <div className="v6-hero-overlay" />

            <div className="v6-hero-content">
                {/* Déco ornament */}
                <div className="v6-hero-deco v6-deco-diamond" style={{ maxWidth: '200px', margin: '0 auto 2rem', opacity: 0 }}>
                    <div className="v6-deco-diamond-shape" />
                </div>

                {/* Label */}
                <div className="v6-hero-label v6-label" style={{ marginBottom: '1.25rem', opacity: 0 }}>
                    Seit 2002 · Wien IV
                </div>

                {/* Title */}
                <h1 className="v6-hero-title v6-display-bold" style={{ opacity: 0 }}>
                    Autentica Cucina<br />
                    <span className="v6-italic" style={{ fontWeight: 400 }}>Toscana</span>
                </h1>

                {/* Subtitle */}
                <p className="v6-hero-subtitle" style={{ opacity: 0 }}>
                    Keine Speisekarte – nur die besten Zutaten,
                    die Markt und Saison heute hergeben.
                </p>

                {/* Actions */}
                <div className="v6-hero-actions" style={{ opacity: 0 }}>
                    <button onClick={onOpenReservation} className="v6-btn-gold">
                        Tisch Reservieren
                        <ArrowRight size={14} />
                    </button>
                    <a href="#filosofia" className="v6-btn-ghost">
                        Entdecken
                    </a>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="v6-hero-scroll-hint">
                <div className="v6-hero-scroll-line" />
            </div>
        </section>
    );
}

// ============================================
// DECO DIVIDER
// ============================================
function V6DecoDivider() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2.5rem)' }}>
            <div className="v6-deco-diamond" style={{ maxWidth: '300px', margin: '0 auto' }}>
                <div className="v6-deco-diamond-shape" />
            </div>
        </div>
    );
}

// ============================================
// FILOSOFIA
// ============================================
function V6Filosofia() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="filosofia" className="v6-filosofia" style={{ scrollMarginTop: '5rem' }}>
            <div className="v6-filosofia-inner">
                {/* Image with corner ornaments */}
                <div className="v6-filosofia-image v6-reveal" style={{ position: 'relative' }}>
                    <img src={FOOD_IMAGE} alt="Frische Pasta" />
                    <div className="v6-deco-corner v6-deco-corner-tl" />
                    <div className="v6-deco-corner v6-deco-corner-tr" />
                    <div className="v6-deco-corner v6-deco-corner-bl" />
                    <div className="v6-deco-corner v6-deco-corner-br" />
                </div>

                {/* Text */}
                <div className="v6-filosofia-text">
                    <span className="v6-label v6-reveal" style={{ display: 'block', marginBottom: '1rem' }}>
                        La Filosofia
                    </span>
                    <h2 className="v6-filosofia-title v6-display v6-reveal">
                        Kochen ist <span className="v6-italic">Vertrauenssache.</span>
                    </h2>
                    <p className="v6-filosofia-body v6-body v6-reveal">
                        Warum wir keine Speisekarte haben? Weil echtes Handwerk keinen
                        Katalog braucht. Mino kommt an deinen Tisch und erzählt dir,
                        was die Küche heute gezaubert hat.
                    </p>
                    <div className="v6-filosofia-quote v6-reveal">
                        „Wir servieren nur, was wir auch unseren besten
                        Freunden vorsetzen würden."
                    </div>
                    <div className="v6-filosofia-note v6-reveal">
                        <span>◆</span>
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
function V6Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v6-gallery">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <span className="v6-label v6-reveal" style={{ display: 'block', marginBottom: '0.75rem' }}>
                    Impressioni
                </span>
                <h2 className="v6-display v6-reveal" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}>
                    Momenti <span className="v6-italic">d'oro.</span>
                </h2>
            </div>

            <div className="v6-gallery-grid v6-reveal">
                <div className="v6-gallery-item">
                    <img src={gallery1} alt="Wein" />
                </div>
                <div className="v6-gallery-item">
                    <img src={gallery2} alt="Antipasti" />
                </div>
                <div className="v6-gallery-item">
                    <img src={gallery3} alt="Handwerk" />
                </div>
                <div className="v6-gallery-item">
                    <img src={gallery4} alt="Gedeckter Tisch" />
                </div>
            </div>
        </section>
    );
}

// ============================================
// TEAM
// ============================================
function V6Team() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="chi-siamo" className="v6-team" style={{ scrollMarginTop: '5rem' }}>
            <div className="v6-team-inner">
                <div className="v6-team-image v6-reveal" style={{ position: 'relative' }}>
                    <img src={TEAM_IMAGE} alt="Mino und Tibor" />
                    <div className="v6-deco-corner v6-deco-corner-tl" />
                    <div className="v6-deco-corner v6-deco-corner-tr" />
                    <div className="v6-deco-corner v6-deco-corner-bl" />
                    <div className="v6-deco-corner v6-deco-corner-br" />
                </div>
                <div className="v6-team-text">
                    <span className="v6-label v6-reveal" style={{ display: 'block', marginBottom: '1rem' }}>
                        La Famiglia
                    </span>
                    <h2 className="v6-team-title v6-display v6-reveal">
                        Mino <span className="v6-italic">&</span> Tibor.
                    </h2>
                    <p className="v6-body v6-reveal">
                        Kein anonymer Gastro-Betrieb – eine Familie. Mino (Padrone)
                        und Tibor (Küchenchef seit 20+ Jahren) kochen mit echter
                        Hingabe, ohne Chichi, mit viel Amore.
                    </p>
                    <p className="v6-italic v6-reveal" style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                        color: 'var(--v6-cream)',
                        lineHeight: 1.6,
                        marginTop: '1rem',
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
// LOCATION
// ============================================
function V6Location() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} className="v6-location">
            <div className="v6-location-wrap v6-reveal" style={{ position: 'relative' }}>
                <img src={LOCATION_IMAGE} alt="Das Caffe Bacco" />
                <div className="v6-deco-corner v6-deco-corner-tl" />
                <div className="v6-deco-corner v6-deco-corner-tr" />
                <div className="v6-deco-corner v6-deco-corner-bl" />
                <div className="v6-deco-corner v6-deco-corner-br" />
            </div>
        </section>
    );
}

// ============================================
// FOOTER
// ============================================
function V6Footer() {
    const footerRef = useRef<HTMLElement>(null);
    useScrollReveal(footerRef);

    return (
        <footer ref={footerRef} id="kontakt" className="v6-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="v6-footer-inner">
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                    <div className="v6-deco-diamond v6-reveal" style={{ maxWidth: '200px', margin: '0 auto 1.5rem' }}>
                        <div className="v6-deco-diamond-shape" />
                    </div>
                    <h2 className="v6-display v6-reveal" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}>
                        Vieni a <span className="v6-italic">trovarci.</span>
                    </h2>
                </div>

                <div className="v6-footer-top">
                    <div className="v6-footer-col v6-reveal">
                        <div className="v6-footer-col-title">
                            <MapPin size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Adresse
                        </div>
                        <p>
                            <strong>Caffe Bacco</strong><br />
                            Margaretenstraße 25<br />
                            1040 Wien
                        </p>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="v6-footer-route-btn">
                            Route <ArrowRight size={11} />
                        </a>
                    </div>

                    <div className="v6-footer-col v6-reveal">
                        <div className="v6-footer-col-title">
                            <Clock size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Öffnungszeiten
                        </div>
                        <p>
                            <strong>Mo – Fr: 12:00 – 24:00</strong><br />
                            <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>(Küche bis 21:30)</span><br /><br />
                            Sa, So & Feiertage:<br />
                            <strong>Geschlossen</strong>
                        </p>
                    </div>

                    <div className="v6-footer-col v6-reveal">
                        <div className="v6-footer-col-title">
                            <Phone size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Reservierung
                        </div>
                        <p>Persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="v6-footer-phone">
                            +43 1 585 66 90
                        </a>
                        <div className="v6-footer-cash-notice">
                            <AlertCircle size={11} />
                            Nur Barzahlung
                        </div>
                    </div>
                </div>

                <div className="v6-footer-bottom v6-reveal">
                    <p>© {new Date().getFullYear()} Caffe Bacco · Trattoria · Wien</p>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE BAR
// ============================================
function V6MobileBar({ onOpenReservation }: { onOpenReservation: () => void }) {
    return (
        <nav className="v6-mobile-bar" style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
            paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <a href="tel:+4315856690" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--v6-cream-40)', textDecoration: 'none',
                    fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase',
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
                        background: 'linear-gradient(135deg, var(--v6-gold-light), var(--v6-gold))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(197,165,90,0.35)',
                    }}>
                        <CalendarDays size={22} color="var(--v6-bg)" />
                    </div>
                    <span style={{
                        fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'var(--v6-gold)', fontWeight: 700,
                    }}>
                        Reservieren
                    </span>
                </button>

                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--v6-cream-40)', textDecoration: 'none',
                    fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase',
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
export default function DesignV6() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const handleOpen = () => setIsReservationOpen(true);
    const handleClose = () => setIsReservationOpen(false);

    return (
        <div className="design-v6" style={{ paddingBottom: '5rem' }}>
            <V6Header onOpenReservation={handleOpen} />
            <main>
                <V6Hero onOpenReservation={handleOpen} />
                <V6DecoDivider />
                <V6Filosofia />
                <V6Gallery />
                <V6DecoDivider />
                <V6Team />
                <V6Location />
            </main>
            <V6Footer />

            <div className="md:hidden">
                <V6MobileBar onOpenReservation={handleOpen} />
            </div>

            <ReservationModal isOpen={isReservationOpen} onClose={handleClose} />
        </div>
    );
}
