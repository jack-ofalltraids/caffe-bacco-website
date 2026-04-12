import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle, CalendarDays, ArrowRight, Instagram } from 'lucide-react';
import { ReservationModal } from './components/ReservationModal';
import { LegalModal, ImpressumContent, DatenschutzContent } from './components/LegalModal';
import { NewsPopup } from './components/NewsPopup';
import './app.css';

gsap.registerPlugin(ScrollTrigger);

// ── Brand Assets
import logoText from './assets/brand/logo-text.png';
import menuCard from './assets/brand/menu-card.png';
import baccoIllustration from './assets/brand/bacco-illustration-round.png';

// ── Team Photos (crossfade carousel)
import teamTrio from './assets/team/trio.jpg';
import teamAll from './assets/team/team-all.jpg';
import teamCouple from './assets/team/couple.jpg';

// ── Placeholder images (replace with real photos later)
import heroPlaceholder from './assets/placeholders/hero.jpg';
import foodPlaceholder from './assets/placeholders/food.jpg';
import locationPlaceholder from './assets/placeholders/location.jpg';

const HERO_IMAGE = heroPlaceholder;
const FOOD_IMAGE = foodPlaceholder;
const LOCATION_IMAGE = locationPlaceholder;
const GOOGLE_MAPS_URL = 'https://www.google.com/maps?daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

