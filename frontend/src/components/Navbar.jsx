import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { Icon } from './ui/Icon'
import { Button } from './ui/Button'

const EASE = [0.16, 1, 0.3, 1]

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { setMobileMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the drawer is open (mobile)
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/market-prices?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const publicNavLinks = [
    { label: 'Home', path: '/', icon: 'layout' },
    { label: 'Market Prices', path: '/market-prices', icon: 'chartUp' },
    { label: 'Opportunities', path: '/marketplace', icon: 'target' },
    { label: 'Traders', path: '/traders', icon: 'users' },
    { label: 'Weather', path: '/weather', icon: 'cloudSun' },
    { label: 'Assistant', path: '/assistant', icon: 'bot' }
  ]

  const LangPill = () => (
    <div style={{
      display: 'flex', alignItems: 'center', backgroundColor: '#f4f8f5', border: '1px solid #d6e4db',
      borderRadius: '20px', padding: '2px', fontSize: '0.8rem', position: 'relative'
    }} role="group" aria-label="Language">
      {[{ id: 'en', label: 'English' }, { id: 'hi', label: 'हिंदी' }].map((l) => (
        <button
          key={l.id}
          onClick={() => setLanguage(l.id)}
          aria-pressed={language === l.id}
          style={{
            position: 'relative', background: 'transparent', color: language === l.id ? '#ffffff' : '#647d70',
            border: 'none', borderRadius: '16px', padding: '0.3rem 0.75rem', fontSize: '0.8rem',
            fontWeight: language === l.id ? 700 : 500, cursor: 'pointer', minHeight: 30
          }}
        >
          {language === l.id && (
            <motion.span layoutId="lang-thumb" transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              style={{ position: 'absolute', inset: 0, borderRadius: 16, background: '#0b3d2e', zIndex: 0 }} />
          )}
          <span style={{ position: 'relative', zIndex: 1 }}>{l.label}</span>
        </button>
      ))}
    </div>
  )

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        position: 'sticky', top: 0, zIndex: 999, width: '100%',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.82)' : '#ffffff',
        borderBottom: `1px solid ${scrolled ? 'rgba(214,228,219,0.9)' : '#e4eee7'}`,
        boxShadow: scrolled ? '0 8px 30px rgba(11, 35, 25, 0.08)' : '0 2px 10px rgba(11, 35, 25, 0.03)',
        backdropFilter: 'saturate(180%) blur(14px)', WebkitBackdropFilter: 'saturate(180%) blur(14px)',
        transition: 'background-color 0.3s, box-shadow 0.3s, border-color 0.3s'
      }}
    >
      <div style={{
        maxWidth: '1380px', margin: '0 auto',
        padding: scrolled ? '0.55rem 1.5rem' : '0.85rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem', width: '100%',
        transition: 'padding 0.3s ease'
      }} className="navbar-inner">
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }} aria-label="FarmOS home">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            style={{
              width: '38px', height: '38px', borderRadius: '12px', backgroundColor: '#10b981', color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Icon name="leaf" size={24} color="#ffffff" />
          </motion.div>
          <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0b3d2e', letterSpacing: '-0.025em' }}>
            Farm<span style={{ color: '#10b981' }}>OS</span>
          </span>
        </Link>

        {/* Center */}
        {isAuthenticated ? (
          <form onSubmit={handleSearchSubmit} className="topbar-search" style={{ flex: 1, maxWidth: '420px' }} role="search">
            <motion.div
              whileFocus={{ scale: 1.01 }}
              style={{
                display: 'flex', alignItems: 'center', backgroundColor: '#f4f8f5', border: '1px solid #d6e4db',
                borderRadius: '24px', padding: '0.45rem 1.1rem', gap: '0.6rem', transition: 'box-shadow 0.2s, border-color 0.2s'
              }}
              className="topbar-search-box"
            >
              <Icon name="search" size={16} color="#647d70" />
              <input
                type="text"
                placeholder="Search mandi prices, crops, buyers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#10231b', fontSize: '0.88rem', width: '100%', fontWeight: 500 }}
              />
              <kbd className="topbar-kbd">↵</kbd>
            </motion.div>
          </form>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile-nav" aria-label="Primary">
            {publicNavLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link-pill"
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    position: 'relative', padding: '0.45rem 0.8rem', borderRadius: 10,
                    color: isActive ? '#0b3d2e' : '#475569', fontWeight: isActive ? 800 : 600, fontSize: '0.9rem', textDecoration: 'none'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      style={{ position: 'absolute', left: 10, right: 10, bottom: 1, height: 3, borderRadius: 999, background: 'linear-gradient(90deg,#10b981,#34d399)' }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
        )}

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="hidden-mobile-nav"><LangPill /></div>

          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Button variant="primary" size="sm" icon="layout" onClick={() => navigate('/dashboard')} className="hidden-mobile-nav">
                Dashboard
              </Button>
              <motion.div
                whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/profile')}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/profile')}
                aria-label="Open profile"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f4f8f5', border: '1px solid #d6e4db',
                  padding: '0.25rem 0.75rem 0.25rem 0.3rem', borderRadius: '20px', cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 0 0 2px #fff, 0 0 0 3px #a7f3d0'
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#10231b', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="hidden-mobile-nav">
                  {user.name}
                </span>
              </motion.div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }} className="hidden-mobile-nav">
              <Button to="/login" variant="outline" size="sm">Login</Button>
              <Button to="/register" variant="primary" size="sm" icon="arrowRight" iconRight>Register</Button>
            </div>
          )}

          {/* Hamburger */}
          <motion.button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            whileTap={{ scale: 0.92 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '12px',
              backgroundColor: mobileMenuOpen ? '#0b3d2e' : '#f4f8f5', border: '1px solid #d6e4db', color: mobileMenuOpen ? '#fff' : '#0b3d2e', cursor: 'pointer'
            }}
          >
            <motion.span
              key={mobileMenuOpen ? 'x' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}
              style={{ display: 'flex' }}
            >
              <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={22} />
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="mobile-drawer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, top: '100%', height: '100vh', background: 'rgba(11,35,25,0.35)', backdropFilter: 'blur(3px)', zIndex: -1 }}
            />
            <motion.div
              key="drawer"
              className="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #d6e4db', overflow: 'hidden', maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}
            >
              <motion.div
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
                style={{ padding: '1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
              >
                {isAuthenticated && user && (
                  <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 14, background: '#f4f8f5', border: '1px solid #d6e4db', marginBottom: '0.5rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800 }}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, color: '#10231b', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#647d70', textTransform: 'capitalize' }}>{user.role}</div>
                    </div>
                  </motion.div>
                )}

                {publicNavLinks.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <motion.div key={item.path} variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem', color: isActive ? '#0b3d2e' : '#10231b', fontWeight: isActive ? 800 : 600,
                          fontSize: '0.98rem', padding: '0.75rem 0.85rem', borderRadius: 12, textDecoration: 'none', minHeight: 48,
                          background: isActive ? '#dcfce7' : 'transparent'
                        }}
                      >
                        <Icon name={item.icon} size={19} color={isActive ? '#10b981' : '#647d70'} />
                        {item.label}
                        {isActive && <Icon name="chevronRight" size={16} style={{ marginLeft: 'auto' }} color="#10b981" />}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }} style={{ padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#647d70' }}>Language</span>
                  <LangPill />
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                  {isAuthenticated ? (
                    <>
                      <Button variant="primary" icon="layout" block onClick={() => { setMobileMenuOpen(false); navigate('/dashboard') }}>Dashboard</Button>
                      <Button variant="danger" icon="logout" onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button to="/login" variant="outline" block>Login</Button>
                      <Button to="/register" variant="primary" block icon="arrowRight" iconRight>Register</Button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-pill:hover { background: rgba(16,185,129,0.08); color: #0b3d2e !important; }
        .topbar-search-box:focus-within { border-color: #10b981 !important; box-shadow: 0 0 0 4px rgba(16,185,129,0.15); background: #fff !important; }
        .topbar-kbd { font-size: 0.68rem; color: #8fa598; border: 1px solid #d6e4db; border-radius: 6px; padding: 1px 6px; background: #fff; }
        @media (max-width: 1024px) {
          .navbar-inner { gap: 0.75rem !important; }
          .nav-link-pill { padding: 0.45rem 0.6rem !important; font-size: 0.85rem !important; }
        }
        @media (max-width: 900px) {
          .topbar-search { display: none !important; }
          .hidden-mobile-nav { display: none !important; }
          .navbar-inner { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
        @media (min-width: 901px) {
          .mobile-hamburger { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </motion.header>
  )
}
