import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { AuthShell, PasswordField } from '../../components/ui/AuthShell'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { motion, AnimatePresence } from 'framer-motion'
import './auth.css'

export const RegisterPage = () => {
  const { t } = useLanguage()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    role: 'farmer',
    
    // Optional buyer fields
    business_name: '',
    state: 'West Bengal',
    district: '',
    mandi: '',
    commodities: '',
    buying_capacity: '',
    enam_reference: '',
    udyam_reference: '',
    official_website: '',
    show_contact_publicly: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (formData.role !== 'farmer' && formData.role !== 'buyer') {
      setError('Registration is only allowed for Farmer or Buyer accounts.')
      setLoading(false)
      return
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        role: formData.role
      }

      if (formData.role === 'buyer') {
        payload.business_name = formData.business_name || formData.name + ' Traders'
        payload.state = formData.state || 'West Bengal'
        payload.district = formData.district || formData.location
        payload.mandi = formData.mandi
        payload.commodities = formData.commodities
        payload.buying_capacity = formData.buying_capacity
        payload.enam_reference = formData.enam_reference
        payload.udyam_reference = formData.udyam_reference
        payload.official_website = formData.official_website
        payload.show_contact_publicly = formData.show_contact_publicly
      }

      const response = await API.post('/auth/register', payload)

      const loginRes = await API.post('/auth/login', {
        email: formData.email,
        password: formData.password
      })

      const { token, user } = loginRes.data
      login(token, user)

      navigate('/profile', { replace: true })

    } catch (err) {
      console.error('Registration API Call Failed:', err)
      const serverMsg = err.response?.data?.message || err.message
      setError(serverMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title={t('auth.join')}
      subtitle={t('auth.joinSub')}
      wide={formData.role === 'buyer'}
      footer={<>{t('auth.alreadyAccount')} <Link to="/login">{t('nav.login')}</Link></>}
    >
        <AnimatePresence>
          {error && (
            <motion.div key="err" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="alert-message alert-error" role="alert" style={{ marginBottom: '1rem' }}>
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div key="ok" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="alert-message alert-success" role="status" style={{ marginBottom: '1rem' }}>
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>{t('auth.accountType')} *</label>
            <div className="role-picker" role="radiogroup" aria-label={t('auth.accountType')}>
              {[
                { id: 'farmer', label: t('auth.roleFarmer'), icon: 'wheat', desc: 'Sell harvests, compare mandis' },
                { id: 'buyer', label: t('auth.roleBuyer'), icon: 'store', desc: 'Source produce from farmers' },
              ].map((r) => {
                const active = formData.role === r.id
                return (
                  <motion.button
                    type="button" key={r.id} role="radio" aria-checked={active}
                    whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => handleChange({ target: { name: 'role', value: r.id, type: 'button' } })}
                    className={`role-option ${active ? 'is-active' : ''}`}
                  >
                    {active && <motion.span layoutId="role-active" className="role-option-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <span className="role-option-icon"><Icon name={r.icon} size={20} /></span>
                    <span style={{ position: 'relative', zIndex: 1 }}>
                      <span style={{ display: 'block', fontWeight: 800, fontSize: '0.92rem' }}>{r.label}</span>
                      <span style={{ display: 'block', fontSize: '0.72rem', opacity: 0.8 }}>{r.desc}</span>
                    </span>
                    {active && <Icon name="checkCircle" size={18} color="#10b981" style={{ marginLeft: 'auto', position: 'relative', zIndex: 1 }} />}
                  </motion.button>
                )
              })}
            </div>
            {/* keep a real select for form semantics / autofill */}
            <select id="role" name="role" value={formData.role} onChange={handleChange} required style={{ display: 'none' }} aria-hidden="true" tabIndex={-1}>
              <option value="farmer">{t('auth.roleFarmer')}</option>
              <option value="buyer">{t('auth.roleBuyer')}</option>
            </select>
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="form-group">
              <label htmlFor="name">{t('auth.fullName')} *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('auth.emailAddr')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="e.g. ramesh@farmos.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <PasswordField
              label={`${t('auth.password')} *`}
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              showStrength
            />

            <div className="form-group">
              <label htmlFor="phone">{t('auth.phoneNum')} *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">{t('auth.locationDist')} *</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              placeholder="e.g. Bardhaman, West Bengal"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buyer Specific Fields */}
          {formData.role === 'buyer' && (
            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <h4 style={{ color: '#60a5fa', margin: '0 0 0.85rem 0', fontSize: '0.92rem' }}>
                {t('auth.buyerBusinessProfile')}
              </h4>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label htmlFor="business_name">{t('auth.businessName')}</label>
                <input
                  type="text"
                  id="business_name"
                  name="business_name"
                  className="form-control"
                  placeholder="e.g. Bengal Grain Processors Ltd."
                  value={formData.business_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label htmlFor="commodities">{t('directory.commoditiesPurchased')}</label>
                  <input
                    type="text"
                    id="commodities"
                    name="commodities"
                    className="form-control"
                    placeholder="e.g. Potato, Rice, Wheat"
                    value={formData.commodities}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="buying_capacity">{t('directory.buyingCapacity')}</label>
                  <input
                    type="text"
                    id="buying_capacity"
                    name="buying_capacity"
                    className="form-control"
                    placeholder="e.g. 500 MT/month"
                    value={formData.buying_capacity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                <div className="form-group">
                  <label htmlFor="enam_reference">{t('auth.optEnamRef')}</label>
                  <input
                    type="text"
                    id="enam_reference"
                    name="enam_reference"
                    className="form-control"
                    placeholder="e.g. ENAM/WB/TR/9041"
                    value={formData.enam_reference}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="udyam_reference">{t('auth.optUdyamRef')}</label>
                  <input
                    type="text"
                    id="udyam_reference"
                    name="udyam_reference"
                    className="form-control"
                    placeholder="e.g. UDYAM-WB-03-0012345"
                    value={formData.udyam_reference}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '0.75rem' }}>
                <label htmlFor="official_website">{t('auth.optWebsite')}</label>
                <input
                  type="url"
                  id="official_website"
                  name="official_website"
                  className="form-control"
                  placeholder="https://..."
                  value={formData.official_website}
                  onChange={handleChange}
                />
              </div>

              {/* Explicit Public Contact Consent Switch */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <input
                  type="checkbox"
                  id="show_contact_publicly"
                  name="show_contact_publicly"
                  checked={formData.show_contact_publicly}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="show_contact_publicly" style={{ fontSize: '0.82rem', color: '#c9d1d9', cursor: 'pointer' }}>
                  {t('auth.publicConsentLabel')}
                </label>
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" block loading={loading} icon="rocket" style={{ marginTop: '1rem' }}>
            {loading ? t('common.loading') : t('nav.register')}
          </Button>
        </form>
    </AuthShell>
  )
}
