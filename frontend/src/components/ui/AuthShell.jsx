import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from './Icon'

const EASE = [0.16, 1, 0.3, 1]

/**
 * AuthShell — split-screen frame for Login / Register.
 * Left: animated brand panel with value props. Right: the form card.
 * Collapses to a single column on tablets & phones.
 */
export const AuthShell = ({ title, subtitle, children, footer, wide = false }) => {
  const perks = [
    { icon: 'chartUp', text: 'Live Agmarknet mandi prices' },
    { icon: 'truck', text: 'Real road-distance freight costs' },
    { icon: 'cloudSun', text: 'Hyper-local weather advisories' },
    { icon: 'shieldCheck', text: 'Verified traders & buyers' },
  ]

  return (
    <div className="auth-shell">
      <motion.aside
        className="auth-brand-panel"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="auth-brand-orb auth-brand-orb-a" aria-hidden="true" />
        <div className="auth-brand-orb auth-brand-orb-b" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#fff', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
            <span style={{ width: 38, height: 38, borderRadius: 11, background: '#10b981', display: 'grid', placeItems: 'center', boxShadow: '0 6px 18px rgba(16,185,129,0.4)' }}>
              <Icon name="leaf" size={22} color="#0b2319" strokeWidth={2.5} />
            </span>
            Farm<span style={{ color: '#34d399' }}>OS</span>
          </Link>

          <div style={{ marginTop: 'auto', marginBottom: 'auto', padding: '2.5rem 0' }}>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
              style={{ color: '#fff', fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', margin: 0 }}
            >
              Connecting Every Harvest<br />to Its <span style={{ color: '#34d399' }}>Best Opportunity</span>
            </motion.h2>
            <motion.ul
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } } }}
              style={{ listStyle: 'none', padding: 0, margin: '1.75rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
            >
              {perks.map((p) => (
                <motion.li key={p.text} variants={{ hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0 } }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cde0d5', fontSize: '0.95rem', fontWeight: 600 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(16,185,129,0.16)', border: '1px solid rgba(16,185,129,0.3)', display: 'grid', placeItems: 'center', color: '#34d399', flexShrink: 0 }}>
                    <Icon name={p.icon} size={17} />
                  </span>
                  {p.text}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ padding: '1rem 1.1rem', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p style={{ margin: 0, color: '#e2f5ea', fontSize: '0.9rem', lineHeight: 1.5, fontStyle: 'italic' }}>
              “Birbhum paid ₹250 more per quintal than my local mandi — FarmOS showed me it was still worth it after freight.”
            </p>
            <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#8fa598', fontWeight: 700 }}>— Ramesh, potato farmer, Hooghly</div>
          </motion.div>
        </div>
      </motion.aside>

      <motion.div
        className="auth-form-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
      >
        <motion.div layout className="auth-card" style={{ maxWidth: wide ? 640 : 480 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
          <h2 className="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
          {footer && <p className="auth-footer-text">{footer}</p>}
        </motion.div>
      </motion.div>
    </div>
  )
}

/** Password input with visibility toggle + optional strength meter. */
export const PasswordField = ({ id = 'password', name = 'password', value, onChange, placeholder = '••••••••', label, required = true, showStrength = false, autoComplete }) => {
  const [visible, setVisible] = useState(false)
  const strength = (() => {
    if (!showStrength || !value) return 0
    let s = 0
    if (value.length >= 6) s++
    if (value.length >= 10) s++
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) s++
    if (/\d/.test(value) || /[^A-Za-z0-9]/.test(value)) s++
    return s
  })()
  const colors = ['#e2e8f0', '#ef4444', '#f59e0b', '#10b981', '#059669']
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          type={visible ? 'text' : 'password'}
          id={id}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          style={{ paddingRight: '3rem' }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 34, height: 34, borderRadius: 9, background: 'transparent', color: '#647d70', display: 'grid', placeItems: 'center' }}
          className="pw-toggle"
        >
          <Icon name={visible ? 'eyeOff' : 'eye'} size={17} />
        </button>
      </div>
      {showStrength && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
          <div style={{ display: 'flex', gap: 4, flex: 1 }}>
            {[1, 2, 3, 4].map((i) => (
              <motion.span key={i} animate={{ background: i <= strength ? colors[strength] : '#e2e8f0' }} style={{ height: 4, flex: 1, borderRadius: 999 }} />
            ))}
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: colors[strength], minWidth: 44, textAlign: 'right' }}>{labels[strength]}</span>
        </div>
      )}
    </div>
  )
}

export default AuthShell
