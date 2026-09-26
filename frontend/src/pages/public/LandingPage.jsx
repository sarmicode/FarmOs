import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wheat, TrendingUp, Scale, Truck, Coins, Trophy, BarChart3, Handshake,
  Bot, ArrowRight, CheckCircle2, Hand, Leaf, CloudSun, Droplet, Wind,
  Tag, MapPin, Laptop, Smartphone, Sparkles
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { Footer } from '../../components/Footer'
import { Reveal, Stagger, StaggerItem, AnimatedNumber } from '../../components/ui/Motion'
import './LandingPage.css'

const EASE = [0.16, 1, 0.3, 1]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

export const LandingPage = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  // Opportunity Engine interactive demo form state
  const [demoCrop, setDemoCrop] = useState('Potato')
  const [demoQty, setDemoQty] = useState('500')
  const [demoLocation, setDemoLocation] = useState('Kolkata')

  const handleDemoSubmit = (e) => {
    e.preventDefault()
    navigate(`/marketplace?crop=${encodeURIComponent(demoCrop)}&quantity=${encodeURIComponent(demoQty)}&location=${encodeURIComponent(demoLocation)}`)
  }

  const workflowSteps = [
    { step: '01', title: '1. Harvest', desc: 'Track details', Icon: Wheat },
    { step: '02', title: '2. Market Prices', desc: 'Get real-time mandi prices', Icon: TrendingUp },
    { step: '03', title: '3. Market Comparison', desc: 'Compare markets', Icon: Scale },
    { step: '04', title: '4. Logistics', desc: 'Estimate costs & routes', Icon: Truck },
    { step: '05', title: '5. Net Return', desc: 'Calculate final profit', Icon: Coins },
    { step: '06', title: '6. Best Opportunity', desc: 'Find right market & buyer', Icon: Trophy }
  ]

  const decisionFlow = [
    { label: 'Market Price', Icon: Tag },
    { label: 'Distance', Icon: MapPin },
    { label: 'Freight Cost', Icon: Truck },
    { label: 'Weather', Icon: CloudSun },
    { label: 'Buyer Availability', Icon: Handshake },
  ]

  const featureCards = [
    {
      id: 'mandi',
      Icon: BarChart3,
      title: 'Live Mandi Market Prices',
      subtitle: 'Real-time data',
      badge: 'Agmarknet Integration',
      description: 'Official Government of India Agmarknet feeds. Filter by state, district, market, commodity, and grade with min, max, and modal prices per quintal.'
    },
    {
      id: 'comparison',
      Icon: Scale,
      title: 'Smart Market Comparison',
      subtitle: 'Comparison analysis',
      badge: 'Deterministic Ranking',
      description: 'Ranks regional APMCs simultaneously by estimated gross return, distance, transport cost, and FarmOS Opportunity Score (0–100).'
    },
    {
      id: 'logistics',
      Icon: Truck,
      title: 'Smart Freight Logistics',
      subtitle: 'Distance, vehicle select',
      badge: 'OpenRouteService API',
      description: 'Calculates real road driving distances and travel times. Auto-selects vehicle types (Mini Truck, Canter, Multi-Axle) and exact freight cost.'
    },
    {
      id: 'buyers',
      Icon: Handshake,
      title: 'Potential Buyer Discovery',
      subtitle: 'Traders & buyers',
      badge: 'Verified Directory',
      description: 'Connect with wholesalers, millers, and verified FarmOS registered buyers matching your commodity specs and volume.'
    },
    {
      id: 'assistant',
      Icon: Bot,
      title: 'AI Farm Assistant',
      subtitle: 'Agricultural guidance with Gemini AI',
      badge: 'Powered by Gemini AI',
      description: 'Conversational assistant explaining market trends, logistics calculations, and weather advisories in simple language.'
    }
  ]

  return (
    <div className="farmos-landing-wrapper">
      {/* 1. HERO SECTION */}
      <section className="ag-hero-section">
        {/* Animated ambient background blooms */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-120px', right: '-80px', width: '420px', height: '420px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)',
            filter: 'blur(10px)', pointerEvents: 'none'
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="ag-container">
          <div className="ag-hero-grid">
            {/* Left: Text & CTAs */}
            <motion.div
              className="ag-hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="ag-badge ag-badge-emerald" style={{ marginBottom: '1rem' }}>
                "Smart Agriculture • Better Markets • Higher Returns"
              </motion.div>

              <motion.h1 variants={fadeInUp} className="ag-heading-xl ag-hero-headline">
                Connecting Every Harvest <br />
                <span style={{ color: '#0b3d2e' }}>to Its Best Opportunity</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="ag-body-lg ag-hero-subtext">
                FarmOS helps farmers discover better market opportunities by combining real mandi prices, logistics costs, weather intelligence and buyer discovery.
              </motion.p>

              <motion.div variants={fadeInUp} className="ag-hero-actions">
                <motion.a
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  href="/marketplace"
                  onClick={(e) => { e.preventDefault(); navigate('/marketplace') }}
                  className="ag-btn-primary"
                >
                  <span>Explore Opportunities</span>
                  <ArrowRight size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  href="/market-prices"
                  onClick={(e) => { e.preventDefault(); navigate('/market-prices') }}
                  className="ag-btn-secondary"
                >
                  <span>View Market Prices</span>
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="ag-hero-trust-bar">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><CheckCircle2 size={16} color="#10b981" /> Real Market Data</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><CheckCircle2 size={16} color="#10b981" /> Smart Logistics</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><CheckCircle2 size={16} color="#10b981" /> AI Powered Assistant</span>
              </motion.div>
            </motion.div>

            {/* Right: Realistic Dashboard Preview Card */}
            <motion.div
              className="ag-hero-mock-canvas"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="ag-mock-dashboard-preview"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Top Bar Sim */}
                <div className="ag-mock-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', backgroundColor: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Leaf size={14} color="#fff" />
                    </div>
                    <strong style={{ fontSize: '0.95rem', color: '#0b3d2e' }}>FarmOS</strong>
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10231b', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    Good morning, Ramesh!
                    <Hand size={18} color="#f59e0b" />
                  </div>
                </div>

                {/* Summary Stats Row */}
                <div className="ag-mock-stats-row">
                  <div className="ag-mock-stat-pill">
                    <span style={{ fontSize: '0.7rem', color: '#647d70', display: 'block' }}>Total Harvests</span>
                    <strong style={{ fontSize: '1.05rem', color: '#10231b' }}><AnimatedNumber value={4} /></strong>
                  </div>
                  <div className="ag-mock-stat-pill">
                    <span style={{ fontSize: '0.7rem', color: '#647d70', display: 'block' }}>Active Orders</span>
                    <strong style={{ fontSize: '1.05rem', color: '#10231b' }}><AnimatedNumber value={2} /></strong>
                  </div>
                  <div className="ag-mock-stat-pill">
                    <span style={{ fontSize: '0.7rem', color: '#647d70', display: 'block' }}>Selling Opps</span>
                    <strong style={{ fontSize: '1.05rem', color: '#10231b' }}><AnimatedNumber value={3} /></strong>
                  </div>
                  <div className="ag-mock-stat-pill" style={{ backgroundColor: '#dcfce7', borderColor: '#a7f3d0' }}>
                    <span style={{ fontSize: '0.68rem', color: '#166534', display: 'block' }}>Est. Net Return</span>
                    <strong style={{ fontSize: '1rem', color: '#0b3d2e' }}>₹<AnimatedNumber value={24680} format={(v) => Math.round(v).toLocaleString('en-IN')} /></strong>
                  </div>
                </div>

                {/* Best Market Opportunity Highlight Card */}
                <div className="ag-mock-opp-card">
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    •••••••• BEST MARKET OPPORTUNITY ••••••••
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0b3d2e', margin: '0 0 0.2rem 0' }}>
                    Birbhum APMC
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#647d70', marginBottom: '0.75rem' }}>Potato</div>

                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10231b', marginBottom: '0.85rem' }}>
                    ₹<AnimatedNumber value={2400} format={(v) => Math.round(v).toLocaleString('en-IN')} /> <span style={{ fontSize: '0.85rem', color: '#647d70', fontWeight: 500 }}>/ quintal</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', backgroundColor: '#f4f8f5', padding: '0.65rem', borderRadius: '12px', fontSize: '0.78rem' }}>
                    <div>
                      <strong style={{ display: 'block', color: '#166534', fontSize: '0.95rem' }}>₹<AnimatedNumber value={8042} format={(v) => Math.round(v).toLocaleString('en-IN')} /></strong>
                      <span style={{ color: '#647d70', fontSize: '0.7rem' }}>Est. Net Return</span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#0b3d2e', fontSize: '0.95rem' }}><AnimatedNumber value={94} />/100</strong>
                      <span style={{ color: '#647d70', fontSize: '0.7rem' }}>Opp Score</span>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#10231b', fontSize: '0.95rem' }}><AnimatedNumber value={198} /> km</strong>
                      <span style={{ color: '#647d70', fontSize: '0.7rem' }}>Distance</span>
                    </div>
                  </div>
                </div>

                {/* Mini Weather Widget */}
                <div className="ag-mock-weather-card">
                  <div>
                    <strong style={{ fontSize: '0.88rem', color: '#10231b', display: 'block' }}>Kolkata</strong>
                    <span style={{ fontSize: '0.78rem', color: '#647d70', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CloudSun size={14} color="#647d70" /> Partly Cloudy
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0b3d2e' }}><AnimatedNumber value={28} />°C</span>
                    <div style={{ fontSize: '0.72rem', color: '#647d70', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}><Droplet size={12} color="#3b82f6" /> 72%</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}><Wind size={12} color="#647d70" /> 12 km/h</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ONE DECISION. MULTIPLE FACTORS SECTION */}
      <section className="ag-one-decision-section">
        <div className="ag-container">
          <Reveal className="ag-decision-container">
            <h2 className="ag-heading-lg" style={{ marginBottom: '0.5rem' }}>
              One Decision. Multiple Factors.
            </h2>
            <p className="ag-body-md" style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto' }}>
              FarmOS combines multiple real-world factors to help farmers evaluate where their harvest may create the best opportunity.
            </p>

            <div className="ag-decision-flow-flex">
              {decisionFlow.map((item, i) => (
                <React.Fragment key={item.label}>
                  <motion.div
                    className="ag-decision-item"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                    whileHover={{ y: -3 }}
                  >
                    <item.Icon size={17} color="#0b3d2e" />
                    {item.label}
                  </motion.div>
                  <span className="ag-decision-operator">+</span>
                </React.Fragment>
              ))}
              <motion.div
                className="ag-decision-item highlight-net"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
              >
                <Coins size={17} /> NET RETURN
              </motion.div>
              <span className="ag-decision-operator">↓</span>
              <motion.div
                className="ag-decision-item highlight-best"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.48, ease: EASE }}
              >
                <Trophy size={17} /> BEST OPPORTUNITY
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. FROM HARVEST TO OPPORTUNITY WORKFLOW */}
      <section className="ag-workflow-section">
        <div className="ag-container">
          <Reveal className="ag-workflow-header">
            <h2 className="ag-heading-lg">From Harvest to Opportunity</h2>
            <p className="ag-body-md" style={{ marginTop: '0.5rem' }}>
              A complete ecosystem to help farmers make better selling decisions.
            </p>
          </Reveal>

          <Stagger className="ag-workflow-grid" stagger={0.12}>
            {workflowSteps.map((step) => (
              <StaggerItem className="ag-workflow-card" key={step.step}>
                <motion.div
                  className="ag-workflow-node"
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <step.Icon size={26} />
                </motion.div>
                <div className="ag-workflow-title">{step.title}</div>
                <div className="ag-workflow-desc">{step.desc}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 4. OPPORTUNITY ENGINE CENTERPIECE */}
      <section className="ag-engine-centerpiece-section">
        <div className="ag-container">
          <Reveal style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
            <span className="ag-badge ag-badge-emerald">Core Decision Engine</span>
            <h2 className="ag-heading-lg" style={{ marginTop: '0.5rem' }}>
              Find Where Your Harvest Can Earn More.
            </h2>
            <p className="ag-body-lg" style={{ marginTop: '0.5rem' }}>
              Compare market prices, logistics costs and estimated net returns in one place.
            </p>
          </Reveal>

          <div className="ag-engine-split">
            {/* Input Form Card */}
            <Reveal className="ag-engine-input-card" y={24}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0b3d2e', marginBottom: '1.25rem' }}>
                Calculate Opportunities
              </h3>
              <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>Commodity</label>
                  <select value={demoCrop} onChange={(e) => setDemoCrop(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #d6e4db', backgroundColor: '#f7faf8' }}>
                    <option value="Potato">Potato</option>
                    <option value="Onion">Onion</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Rice">Rice</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>Quantity (kg)</label>
                  <input type="number" value={demoQty} onChange={(e) => setDemoQty(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #d6e4db', backgroundColor: '#f7faf8' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>Your Location</label>
                  <input type="text" value={demoLocation} onChange={(e) => setDemoLocation(e.target.value)} style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid #d6e4db', backgroundColor: '#f7faf8' }} />
                </div>

                <motion.button
                  type="submit"
                  className="ag-btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Find Opportunities
                </motion.button>
              </form>
            </Reveal>

            {/* Results Table Card */}
            <Reveal className="ag-engine-table-card" y={24} delay={0.1}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0b3d2e', margin: 0 }}>
                  Multimarket Comparison Result
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#647d70', fontStyle: 'italic' }}>Demonstration Comparison</span>
              </div>

              <div className="table-responsive">
                <table className="ag-table">
                  <thead>
                    <tr>
                      <th>Market</th>
                      <th>Modal Price</th>
                      <th>Distance</th>
                      <th>Freight</th>
                      <th>Gross Value</th>
                      <th>Net Return</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="best-row">
                      <td>
                        <strong style={{ color: '#0b3d2e', display: 'block' }}>1. Birbhum APMC</strong>
                        <span className="ag-badge ag-badge-emerald" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>Best Opportunity</span>
                      </td>
                      <td>₹2,400</td>
                      <td>198 km</td>
                      <td>₹3,958</td>
                      <td>₹12,000</td>
                      <td><strong style={{ color: '#166534', fontSize: '1.05rem' }}>₹8,042</strong></td>
                      <td><span style={{ color: '#166534', fontWeight: 800, backgroundColor: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '8px' }}>94/100</span></td>
                    </tr>
                    <tr>
                      <td><strong>2. Burdwan APMC</strong></td>
                      <td>₹2,150</td>
                      <td>142 km</td>
                      <td>₹2,890</td>
                      <td>₹10,750</td>
                      <td><strong style={{ color: '#10231b' }}>₹7,860</strong></td>
                      <td><span style={{ color: '#0b3d2e', fontWeight: 700 }}>82/100</span></td>
                    </tr>
                    <tr>
                      <td><strong>3. Kolkata APMC</strong></td>
                      <td>₹1,980</td>
                      <td>28 km</td>
                      <td>₹1,240</td>
                      <td>₹9,900</td>
                      <td><strong style={{ color: '#10231b' }}>₹8,660</strong></td>
                      <td><span style={{ color: '#0b3d2e', fontWeight: 700 }}>68/100</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. EVERYTHING FARMERS NEED TO MAKE BETTER DECISIONS */}
      <section className="ag-features-section">
        <div className="ag-container">
          <Reveal style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
            <h2 className="ag-heading-lg">Everything Farmers Need to Make Better Decisions</h2>
          </Reveal>

          <Stagger className="ag-features-5grid" stagger={0.1}>
            {featureCards.map((f) => (
              <StaggerItem className="ag-feature-box" key={f.id}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#ebf3ed', color: '#0b3d2e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      <f.Icon size={26} />
                    </div>
                    <h3 className="ag-heading-sm" style={{ marginBottom: '0.35rem' }}>{f.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, marginBottom: '0.75rem' }}>{f.subtitle}</div>
                    <p className="ag-body-md">{f.description}</p>
                  </div>

                  <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #e4eee7', fontSize: '0.78rem', color: '#647d70', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={15} color="#10b981" /> {f.badge}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 6. FARMOS ANYWHERE SHOWCASE & FOOTER BANNER */}
      <section className="ag-anywhere-section">
        <div className="ag-container">
          <Reveal style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span className="ag-badge ag-badge-light">Cross-Platform Responsive</span>
            <h2 className="ag-heading-lg" style={{ marginTop: '0.5rem' }}>FarmOS Anywhere</h2>
            <p className="ag-body-lg" style={{ marginTop: '0.5rem' }}>
              Access your farm, markets and opportunities from any device.
            </p>
          </Reveal>

          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }} stagger={0.12}>
            {[
              { Icon: Laptop, title: 'Desktop Experience', desc: 'Full analytical dashboard with multi-market side-by-side table comparisons.' },
              { Icon: Smartphone, title: 'Mobile & Field Ready', desc: 'Touch-optimized cards for fast mandi price checks right from the farm field.' },
              { Icon: Bot, title: 'AI Assistant Interface', desc: 'Ask Gemini AI about market trends, transport costs, and weather forecasts anytime.' },
            ].map((card) => (
              <StaggerItem key={card.title}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ backgroundColor: '#ffffff', border: '1px solid #d6e4db', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', height: '100%' }}>
                  <div style={{ marginBottom: '0.5rem', color: '#10b981' }}>
                    <card.Icon size={44} strokeWidth={1.6} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0b3d2e' }}>{card.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#647d70', marginTop: '0.35rem' }}>{card.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Deep Forest Green Banner */}
        <div className="ag-footer-banner">
          <div className="ag-container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.025em' }}
            >
              "Smarter Decisions. Better Harvests."
            </motion.h2>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={22} color="#34d399" /> FarmOS
            </div>
            <p style={{ fontSize: '1rem', color: '#cde0d5', marginTop: '0.5rem' }}>
              "Connecting Every Harvest to Its Best Opportunity"
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
