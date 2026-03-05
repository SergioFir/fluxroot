'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_META, formatRON } from '@/lib/scoring';
import { LOSS_MULTIPLIERS } from '@/data/questions';

function useCountUp(target, duration = 1800, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { setVal(target); clearInterval(timer); }
        else setVal(Math.floor(cur));
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

function CalendlyWidget() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
    return () => { if (document.body.contains(s)) document.body.removeChild(s); };
  }, []);
  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/firulescusergio/30min?hide_event_type_details=1&hide_gdpr_banner=1"
      style={{ minWidth: 320, height: 700, width: '100%' }}
    />
  );
}

const ICONS = {
  visibility: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  profit: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  returns: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>,
  receivables: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  cart: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  retention: <svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
};

const RANK = [
  { color: '#ef4444', bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.2)' },
  { color: '#f97316', bg: 'rgba(249,115,22,0.07)', border: 'rgba(249,115,22,0.2)' },
  { color: '#eab308', bg: 'rgba(234,179,8,0.07)', border: 'rgba(234,179,8,0.2)' },
];

const CheckIcon = () => (
  <svg style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0, marginTop: 3 }} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const SectionLabel = ({ children }) => (
  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
    {children}
  </p>
);

export default function ResultsDashboard({ results, email }) {
  const minVal = useCountUp(results.revenueLossMin, 1800, 400);
  const maxVal = useCountUp(results.revenueLossMax, 1800, 400);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Sticky header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
        background: 'rgba(20,28,43,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <img src="/logo.png" alt="FluxRoot" style={{ height: 26, width: 'auto', objectFit: 'contain' }} />
        <span style={{ padding: '5px 14px', borderRadius: 100, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', color: 'var(--accent)', fontSize: 12, fontWeight: 500 }}>
          Raport generat
        </span>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 32px 100px' }}>

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>Raport pentru {email}</p>
            <h1 style={{ fontWeight: 800, fontSize: '2.4rem', color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 10 }}>
              Rezultatele Auditului Tău
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              {results.topProblems.length > 0
                ? <>Am detectat <strong style={{ color: 'white' }}>{results.topProblems.length} probleme principale</strong> care îți afectează profitabilitatea.</>
                : <>Magazinul tău este <strong style={{ color: '#22c55e' }}>bine configurat</strong>. Nu am detectat probleme majore.</>
              }
            </p>
          </div>
          <a
            href="#calendly"
            onClick={e => { e.preventDefault(); document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
              padding: '12px 22px', borderRadius: 10,
              background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
              boxShadow: '0 0 20px rgba(37,99,235,0.25)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            Programează un Call
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* ── SECTIONS 1-3: only shown when problems exist ── */}
        {results.topProblems.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: 48, padding: '40px', borderRadius: 20, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✓</div>
            <p style={{ fontWeight: 700, fontSize: '1.2rem', color: '#22c55e', marginBottom: 8 }}>Operațiunile tale sunt bine puse la punct!</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Nu am detectat goluri majore în automatizările tale. Dacă vrei să scalezi sau să optimizezi și mai mult, programează o consultație mai jos.
            </p>
          </motion.div>
        )}

        {/* ── SECTION 1: Loss estimate ── */}
        {results.topProblems.length > 0 && <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ marginBottom: 48 }}
        >
          <SectionLabel>Pierdere lunară estimată</SectionLabel>
          <div style={{
            borderRadius: 20, padding: '48px 48px',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(239,68,68,0.02) 100%)',
            border: '1px solid rgba(239,68,68,0.18)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(239,68,68,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 20 }}>
              Suma estimată pe care o pierzi lunar din operațiunile neautomatizate:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 12, marginBottom: 24 }}>
              <span style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {formatRON(minVal)}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.8rem', fontWeight: 300, marginBottom: 4 }}>–</span>
              <span style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: '#ef4444', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {formatRON(maxVal)}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 8 }}>/lună</span>
            </div>

            {/* Category tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {results.topProblems.map((cat) => (
                <span key={cat} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)', fontSize: 12,
                }}>
                  <span style={{ color: '#ef4444', display: 'flex' }}>{ICONS[cat]}</span>
                  {CATEGORY_META[cat]?.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>}

        {/* ── SECTION 2: Top 3 Problems ── */}
        {results.topProblems.length > 0 && <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ marginBottom: 48 }}
        >
          <SectionLabel>Problemele principale detectate</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {results.topProblems.map((cat, i) => {
              const meta = CATEGORY_META[cat];
              const loss = Math.round(results.monthlyRevenue * LOSS_MULTIPLIERS[cat]);
              const r = RANK[i];
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 20,
                    padding: '24px 28px', borderRadius: 16,
                    background: r.bg, border: `1px solid ${r.border}`,
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '1.1rem', color: r.color,
                    background: 'rgba(255,255,255,0.04)',
                  }}>
                    #{i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: 4 }}>{meta?.label}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>{meta?.description}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: r.color }}>~{formatRON(loss)}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>pierdere / lună</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>}

        {/* ── SECTION 3: Recommended Automations ── */}
        {results.topProblems.length > 0 && <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <SectionLabel>Automatizări recomandate pentru magazinul tău</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {results.topProblems.map((cat, i) => {
              const meta = CATEGORY_META[cat];
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.1 }}
                  style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--card)' }}
                >
                  {/* Card header */}
                  <div style={{ padding: '24px 28px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                        {ICONS[cat]}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'white', marginBottom: 3 }}>{meta?.solution}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Livrare în {meta?.deliveryDays} zile</p>
                      </div>
                    </div>
                    <span style={{ padding: '5px 12px', borderRadius: 100, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', color: 'var(--accent)', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                      ✦ Recomandat
                    </span>
                  </div>

                  {/* Details */}
                  <div style={{ padding: '20px 28px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
                    {meta?.solutionDetails.map((d, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                        <CheckIcon />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Included in every automation */}
          <div style={{ marginTop: 16, padding: '24px 28px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Inclus în fiecare automatizare</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px' }}>
              {['n8n Workflows', 'AI Dashboard în timp real', 'Alerte Telegram / WhatsApp', 'Video training (5-10 min)', 'Integrare FAN / Cargus / DPD', 'SmartBill / Factura.ro'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <CheckIcon />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>}

        {/* ── SECTION 4: CTA + Calendly ── */}
        <motion.div
          id="calendly-section"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        >
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--card)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 250, background: 'radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{ padding: '40px 48px 32px', textAlign: 'center', position: 'relative', borderBottom: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>Pasul următor</p>
              <h3 style={{ fontWeight: 800, fontSize: '1.8rem', color: 'white', lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.01em' }}>
                Acesta este un audit general.
              </h3>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--accent)', marginBottom: 12 }}>
                Vrei să afli ce soluții îți vor salva cu adevărat timp și bani?
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480, margin: '0 auto' }}>
                Programează un call când îți e confortabil și analizăm situația ta în detaliu.<br />
                <strong style={{ color: 'white' }}>Doar 30 de minute, gratuit, fără obligații.</strong>
              </p>
            </div>

            {/* Calendly always visible */}
            <div style={{ padding: '0 16px 16px' }}>
              <CalendlyWidget />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
