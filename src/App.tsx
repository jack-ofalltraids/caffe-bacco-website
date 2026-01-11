import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, AlertCircle } from 'lucide-react';
import { ReservationModal } from './components/ReservationModal';
import { MobileActionBar } from './components/MobileActionBar';

// Fresco images
import headerFresco from './assets/frescos/header-fresco.png';
import filosofiaFresco from './assets/frescos/filosofia-fresco.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Image URLs
const HERO_IMAGE = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.18%20(1).jpeg/picture-2600?_=190c566a1a0';
const TEAM_IMAGE = 'https://www.caffebacco.at/.cm4all/uproc.php/0/.WhatsApp%20Image%202024-07-08%20at%2018.29.19%20(11).jpeg/picture-2600?_=190c56695e8';

// ============================================
// HEADER COMPONENT
// ============================================
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 opacity-0 ${scrolled
        ? 'bg-parchment/95 backdrop-blur-sm shadow-bacco'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 text-center">
        {/* Header Fresco */}
        <img
          src={headerFresco}
          alt=""
          className="h-3 md:h-4 w-auto mx-auto mb-1 opacity-60"
          aria-hidden="true"
        />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary">
          Caffe Bacco
        </h1>
        <span className="block text-xs tracking-[0.3em] uppercase text-gold font-body font-light mt-1">
          Wien 1040
        </span>
      </div>
    </header>
  );
}

// ============================================
// HERO SECTION COMPONENT
// ============================================
interface HeroSectionProps {
  onOpenReservation: () => void;
}

