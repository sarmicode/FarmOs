import React from 'react'
import { motion } from 'framer-motion'
import TrustBadge from '../TrustBadge'
import { Icon } from './Icon'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return { text: 'Good morning', icon: 'sun' }
  if (h < 17) return { text: 'Good afternoon', icon: 'cloudSun' }
  return { text: 'Good evening', icon: 'sprout' }
}

export const HeroBanner = ({ userName, location, verificationStatus, role = 'farmer' }) => {
  const g = greeting()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })
  return (
    <motion.div initial={{ opacity: 0, y: 16, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="hero-banner" style={{
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      marginBottom: '1.75rem',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
      minHeight: '180px',
      display: 'flex',
      alignItems: 'center',
      padding: '2rem',
      background: 'linear-gradient(90deg, rgba(11, 35, 25, 0.85) 0%, rgba(15, 51, 34, 0.6) 60%, rgba(0, 0, 0, 0.2) 100%), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{ color: '#ffffff', maxWidth: '650px', zIndex: 2 }}>
        <h1 style={{ fontSize: '1.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {g.text}, {userName || (role === 'buyer' ? 'Buyer' : 'Farmer')}
          <motion.span animate={{ rotate: [0, 12, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }} style={{ display: 'inline-flex' }}>
            <Icon name={g.icon} size={26} color="#6ee7b7" />
          </motion.span>
        </h1>
        <div style={{ fontSize: '0.78rem', color: '#a7f3d0', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{today}</div>
        <p style={{ fontSize: '0.95rem', color: '#e2e8f0', marginBottom: '1rem', fontWeight: 500 }}>
          Let's find the best opportunity for your harvest today.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Location Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#ffffff'
          }}>
            <Icon name="mapPin" size={15} color="#ffffff" />
            <span>{location || 'West Bengal, Kolkata'}</span>
          </div>

          {/* Verification Badge */}
          <TrustBadge status={verificationStatus} role={role} size="sm" />
        </div>
      </div>

      {/* Floating Motivational Quote Card (Top Right) */}
      <div className="hidden-mobile-quote" style={{
        position: 'absolute',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        borderRadius: '16px',
        padding: '1rem 1.25rem',
        maxWidth: '240px',
        color: '#ffffff',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Icon name="sprout" size={20} color="#6ee7b7" />
          <p style={{ fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
            Better decisions today. Bigger harvests tomorrow.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile-quote { display: none !important; }
        }
        @media (max-width: 600px) {
          .hero-banner { padding: 1.35rem !important; min-height: 150px !important; }
          .hero-banner h1 { font-size: 1.45rem !important; }
        }
      `}</style>
    </motion.div>
  )
}
