import { useState, useEffect, type FormEvent } from 'react';
import { X, Loader2, CheckCircle, AlertTriangle, Phone } from 'lucide-react';

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    notes: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: 2,
    notes: '',
};

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [status, setStatus] = useState<FormStatus>('idle');

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'guests' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
        const webhookToken = import.meta.env.VITE_N8N_WEBHOOK_TOKEN;

        if (!webhookUrl) {
            console.error('Webhook URL not configured');
            setStatus('error');
            return;
        }

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(webhookToken && { Authorization: webhookToken }),
                },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    source: 'website',
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData(initialFormData);
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.error('Reservation error:', error);
            setStatus('error');
        }
    };

    const handleClose = () => {
        onClose();
        // Reset form after animation
        setTimeout(() => {
            setStatus('idle');
            setFormData(initialFormData);
        }, 300);
    };

    if (!isOpen) return null;

    // Get today's date for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div
            className="cb-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div className="cb-modal-backdrop" onClick={handleClose} />

            {/* Modal Card */}
            <div className="cb-modal-card">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="cb-modal-close"
                    aria-label="Schließen"
                >
                    <X size={18} />
                </button>

                <div className="cb-modal-body">
                    {/* Success State */}
                    {status === 'success' && (
                        <div className="cb-modal-status">
                            <div className="cb-modal-status-icon cb-modal-status-icon--success">
                                <CheckCircle size={28} />
                            </div>
                            <h3 className="cb-modal-status-title cb-display">
                                Grazie!
                            </h3>
                            <p className="cb-body">
                                Deine Anfrage ist bei uns angekommen. Wir melden uns in Kürze per
                                E-Mail bei dir.
                            </p>
                            <button
                                onClick={handleClose}
                                className="cb-btn-primary"
                                style={{ marginTop: '1.5rem' }}
                            >
                                Schließen
                            </button>
                        </div>
                    )}

                    {/* Error State */}
                    {status === 'error' && (
                        <div className="cb-modal-status">
                            <div className="cb-modal-status-icon cb-modal-status-icon--error">
                                <AlertTriangle size={28} />
                            </div>
                            <h3 className="cb-modal-status-title cb-display">
                                Scusa!
                            </h3>
                            <p className="cb-body" style={{ marginBottom: '0.5rem' }}>
                                Da ist etwas schiefgelaufen.
                            </p>
                            <p className="cb-body">
                                Bitte ruf uns kurz an:{' '}
                                <a href="tel:+4315856690" className="cb-modal-phone-link">
                                    +43 1 585 66 90
                                </a>
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="cb-btn-ghost"
                                style={{ marginTop: '1.5rem' }}
                            >
                                Nochmal versuchen
                            </button>
                        </div>
                    )}

                    {/* Form State */}
                    {(status === 'idle' || status === 'loading') && (
                        <>
                            {/* Header – uses same pattern as section headers */}
                            <div className="cb-modal-header">
                                <span className="cb-label">Reservierung</span>
                                <h2 id="modal-title" className="cb-modal-title cb-display">
                                    Dein Platz im{' '}
                                    <span className="cb-serif">Caffe Bacco</span>
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="cb-modal-form">
                                {/* Name */}
                                <div className="cb-form-group">
                                    <label htmlFor="name" className="cb-form-label">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="cb-form-input"
                                        placeholder="Maria Rossi"
                                    />
                                </div>

                                {/* Email */}
                                <div className="cb-form-group">
                                    <label htmlFor="email" className="cb-form-label">
                                        E-Mail *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="cb-form-input"
                                        placeholder="maria@beispiel.at"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="cb-form-group">
                                    <label htmlFor="phone" className="cb-form-label">
                                        Telefonnummer *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="cb-form-input"
                                        placeholder="+43 664 123 4567"
                                    />
                                </div>

                                {/* Date & Time Row */}
                                <div className="cb-form-row">
                                    <div className="cb-form-group">
                                        <label htmlFor="date" className="cb-form-label">
                                            Datum *
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            required
                                            min={today}
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="cb-form-input"
                                        />
                                    </div>
                                    <div className="cb-form-group">
                                        <label htmlFor="time" className="cb-form-label">
                                            Uhrzeit *
                                        </label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            required
                                            min="12:00"
                                            max="21:30"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="cb-form-input"
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="cb-form-group">
                                    <label htmlFor="guests" className="cb-form-label">
                                        Personenanzahl *
                                    </label>
                                    <input
                                        type="number"
                                        id="guests"
                                        name="guests"
                                        required
                                        min={1}
                                        max={20}
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="cb-form-input"
                                    />
                                </div>

                                {/* Notes */}
                                <div className="cb-form-group">
                                    <label htmlFor="notes" className="cb-form-label">
                                        Anmerkung{' '}
                                        <span className="cb-form-label-hint">(optional)</span>
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="cb-form-input cb-form-textarea"
                                        placeholder="Allergien, besondere Anlässe, Kindersitz..."
                                    />
                                </div>

                                {/* Disclaimer – styled like cb-detail-block */}
                                <div className="cb-modal-disclaimer">
                                    <p>
                                        <strong className="cb-modal-disclaimer-strong">WICHTIG:</strong> Dies ist eine{' '}
                                        <strong>Reservierungsanfrage</strong>, keine automatische Bestätigung!
                                        Da wir nur begrenzt Plätze haben, prüfen wir deine Anfrage persönlich.
                                        Du erhältst zeitnah eine E-Mail von uns, wenn der Tisch für dich frei ist.
                                        Erst dann ist die Reservierung gültig. Für eine kurzfristige Reservierung rufe uns gerne an.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="cb-btn-primary cb-modal-submit"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={18} className="cb-spin" />
                                            Wird gesendet...
                                        </>
                                    ) : (
                                        'Anfrage absenden'
                                    )}
                                </button>

                                {/* Call Button */}
                                <a
                                    href="tel:+4315856690"
                                    className="cb-modal-call-btn"
                                >
                                    <Phone size={16} />
                                    Direkt anrufen
                                </a>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
