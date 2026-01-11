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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-xl shadow-bacco-lg w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-espresso/60 hover:text-espresso transition-colors"
                    aria-label="Schließen"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6 md:p-8">
                    {/* Success State */}
                    {status === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                                Grazie!
                            </h3>
                            <p className="text-espresso/80 leading-relaxed">
                                Deine Anfrage ist bei uns angekommen. Wir melden uns in Kürze per
                                E-Mail bei dir.
                            </p>
                            <button
                                onClick={handleClose}
                                className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg
                           transition-all duration-300 hover:bg-[#63161c]"
                            >
                                Schließen
                            </button>
                        </div>
                    )}

                    {/* Error State */}
                    {status === 'error' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                                Scusa!
                            </h3>
                            <p className="text-espresso/80 leading-relaxed mb-2">
                                Da ist etwas schiefgelaufen.
                            </p>
                            <p className="text-espresso/80">
                                Bitte ruf uns kurz an:{' '}
                                <a href="tel:+4315856690" className="text-primary font-semibold hover:underline">
                                    +43 1 585 66 90
                                </a>
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-6 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg
                           transition-all duration-300 hover:bg-primary hover:text-white"
                            >
                                Nochmal versuchen
                            </button>
                        </div>
                    )}

                    {/* Form State */}
                    {(status === 'idle' || status === 'loading') && (
                        <>
                            <h2
                                id="modal-title"
                                className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6 pr-8"
                            >
                                Dein Platz bei Mino
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-espresso mb-1.5">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all duration-200"
                                        placeholder="Maria Rossi"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-espresso mb-1.5">
                                        E-Mail *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all duration-200"
                                        placeholder="maria@beispiel.at"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-espresso mb-1.5">
                                        Telefonnummer *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all duration-200"
                                        placeholder="+43 664 123 4567"
                                    />
                                </div>

                                {/* Date & Time Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-espresso mb-1.5">
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
                                            className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                                 transition-all duration-200 accent-primary
                                 [color-scheme:light]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="time" className="block text-sm font-medium text-espresso mb-1.5">
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
                                            className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                                 transition-all duration-200 accent-primary
                                 [color-scheme:light]"
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-espresso mb-1.5">
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
                                        className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all duration-200"
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-espresso mb-1.5">
                                        Anmerkung <span className="text-espresso/50">(optional)</span>
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-parchment/50
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               transition-all duration-200 resize-none"
                                        placeholder="Allergien, besondere Anlässe, Kindersitz..."
                                    />
                                </div>

                                {/* Disclaimer */}
                                <div className="p-4 bg-gold/10 border border-gold/30 rounded-lg">
                                    <p className="text-sm text-espresso leading-relaxed">
                                        <strong className="text-primary">WICHTIG:</strong> Dies ist eine{' '}
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
                                    className="w-full py-4 bg-primary text-white font-semibold rounded-lg shadow-bacco
                             transition-all duration-300 ease-out
                             hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-bacco-lg hover:bg-[#63161c]
                             active:scale-[0.98]
                             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
                             flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Wird gesendet...
                                        </>
                                    ) : (
                                        'Anfrage absenden'
                                    )}
                                </button>

                                {/* Call Button */}
                                <a
                                    href="tel:+4315856690"
                                    className="w-full py-3.5 bg-espresso text-white font-semibold rounded-lg
                             transition-all duration-300 ease-out
                             hover:bg-espresso/90
                             active:scale-[0.98]
                             flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
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
