import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

/**
 * FarmOS <Button />
 * -----------------
 * One button to rule them all: consistent variants, sizes, icon slots, a
 * loading state and a material-style ripple on press. Renders a <button>,
 * a router <Link> (when `to` is given) or an <a> (when `href` is given).
 *
 *   <Button variant="primary" icon="arrowRight" iconRight onClick={...}>Go</Button>
 *   <Button to="/register" variant="emerald" size="lg">Get Started</Button>
 *   <Button variant="outline" loading>Saving…</Button>
 */
export const Button = ({
  children,
  variant = 'primary',   // primary | emerald | secondary | outline | ghost | danger | dark
  size = 'md',           // sm | md | lg
  icon,                  // Icon name (left by default)
  iconRight = false,
  loading = false,
  block = false,
  to,
  href,
  className = '',
  onClick,
  disabled,
  type = 'button',
  ...rest
}) => {
  const ripple = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const span = document.createElement('span')
    span.className = 'fx-ripple'
    span.style.width = span.style.height = `${size}px`
    span.style.left = `${e.clientX - rect.left - size / 2}px`
    span.style.top = `${e.clientY - rect.top - size / 2}px`
    el.appendChild(span)
    setTimeout(() => span.remove(), 650)
  }, [])

  const handleClick = (e) => {
    if (disabled || loading) return
    if (e.clientX !== undefined) ripple(e)
    onClick?.(e)
  }

  const classes = [
    'fx-btn',
    `fx-btn-${variant}`,
    size !== 'md' ? `fx-btn-${size}` : '',
    block ? 'fx-btn-block' : '',
    className,
  ].filter(Boolean).join(' ')

  const iconSize = size === 'sm' ? 15 : size === 'lg' ? 20 : 17
  const content = (
    <>
      {loading ? <span className="fx-spinner" aria-hidden="true" /> : (icon && !iconRight && <Icon name={icon} size={iconSize} />)}
      {children && <span>{children}</span>}
      {!loading && icon && iconRight && <Icon name={icon} size={iconSize} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick} aria-disabled={disabled || loading} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick} aria-disabled={disabled || loading} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={classes} onClick={handleClick} disabled={disabled || loading} aria-busy={loading} {...rest}>
      {content}
    </button>
  )
}

export default Button
