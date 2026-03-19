import { useEffect, useRef } from 'react';

type LegalModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export function LegalModal({ isOpen, onClose, title, children }: LegalModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            contentRef.current?.scrollTo(0, 0);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="legal-overlay" onClick={onClose}>
            <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
                <div className="legal-modal-header">
                    <h2 className="legal-modal-title">{title}</h2>
                    <button className="legal-modal-close" onClick={onClose} aria-label="Schließen">✕</button>
                </div>
                <div className="legal-modal-body" ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────
   IMPRESSUM CONTENT
   ────────────────────────────────────── */
export function ImpressumContent() {
    return (
        <div className="legal-content">
            <h3>Angaben gemäß § 5 E-Commerce-Gesetz (ECG)</h3>

            <p>
                <strong>Caffe Bacco</strong><br />
                Margaretenstraße 25<br />
                1040 Wien, Österreich
            </p>

            <p>
                <strong>Kontakt:</strong><br />
                Telefon: <a href="tel:+4315856690">+43 1 585 66 90</a><br />
                E-Mail: <a href="mailto:office@caffebacco.at">office@caffebacco.at</a>
            </p>

            <p>
                <strong>Unternehmensgegenstand:</strong><br />
                Gastgewerbe
            </p>

            <p>
                <strong>Aufsichtsbehörde:</strong><br />
                Magistrat der Stadt Wien
            </p>

            <p>
                <strong>Anwendbare Rechtsvorschriften:</strong><br />
                Gewerbeordnung (GewO), E-Commerce-Gesetz (ECG)
            </p>

            <h3>Haftung für Inhalte</h3>
            <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten nach
                den allgemeinen Gesetzen verantwortlich. Eine Verpflichtung zur Überwachung übermittelter
                oder gespeicherter fremder Informationen besteht jedoch nicht.
            </p>

            <h3>Haftung für Links</h3>
            <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                Seiten verantwortlich.
            </p>

            <h3>Urheberrecht</h3>
            <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
                Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <h3>Streitschlichtung</h3>
            <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                    https://ec.europa.eu/consumers/odr
                </a>.
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
            </p>
        </div>
    );
}

/* ──────────────────────────────────────
   DATENSCHUTZ CONTENT
   ────────────────────────────────────── */
export function DatenschutzContent() {
    return (
        <div className="legal-content">
            <h3>1. Verantwortlicher</h3>
            <p>
                Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der
                Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <p>
                <strong>Caffe Bacco</strong><br />
                Margaretenstraße 25<br />
                1040 Wien, Österreich<br />
                Tel.: <a href="tel:+4315856690">+43 1 585 66 90</a><br />
                E-Mail: <a href="mailto:office@caffebacco.at">office@caffebacco.at</a>
            </p>
            <p>
                Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                personenbezogener Daten eine SSL- bzw. TLS-Verschlüsselung.
            </p>

            <h3>2. Datenerfassung beim Besuch unserer Website</h3>
            <p>
                Bei der rein informatorischen Nutzung unserer Website erheben wir nur solche Daten,
                die Ihr Browser an unseren Server übermittelt (sog. „Server-Logfiles"):
            </p>
            <ul>
                <li>Besuchte Seite</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Menge der gesendeten Daten in Byte</li>
                <li>Quelle/Verweis (Referrer)</li>
                <li>Verwendeter Browser und Betriebssystem</li>
                <li>IP-Adresse (anonymisiert)</li>
            </ul>
            <p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten
                Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.
                Eine Weitergabe oder anderweitige Verwendung der Daten findet nicht statt.
            </p>

            <h3>3. Cookies</h3>
            <p>
                Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den
                Betrieb der Seite erforderlich sind. Es werden <strong>keine Tracking-Cookies</strong>,
                Werbe-Cookies oder Cookies von Drittanbietern eingesetzt.
            </p>
            <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
                werden und einzeln über deren Annahme entscheiden können.
            </p>

            <h3>4. Reservierungsformular</h3>
            <p>
                Bei der Nutzung unseres Online-Reservierungsformulars werden folgende Daten erhoben:
            </p>
            <ul>
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Gewünschtes Datum und Uhrzeit</li>
                <li>Personenanzahl</li>
                <li>Optionale Anmerkungen</li>
            </ul>
            <p>
                Diese Daten werden ausschließlich zum Zweck der Bearbeitung Ihrer Reservierungsanfrage
                verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
                Maßnahmen). Ihre Daten werden nach Abschluss der Reservierung bzw. nach dem
                Restaurantbesuch gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>

            <h3>5. Kontaktaufnahme</h3>
            <p>
                Im Rahmen der Kontaktaufnahme mit uns (z.B. per E-Mail oder Telefon) werden
                personenbezogene Daten erhoben. Diese Daten werden ausschließlich zum Zweck der
                Beantwortung Ihres Anliegens gespeichert und verwendet.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                Ihre Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht.
            </p>

            <h3>6. Webanalyse und Tracking</h3>
            <p>
                Diese Website verwendet <strong>keine Webanalyse-Tools</strong> und
                kein Tracking. Es werden keine Daten an Google Analytics, Facebook, oder
                andere Drittanbieter zu Analysezwecken übermittelt.
            </p>

            <h3>7. Google Web Fonts</h3>
            <p>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Web Fonts,
                die von Google LLC bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser
                die benötigten Schriften in Ihren Browser-Cache. Zu diesem Zweck nimmt der von Ihnen
                verwendete Browser Verbindung zu den Servern von Google auf. Hierdurch erlangt Google
                Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde.
            </p>
            <p>
                Die Nutzung erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung
                (berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <h3>8. Ihre Rechte</h3>
            <p>
                Das geltende Datenschutzrecht gewährt Ihnen folgende Rechte gegenüber dem Verantwortlichen:
            </p>
            <ul>
                <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
                <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
                <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
                <li><strong>Recht auf Beschwerde</strong> bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p>
                Zuständige Aufsichtsbehörde in Österreich ist die{' '}
                <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">
                    Österreichische Datenschutzbehörde
                </a>
                , Barichgasse 40–42, 1030 Wien.
            </p>

            <h3>9. Speicherdauer</h3>
            <p>
                Die Dauer der Speicherung von personenbezogenen Daten bemisst sich anhand der
                jeweiligen gesetzlichen Aufbewahrungsfrist. Nach Ablauf der Frist werden die
                entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur
                Vertragserfüllung oder Vertragsanbahnung erforderlich sind.
            </p>

            <p className="legal-updated">
                Stand: März 2026
            </p>
        </div>
    );
}
