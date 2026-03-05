'use client';

import { motion } from 'framer-motion';

export default function Landing({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, position: 'relative', zIndex: 10 }}>
        <img src="/logo.png" alt="FluxRoot" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Diagnostic Gratuit</span>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px 80px', position: 'relative', zIndex: 10 }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 32 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
            color: 'var(--accent)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Audit Automatizare E-commerce
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'white', marginBottom: 24, maxWidth: 820, fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}
        >
          Cât pierde magazinul tău din{' '}
          <span style={{ color: 'var(--accent)' }}>lipsă de automatizări?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: 540, lineHeight: 1.65, marginBottom: 40 }}
        >
          Răspunde la 8 întrebări și primești o estimare reală în RON —
          plus recomandările specifice pentru magazinul tău.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: 48, marginBottom: 40 }}
        >
          {[['8', 'întrebări'], ['3 min', 'durată'], ['100%', 'gratuit']].map(([val, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontWeight: 700, fontSize: '1.6rem', color: 'white' }}>{val}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '18px 40px', borderRadius: 14,
            background: 'var(--accent)', color: 'white',
            fontWeight: 700, fontSize: '1.05rem', border: 'none', cursor: 'pointer',
            boxShadow: '0 0 40px rgba(37,99,235,0.35), 0 8px 32px rgba(37,99,235,0.2)',
            marginBottom: 16,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
        >
          Începe Auditul Gratuit
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          Fără card de credit · Fără obligații · Rezultate instant
        </motion.p>
      </div>

      {/* BG glow */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
    </div>
  );
}
