import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Icon, StatusDot } from './ui/Icon'

// Strip emoji / pictographs that the backend may still embed inside
// `badge_label` strings, so the UI never renders OS-dependent glyphs.
const stripEmoji = (value) =>
  typeof value === 'string'
    ? value
        .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F1E6}-\u{1F1FF}\u{2190}-\u{21FF}]/gu, '')
        .replace(/\s{2,}/g, ' ')
        .trim()
    : ''

export const PotentialBuyersCard = ({ buyers = [] }) => {
  const { t } = useLanguage()
  if (!buyers || buyers.length === 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(22, 27, 34, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        marginTop: '1rem',
        color: '#8b949e',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Icon name="info" size={18} color="#8b949e" />
        <span>{t('opportunity.noPotentialBuyers')} <a href="/traders" style={{ color: '#fbbf24' }}>{t('opportunity.checkDirectory')}</a></span>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: 'rgba(22, 27, 34, 0.85)',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      borderRadius: '16px',
      padding: '1.25rem 1.5rem',
      marginTop: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      color: '#f0f6fc'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Icon name="handshake" size={22} color="#60a5fa" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60a5fa', margin: 0 }}>
            {t('opportunity.potentialBuyersTitle')} ({buyers.length})
          </h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontStyle: 'italic' }}>
          {t('opportunity.potentialBuyersSubtitle')}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {buyers.map((b, idx) => {
          // Derive trust state from the robust `verification_status` field rather
          // than parsing emoji out of `badge_label` (which previously made the
          // colour logic fragile and coupled to display strings).
          const status = b?.verification_status
          const isVerified = status === 'source_verified' || status === 'verified'
          const isWebsiteVerified = status === 'website_verified'
          const dotColor = isVerified ? '#22c55e' : isWebsiteVerified ? '#3b82f6' : '#a855f7'
          const badgeLabel = stripEmoji(b?.badge_label) || (
            isVerified
              ? 'FarmOS Verified Business'
              : isWebsiteVerified
                ? 'Public Business Info'
                : 'Public Listing'
          )
          const phoneNum = b?.public_phone || b?.phone

          return (
            <div
              key={b?.id || idx}
              style={{
                backgroundColor: 'rgba(13, 17, 23, 0.7)',
                border: isVerified
                  ? '1px solid rgba(34, 197, 94, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.98rem', color: '#f0f6fc' }}>{b?.business_name || 'Verified Buyer'}</strong>
                </div>

                {/* Badge */}
                <div style={{ marginBottom: '0.6rem' }}>
                  <span style={{
                    backgroundColor: isVerified
                      ? 'rgba(34, 197, 94, 0.15)'
                      : isWebsiteVerified
                        ? 'rgba(59, 130, 246, 0.15)'
                        : 'rgba(168, 85, 247, 0.15)',
                    color: isVerified ? '#4ade80' : isWebsiteVerified ? '#60a5fa' : '#c084fc',
                    border: '1px solid currentColor',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <StatusDot color={dotColor} size={8} />
                    {badgeLabel}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#c9d1d9', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Icon name="mapPin" size={14} color="#8b949e" /><span><strong>Location:</strong> {b?.location || 'Location Not Specified'}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Icon name="package" size={14} color="#8b949e" /><span><strong>Capacity:</strong> {b?.buying_capacity || 'N/A'}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Icon name="wheat" size={14} color="#8b949e" /><span><strong>Commodities:</strong> <span style={{ color: '#fbbf24' }}>{b?.commodities || 'Various Crops'}</span></span></div>
                </div>
              </div>

              {/* Contact Actions */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                {b?.official_website && (
                  <a
                    href={b.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      border: '1px solid #3b82f6',
                      color: '#60a5fa',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Icon name="globe" size={13} />
                    Website
                  </a>
                )}

                {phoneNum && (
                  <a
                    href={`tel:${phoneNum}`}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid #22c55e',
                      color: '#4ade80',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Icon name="phone" size={13} />
                    Call
                  </a>
                )}

                {b?.source_url && (
                  <a
                    href={b.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#c9d1d9',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Icon name="link" size={13} />
                    Source
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
