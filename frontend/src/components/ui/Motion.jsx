import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'

/**
 * FarmOS Motion Primitives
 * ------------------------
 * Small, reusable framer-motion building blocks so "heavy" animation can be
 * applied consistently and safely across the app without scattering ad-hoc
 * animation code. All primitives gracefully degrade when the user prefers
 * reduced motion.
 */

// Shared easing that matches the landing page feel.
export const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const staggerParent = (stagger = 0.08, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
})

/**
 * Reveal — fades + slides its children into view the first time they scroll
 * into the viewport. Falls back to a plain fade-in when reduced motion is on.
 */
export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  once = true,
  amount = 0.2,
  as = 'div',
  style,
  className,
}) => {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Stagger + StaggerItem — orchestrate a list of children so they animate in
 * sequence (classic "heavy" staggered entrance).
 */
export const Stagger = ({ children, stagger = 0.09, delay = 0, as = 'div', style, className }) => {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerParent(stagger, delay)}
    >
      {children}
    </MotionTag>
  )
}

export const StaggerItem = ({ children, y = 24, as = 'div', style, className }) => {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag className={className} style={style} variants={fadeUp}>
      {children}
    </MotionTag>
  )
}

/**
 * HoverLift — interactive card wrapper with a spring lift + press feedback.
 */
export const HoverLift = ({ children, lift = -6, scale = 1.02, style, className, onClick }) => (
  <motion.div
    className={className}
    style={style}
    onClick={onClick}
    whileHover={{ y: lift, scale }}
    whileTap={{ scale: 0.985 }}
    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
  >
    {children}
  </motion.div>
)

/**
 * PageTransition — subtle enter animation for routed page content.
 */
export const PageTransition = ({ children, className, style }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: EASE }}
  >
    {children}
  </motion.div>
)

/**
 * AnimatedNumber — counts up to `value` when scrolled into view.
 * Accepts a formatter (e.g. Indian-locale grouping) and a prefix/suffix.
 */
export const AnimatedNumber = ({ value = 0, duration = 1.2, prefix = '', suffix = '', format, className, style }) => {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  const formatted =
    typeof format === 'function'
      ? format(display)
      : Math.round(display).toLocaleString('en-IN')

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/**
 * ProgressBar — animates its fill width when scrolled into view.
 * Great for the FarmOS Opportunity Score (0–100).
 */
export const ProgressBar = ({ value = 0, max = 100, color = '#10b981', height = 8, track = 'rgba(255,255,255,0.12)', delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div ref={ref} style={{ width: '100%', height, borderRadius: 999, background: track, overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', borderRadius: 999, background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      />
    </div>
  )
}

export default Reveal
