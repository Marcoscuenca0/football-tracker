import React from 'react';
import { motion } from 'framer-motion';
import type { ThemeId, ThemeOption } from '../types';
import { Palette } from 'lucide-react';

const themes: ThemeOption[] = [
    { id: 'neon', label: 'Neon Night', description: 'Dark mode with neon accents' },
    { id: 'light', label: 'Clean Day', description: 'Light minimal design' },
    { id: 'navy', label: 'Pro Navy', description: 'Deep navy with gold' },
];

interface ThemeSwitcherProps {
    currentTheme: ThemeId;
    onThemeChange: (theme: ThemeId) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
    currentTheme,
    onThemeChange,
    isOpen,
    onToggle,
}) => {
    const themeColors: Record<ThemeId, string> = {
        neon: '#00f0ff',
        light: '#3b82f6',
        navy: '#d4a537',
    };

    return (
        <div style={{ position: 'relative' }}>
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onToggle}
                style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--accent-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                }}
            >
                <Palette size={18} />
            </motion.button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onToggle}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 40,
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -8 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '8px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '14px',
                            padding: '8px',
                            width: '200px',
                            boxShadow: 'var(--shadow-card)',
                            zIndex: 50,
                        }}
                    >
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            padding: '6px 8px 4px',
                        }}>
                            Design Variation
                        </div>
                        {themes.map(theme => (
                            <motion.button
                                key={theme.id}
                                whileHover={{ backgroundColor: 'var(--bg-card-hover)' }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    onThemeChange(theme.id);
                                    onToggle();
                                }}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: currentTheme === theme.id
                                        ? `1.5px solid ${themeColors[theme.id]}`
                                        : '1.5px solid transparent',
                                    background: currentTheme === theme.id ? 'var(--bg-card-hover)' : 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '6px',
                                    background: themeColors[theme.id],
                                    flexShrink: 0,
                                    boxShadow: currentTheme === theme.id
                                        ? `0 0 10px ${themeColors[theme.id]}80`
                                        : 'none',
                                }} />
                                <div>
                                    <div style={{
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                    }}>
                                        {theme.label}
                                    </div>
                                    <div style={{
                                        fontSize: '10px',
                                        color: 'var(--text-muted)',
                                        marginTop: '1px',
                                    }}>
                                        {theme.description}
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default ThemeSwitcher;
