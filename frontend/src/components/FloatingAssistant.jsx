import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { FarmOSAssistant } from './FarmOSAssistant'
import { Icon } from './ui/Icon'

const EASE = [0.16, 1, 0.3, 1]

export const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(() => sessionStorage.getItem('farmos.ai.hint') === '1')
  const { pathname } = useLocation()

  // The full-page assistant already lives on /assistant — no need to double up.
  const hidden = pathname === '/assistant'

  useEffect(() => {
    if (hintDismissed) return
    const t = setTimeout(() => { setHintDismissed(true); sessionStorage.setItem('farmos.ai.hint', '1') }, 9000)
    return () => clearTimeout(t)
  }, [hintDismissed])

  // Lock page scroll behind the sheet on phones
  useEffect(() => {
    const isPhone = window.matchMedia('(max-width: 768px)').matches
    if (isOpen && isPhone) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (hidden) return null

  return (
    <div className={`floating-assistant-wrapper ${isOpen ? 'is-open' : ''}`} style={{ position: 'fixed', bottom: 'calc(24px + var(--safe-bottom))', right: '24px', zIndex: 9999 }}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="fab"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem' }}
          >
            {/* Attention hint bubble */}
            <AnimatePresence>
              {!hintDismissed && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, x: 10, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ delay: 1.2, duration: 0.4, ease: EASE }}
                  className="fab-hint"
                  style={{
                    background: '#fff', border: '1px solid #d6e4db', borderRadius: 14, padding: '0.6rem 0.8rem',
                    boxShadow: '0 12px 30px rgba(11,35,25,0.14)', fontSize: '0.8rem', color: '#10231b', fontWeight: 600, maxWidth: 210, position: 'relative'
                  }}
                >
                  <button onClick={() => { setHintDismissed(true); sessionStorage.setItem('farmos.ai.hint', '1') }} aria-label="Dismiss"
                    style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: '#0b3d2e', color: '#fff', display: 'grid', placeItems: 'center' }}>
                    <Icon name="x" size={11} />
                  </button>
                  <span style={{ color: '#10b981' }}>Hi!</span> Ask me which mandi pays best today 🌾
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="fab-button"
              style={{
                padding: '0.65rem 1.2rem 0.65rem 0.65rem', borderRadius: '30px', background: 'linear-gradient(135deg,#0b2319,#0b3d2e)',
                border: '2px solid #10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.6rem', position: 'relative',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
              title="Open FarmOS AI Assistant"
              aria-label="Ask FarmOS AI"
            >
              <span style={{ position: 'relative', width: 32, height: 32, display: 'grid', placeItems: 'center' }}>
                <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981', opacity: 0.5, animation: 'fx-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
                <span style={{ position: 'relative', width: 32, height: 32, borderRadius: '50%', backgroundColor: '#10b981', color: '#0b2319', display: 'grid', placeItems: 'center' }}>
                  <Icon name="sparkles" size={17} color="#0b2319" />
                </span>
              </span>
              <span className="fab-label">Ask FarmOS AI</span>
            </motion.button>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="panel"
            className="floating-assistant-panel"
            role="dialog" aria-label="FarmOS AI Assistant"
            initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              width: '450px', maxWidth: 'calc(100vw - 24px)', height: '620px', maxHeight: 'calc(100vh - 40px)',
              backgroundColor: '#ffffff', border: '1px solid #10b981', borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg,#0b2319,#0b3d2e)', padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
            }}>
              <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="sparkles" size={18} color="#34d399" />
                FarmOS AI Assistant
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,0.15)', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(52,211,153,0.3)' }}>LIVE</span>
              </span>
              <motion.button
                whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#e2e8f0', cursor: 'pointer', width: 32, height: 32, borderRadius: 10, display: 'grid', placeItems: 'center' }}
                title="Close Assistant (Esc)" aria-label="Close Assistant"
              >
                <Icon name="x" size={18} />
              </motion.button>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <FarmOSAssistant isCompact={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .floating-assistant-wrapper { bottom: calc(84px + var(--safe-bottom)) !important; right: 14px !important; }
          /* Open state = full-screen sheet, sized with dvh so the browser UI never covers it */
          .floating-assistant-wrapper.is-open { inset: 0 !important; bottom: 0 !important; right: 0 !important; }
          .floating-assistant-panel {
            width: 100vw !important; max-width: 100vw !important;
            height: 100dvh !important; max-height: 100dvh !important;
            border-radius: 0 !important; border: none !important;
            padding-top: env(safe-area-inset-top, 0px);
            padding-bottom: var(--safe-bottom);
          }
          .fab-hint { display: none; }
        }
        @media (max-width: 420px) {
          .fab-button { padding: 0.5rem !important; }
          .fab-label { display: none; }
        }
      `}</style>
    </div>
  )
}
