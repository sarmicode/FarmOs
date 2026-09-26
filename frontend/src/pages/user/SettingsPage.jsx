import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { updateProfileApi } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  borderRadius: '16px',
  boxShadow: '0 2px 10px rgba(11, 35, 25, 0.04)',
  border: '1px solid #e2e8f0'
}

const SettingsPage = () => {
  const { user, updateUser, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const navigate = useNavigate()

  const [savingConsent, setSavingConsent] = useState(false)
  const [consentMsg, setConsentMsg] = useState('')

  const handleToggleConsent = async () => {
    setSavingConsent(true)
    setConsentMsg('')
    try {
      const updatedConsent = !user?.show_contact_publicly
      const res = await updateProfileApi({ show_contact_publicly: updatedConsent })
      if (res && res.user) {
        updateUser(res.user)
        setConsentMsg('Privacy preference updated successfully.')
      }
    } catch (err) {
      setConsentMsg('Failed to update privacy preference.')
    } finally {
      setSavingConsent(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const languageOptions = [
    { code: 'en', label: 'English', sub: 'Default Language' },
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi Language' }
  ]

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '2rem 1rem', color: '#0f172a' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a' }}>{t('settings.title', 'Settings & Preferences')}</h1>
        <p style={{ color: '#64748b', marginTop: '0.25rem' }}>{t('settings.subtitle', 'Manage language preferences, privacy settings, and account options.')}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Language Card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="globe" size={20} color="#0f172a" /> Language / भाषा
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>Choose your preferred application display language.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {languageOptions.map((opt) => {
              const active = language === opt.code
              return (
                <button
                  key={opt.code}
                  onClick={() => setLanguage(opt.code)}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: active ? '2px solid #10b981' : '1px solid #e2e8f0',
                    backgroundColor: active ? '#ecfdf5' : '#ffffff',
                    color: active ? '#065f46' : '#334155',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontWeight: active ? 700 : 500
                  }}
                >
                  <div>
                    <span style={{ display: 'block', fontSize: '1rem' }}>{opt.label}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748b' }}>{opt.sub}</span>
                  </div>
                  {active && <Icon name="checkCircle" size={20} color="#10b981" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Privacy & Contact Consent Card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="lock" size={20} color="#0f172a" /> Privacy & Public Contact Consent
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
            By default, your phone number and email are kept private. Enable this option if you want potential buyers or farmers to contact you directly via the directory.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem', display: 'block' }}>Show Phone & Email Publicly</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {user?.show_contact_publicly ? 'Enabled - Public users can view your contact details' : 'Disabled - Contact details hidden'}
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(user?.show_contact_publicly)}
              onClick={handleToggleConsent}
              disabled={savingConsent}
              style={{
                position: 'relative',
                width: '48px',
                height: '26px',
                flexShrink: 0,
                borderRadius: '999px',
                border: 'none',
                cursor: savingConsent ? 'not-allowed' : 'pointer',
                backgroundColor: user?.show_contact_publicly ? '#10b981' : '#cbd5e1',
                transition: 'background-color 0.2s',
                opacity: savingConsent ? 0.6 : 1
              }}
            >
              <span style={{
                position: 'absolute',
                top: '3px',
                left: user?.show_contact_publicly ? '25px' : '3px',
                width: '20px',
                height: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
            </button>
          </div>
          {consentMsg && <p style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 500, marginTop: '0.5rem' }}>{consentMsg}</p>}
        </div>

        {/* Account Details & Logout Card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="user" size={20} color="#0f172a" /> Account Overview
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Logged in as</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>{user?.name}</span>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Role</span>
              <span style={{ fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{user?.role}</span>
            </div>
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.65rem 1.5rem',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontWeight: 500,
                borderRadius: '12px',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Icon name="logout" size={16} />
              Sign Out of FarmOS
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export { SettingsPage }
export default SettingsPage
