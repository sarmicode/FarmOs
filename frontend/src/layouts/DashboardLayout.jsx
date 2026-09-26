import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'
import { FloatingAssistant } from '../components/FloatingAssistant'
import { MobileBottomNav } from '../components/ui/MobileBottomNav'
import { PageTransition } from '../components/ui/Motion'
import { ScrollProgress, BackToTop } from '../components/ui/Effects'

export const DashboardLayout = () => {
  const { pathname } = useLocation()
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#f3f7f4', overflowX: 'hidden' }}>
      <ScrollProgress />

      {/* Left Dark Forest Sidebar (collapsible rail on tablets, hidden on phones) */}
      <div className="hidden-mobile-sidebar">
        <Sidebar />
      </div>

      {/* Right Column: Navbar + Main Scrollable Area */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, width: '100%' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '1.75rem 2rem', width: '100%', maxWidth: '1440px', margin: '0 auto', paddingBottom: '80px' }} className="dashboard-main-content">
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <FloatingAssistant />
      <BackToTop />
      <MobileBottomNav />

      <style>{`
        @media (max-width: 1100px) {
          .dashboard-main-content { padding: 1.5rem 1.25rem 90px 1.25rem !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile-sidebar { display: none !important; }
          .dashboard-main-content { padding: 1.25rem 1rem calc(96px + var(--safe-bottom)) 1rem !important; }
        }
        @media (max-width: 480px) {
          .dashboard-main-content { padding: 1rem 0.75rem calc(96px + var(--safe-bottom)) 0.75rem !important; }
        }
      `}</style>
    </div>
  )
}
