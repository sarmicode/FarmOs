import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Icon } from './Icon'

/* =====================================================================
   FarmOS visual effects — attention-grabbing but lightweight primitives.
   ===================================================================== */

/** Thin emerald progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 10000,
        transformOrigin: '0% 50%', scaleX,
        background: 'linear-gradient(90deg, #0b3d2e, #10b981, #34d399)',
        boxShadow: '0 0 12px rgba(16,185,129,0.6)',
        pointerEvents: 'none',
      }}
    />
  )
}

/** Floating "back to top" button that appears after scrolling. */
export const BackToTop = ({ offset = 480 }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="btt"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          title="Back to top"
          className="fx-back-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          style={{
            position: 'fixed', left: 20, bottom: 'calc(24px + var(--safe-bottom))', zIndex: 9990,
            width: 44, height: 44, borderRadius: 14,
            background: '#ffffff', color: '#0b3d2e',
            border: '1px solid #d6e4db', boxShadow: '0 10px 28px rgba(11,35,25,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name="arrowUpRight" size={20} style={{ transform: 'rotate(-45deg)' }} />
          <style>{`@media (max-width: 768px){ .fx-back-to-top{ bottom: calc(84px + var(--safe-bottom)) !important; left: 14px !important; } }`}</style>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/** Card with a radial glow that follows the pointer. */
export const SpotlightCard = ({ children, className = '', style, as = 'div', ...rest }) => {
  const ref = useRef(null)
  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
  }, [])
  const Tag = as
  return (
    <Tag ref={ref} onMouseMove={onMove} className={`fx-spotlight ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  )
}

/** 3D tilt that follows the pointer (disabled on touch / reduced motion). */
export const TiltCard = ({ children, max = 8, scale = 1.015, style, className, glare = true }) => {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 20 })
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])
  const glareBg = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`)
  const [hover, setHover] = useState(false)

  const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches
  const disabled = reduce || isTouch

  const onMove = (e) => {
    if (disabled) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0); setHover(false) }

  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={{
        ...style,
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        position: 'relative',
      }}
      animate={{ scale: hover && !disabled ? scale : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
      {glare && !disabled && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: glareBg,
            opacity: hover ? 1 : 0, transition: 'opacity 0.3s',
          }}
        />
      )}
    </motion.div>
  )
}

/** Wraps a child so it gently follows the pointer (magnetic CTA). */
export const Magnetic = ({ children, strength = 0.25, style }) => {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18 })
  const sy = useSpring(y, { stiffness: 260, damping: 18 })
  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div onMouseMove={onMove} onMouseLeave={reset} style={{ display: 'inline-block', x: sx, y: sy, ...style }}>
      {children}
    </motion.div>
  )
}

/** Word-by-word text reveal. */
export const SplitText = ({ text, as = 'span', delay = 0, stagger = 0.045, className, style }) => {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.span
  const words = String(text).split(' ')
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{
              hidden: { y: '110%', opacity: 0, rotate: 4 },
              visible: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Typewriter — types `text` char by char with a blinking caret. Calls onDone when finished. */
export const Typewriter = ({ text, speed = 55, delay = 300, caret = true, onDone, className, style, as: Tag = 'span' }) => {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? text.length : 0)
  const [done, setDone] = useState(Boolean(reduce))
  useEffect(() => {
    if (reduce) { onDone?.(); return }
    let i = 0
    let timer
    const start = setTimeout(function tick() {
      i += 1
      setCount(i)
      if (i < text.length) timer = setTimeout(tick, speed + (text[i - 1] === ' ' ? 40 : 0))
      else { setDone(true); onDone?.() }
    }, delay)
    return () => { clearTimeout(start); clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, reduce])
  return (
    <Tag className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {caret && (
        <span aria-hidden="true" className={done ? 'fx-caret fx-caret-done' : 'fx-caret'} />
      )}
    </Tag>
  )
}

/** Infinite horizontal ticker. `items` are rendered twice for a seamless loop. */
export const Ticker = ({ items, render, speed = 45, style, className = '' }) => (
  <div className={`fx-marquee ${className}`} style={style} aria-hidden="false">
    {[0, 1].map((dup) => (
      <div key={dup} className="fx-marquee-track" style={{ '--marquee-speed': `${speed}s` }} aria-hidden={dup === 1}>
        {items.map((it, i) => (
          <React.Fragment key={`${dup}-${i}`}>{render(it, i)}</React.Fragment>
        ))}
      </div>
    ))}
  </div>
)

/** Segmented control with a sliding thumb. options: [{id,label,icon?}] */
export const Segmented = ({ options, value, onChange, style, className = '', id = 'seg' }) => (
  <div className={`fx-segmented ${className}`} style={style} role="tablist">
    {options.map((o) => {
      const active = o.id === value
      return (
        <button key={o.id} type="button" role="tab" aria-selected={active} data-active={active} onClick={() => onChange(o.id)}>
          {active && (
            <motion.span layoutId={`${id}-thumb`} className="fx-segmented-thumb" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
          )}
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            {o.icon && <Icon name={o.icon} size={15} />}
            {o.label}
          </span>
        </button>
      )
    })}
  </div>
)

/** Pulsing status dot ("live"). */
export const LivePulse = ({ color = '#10b981', size = 8 }) => (
  <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size }}>
    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color, opacity: 0.6, animation: 'fx-ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }} />
    <span style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: color }} />
  </span>
)

export default SpotlightCard