// ============================================
// SCROLL REVEAL HOOK
// ============================================
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useGSAP(() => {
        if (!ref.current) return;
        ref.current.querySelectorAll('.cb-reveal').forEach((el) => {
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
// HEADER – Logo image instead of text
// ============================================
function Header({ onOpenReservation }: { onOpenReservation: () => void }) {
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
        <header ref={headerRef} className={`cb-header ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
            <div className="cb-header-inner">
                <a href="#" className="cb-logo">
                    <img src={logoText} alt="Caffe Bacco Trattoria" className="cb-logo-img" />
                </a>

                <nav className="cb-nav">
                    <a href="#filosofia" className="cb-nav-link">Filosofia</a>
                    <a href="#chi-siamo" className="cb-nav-link">Chi Siamo</a>
                    <a href="#kontakt" className="cb-nav-link">Kontakt</a>
                    <button onClick={onOpenReservation} className="cb-btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                        Reservieren
                    </button>
                </nav>
            </div>
        </header>
    );
}

// ============================================
// HERO – Giant typography with brand accents
// ============================================
function Hero({ onOpenReservation }: { onOpenReservation: () => void }) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.cb-hero-overline', { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 0.2)
            .fromTo('.cb-hero-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.3)
            .fromTo('.cb-hero-bottom', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.6)
            .fromTo('.cb-hero-image-strip', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.5);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="cb-hero">
            <div className="cb-hero-inner">
                {/* Overline */}
                <div className="cb-hero-overline cb-label" style={{ opacity: 0 }}>
                    Wien 1040 · Seit 2002
                </div>

                {/* Title */}
                <h1 className="cb-hero-title cb-display" style={{ opacity: 0 }}>
                    Benvenuti alla<br />
                    nostra <span className="cb-serif">Trattoria</span><br />
                    Caffe Bacco!
                </h1>

                {/* Bottom row */}
                <div className="cb-hero-bottom" style={{ opacity: 0 }}>
                    <p className="cb-hero-desc cb-body">
                        „Wir servieren nur, was wir auch unseren besten Freunden
                        vorsetzen würden."
                    </p>

                    <div className="cb-hero-actions">
                        <button onClick={onOpenReservation} className="cb-btn-primary">
                            Reservieren
                            <ArrowRight size={14} />
                        </button>
                        <a href="#filosofia" className="cb-btn-ghost">
                            Erfahre mehr
                        </a>
                    </div>
                </div>

                {/* Image strip */}
                <div className="cb-hero-image-strip" style={{ opacity: 0 }}>
                    <div className="cb-hero-image-strip-item">
                        <img src={FOOD_IMAGE} alt="Frische Küche" />
                    </div>
                    <div className="cb-hero-image-strip-item">
                        <img src={HERO_IMAGE} alt="Caffe Bacco – Genuss" />
                    </div>
                    <div className="cb-hero-image-strip-item">
                        <img src={LOCATION_IMAGE} alt="Das Caffe Bacco – Außenansicht" style={{ objectPosition: 'center 60%' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// FILOSOFIA – Restructured with visual rhythm
// ============================================
function Filosofia() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section ref={sectionRef} id="filosofia" className="cb-filosofia" style={{ scrollMarginTop: '5rem' }}>
            {/* Section intro */}
            <div className="cb-filosofia-header cb-reveal">
                <div className="cb-number">01</div>
                <div>
                    <span className="cb-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                        La Filosofia
                    </span>
                    <h2 className="cb-section-title cb-display">
                        Unsere <span className="cb-serif">Küche</span>
                    </h2>
                </div>
            </div>

            {/* Illustration + Text */}
            <div className="cb-filosofia-intro cb-reveal">
                <div className="cb-filosofia-illustration">
                    <img src={baccoIllustration} alt="Bacco – der Gott des Weines" />
                </div>
                <div>
                    <p className="cb-body">
                        Wir erfreuen unsere Gäste nun schon seit 2002 mit typisch toskanischer Küche,
                        kochen mit hochqualitativen und manchmal auch selten gewordenen Produkten und
                        orientieren uns gerne daran was die Natur saisonal für uns bereit hält!
                    </p>
                    <p className="cb-body" style={{ marginTop: '1rem' }}>
                        Unser Konzept bedient sich nicht der klassischen „à la Carte" Gastronomie –
                        wir arbeiten nach dem „Sharing Prinzip" und laden unsere Gäste so auf eine
                        kulinarische Reise ein!
                    </p>
                </div>
            </div>

            {/* Menu Card (left) + Hours & Highlights (right) */}
            <div className="cb-filosofia-content cb-reveal">
                <div className="cb-menu-card-wrapper">
                    <div className="cb-menu-card">
                        <img src={menuCard} alt="Caffe Bacco Menü – EUR 65,– pP" />
                    </div>
                </div>

                <div className="cb-filosofia-details">
                    <div className="cb-detail-block">
                        <h3 className="cb-detail-title">Öffnungszeiten</h3>
                        <p className="cb-detail-text">
                            Wir kochen immer von <strong>Montag bis Freitag</strong><br />
                            von <strong>12:00 – 21:30</strong> für Sie,<br />
                            das Lokal heißt Sie gerne bis 24 Uhr willkommen!
                        </p>
                        <p className="cb-detail-text" style={{ marginTop: '0.75rem' }}>
                            Auf spezielle Anfrage hin bewirten wir gerne <strong>samstags</strong> oder{' '}
                            <strong>feiertags</strong> Gruppen ab 20 Personen bei uns!
                        </p>
                    </div>

                    <div className="cb-detail-block">
                        <h3 className="cb-detail-title">Kulinarische Besonderheiten</h3>
                        <p className="cb-detail-text">
                            <strong>Dienstag</strong> ist unser allseits beliebter Muscheltag –
                            wir servieren verschiedene Gerichte mit Mies- oder Venusmuscheln!
                        </p>
                        <p className="cb-detail-text">
                            Unsere <strong>Bistecca Fiorentina</strong> können Sie jeden Tag bei uns genießen!
                        </p>
                        <p className="cb-detail-text">
                            Der weißen Trüffelsaison (ca. Okt. – Dez.) huldigen wir mit einem speziellen
                            Trüffelmenü – über schwarzen Trüffel können Sie sich ganzjährig freuen!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// DIVIDER
// ============================================
function Divider() {
    return (
        <div className="cb-divider">
            <div className="cb-divider-line" />
        </div>
    );
}



// ============================================
// CHI SIAMO – Team section with crossfade carousel
// ============================================
const TEAM_IMAGES = [
    { src: teamTrio, alt: 'Stefanie, Tibor & Mino – das Herzstück des Caffe Bacco', position: 'center 60%' },
    { src: teamAll, alt: 'Das gesamte Bacco Team', position: 'center 15%' },
    { src: teamCouple, alt: 'Mino & Stefanie – die Gastgeber', position: 'center center' },
];

function ChiSiamo() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    useScrollReveal(sectionRef);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TEAM_IMAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} id="chi-siamo" className="cb-team" style={{ scrollMarginTop: '5rem' }}>
            {/* Section header */}
            <div className="cb-team-header">
                <div className="cb-number cb-reveal">02</div>
                <div>
                    <span className="cb-label cb-reveal" style={{ display: 'block', marginBottom: '0.75rem' }}>
                        Chi Siamo
                    </span>
                    <h2 className="cb-team-title cb-display cb-reveal">
                        La <span className="cb-serif">Famiglia</span>
                    </h2>
                </div>
            </div>

            {/* Crossfade carousel + text */}
            <div className="cb-team-inner">
                <div className="cb-team-carousel cb-reveal">
                    {TEAM_IMAGES.map((img, i) => (
                        <img
                            key={i}
                            src={img.src}
                            alt={img.alt}
                            className={`cb-team-carousel-img ${i === activeIndex ? 'active' : ''}`}
                            style={{ objectPosition: img.position }}
                        />
                    ))}
                    {/* Dot indicators */}
                    <div className="cb-team-dots">
                        {TEAM_IMAGES.map((_, i) => (
                            <button
                                key={i}
                                className={`cb-team-dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Bild ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="cb-team-text">
                    <p className="cb-body cb-reveal">
                        Wie auch in Italien Trattorien Familienbetriebe sind, so ist auch die
                        Trattoria Caffe Bacco ein familiär geführter Betrieb.
                    </p>
                    <p className="cb-body cb-reveal" style={{ marginTop: '1rem' }}>
                        Das Bacco Team, Mino, Stefanie und unser Koch Tibor, der die Gaumen
                        unserer Gäste schon seit über zwanzig Jahren verwöhnt, ist jeden Tag
                        für Sie da. Unsere Familie, Kinder und enge Freunde unterstützen uns
                        tatkräftig!
                    </p>
                    <p className="cb-body cb-reveal" style={{ marginTop: '1rem' }}>
                        Das ist wahrscheinlich auch der Grund, dass wir von unseren Gästen
                        immer wieder hören sie würden sich bei uns wie zuhause fühlen.
                    </p>
                    <p className="cb-body cb-reveal" style={{ marginTop: '1rem' }}>
                        Wir hoffen darauf Ihnen weiterhin ein „Stück Italien" in unserem
                        „Wohnzimmer" näherbringen zu dürfen und freuen uns schon jetzt
                        auf Ihren Besuch!
                    </p>
                    <p className="cb-reveal cb-team-signature">
                        Mino, Stefanie & Tibor
                    </p>
                </div>
            </div>
        </section>
    );
}



// ============================================
// FOOTER – with prominent cash-only badge
// ============================================
function Footer({ onOpenImpressum, onOpenDatenschutz }: { onOpenImpressum: () => void; onOpenDatenschutz: () => void }) {
    const footerRef = useRef<HTMLElement>(null);
    useScrollReveal(footerRef);

    return (
        <footer ref={footerRef} id="kontakt" className="cb-footer" style={{ scrollMarginTop: '5rem' }}>
            <div className="cb-footer-inner">
                <div className="cb-footer-top">
                    {/* Address */}
                    <div className="cb-footer-col cb-reveal">
                        <div className="cb-footer-col-title">
                            <MapPin size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Adresse
                        </div>
                        <p>
                            <strong>Caffe Bacco</strong><br />
                            Margaretenstraße 25<br />
                            1040 Wien
                        </p>
                        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="cb-footer-route-btn">
                            Route <ArrowRight size={11} />
                        </a>
                    </div>

                    {/* Hours */}
                    <div className="cb-footer-col cb-reveal">
                        <div className="cb-footer-col-title">
                            <Clock size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Öffnungszeiten
                        </div>
                        <p>
                            <strong>Mo – Fr: 12:00 – 24:00</strong><br />
                            <span style={{ fontSize: '0.75rem', color: 'var(--cb-ink-40)' }}>(Küche bis 21:30)</span><br /><br />
                            Sa, So & Feiertage:<br />
                            Geschlossen<br />
                            <span style={{ fontSize: '0.75rem', color: 'var(--cb-ink-40)' }}>
                                (Gruppen ab 20 Pers. auf Anfrage)
                            </span>
                        </p>
                    </div>

                    {/* Reservation + Cash Notice */}
                    <div className="cb-footer-col cb-reveal">
                        <div className="cb-footer-col-title">
                            <Phone size={11} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: '-1px' }} />
                            Reservierung
                        </div>
                        <p>Persönlich per Telefon:</p>
                        <a href="tel:+4315856690" className="cb-footer-phone">
                            +43 1 585 66 90
                        </a>

                        {/* Cash-only badge – prominent like V1 */}
                        <div className="cb-cash-badge">
                            <AlertCircle size={16} />
                            <span>Nur Barzahlung möglich! (Cash Only)</span>
                        </div>
                    </div>
                </div>

                <div className="cb-footer-bottom cb-reveal">
                    <p>© {new Date().getFullYear()} Caffe Bacco</p>
                    <a href="https://www.instagram.com/caffebacco" target="_blank" rel="noopener noreferrer" className="cb-footer-ig">
                        <Instagram size={14} />
                        <span>@caffebacco</span>
                    </a>
                    <p>Wien · Trattoria</p>
                </div>

                <div className="cb-footer-legal cb-reveal">
                    <button onClick={onOpenImpressum}>Impressum</button>
                    <button onClick={onOpenDatenschutz}>Datenschutz</button>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// MOBILE ACTION BAR
// ============================================
function MobileBar({ onOpenReservation }: { onOpenReservation: () => void }) {
    return (
        <nav className="cb-mobile-bar" style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
            paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <a href="tel:+4315856690" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--cb-ink-40)', textDecoration: 'none',
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
                        background: 'var(--cb-primary)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CalendarDays size={20} color="var(--cb-bg)" />
                    </div>
                    <span style={{
                        fontSize: '0.5625rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: 'var(--cb-primary)', fontWeight: 600, marginTop: '0',
                    }}>
                        Reservieren
                    </span>
                </button>

                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '0.75rem', gap: '0.25rem',
                    color: 'var(--cb-ink-40)', textDecoration: 'none',
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
// MAIN APP
// ============================================
function App() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const [isImpressumOpen, setIsImpressumOpen] = useState(false);
    const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
    const handleOpen = () => setIsReservationOpen(true);
    const handleClose = () => setIsReservationOpen(false);

    return (
        <div className="caffe-bacco" style={{ paddingBottom: '5rem' }}>
            <Header onOpenReservation={handleOpen} />
            <main>
                <Hero onOpenReservation={handleOpen} />
                <Divider />
                <Filosofia />
                <Divider />
                <ChiSiamo />
            </main>
            <Footer
                onOpenImpressum={() => setIsImpressumOpen(true)}
                onOpenDatenschutz={() => setIsDatenschutzOpen(true)}
            />

            <div className="md:hidden">
                <MobileBar onOpenReservation={handleOpen} />
            </div>

            <ReservationModal isOpen={isReservationOpen} onClose={handleClose} />

            <LegalModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} title="Impressum">
                <ImpressumContent />
            </LegalModal>

            <LegalModal isOpen={isDatenschutzOpen} onClose={() => setIsDatenschutzOpen(false)} title="Datenschutzerklärung">
                <DatenschutzContent />
            </LegalModal>

            <NewsPopup />
        </div>
    );
}

export default App;
