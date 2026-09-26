import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { Icon } from './ui/Icon'

const STORAGE_KEY = 'farmos.sidebar.collapsed'

export const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  // Collapsed by default on tablets (≤1100px), remembered afterwards.
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return saved === '1'
    return typeof window !== 'undefined' && window.innerWidth <= 1100
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0') }, [collapsed])

  if (!isAuthenticated || !user) return null

  const getDashboardPath = () => {
    if (user.role === 'farmer') return '/farmer/dashboard'
    if (user.role === 'buyer') return '/buyer/dashboard'
    if (user.role === 'admin') return '/admin/dashboard'
    return '/dashboard'
  }

  const groups = [
    {
      title: 'Overview',
      links: [
        { label: 'Dashboard', path: getDashboardPath(), icon: 'layout' },
        { label: 'Market Prices', path: '/market-prices', icon: 'chartUp' },
        { label: 'Marketplace', path: '/marketplace', icon: 'store' },
      ],
    },
    {
      title: 'Operations',
      links: [
        { label: 'My Harvests', path: user.role === 'farmer' ? '/farmer/dashboard' : '/marketplace', icon: 'wheat', hideIfDup: true },
        { label: 'Orders', path: '/orders', icon: 'package' },
        { label: 'Market Opportunities', path: '/opportunities', icon: 'target' },
        { label: 'Weather', path: '/weather', icon: 'cloudSun' },
        { label: 'Trader Directory', path: '/traders', icon: 'users' },
        { label: 'AI Assistant', path: '/assistant', icon: 'bot' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Profile', path: '/profile', icon: 'user' },
        { label: 'Settings', path: '/settings', icon: 'settings' },
      ],
    },
  ]

  const width = collapsed ? 76 : 248

  return (
    <motion.aside
      animate={{ width }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        width,
        background: 'linear-gradient(180deg, #0b2319 0%, #0a1f16 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', flexDirection: 'column',
        padding: '1rem 0.7rem',
        flexShrink: 0, height: '100vh',
        position: 'sticky', top: 0, left: 0, zIndex: 100,
        overflow: 'hidden',
      }}
      className="farmos-sidebar"
    >
      {/* Brand + collapse toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: '0.25rem 0.35rem 1rem', gap: '0.5rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }} aria-label="FarmOS home">
          <motion.div whileHover={{ rotate: 8, scale: 1.05 }} style={{
            width: '38px', height: '38px', borderRadius: '11px', background: 'linear-gradient(135deg,#10b981,#059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0b2319', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)', flexShrink: 0
          }}>
            <Icon name="leaf" size={22} color="#0b2319" strokeWidth={2.5} />
          </motion.div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}
                style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
              >
                Farm<span style={{ color: '#10b981' }}>OS</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <button
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand' : 'Collapse'}
        className="sidebar-toggle"
        style={{
          position: 'absolute', top: 22, right: -1, width: 22, height: 44, borderRadius: '10px 0 0 10px',
          background: 'rgba(16,185,129,0.18)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', borderRight: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}
      >
        <motion.span animate={{ rotate: collapsed ? 0 : 180 }} style={{ display: 'flex' }}>
          <Icon name="chevronRight" size={15} />
        </motion.span>
      </button>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 2 }} className="sidebar-nav" aria-label="Dashboard">
        {groups.map((g, gi) => {
          const seen = new Set()
          const links = g.links.filter((l) => { if (seen.has(l.path)) return false; seen.add(l.path); return true })
          return (
            <div key={g.title} style={{ marginTop: gi === 0 ? 0 : '0.9rem' }}>
              <AnimatePresence initial={false}>
                {!collapsed ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4f6b5d', padding: '0 0.75rem 0.4rem' }}>
                    {g.title}
                  </motion.div>
                ) : (
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0.6rem 0.5rem' }} />
                )}
              </AnimatePresence>

              {links.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path + link.label}
                    to={link.path}
                    title={collapsed ? link.label : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className="sidebar-link"
                    style={{
                      position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: collapsed ? '0.7rem 0' : '0.62rem 0.85rem', justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: '11px', fontSize: '0.86rem', fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#ffffff' : '#94a3b8', minHeight: 42, whiteSpace: 'nowrap',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        style={{ position: 'absolute', inset: 0, borderRadius: 11, background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.35)', boxShadow: 'inset 0 0 20px rgba(16,185,129,0.12)' }}
                      />
                    )}
                    {isActive && !collapsed && (
                      <motion.span layoutId="sidebar-bar" style={{ position: 'absolute', left: -2, top: 10, bottom: 10, width: 3, borderRadius: 3, background: '#34d399' }} />
                    )}
                    <span style={{ position: 'relative', zIndex: 1, color: isActive ? '#34d399' : '#64748b', display: 'flex' }} className="sidebar-icon">
                      <Icon name={link.icon} size={19} />
                    </span>
                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }}
                          style={{ position: 'relative', zIndex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {link.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Footer: user + logout */}
      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '0.9rem 0.9rem', borderRadius: '14px', marginBottom: '0.6rem',
                background: 'linear-gradient(160deg, rgba(16, 185, 129, 0.22) 0%, rgba(11, 35, 25, 0.6) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)', position: 'relative', overflow: 'hidden'
              }} className="fx-glow-border">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
                  <Icon name="sparkles" size={15} color="#34d399" className="farmos-bob" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>Ask FarmOS AI</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: '#a7bfb2', lineHeight: 1.4, margin: '0 0 0.6rem' }}>
                  Best mandi, freight cost or weather — in plain language.
                </p>
                <button onClick={() => navigate('/assistant')} className="fx-btn fx-btn-emerald fx-btn-sm fx-btn-block" style={{ minHeight: 34 }}>
                  <Icon name="bot" size={14} /> Open Assistant
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: collapsed ? 'center' : 'space-between', padding: '0.2rem 0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }} title={user.name}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            {!collapsed && (
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 110 }}>{user.name}</div>
                <div style={{ fontSize: '0.68rem', color: '#7f978a', textTransform: 'capitalize' }}>{user.role}</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button onClick={() => { logout(); navigate('/login') }} aria-label="Logout" title="Logout"
              style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(239,68,68,0.12)', color: '#f87171', display: 'grid', placeItems: 'center' }}
              className="sidebar-logout">
              <Icon name="logout" size={16} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .sidebar-link:hover { color: #e2e8f0 !important; background: rgba(255,255,255,0.04); }
        .sidebar-link:hover .sidebar-icon { color: #34d399 !important; transform: translateX(1px); }
        .sidebar-icon { transition: color 0.2s, transform 0.2s; }
        .sidebar-toggle:hover { background: rgba(16,185,129,0.3) !important; }
        .sidebar-logout:hover { background: rgba(239,68,68,0.22) !important; }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </motion.aside>
  )
}
