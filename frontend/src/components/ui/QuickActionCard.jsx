import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from './Icon'

const colorStyles = {
  emerald: { bg: '#e6f4ea', color: '#10b981' },
  blue: { bg: '#e0f2fe', color: '#0284c7' },
  amber: { bg: '#fef3c7', color: '#d97706' },
  purple: { bg: '#f3e8ff', color: '#9333ea' }
}

export const QuickActionCard = ({ icon, title, description, color = 'emerald', onClick, badge }) => {
  const c = colorStyles[color] || colorStyles.emerald

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className="quick-action-card fx-spotlight"
      style={{
        width: '100%', textAlign: 'left',
        backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px',
        padding: '1rem 1.15rem', display: 'flex', alignItems: 'center', gap: '1rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)', cursor: 'pointer', minHeight: 72, position: 'relative'
      }}
    >
      <span style={{
        width: '46px', height: '46px', borderRadius: '13px', backgroundColor: c.bg, color: c.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }} className="quick-action-icon">
        <Icon name={icon} size={22} color={c.color} />
      </span>

      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: '0.93rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
          {title}
          {badge && <span style={{ fontSize: '0.62rem', fontWeight: 800, padding: '2px 7px', borderRadius: 999, background: '#dcfce7', color: '#166534', letterSpacing: '0.04em' }}>{badge}</span>}
        </span>
        <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '1px', display: 'block' }}>
          {description}
        </span>
      </span>

      <span className="quick-action-arrow" style={{ color: '#94a3b8', display: 'flex', flexShrink: 0 }}>
        <Icon name="arrowRight" size={18} />
      </span>

      <style>{`
        .quick-action-card:hover { border-color: #10b981 !important; box-shadow: 0 10px 26px rgba(16, 185, 129, 0.14) !important; }
        .quick-action-card:hover .quick-action-arrow { transform: translateX(4px); color: #10b981; }
        .quick-action-card:hover .quick-action-icon { transform: scale(1.06) rotate(-4deg); }
        .quick-action-arrow, .quick-action-icon { transition: transform 0.25s var(--fx-ease), color 0.2s; }
      `}</style>
    </motion.button>
  )
}
