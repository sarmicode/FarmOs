import React from 'react'
import { Link, useLocation } from 'react-router-dom'
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
    { label: 'Orders', path: '/orders', icon: 'package' },
    { label: 'Profile', path: '/profile', icon: 'user' }
  ]

  return (
    <div className="mobile-bottom-nav">
      {items.map((item, idx) => {
        const isActive = location.pathname === item.path

        return (
          <Link
            key={idx}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              fontSize: '0.72rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#10b981' : '#64748b'
            }}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
