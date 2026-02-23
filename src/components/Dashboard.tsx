import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { initialStats, initialFreeZones } from '../data/mockData';
import { Activity, Target, Clock, TrendingUp, Image as ImageIcon, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
    const stats = initialStats;
    const zones = initialFreeZones;

    const containerAnim = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 22 } },
    };

    const formatMatchTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Generate placeholder gradient snapshots for free zone gallery
    const snapshotGradients = [
        'linear-gradient(135deg, #0d3b1e 0%, #1a5c34 40%, #0f8a3e 100%)',
        'linear-gradient(135deg, #0d3b1e 0%, #165a2f 50%, #22884d 100%)',
        'linear-gradient(135deg, #143d20 0%, #1d6e3c 40%, #0a9e45 100%)',
        'linear-gradient(135deg, #0e4425 0%, #187a3d 50%, #25a155 100%)',
        'linear-gradient(135deg, #0b3018 0%, #1b6835 40%, #1aad52 100%)',
    ];

    return (
        <motion.div
            variants={containerAnim}
            initial="hidden"
            animate="show"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '16px',
                gap: '14px',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}
        >
            {/* Header */}
            <motion.div variants={itemAnim}>
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                }}>
                    Analytics Dashboard
                </h1>
                <p style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px',
                }}>
                    Match analysis • {formatMatchTime(stats.matchTime)} elapsed
                </p>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div variants={itemAnim} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
            }}>
                {/* Match Time */}
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '14px',
                    padding: '14px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-card)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <Clock size={14} style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Match Time
                        </span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                        {formatMatchTime(stats.matchTime)}
                    </div>
                </div>

                {/* Free Zones */}
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '14px',
                    padding: '14px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-card)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <Target size={14} style={{ color: 'var(--accent-secondary)' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Free Zones
                        </span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {stats.freeZonesCount}
                    </div>
                </div>
            </motion.div>

            {/* Ball Possession */}
            <motion.div variants={itemAnim} style={{
                background: 'var(--bg-card)',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <Activity size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Ball Possession
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--team-a)', boxShadow: '0 0 6px var(--glow-a)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Team A</span>
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--team-a)' }}>{stats.possessionA}%</span>
                </div>
                {/* Possession Bar */}
                <div style={{
                    height: '8px',
                    borderRadius: '4px',
                    background: 'var(--bg-secondary)',
                    overflow: 'hidden',
                    display: 'flex',
                    marginBottom: '10px',
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.possessionA}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            height: '100%',
                            background: `linear-gradient(90deg, var(--team-a), var(--accent-secondary))`,
                            borderRadius: '4px 0 0 4px',
                        }}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.possessionB}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        style={{
                            height: '100%',
                            background: `linear-gradient(90deg, var(--accent-tertiary), var(--team-b))`,
                            borderRadius: '0 4px 4px 0',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--team-b)', boxShadow: '0 0 6px var(--glow-b)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Team B</span>
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--team-b)' }}>{stats.possessionB}%</span>
                </div>
            </motion.div>

            {/* Possession Over Time Chart */}
            <motion.div variants={itemAnim} style={{
                background: 'var(--bg-card)',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <TrendingUp size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Possession Over Time
                    </span>
                </div>
                <div style={{ width: '100%', height: '180px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.possessionHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--team-a)" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="var(--team-a)" stopOpacity={0.02} />
                                </linearGradient>
                                <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--team-b)" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="var(--team-b)" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                            <XAxis
                                dataKey="time"
                                tickFormatter={(v) => `${v}'`}
                                tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                                axisLine={{ stroke: 'var(--chart-grid)' }}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[30, 70]}
                                tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                                axisLine={{ stroke: 'var(--chart-grid)' }}
                                tickLine={false}
                                tickFormatter={(v) => `${v}%`}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    fontSize: '12px',
                                }}
                                labelFormatter={(v) => `Minute ${v}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="teamA"
                                stroke="var(--team-a)"
                                strokeWidth={2}
                                fill="url(#gradA)"
                                name="Team A"
                            />
                            <Area
                                type="monotone"
                                dataKey="teamB"
                                stroke="var(--team-b)"
                                strokeWidth={2}
                                fill="url(#gradB)"
                                name="Team B"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Performance Indicators */}
            <motion.div variants={itemAnim} style={{
                background: 'var(--bg-card)',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <Zap size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Performance Indicators
                    </span>
                </div>
                {[
                    { label: 'Sprint Distance', valueA: '4.2 km', valueB: '3.8 km', pctA: 55 },
                    { label: 'Passes Completed', valueA: '312', valueB: '287', pctA: 52 },
                    { label: 'Successful Tackles', valueA: '18', valueB: '22', pctA: 45 },
                ].map((stat, i) => (
                    <div key={i} style={{ marginBottom: i < 2 ? '12px' : 0 }}>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', marginBottom: '6px',
                        }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</span>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: 600 }}>
                                <span style={{ color: 'var(--team-a)' }}>{stat.valueA}</span>
                                <span style={{ color: 'var(--text-muted)' }}>vs</span>
                                <span style={{ color: 'var(--team-b)' }}>{stat.valueB}</span>
                            </div>
                        </div>
                        <div style={{
                            height: '4px',
                            borderRadius: '2px',
                            background: 'var(--bg-secondary)',
                            overflow: 'hidden',
                            display: 'flex',
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.pctA}%` }}
                                transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                                style={{
                                    height: '100%',
                                    background: 'var(--team-a)',
                                    borderRadius: '2px 0 0 2px',
                                }}
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${100 - stat.pctA}%` }}
                                transition={{ duration: 0.8, delay: i * 0.15 + 0.05, ease: 'easeOut' }}
                                style={{
                                    height: '100%',
                                    background: 'var(--team-b)',
                                    borderRadius: '0 2px 2px 0',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Free Zone Snapshots */}
            <motion.div variants={itemAnim} style={{
                background: 'var(--bg-card)',
                borderRadius: '14px',
                padding: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ImageIcon size={14} style={{ color: 'var(--accent-primary)' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Zone Snapshots
                        </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {zones.length} captured
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '10px',
                    overflowX: 'auto',
                    paddingBottom: '4px',
                }}>
                    {zones.map((zone, i) => (
                        <motion.div
                            key={zone.id}
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                minWidth: '130px',
                                height: '100px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                flexShrink: 0,
                                border: '1px solid var(--border-color)',
                            }}
                        >
                            {/* Simulated pitch snapshot with zone highlight */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: snapshotGradients[i % snapshotGradients.length],
                                position: 'relative',
                            }}>
                                {/* Mini pitch lines */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '8px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '2px',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: 0,
                                        bottom: 0,
                                        width: '1px',
                                        background: 'rgba(255,255,255,0.12)',
                                    }} />
                                </div>
                                {/* Highlighted zone */}
                                <div style={{
                                    position: 'absolute',
                                    left: `${zone.x * 0.8 + 10}%`,
                                    top: `${zone.y * 0.6 + 12}%`,
                                    width: `${zone.width * 0.8}%`,
                                    height: `${zone.height * 0.6}%`,
                                    background: 'var(--zone-highlight)',
                                    border: '1.5px solid var(--accent-primary)',
                                    borderRadius: '3px',
                                }} />
                                {/* Dots simulating players */}
                                {[...Array(6)].map((_, di) => (
                                    <div key={di} style={{
                                        position: 'absolute',
                                        left: `${15 + Math.random() * 70}%`,
                                        top: `${15 + Math.random() * 65}%`,
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        background: di < 3 ? 'var(--team-a)' : 'var(--team-b)',
                                        opacity: 0.7,
                                    }} />
                                ))}
                            </div>
                            {/* Label */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '6px 8px',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}>
                                <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff' }}>
                                    Zone {zone.id}
                                </span>
                                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>
                                    {Math.floor(zone.timestamp / 60)}'{(zone.timestamp % 60).toString().padStart(2, '0')}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Spacer for nav */}
            <div style={{ height: '70px', flexShrink: 0 }} />
        </motion.div>
    );
};

export default Dashboard;
