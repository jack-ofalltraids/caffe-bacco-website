import { useState } from 'react';
import { Palette, X, ChevronRight, ChevronLeft, ChevronsLeftRight } from 'lucide-react';

const DESIGNS = [
    { id: 'v1', label: 'V1 – Classica', description: 'Original warm parchment', color: '#7C1C23' },
    { id: 'v2', label: 'V2 – Editoriale', description: 'Dark cinematic editorial', color: '#C4673A' },
    { id: 'v3', label: 'V3 – Riviera', description: 'Light Mediterranean elegance', color: '#8C7355' },
    { id: 'v4', label: 'V4 – Trattoria', description: 'Retro Italian holiday vibes', color: '#C03328' },
    { id: 'v5', label: 'V5 – Bottega', description: 'Ultra-minimal, typography-driven', color: '#111111' },
    { id: 'v6', label: 'V6 – Aperitivo', description: 'Golden hour Art Déco elegance', color: '#C5A55A' },
    { id: 'v7', label: 'V7 – Ceramica', description: 'Cobalt blue, arches & circles', color: '#2B5A8C' },
    { id: 'v8', label: 'V8 – Piazza', description: 'Architectural arches & mosaic', color: '#A0522D' },
    { id: 'v9', label: 'V9 – Giardino', description: 'Organic blobs & garden curves', color: '#6B7F5E' },
];

function getCurrentDesign(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get('design') || 'v1';
}

function switchTo(id: string) {
    const url = new URL(window.location.href);
    if (id === 'v1') {
        url.searchParams.delete('design');
    } else {
        url.searchParams.set('design', id);
    }
    window.location.href = url.toString();
}

function getCurrentIndex(): number {
    const current = getCurrentDesign();
    return DESIGNS.findIndex(d => d.id === current);
}

export function DesignSwitcher() {
    const [open, setOpen] = useState(false);
    const current = getCurrentDesign();
    const currentIdx = getCurrentIndex();
    const currentDesign = DESIGNS[currentIdx];
    const hasPrev = currentIdx > 0;
    const hasNext = currentIdx < DESIGNS.length - 1;

    const navBtnStyle = (enabled: boolean): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(30, 28, 25, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: enabled ? '#F0E8D8' : 'rgba(240,232,216,0.2)',
        cursor: enabled ? 'pointer' : 'default',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        transition: 'all 0.2s ease',
        opacity: enabled ? 1 : 0.4,
    });

    return (
        <>
            {/* ── Prev / Next nav (always visible) ── */}
            <div style={{
                position: 'fixed',
                bottom: '5rem',
                right: '1.25rem',
                zIndex: 9991,
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
            }}>
                {/* Prev */}
                <button
                    onClick={() => hasPrev && switchTo(DESIGNS[currentIdx - 1].id)}
                    aria-label="Vorheriges Design"
                    style={navBtnStyle(hasPrev)}
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Current indicator + Panel toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Design-Varianten"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        height: '2.25rem',
                        padding: '0 0.75rem',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(30, 28, 25, 0.85)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        color: '#F0E8D8',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: currentDesign?.color || '#888',
                        boxShadow: `0 0 6px ${currentDesign?.color || '#888'}50`,
                        flexShrink: 0,
                    }} />
                    <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        whiteSpace: 'nowrap',
                    }}>
                        {currentIdx + 1}/{DESIGNS.length}
                    </span>
                    {open ? <X size={13} /> : <ChevronsLeftRight size={13} />}
                </button>

                {/* Next */}
                <button
                    onClick={() => hasNext && switchTo(DESIGNS[currentIdx + 1].id)}
                    aria-label="Nächstes Design"
                    style={navBtnStyle(hasNext)}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* ── Panel ── */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '8.25rem',
                    right: '1.25rem',
                    zIndex: 9989,
                    width: '280px',
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    background: 'rgba(30, 28, 25, 0.92)',
                    backdropFilter: 'blur(20px) saturate(1.2)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
                    padding: '1rem',
                    transform: open ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'bottom right',
                }}
            >
                {/* Title */}
                <div style={{
                    fontSize: '0.625rem',
                    fontWeight: 500,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(240, 232, 216, 0.4)',
                    marginBottom: '0.75rem',
                    fontFamily: 'system-ui, sans-serif',
                }}>
                    Design-Varianten
                </div>

                {/* Design List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {DESIGNS.map((d) => {
                        const isActive = d.id === current;

                        return (
                            <button
                                key={d.id}
                                onClick={() => !isActive && switchTo(d.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.6rem 0.75rem',
                                    background: isActive
                                        ? 'rgba(240, 232, 216, 0.08)'
                                        : 'transparent',
                                    border: isActive
                                        ? '1px solid rgba(240, 232, 216, 0.12)'
                                        : '1px solid transparent',
                                    borderRadius: '8px',
                                    cursor: isActive ? 'default' : 'pointer',
                                    opacity: 1,
                                    transition: 'all 0.2s ease',
                                    width: '100%',
                                    textAlign: 'left',
                                    fontFamily: 'system-ui, sans-serif',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'rgba(240, 232, 216, 0.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                {/* Color dot */}
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: d.color,
                                    flexShrink: 0,
                                    boxShadow: isActive ? `0 0 8px ${d.color}60` : 'none',
                                }} />

                                {/* Text */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '0.8125rem',
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#F0E8D8' : 'rgba(240, 232, 216, 0.7)',
                                        lineHeight: 1.3,
                                    }}>
                                        {d.label}
                                    </div>
                                    <div style={{
                                        fontSize: '0.6875rem',
                                        color: 'rgba(240, 232, 216, 0.35)',
                                        lineHeight: 1.3,
                                        marginTop: '1px',
                                    }}>
                                        {d.description}
                                    </div>
                                </div>

                                {/* Arrow or Active indicator */}
                                {isActive ? (
                                    <div style={{
                                        fontSize: '0.5625rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: d.color,
                                        flexShrink: 0,
                                    }}>
                                        Aktiv
                                    </div>
                                ) : (
                                    <ChevronRight size={14} color="rgba(240, 232, 216, 0.3)" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Keyboard hint */}
                <div style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(240, 232, 216, 0.06)',
                    fontSize: '0.625rem',
                    color: 'rgba(240, 232, 216, 0.3)',
                    fontFamily: 'system-ui, sans-serif',
                    lineHeight: 1.5,
                }}>
                    💡 Nutze ◀ ▶ zum schnellen Durchschalten oder kopiere die URL zum Teilen.
                </div>
            </div>
        </>
    );
}
