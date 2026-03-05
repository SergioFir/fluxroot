'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const inputStyles = `
  .quiz-input:-webkit-autofill,
  .quiz-input:-webkit-autofill:hover,
  .quiz-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #1f2d42 inset !important;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff;
  }
`;

export default function EmailCapture({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Introdu o adresă de email validă.');
      return;
    }
    setError('');
    setLoading(true);
    await onSubmit(email, storeUrl);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
          <style>{inputStyles}</style>

          {/* Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg style={{ width: 24, height: 24, color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <h2 style={{ fontWeight: 800, fontSize: '2.2rem', color: 'white', textAlign: 'center', marginBottom: 12, letterSpacing: '-0.01em' }}>
            Auditul tău este gata.
          </h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '1rem', lineHeight: 1.65, marginBottom: 36 }}>
            Introdu email-ul pentru a primi analiza completă și recomandările personalizate pentru magazinul tău.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <input
                type="email"
                placeholder="adresa@magazin.ro"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="quiz-input"
                style={{
                  width: '100%', padding: '16px 20px',
                  borderRadius: 12, outline: 'none',
                  background: 'var(--card)',
                  border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
                  color: 'var(--text)', fontSize: '1rem',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = 'rgba(59,130,246,0.6)'; }}
                onBlur={e => { e.target.style.borderColor = error ? '#ef4444' : 'var(--border)'; }}
              />
              {error && <p style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: 6, paddingLeft: 4 }}>{error}</p>}
            </div>

            <input
              type="text"
              placeholder="URL magazin (opțional) — ex: magazin.ro"
              value={storeUrl}
              onChange={e => setStoreUrl(e.target.value)}
              className="quiz-input"
              style={{
                width: '100%', padding: '16px 20px',
                borderRadius: 12, outline: 'none',
                background: 'var(--card)', border: '1px solid var(--border)',
                color: 'var(--text)', fontSize: '1rem',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: '100%', padding: '18px 24px', marginTop: 4,
                borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                background: 'var(--accent)', color: 'white',
                fontWeight: 700, fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: loading ? 0.75 : 1,
                boxShadow: '0 0 28px rgba(59,130,246,0.25)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--accent-hover)'; }}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)', borderTopColor: 'white' }}
                  />
                  Se procesează...
                </>
              ) : (
                <>
                  Trimite-mi Auditul
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 20 }}>
            Nu trimitem spam · Datele tale sunt în siguranță
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="thankyou"
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          {/* Check icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg style={{ width: 36, height: 36, color: '#22c55e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 style={{ fontWeight: 800, fontSize: '2.2rem', color: 'white', marginBottom: 16, letterSpacing: '-0.01em' }}>
            Mulțumim!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 8 }}>
            Am primit răspunsurile tale și pregătim analiza.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 32 }}>
            În maxim <strong style={{ color: 'white' }}>24 de ore</strong> vei primi pe email recomandările personalizate pentru magazinul tău.
          </p>

          <div style={{
            padding: '20px 24px', borderRadius: 14,
            background: 'var(--card)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6,
          }}>
            📬 Verifică și folderul <strong style={{ color: 'white' }}>Spam</strong> dacă nu primești nimic în câteva ore.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
