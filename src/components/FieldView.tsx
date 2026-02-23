import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Player, Ball, FreeZone, PlayerProfile } from '../types';
import { initialPlayers, initialFreeZones, simulateMatch } from '../data/mockData';
import { generateTacticalCommentary } from '../utils/analysisEngine';
import { MessageSquareText, Shield } from 'lucide-react';

interface SelectedPlayer extends Player { }

const FieldView: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>(initialPlayers);
    const [ball, setBall] = useState<Ball>({ x: 50, y: 50 });
    const [phase, setPhase] = useState<'BUILD_UP_A' | 'MIDFIELD' | 'ATTACK_A'>('MIDFIELD');
    const [freeZones] = useState<FreeZone[]>(initialFreeZones);
    const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayer | null>(null);
    const [commentary, setCommentary] = useState<string>('');
    const [scale, setScale] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const lastTouch = useRef<{ x: number; y: number } | null>(null);
    const lastDist = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Simulate match loop
    useEffect(() => {
        const interval = setInterval(() => {
            const result = simulateMatch(players, ball, Date.now());
            setPlayers(result.players);
            setBall(result.ball);
            if (result.phase) setPhase(result.phase);
        }, 100); // 10fps simulation update
        return () => clearInterval(interval);
    }, [players, ball]);

    // Live Commentary Generation
    useEffect(() => {
        if (selectedPlayer) {
            // Find live version of selected player
            const livePlayer = players.find(p => p.id === selectedPlayer.id);
            if (livePlayer) {
                const text = generateTacticalCommentary(livePlayer, ball, phase);
                setCommentary(text);
            }
        }
    }, [players, ball, phase, selectedPlayer]);

    const handlePlayerTap = useCallback((player: Player, e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setSelectedPlayer(prev => prev?.id === player.id ? null : player);
    }, []);

    const handleFieldTap = useCallback(() => {
        setSelectedPlayer(null);
    }, []);

    const handleProfileChange = (profile: PlayerProfile) => {
        if (!selectedPlayer) return;

        // Update both local selected state and main players array
        const updatedPlayers = players.map(p =>
            p.id === selectedPlayer.id ? { ...p, tacticalProfile: profile } : p
        );
        setPlayers(updatedPlayers);
        setSelectedPlayer({ ...selectedPlayer, tacticalProfile: profile });
    };

    // Touch handlers for zoom and pan
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            setIsPanning(true);
        } else if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastDist.current = Math.sqrt(dx * dx + dy * dy);
        }
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1 && lastTouch.current && isPanning) {
            const dx = e.touches[0].clientX - lastTouch.current.x;
            const dy = e.touches[0].clientY - lastTouch.current.y;
            setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2 && lastDist.current) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const scaleFactor = dist / lastDist.current;
            setScale(prev => Math.max(0.8, Math.min(3, prev * scaleFactor)));
            lastDist.current = dist;
        }
    }, [isPanning]);

    const handleTouchEnd = useCallback(() => {
        lastTouch.current = null;
        lastDist.current = null;
        setIsPanning(false);
    }, []);

    // Mouse wheel zoom for desktop
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        setScale(prev => Math.max(0.8, Math.min(3, prev * delta)));
    }, []);

    const resetView = useCallback(() => {
        setScale(1);
        setPanOffset({ x: 0, y: 0 });
    }, []);

    const tacticalProfiles: PlayerProfile[] = [
        'Sweeper Keeper', 'Shot Stopper', 'Ball Playing Defender', 'Stopper',
        'Wing Back', 'Inverted Fullback', 'Box to Box', 'Holding Midfielder',
        'Deep Lying Playmaker', 'Attacking Midfielder', 'Winger', 'Inside Forward',
        'Target Man', 'False 9'
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '16px',
                gap: '12px',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div>
                    <h1 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                    }}>
                        Live Field View
                    </h1>
                    <p style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginTop: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <span>Real-time player tracking • 39'</span>
                        {/* Phase Indicator */}
                        <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-color)',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'var(--accent-secondary)'
                        }}>
                            {phase.replace('_', ' ')}
                        </span>
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                    }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        LIVE
                    </span>
                </div>
            </div>

            {/* Score Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                padding: '10px 16px',
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Team A</span>
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: 'var(--team-a)',
                            boxShadow: `0 0 6px var(--glow-a)`,
                        }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginRight: '18px' }}>4-2-3-1</span>
                </div>
                <span style={{
                    fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)',
                    letterSpacing: '2px', fontVariantNumeric: 'tabular-nums',
                }}>
                    2 – 1
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: 'var(--team-b)',
                            boxShadow: `0 0 6px var(--glow-b)`,
                        }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Team B</span>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginLeft: '18px' }}>4-3-3</span>
                </div>
            </div>

            {/* Field Container */}
            <div
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                onClick={handleFieldTap}
                style={{
                    flex: 1,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    touchAction: 'none',
                    cursor: scale > 1 ? 'grab' : 'default',
                }}
            >
                <svg
                    viewBox="0 0 1050 680"
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transform: `scale(${scale}) translate(${panOffset.x / scale}px, ${panOffset.y / scale}px)`,
                        transition: isPanning ? 'none' : 'transform 0.2s ease-out',
                    }}
                >
                    {/* Pitch Background */}
                    <rect x="0" y="0" width="1050" height="680" fill="var(--pitch-bg)" />

                    {/* Grass stripes */}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <rect
                            key={`stripe-${i}`}
                            x={i * 105}
                            y="0"
                            width="105"
                            height="680"
                            fill={i % 2 === 0 ? 'transparent' : 'var(--pitch-grass-alt)'}
                        />
                    ))}

                    {/* Outer boundary */}
                    <rect x="30" y="30" width="990" height="620" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />

                    {/* Center line */}
                    <line x1="525" y1="30" x2="525" y2="650" stroke="var(--pitch-line)" strokeWidth="2" />

                    {/* Center circle */}
                    <circle cx="525" cy="340" r="91.5" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <circle cx="525" cy="340" r="4" fill="var(--pitch-line)" />

                    {/* Left penalty area */}
                    <rect x="30" y="138" width="165" height="404" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <rect x="30" y="220" width="55" height="240" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <circle cx="140" cy="340" r="4" fill="var(--pitch-line)" />
                    <path d="M 195 258 A 91.5 91.5 0 0 1 195 422" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />

                    {/* Right penalty area */}
                    <rect x="855" y="138" width="165" height="404" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <rect x="965" y="220" width="55" height="240" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <circle cx="910" cy="340" r="4" fill="var(--pitch-line)" />
                    <path d="M 855 258 A 91.5 91.5 0 0 0 855 422" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />

                    {/* Corner arcs */}
                    <path d="M 30 40 A 10 10 0 0 1 40 30" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <path d="M 1010 30 A 10 10 0 0 1 1020 40" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <path d="M 40 650 A 10 10 0 0 1 30 640" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />
                    <path d="M 1020 640 A 10 10 0 0 1 1010 650" fill="none" stroke="var(--pitch-line)" strokeWidth="2" />

                    {/* Goals */}
                    <rect x="15" y="290" width="15" height="100" fill="none" stroke="var(--pitch-line)" strokeWidth="2" rx="2" />
                    <rect x="1020" y="290" width="15" height="100" fill="none" stroke="var(--pitch-line)" strokeWidth="2" rx="2" />

                    {/* Free Zones */}
                    {freeZones.map(zone => (
                        <motion.rect
                            key={`zone-${zone.id}`}
                            x={(zone.x / 100) * 990 + 30}
                            y={(zone.y / 100) * 620 + 30}
                            width={(zone.width / 100) * 990}
                            height={(zone.height / 100) * 620}
                            fill="var(--zone-highlight)"
                            rx="6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    ))}

                    {/* Players */}
                    {players.map(player => {
                        const px = (player.x / 100) * 990 + 30;
                        const py = (player.y / 100) * 620 + 30;
                        const isSelected = selectedPlayer?.id === player.id;
                        const isTeamA = player.team === 'A';

                        return (
                            <g key={player.id} onClick={(e: any) => handlePlayerTap(player, e)} style={{ cursor: 'pointer' }}>
                                {/* Glow */}
                                <motion.circle
                                    cx={px}
                                    cy={py}
                                    r={isSelected ? 22 : 16}
                                    fill={isTeamA ? 'var(--glow-a)' : 'var(--glow-b)'}
                                    initial={false}
                                    animate={{
                                        cx: px, cy: py,
                                        opacity: isSelected ? 0.5 : 0.15,
                                    }}
                                    transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
                                />
                                {/* Player dot */}
                                <motion.circle
                                    cx={px}
                                    cy={py}
                                    r={isSelected ? 13 : 10}
                                    fill={isTeamA ? 'var(--team-a)' : 'var(--team-b)'}
                                    stroke={isSelected ? 'white' : 'rgba(255,255,255,0.3)'}
                                    strokeWidth={isSelected ? 2.5 : 1}
                                    initial={false}
                                    animate={{ cx: px, cy: py }}
                                    transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
                                />
                                {/* Number label */}
                                <motion.text
                                    x={px}
                                    y={py + 1}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill={isTeamA ? '#0a0e1a' : '#ffffff'}
                                    fontSize="8"
                                    fontWeight="700"
                                    fontFamily="Inter, sans-serif"
                                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                                    initial={false}
                                    animate={{ x: px, y: py + 1 }}
                                    transition={{ type: 'spring' as const, stiffness: 100, damping: 20 }}
                                >
                                    {player.number}
                                </motion.text>
                            </g>
                        );
                    })}

                    {/* Ball */}
                    <motion.circle
                        cx={(ball.x / 100) * 990 + 30}
                        cy={(ball.y / 100) * 620 + 30}
                        r="7"
                        fill="var(--ball-color)"
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="1.5"
                        initial={false}
                        animate={{
                            cx: (ball.x / 100) * 990 + 30,
                            cy: (ball.y / 100) * 620 + 30,
                        }}
                        transition={{ type: 'spring' as const, stiffness: 150, damping: 15 }}
                        style={{ filter: 'drop-shadow(0 0 6px var(--glow-ball))' }}
                    />
                </svg>

                {/* Zoom Controls */}
                <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); setScale(s => Math.min(3, s * 1.2)); }}
                        style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >+</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setScale(s => Math.max(0.8, s * 0.8)); }}
                        style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >−</button>
                    {scale !== 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); resetView(); }}
                            style={{
                                width: '32px', height: '32px', borderRadius: '8px',
                                background: 'var(--accent-primary)', border: 'none',
                                color: '#000', fontSize: '10px', fontWeight: 700,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >1:1</button>
                    )}
                </div>
            </div>

            {/* Player Info Card & Analyst Feed */}
            <AnimatePresence>
                {selectedPlayer && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '16px',
                            padding: '16px',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-card)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        {/* Header Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: selectedPlayer.team === 'A'
                                    ? 'linear-gradient(135deg, var(--team-a), var(--accent-secondary))'
                                    : 'linear-gradient(135deg, var(--team-b), var(--accent-tertiary))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '18px', fontWeight: 800, color: '#fff',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}>
                                {selectedPlayer.number}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {selectedPlayer.name}
                                </div>
                                <div style={{
                                    fontSize: '12px', color: 'var(--text-secondary)',
                                    display: 'flex', gap: '10px', marginTop: '2px', alignItems: 'center'
                                }}>
                                    <span>Team {selectedPlayer.team}</span>
                                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
                                    <span>#{selectedPlayer.number}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedPlayer(null)}
                                style={{
                                    background: 'none', border: 'none',
                                    color: 'var(--text-muted)', fontSize: '20px',
                                    cursor: 'pointer', padding: '4px',
                                }}
                            >✕</button>
                        </div>

                        {/* Tactical Role Selector */}
                        <div style={{
                            background: 'var(--bg-elevated)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                <Shield size={14} />
                                <span style={{ fontWeight: 500 }}>Role:</span>
                            </div>
                            <select
                                value={selectedPlayer.tacticalProfile || ''}
                                onChange={(e) => handleProfileChange(e.target.value as PlayerProfile)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--accent-primary)',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    textAlign: 'right',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="" disabled>Select Role</option>
                                {tacticalProfiles.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        {/* Analyst Feed */}
                        <div style={{
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '10px',
                            padding: '12px',
                            borderLeft: '3px solid var(--accent-secondary)',
                            display: 'flex',
                            gap: '10px',
                        }}>
                            <MessageSquareText size={18} color="var(--accent-secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    LIVE ANALYSIS
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'var(--text-primary)',
                                    lineHeight: '1.4',
                                    fontStyle: 'italic'
                                }}>
                                    "{commentary || "Analyzing movement patterns..."}"
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FieldView;
