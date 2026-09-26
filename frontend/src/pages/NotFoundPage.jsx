import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../components/ui/Icon'

const quickLinks = [
  { to: '/', label: 'Home', icon: 'leaf' },
  { to: '/market-prices', label: 'Mandi Prices', icon: 'barChart' },
  { to: '/traders', label: 'Trader Directory', icon: 'store' },
  { to: '/assistant', label: 'AI Assistant', icon: 'bot' }
]

export const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.25rem',
        color: '#0b3d2e'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '96px',
          height: '96px',
          borderRadius: '28px',
          backgroundColor: '#e6f4ea',
          color: '#0b3d2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 12px 40px rgba(11, 61, 46, 0.12)'
        }}
      >
        <Icon name="sprout" size={48} strokeWidth={1.6} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: '4rem', fontWeight: 800, margin: 0, lineHeight: 1, letterSpacing: '-0.03em' }}
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0.75rem 0 0.5rem 0' }}
      >
        This field is empty
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ color: '#647d70', maxWidth: '420px', margin: '0 0 1.75rem 0', lineHeight: 1.6 }}
      >
        The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back to fertile ground.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center' }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.7rem 1.4rem',
            borderRadius: '12px',
            backgroundColor: '#0b3d2e',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
        >
          <Icon name="arrowLeft" size={16} />
          Return to Home
        </Link>

        {quickLinks.slice(1).map((l) => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.7rem 1.2rem',
              borderRadius: '12px',
              backgroundColor: '#ebf3ed',
              border: '1px solid #d6e4db',
              color: '#0b3d2e',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <Icon name={l.icon} size={16} />
            {l.label}
          </Link>
        ))}
      </motion.div>
    </div>
  )
}

export default NotFoundPage
