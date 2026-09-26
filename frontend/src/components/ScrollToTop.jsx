import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to the top whenever the route changes, so a page opened
 * from a button at the bottom of a long page never appears "already scrolled".
 * Hash links (#section) are respected, and the jump is instant (not smooth)
 * so the user doesn't watch the page fly past.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'auto', block: 'start' }); return }
    }
    // Temporarily disable CSS smooth scrolling for an instant jump
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    html.style.scrollBehavior = prev
  }, [pathname, search, hash])

  return null
}

export default ScrollToTop
