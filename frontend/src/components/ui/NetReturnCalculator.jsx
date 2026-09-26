import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { Button } from './Button'
import { Segmented } from './Effects'
import { AnimatedNumber } from './Motion'

/**
 * NetReturnCalculator — "The Gross Price Illusion" demo.
 * ------------------------------------------------------
 * A fully client-side, interactive explainer: the highest advertised mandi
 * price is often NOT the best take-home. Farmers drag a few sliders and watch
 * the ranking re-order live. No backend calls — the real engine lives on the
 * Opportunities page which this hands off to.
 *
 * Net = Price × GradeMultiplier − (Freight + Handling + Commission + Spoilage)
 */

const CROPS = {
  Potato: { perish: 0.2, icon: 'carrot', markets: [
    { name: 'Kolkata APMC', price: 1980, km: 28 },
    { name: 'Burdwan APMC', price: 2150, km: 142 },
    { name: 'Birbhum APMC', price: 2400, km: 198 },
  ] },
  Tomato: { perish: 0.85, icon: 'flower', markets: [
    { name: 'Kota Krishi Mandi', price: 2450, km: 250 },
    { name: 'Azadpur (Delhi)', price: 2901, km: 480 },
    { name: 'Vashi (Mumbai)', price: 2820, km: 1150 },
  ] },
  Onion: { perish: 0.25, icon: 'sprout', markets: [
    { name: 'Lasalgaon APMC', price: 1650, km: 60 },
    { name: 'Pune Market Yard', price: 1820, km: 210 },
    { name: 'Vashi (Mumbai)', price: 2050, km: 265 },
  ] },
  Wheat: { perish: 0.05, icon: 'wheat', markets: [
    { name: 'Karnal Mandi', price: 2275, km: 40 },
    { name: 'Khanna Mandi', price: 2310, km: 170 },
    { name: 'Najafgarh (Delhi)', price: 2390, km: 130 },
  ] },
}

const GRADES = [
  { id: 'A', label: 'Grade A', mult: 1.1 },
  { id: 'B', label: 'Grade B (FAQ)', mult: 1.0 },
  { id: 'C', label: 'Grade C', mult: 0.8 },
]

