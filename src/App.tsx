import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, BarChart3 } from 'lucide-react';
import FieldView from './components/FieldView';
import Dashboard from './components/Dashboard';
import ThemeSwitcher from './components/ThemeSwitcher';
import type { ThemeId } from './types';

type Screen = 'field' | 'dashboard';

function App() {
  const [screen, setScreen] = useState<Screen>('field');
  const [theme, setTheme] = useState<ThemeId>('neon');
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div style={{
      height: '100dvh',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: 'var(--bg-primary)',
      transition: 'background 0.4s ease',
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        paddingTop: 'max(8px, env(safe-area-inset-top))',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 30,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {/* Logo */}
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '14px' }}>⚽</span>
          </div>
          <span style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            FootTracker
          </span>
        </div>
        <ThemeSwitcher
          currentTheme={theme}
          onThemeChange={setTheme}
          isOpen={themeSwitcherOpen}
          onToggle={() => setThemeSwitcherOpen(prev => !prev)}
        />
      </div>

      {/* Screen Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {screen === 'field' ? (
            <motion.div
              key="field"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ height: '100%', overflow: 'hidden' }}
            >
              <FieldView />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ height: '100%', overflow: 'auto' }}
            >
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        padding: '8px 24px',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 30,
      }}>
        {[
          { id: 'field' as Screen, icon: Map, label: 'Live Field' },
          { id: 'dashboard' as Screen, icon: BarChart3, label: 'Analytics' },
        ].map(item => {
          const isActive = screen === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => setScreen(item.id)}
              style={{
                flex: 1,
                maxWidth: '160px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '8px 12px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <item.icon
                size={20}
                style={{
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                }}
              />
              <span style={{
                fontSize: '11px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                transition: 'color 0.2s ease',
              }}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    width: '16px',
                    height: '3px',
                    borderRadius: '2px',
                    background: 'var(--accent-primary)',
                    marginTop: '1px',
                  }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 28 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
