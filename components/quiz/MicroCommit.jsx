'use client';

import { motion } from 'framer-motion';
import { PLATFORMS } from '@/data/questions';

const ICONS = {
  shopify: <svg viewBox="0 0 50 57" style={{ width: 28, height: 28 }} fill="currentColor"><path d="M43.4 10.2c0-.3-.3-.4-.5-.4-.2 0-4.5-.1-4.5-.1s-3.5-3.4-3.9-3.8c-.4-.4-1.1-.3-1.4-.2l-1.7.5c-.2-.6-.5-1.3-.9-2-.1-.2-.2-.4-.4-.6C29.7 2 28 1 26.1 1c-.1 0-.3 0-.4.1-.1-.1-.2-.2-.3-.3C24.1.1 22.7 0 21.4.3 15.8 2 13.2 8.9 12.4 12.3c-2 .6-3.5 1.1-3.6 1.1-1.1.3-1.1.3-1.2 1.3C7.4 15.5 4 41.4 4 41.4l27.6 5.2 14.9-3.7S43.5 11.6 43.4 10.2zM30.5 6.8c-.8.2-1.6.5-2.5.8 0-1.2-.2-2.9-.7-4.3 1.7.3 2.6 2.1 3.2 3.5zm-4.2 1.3c-1.7.5-3.5 1.1-5.3 1.6.5-2 1.6-4 3-5.1.5-.4 1.1-.9 1.8-1.1.8 1.4 1.1 3.2 1.1 4.5l-.6.1zm-3.8-6.3c.6 0 1 .1 1.5.4-.7.3-1.3.8-1.9 1.3-1.7 1.5-3 3.8-3.5 6.1l-4.4 1.3c.9-4 3.6-9 8.3-9.1z"/></svg>,
  woocommerce: <svg viewBox="0 0 100 61" style={{ width: 32, height: 20 }} fill="currentColor"><path d="M9.4 0h81.2C95.7 0 100 4.3 100 9.6v31.6c0 5.3-4.3 9.6-9.4 9.6H58.7L62 61l-18-10.2H9.4C4.3 50.8 0 46.5 0 41.2V9.6C0 4.3 4.3 0 9.4 0z"/></svg>,
  custom: <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  other: <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }} fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>,
};

export default function MicroCommit({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
        <span style={{ color: 'var(--accent)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Primul pas</span>
      </div>

      <h2 style={{ fontWeight: 800, fontSize: '2.2rem', color: 'white', lineHeight: 1.15, marginBottom: 10, letterSpacing: '-0.01em' }}>
        Pe ce platformă rulează magazinul tău?
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 36 }}>
        Îți personalizăm analiza în funcție de platforma ta.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {PLATFORMS.map((platform, i) => (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(platform.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 14, padding: '32px 24px',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 16, cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(37,99,235,0.55)';
              e.currentTarget.style.background = 'var(--card-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'var(--card)';
            }}
          >
            <span style={{ color: 'var(--text-muted)', transition: 'color 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {ICONS[platform.id]}
            </span>
            <span style={{ color: 'white', fontWeight: 600, fontSize: '1.05rem' }}>{platform.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