const fmt = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`

export const NetReturnCalculator = () => {
  const navigate = useNavigate()
  const [crop, setCrop] = useState('Tomato')
  const [grade, setGrade] = useState('B')
  const [qty, setQty] = useState(20)          // quintals
  const [freightRate, setFreightRate] = useState(2.2) // ₹ per km per quintal
  const [commission, setCommission] = useState(6)     // %

  const results = useMemo(() => {
    const c = CROPS[crop]
    const mult = GRADES.find((g) => g.id === grade).mult
    const rows = c.markets.map((m) => {
      const gross = m.price * mult
      const freight = m.km * freightRate
      const handling = 40 + Math.min(60, m.km * 0.05)
      const comm = gross * (commission / 100)
      const transitHrs = m.km / 38
      const spoilage = m.price * c.perish * (transitHrs / 24) * 0.15
      const netPerQ = Math.max(0, gross - freight - handling - comm - spoilage)
      return { ...m, gross, freight, handling, comm, spoilage, netPerQ, netTotal: netPerQ * qty, grossTotal: gross * qty }
    })
    const best = rows.reduce((a, b) => (b.netPerQ > a.netPerQ ? b : a), rows[0])
    const highestPrice = rows.reduce((a, b) => (b.price > a.price ? b : a), rows[0])
    const maxNet = Math.max(...rows.map((r) => r.netPerQ), 1)
    return { rows: [...rows].sort((a, b) => b.netPerQ - a.netPerQ), best, highestPrice, maxNet, illusion: best.name !== highestPrice.name }
  }, [crop, grade, qty, freightRate, commission])

  const slider = (label, value, setValue, min, max, step, suffix) => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
        <span>{label}</span>
        <span style={{ color: '#0b3d2e' }}>{value}{suffix}</span>
      </div>
      <input
        type="range" className="fx-range" min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ '--pct': `${((value - min) / (max - min)) * 100}%` }}
        aria-label={label}
      />
    </div>
  )

  return (
    <div className="nrc-grid">
      {/* Controls */}
      <div className="nrc-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: '#dcfce7', color: '#166534', display: 'grid', placeItems: 'center' }}>
            <Icon name="sliders" size={18} />
          </span>
          <div>
            <div style={{ fontWeight: 800, color: '#0b3d2e', fontSize: '1rem' }}>Try it yourself</div>
            <div style={{ fontSize: '0.75rem', color: '#647d70' }}>Drag the sliders — ranking updates live</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>Commodity</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
              {Object.keys(CROPS).map((k) => (
                <motion.button
                  key={k} type="button" onClick={() => setCrop(k)}
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.55rem 0.25rem', borderRadius: 12, fontSize: '0.75rem', fontWeight: 700,
                    background: crop === k ? '#0b3d2e' : '#f4f8f5', color: crop === k ? '#fff' : '#2d4237',
                    border: `1px solid ${crop === k ? '#0b3d2e' : '#d6e4db'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}
                >
                  <Icon name={CROPS[k].icon} size={16} />
                  {k}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>Quality grade</div>
            <Segmented id="nrc-grade" options={GRADES} value={grade} onChange={setGrade} style={{ width: '100%' }} />
          </div>

          {slider('Quantity', qty, setQty, 5, 200, 5, ' q')}
          {slider('Freight rate', freightRate, setFreightRate, 1, 5, 0.1, ' ₹/km/q')}
          {slider('Mandi commission', commission, setCommission, 0, 12, 0.5, '%')}
        </div>
      </div>

      {/* Results */}
      <div className="nrc-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#0b3d2e', fontSize: '1.05rem' }}>Real take-home per quintal</div>
            <div style={{ fontSize: '0.78rem', color: '#647d70' }}>After freight, handling, commission &amp; transit spoilage</div>
          </div>
          <AnimatePresence mode="wait">
            {results.illusion ? (
              <motion.div key="ill" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.35rem 0.75rem', borderRadius: 999, background: '#fef3c7', border: '1px solid #fcd34d', color: '#92400e', fontSize: '0.75rem', fontWeight: 800 }}>
                <Icon name="alert" size={14} /> Gross price illusion detected
              </motion.div>
            ) : (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.35rem 0.75rem', borderRadius: 999, background: '#dcfce7', border: '1px solid #a7f3d0', color: '#166534', fontSize: '0.75rem', fontWeight: 800 }}>
                <Icon name="checkCircle" size={14} /> Highest price is also best net
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          {results.rows.map((r, i) => {
            const isBest = r.name === results.best.name
            const isTrap = results.illusion && r.name === results.highestPrice.name
            return (
              <motion.div
                key={r.name} layout
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                style={{
                  padding: '0.85rem 1rem', borderRadius: 14,
                  background: isBest ? '#f0fdf4' : '#fff',
                  border: `1px solid ${isBest ? '#10b981' : isTrap ? '#fcd34d' : '#e4eee7'}`,
                  boxShadow: isBest ? '0 8px 24px rgba(16,185,129,0.14)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, display: 'grid', placeItems: 'center', fontSize: '0.75rem', fontWeight: 900, background: isBest ? '#10b981' : '#ebf3ed', color: isBest ? '#fff' : '#0b3d2e', flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, color: '#10231b', fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#647d70' }}>Advertised {fmt(r.price)}/q · {r.km} km</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, color: isBest ? '#166534' : '#10231b', fontSize: '1.05rem' }}>
                      <AnimatedNumber value={r.netPerQ} prefix="₹" duration={0.6} />
                      <span style={{ fontSize: '0.7rem', color: '#647d70', fontWeight: 600 }}> /q</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#647d70' }}>Total {fmt(r.netTotal)}</div>
                  </div>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: '#e8f0eb', marginTop: '0.6rem', overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${(r.netPerQ / results.maxNet) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    style={{ height: '100%', borderRadius: 999, background: isBest ? 'linear-gradient(90deg,#10b981,#34d399)' : isTrap ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : '#94a89c' }}
                  />
                </div>
                <div className="nrc-breakdown">
                  <span>Freight −{fmt(r.freight)}</span>
                  <span>Handling −{fmt(r.handling)}</span>
                  <span>Commission −{fmt(r.comm)}</span>
                  <span>Spoilage −{fmt(r.spoilage)}</span>
                </div>
                {isTrap && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.74rem', color: '#92400e', fontWeight: 700, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Icon name="alert" size={13} /> Highest advertised price, but you'd pocket {fmt((results.best.netPerQ - r.netPerQ) * qty)} less than {results.best.name}.
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <div style={{ marginTop: '1.1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.72rem', color: '#8fa598', fontStyle: 'italic' }}>Illustrative model · sample prices &amp; distances</span>
          <Button variant="emerald" icon="arrowRight" iconRight onClick={() => navigate(`/opportunities?crop=${encodeURIComponent(crop)}&quantity=${qty * 100}`)}>
            Run with real mandi data
          </Button>
        </div>
      </div>

      <style>{`
        .nrc-grid { display: grid; grid-template-columns: 340px 1fr; gap: 1.5rem; margin-top: 2rem; }
        .nrc-card { background: #fff; border: 1px solid #d6e4db; border-radius: 20px; padding: 1.5rem; box-shadow: var(--ag-shadow-md); }
        .nrc-breakdown { display: flex; flex-wrap: wrap; gap: 0.35rem 0.85rem; margin-top: 0.55rem; font-size: 0.7rem; color: #647d70; font-weight: 600; }
        @media (max-width: 1024px) { .nrc-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .nrc-card { padding: 1.1rem; border-radius: 16px; } }
      `}</style>
    </div>
  )
}

export default NetReturnCalculator
