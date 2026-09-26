import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from './Icon'
import { AnimatedNumber } from './Motion'

const colorStyles = {
  emerald: { bg: '#e6f4ea', color: '#10b981', glow: 'rgba(16,185,129,0.18)' },
  blue: { bg: '#e0f2fe', color: '#0284c7', glow: 'rgba(2,132,199,0.18)' },
  amber: { bg: '#fef3c7', color: '#d97706', glow: 'rgba(217,119,6,0.18)' },
  purple: { bg: '#f3e8ff', color: '#9333ea', glow: 'rgba(147,51,234,0.18)' }
}

/**
 * MetricCard — KPI tile. Numeric `value`s count up when scrolled into view;
 * strings render as-is. Pass `loading` to show a skeleton, `trend` (+/-%)
 * for a small delta chip.
 */
export const MetricCard = ({ icon, title, value, subtitle, color = 'emerald', onClick, loading = false, trend, prefix = '', suffix = '' }) => {
  const c = colorStyles[color] || colorStyles.emerald
  const numeric = typeof value === 'number' && Number.isFinite(value)

  return (
    <motion.div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => onClick && e.key === 'Enter' && onClick(e)}
      whileHover={onClick ? { y: -4, scale: 1.01 } : { y: -2 }}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="fx-spotlight"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '18px',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        cursor: onClick ? 'pointer' : 'default',
        minHeight: 96,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* soft colour wash top-right */}
      <span aria-hidden="true" style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, borderRadius: '50%', background: c.glow, filter: 'blur(18px)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
        <motion.div
          whileHover={{ rotate: -8 }}
          style={{
            width: '48px', height: '48px', borderRadius: '14px', backgroundColor: c.bg, color: c.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: `inset 0 0 0 1px ${c.glow}`
          }}
        >
          <Icon name={icon} size={22} color={c.color} />
        </motion.div>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>
            {title}
          </span>
          {loading ? (
            <div className="fx-skeleton" style={{ width: 90, height: 28, marginTop: 6 }} />
          ) : (
            <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span>{numeric ? <AnimatedNumber value={value} prefix={prefix} suffix={suffix} duration={1} /> : value}</span>
              {trend !== undefined && trend !== null && (
                <span style={{
                  fontSize: '0.72rem', fontWeight: 800, padding: '2px 7px', borderRadius: 999,
                  background: trend >= 0 ? '#dcfce7' : '#fee2e2', color: trend >= 0 ? '#166534' : '#b91c1c'
                }}>
                  {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
                </span>
              )}
            </div>
          )}
          {subtitle && (
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', display: 'block' }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {onClick && (
        <motion.div style={{ color: '#94a3b8', display: 'flex' }} whileHover={{ x: 3 }}>
          <Icon name="chevronRight" size={20} />
        </motion.div>
      )}
    </motion.div>
  )
}
