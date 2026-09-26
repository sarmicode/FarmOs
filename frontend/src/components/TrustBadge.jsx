import React from 'react'
import { Icon } from './ui/Icon'

/**
 * TrustBadge component to standardise verification status presentation across FarmOS.
 * Accepts `status`, `role`, `sourceVerified`, or `size` ('sm', 'md', 'lg').
 *
 * NOTE: Previously this relied on Tailwind utility classes (e.g. `bg-emerald-100`),
 * but the project does not ship Tailwind — so badges rendered completely unstyled.
 * It now uses inline styles consistent with the rest of the app and crisp SVG icons
 * instead of emoji.
 */
const TrustBadge = ({ status, role = 'farmer', sourceVerified = null, size = 'md' }) => {
  let badge = { text: '', bg: '#f1f5f9', color: '#475569', border: '#cbd5e1', icon: 'circle' }

  const isVerified =
    status === 'verified' ||
    status === 'government_verified' ||
    status === 'official_registry_verified' ||
    sourceVerified === 'FarmOS Verified Business'

  if (role === 'farmer') {
    if (isVerified) {
      badge = { text: 'FarmOS Verified Farmer', bg: '#dcfce7', color: '#166534', border: '#a7f3d0', icon: 'shieldCheck' }
    } else if (status === 'pending') {
      badge = { text: 'Verification Pending', bg: '#fef3c7', color: '#92400e', border: '#fcd34d', icon: 'clock' }
    } else {
      badge = { text: 'Unverified Farmer', bg: '#f1f5f9', color: '#475569', border: '#cbd5e1', icon: 'circle' }
    }
  } else if (role === 'buyer') {
    if (isVerified) {
      badge = { text: 'FarmOS Verified Buyer', bg: '#dcfce7', color: '#166534', border: '#a7f3d0', icon: 'shieldCheck' }
    } else if (status === 'pending') {
      badge = { text: 'Registered Buyer (Pending Audit)', bg: '#e0f2fe', color: '#075985', border: '#7dd3fc', icon: 'clock' }
    } else {
      badge = { text: 'FarmOS Registered Buyer', bg: '#dbeafe', color: '#1e40af', border: '#93c5fd', icon: 'badgeCheck' }
    }
  } else if (role === 'trader' || role === 'public_trader') {
    if (isVerified) {
      badge = { text: 'FarmOS Verified Business', bg: '#dcfce7', color: '#166534', border: '#a7f3d0', icon: 'shieldCheck' }
    } else {
      badge = { text: 'Public Listing', bg: '#f1f5f9', color: '#475569', border: '#cbd5e1', icon: 'building' }
    }
  } else {
    // Admin or generic
    badge = { text: 'FarmOS Verified Admin', bg: '#f3e8ff', color: '#6b21a8', border: '#d8b4fe', icon: 'shieldCheck' }
  }

  const sizeStyles = {
    sm: { fontSize: '0.72rem', padding: '0.15rem 0.55rem', iconSize: 13 },
    md: { fontSize: '0.8rem', padding: '0.25rem 0.7rem', iconSize: 15 },
    lg: { fontSize: '0.9rem', padding: '0.35rem 0.85rem', iconSize: 17 },
  }[size] || { fontSize: '0.8rem', padding: '0.25rem 0.7rem', iconSize: 15 }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        borderRadius: 999,
        border: `1px solid ${badge.border}`,
        backgroundColor: badge.bg,
        color: badge.color,
        fontSize: sizeStyles.fontSize,
        fontWeight: 700,
        padding: sizeStyles.padding,
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
      }}
    >
      <Icon name={badge.icon} size={sizeStyles.iconSize} color={badge.color} strokeWidth={2.2} />
      <span>{badge.text}</span>
    </span>
  )
}

export default TrustBadge
