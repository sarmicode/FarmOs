import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import API from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { AuthShell, PasswordField } from '../../components/ui/AuthShell'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { motion, AnimatePresence } from 'framer-motion'
import './auth.css'

export const LoginPage = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await API.post('/auth/login', {
        email: formData.email,
        password: formData.password
      })

      const { token, user } = response.data

      // Save token and user in AuthContext (which syncs to localStorage)
      login(token, user)

      navigate('/profile', { replace: true })
    } catch (err) {
      console.error('Login Error:', err)
      const serverMessage = err.response?.data?.message || 'Login failed. Please check your credentials.'
      setError(serverMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title={t('auth.signIn')}
      subtitle={t('auth.signInSub')}
      footer={<>{t('auth.noAccount')} <Link to="/register">{t('nav.register')}</Link></>}
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="alert-message alert-error" role="alert" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
          >
            <Icon name="alert" size={16} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">{t('auth.emailAddr')}</label>
          <div className="input-with-icon">
            <Icon name="mail" size={17} className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="e.g. farmer@test.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <PasswordField
          label={t('auth.password')}
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <Button type="submit" variant="primary" size="lg" block loading={loading} icon="arrowRight" iconRight style={{ marginTop: '0.35rem' }}>
          {loading ? t('common.loading') : t('nav.login')}
        </Button>
      </form>

      <div className="auth-divider"><span>quick access</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
        <Button variant="outline" size="sm" icon="chartUp" to="/market-prices">Market prices</Button>
        <Button variant="outline" size="sm" icon="bot" to="/assistant">Ask FarmOS AI</Button>
      </div>
    </AuthShell>
  )
}
