import { Phone, CalendarDays, MapPin } from 'lucide-react';

interface MobileActionBarProps {
    onOpenReservation: () => void;
}

const GOOGLE_MAPS_URL =
    'https://www.google.com/maps?rlz=1C5CHFA_enAT1072AT1072&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIQCAEQLhivARjHARiABBiOBTIGCAIQRRhAMgoIAxAAGLEDGIAEMgoIBBAAGLEDGIAEMgcIBRAuGIAEMgYIBhBFGDwyBggHEEUYPdIBCDEwOTZqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=at&sa=X&geocode=KYOIqFSBB21HMdhFQR0PxhFg&daddr=Margaretenstra%C3%9Fe+25,+1040+Wien';

export function MobileActionBar({ onOpenReservation }: MobileActionBarProps) {
    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-[90] md:hidden
                 bg-parchment border-t border-gold
                 shadow-[0_-4px_20px_-5px_rgba(42,26,26,0.15)]
                 pb-[env(safe-area-inset-bottom)]"
            aria-label="Mobile Schnellaktionen"
        >
            <div className="grid grid-cols-3">
                {/* Call Button */}
                <a
                    href="tel:+4315856690"
                    className="flex flex-col items-center justify-center py-3 gap-1
                     text-primary transition-all duration-200
                     active:bg-primary/10 active:scale-95"
                >
                    <Phone className="w-6 h-6" />
                    <span className="text-[10px] uppercase tracking-wider font-medium">
                        Anrufen
                    </span>
                </a>

                {/* Reservation Button - Highlighted */}
                <button
                    onClick={onOpenReservation}
                    className="flex flex-col items-center justify-center py-3 gap-1
                     transition-all duration-200
                     active:scale-95"
                >
                    <div className="w-12 h-12 -mt-6 rounded-full bg-primary shadow-bacco
                          flex items-center justify-center
                          active:bg-[#63161c]">
                        <CalendarDays className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary -mt-1">
                        Reservieren
                    </span>
                </button>

                {/* Maps Button */}
                <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-3 gap-1
                     text-primary transition-all duration-200
                     active:bg-primary/10 active:scale-95"
                >
                    <MapPin className="w-6 h-6" />
                    <span className="text-[10px] uppercase tracking-wider font-medium">
                        Route
                    </span>
                </a>
            </div>
        </nav>
    );
}
