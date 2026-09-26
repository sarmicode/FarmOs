import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { Icon } from './Icon'

export const MobileBottomNav = () => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !user) return null

  const getDashboardPath = () => {
    if (user.role === 'farmer') return '/farmer/dashboard'
    if (user.role === 'buyer') return '/buyer/dashboard'
    if (user.role === 'admin') return '/admin/dashboard'
    return '/'
  }

  const items = [
    { label: 'Home', path: getDashboardPath(), icon: 'layout' },
    { label: 'Market', path: '/market-prices', icon: 'chartUp' },
    { label: 'Opportunities', path: '/opportunities', icon: 'target', primary: true },
    { label: 'Orders', path: '/orders', icon: 'package' },
    { label: 'Profile', path: '/profile', icon: 'user' }
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation" style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(11, 61, 46, 0.96)' }}>
      {items.map((item) => {
        const isActive = location.pathname === item.path
        if (item.primary) {
          return (
            <Link key={item.path} to={item.path} aria-label={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', marginTop: -22 }}>
              <motion.span
                whileTap={{ scale: 0.9 }}
                animate={{ y: isActive ? -2 : 0 }}
                style={{
                  width: 54, height: 54, borderRadius: 18, display: 'grid', placeItems: 'center',
                  background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff',
                  boxShadow: '0 10px 24px rgba(16,185,129,0.45), 0 0 0 5px #0b3d2e'
                }}
                className={isActive ? '' : 'farmos-pulse-glow'}
              >
                <Icon name={item.icon} size={24} />
              </motion.span>
              <span style={{ fontSize: '0.66rem', fontWeight: 800, color: isActive ? '#34d399' : '#cbd5e1' }}>{item.label}</span>
            </Link>
          )
        }
        return (
          <Link
            key={item.path}
            to={item.path}
            aria-current={isActive ? 'page' : undefined}
            style={{
              position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
              fontSize: '0.68rem', fontWeight: isActive ? 800 : 500, color: isActive ? '#34d399' : '#94a3b8',
              minWidth: 56, minHeight: 48, textDecoration: 'none', padding: '4px 6px', borderRadius: 12
            }}
          >
            {isActive && (
              <motion.span layoutId="bottom-nav-active" transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                style={{ position: 'absolute', top: 0, width: 28, height: 3, borderRadius: 999, background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
            )}
            <motion.span animate={{ scale: isActive ? 1.12 : 1, y: isActive ? -1 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} style={{ display: 'flex' }}>
              <Icon name={item.icon} size={21} />
            </motion.span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
