import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { FloatingAssistant } from '../components/FloatingAssistant'
import { PageTransition } from '../components/ui/Motion'

// Routes that use the dark "market-data" surface (mandi prices, weather,
// marketplace, AI assistant). On these, the page background is switched to the
// dark theme so the light --text-primary content stays readable.
const DARK_SURFACE_ROUTES = ['/weather', '/market-prices', '/market', '/marketplace', '/assistant']

export const MainLayout = () => {
  const { pathname } = useLocation()
  const isDarkSurface = DARK_SURFACE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      backgroundColor: isDarkSurface ? 'var(--bg-primary)' : 'transparent'
    }}>
      <Navbar />
      <main style={{ flex: 1, padding: '1.5rem 1rem', width: '100%', maxWidth: '100%' }} className="main-content-area">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingAssistant />

      <style>{`
        @media (max-width: 480px) {
          .main-content-area {
            padding: 1rem 0.6rem !important;
          }
        }
      `}</style>
    </div>
  )
}