function HeroSection({ onOpenReservation }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sublineRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states
    gsap.set([sublineRef.current, headlineRef.current, bodyRef.current, buttonRef.current], {
      autoAlpha: 0,
      y: 30,
    });
    gsap.set(imageContainerRef.current, {
      autoAlpha: 0,
      y: 50,
    });

    // Orchestrated entrance sequence
    tl.to(sublineRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
      .to(headlineRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.2)
      .to(bodyRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
      .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }, 0.45)
      .to(imageContainerRef.current, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.2);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-36 pb-12 md:pt-44 md:pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <span
              ref={sublineRef}
              className="inline-block text-sm tracking-[0.25em] uppercase text-gold font-body font-light mb-4 opacity-0"
            >
              Benvenuti in Famiglia
            </span>

            <h2
              ref={headlineRef}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 opacity-0"
            >
              Autentica Cucina Toscana.
              <br />
              <span className="text-espresso">Come a casa.</span>
            </h2>

            <p
              ref={bodyRef}
              className="text-base md:text-lg lg:text-xl text-espresso/80 leading-relaxed mb-8 max-w-xl opacity-0"
            >
              Bei uns gibt es keine Speisekarte – nur das Beste, was Markt und
              Saison heute hergeben. Mino & sein Team kochen mit Leidenschaft
              und servieren dir Authentizität. Seit 2002.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                ref={buttonRef}
                onClick={onOpenReservation}
                className="inline-block bg-primary text-white font-body font-semibold px-8 py-4 rounded-lg shadow-bacco opacity-0
                           transition-all duration-300 ease-out
                           hover:scale-[1.02] hover:-translate-y-1 hover:shadow-bacco-lg hover:bg-[#63161c]
                           active:scale-[0.98]"
              >
                Reservieren
              </button>
              <a
                href="#filosofia"
                className="inline-block text-primary font-body font-medium px-4 py-4
                           transition-all duration-300 ease-out
                           hover:text-gold"
              >
                Mehr erfahren →
              </a>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div ref={imageContainerRef} className="order-1 lg:order-2 opacity-0">
            <div className="relative group overflow-hidden rounded-lg shadow-bacco-lg">
              <img
                src={HERO_IMAGE}
                alt="Mino präsentiert erstklassiges Fleisch und Wein"
                className="w-full h-auto object-cover aspect-[4/3]
                           transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                           group-hover:scale-105"
              />
            </div>
            {/* Subtle decorative element */}
            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-20 md:w-28 h-20 md:h-28 border-2 border-gold/30 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CONCEPT SECTION COMPONENT ("La Filosofia")
// ============================================
function ConceptSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: cardRef });

  return (
    <section id="filosofia" className="py-12 md:py-16 px-4 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto max-w-3xl">
        <div
          ref={cardRef}
          className="concept-card bg-white rounded-lg shadow-bacco-card border-t-4 border-gold p-6 md:p-10 lg:p-12 opacity-0
                     hover:-translate-y-2 transition-transform duration-500 ease-out"
        >
          {/* Fresco Icon */}
          <div className="flex justify-center mb-6">
            <img
              src={filosofiaFresco}
              alt=""
              className="h-12 md:h-16 w-auto opacity-80"
              aria-hidden="true"
            />
          </div>

          {/* Headline */}
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center mb-6">
            La Filosofia di Bacco
          </h3>

          {/* Main Text */}
          <p className="text-base md:text-lg text-espresso/80 text-center leading-relaxed mb-6">
            Warum wir keine Karte haben? Weil Kochen Vertrauenssache ist. Mino
            kommt an deinen Tisch und erzählt dir, was die Küche heute gezaubert
            hat. Wir jagen keinen Trends hinterher, sondern der Qualität.
          </p>

          {/* Highlight Text */}
          <p className="text-base md:text-lg lg:text-xl text-espresso font-medium text-center leading-relaxed mb-8 italic">
            „Egal ob frische Trüffel, handverlesenes Gemüse oder der Fang des
            Tages – wir servieren nur, was wir auch unseren besten Freunden
            vorsetzen würden."
          </p>

          {/* Special Note */}
          <div className="pt-6 border-t border-espresso/10">
            <p className="text-center text-gold font-heading text-base md:text-lg font-semibold">
              Dienstags-Highlight: Frische Miesmuscheln (12–17 Uhr)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// TEAM SECTION COMPONENT ("Mino & Tibor")
// ============================================
function TeamSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  return (
    <section className="py-16 md:py-24 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div ref={textRef} className="team-text opacity-0">
            <span className="inline-block text-sm tracking-[0.25em] uppercase text-gold font-body font-light mb-4">
              Handwerk & Herzblut
            </span>

            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
              Mino & Tibor
            </h3>

            <p className="text-base md:text-lg lg:text-xl text-espresso/80 leading-relaxed mb-6">
              Wir sind kein anonymer Gastro-Betrieb, wir sind eine Familie. Mino
              (Padrone) und Tibor (Küchenchef seit über 20 Jahren) sind ein
              eingespieltes Team. Hier wird noch mit echter Hingabe gekocht –
              ohne Chichi, aber mit viel Amore.
            </p>

            <p className="text-base md:text-lg text-espresso font-medium italic">
              „Komm vorbei, lass den Alltag draußen. Wie bei Freunden zu Hause."
            </p>
          </div>

          {/* Right Content - Team Image */}
          <div ref={imageRef} className="team-img opacity-0">
            <div className="relative group overflow-hidden rounded-lg shadow-bacco-lg">
              <img
                src={TEAM_IMAGE}
                alt="Mino und Tibor – das Herz des Caffe Bacco"
                className="w-full h-auto object-cover aspect-[4/3]
                           transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                           group-hover:scale-105"
              />
            </div>
            {/* Subtle decorative element */}
            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-20 md:w-28 h-20 md:h-28 border-2 border-gold/30 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER / CONTACT SECTION
// ============================================
function FooterSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = contentRef.current?.querySelectorAll('.footer-animate');
    if (elements) {
      gsap.fromTo(
        elements,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });

  return (
    <footer id="kontakt" className="bg-espresso text-white py-16 md:py-24 px-4">
      <div ref={contentRef} className="container mx-auto footer-content">
        {/* Headline */}
        <h3 className="footer-animate font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 opacity-0">
          Dein Weg zu uns
        </h3>

        {/* Cash Only Warning Box */}
        <div className="footer-animate max-w-md mx-auto mb-12 md:mb-16 opacity-0">
          <div className="border-2 border-gold rounded-lg p-4 md:p-5 flex items-center gap-4 bg-gold/5">
            <AlertCircle className="w-6 h-6 text-gold flex-shrink-0" />
            <p className="text-gold font-body font-semibold text-sm md:text-base">
              WICHTIG: Nur Barzahlung möglich! (Cash Only)
            </p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Address Column */}
          <div className="footer-animate text-center md:text-left opacity-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gold" />
              <h4 className="font-heading text-xl font-semibold text-white">Adresse</h4>
            </div>
            <div className="text-white/80 leading-relaxed mb-5">
              <p className="font-semibold text-white">Caffe Bacco</p>
              <p>Margaretenstraße 25</p>
              <p>1040 Wien</p>
            </div>
            <a
              href="https://maps.google.com/?q=Caffe+Bacco+Wien"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-gold text-gold font-body font-medium px-5 py-2.5 rounded-lg
                         transition-all duration-300 ease-out
                         hover:bg-gold hover:text-espresso hover:scale-[1.02]
                         active:scale-[0.98]"
            >
              Route planen
            </a>
          </div>

          {/* Opening Hours Column */}
          <div className="footer-animate text-center opacity-0">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gold" />
              <h4 className="font-heading text-xl font-semibold text-white">Öffnungszeiten</h4>
            </div>
            <div className="text-white/80 leading-relaxed">
              <p className="font-semibold text-white">Mo – Fr: 12:00 – 24:00</p>
              <p className="text-sm text-white/60">(Küche bis 21:30)</p>
              <p className="mt-3">Sa, So & Feiertage:</p>
              <p className="font-semibold text-white">Geschlossen</p>
            </div>
          </div>

          {/* Reservation Column */}
          <div className="footer-animate text-center md:text-right opacity-0">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
              <Phone className="w-5 h-5 text-gold" />
              <h4 className="font-heading text-xl font-semibold text-white">Reservierung</h4>
            </div>
            <p className="text-white/80 mb-4">
              Am besten persönlich<br />per Telefon:
            </p>
            <a
              href="tel:+4315856690"
              className="inline-block font-heading text-2xl md:text-3xl font-bold text-gold
                         transition-all duration-300 ease-out
                         hover:text-white hover:scale-[1.02]
                         active:scale-[0.98]"
            >
              +43 1 585 66 90
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-animate mt-16 md:mt-20 pt-8 border-t border-white/10 text-center opacity-0">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Caffe Bacco. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = () => setIsReservationOpen(true);
  const handleCloseReservation = () => setIsReservationOpen(false);

  return (
    <div className="overflow-x-hidden pb-20 md:pb-0">
      <Header />
      <main>
        <HeroSection onOpenReservation={handleOpenReservation} />
        <ConceptSection />
        <TeamSection />
      </main>
      <FooterSection />
      <MobileActionBar onOpenReservation={handleOpenReservation} />
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
      />
    </div>
  );
}

export default App;
