'use client';

import { motion } from 'framer-motion';

export default function QuestionCard({ question, onAnswer }) {
  if (!question) return null;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Profile indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)',
              display: 'inline-block', opacity: 0.7,
              animation: `pulse 1.4s ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Construim profilul tău
        </span>
      </div>

      {/* Question */}
      <h2 style={{ fontWeight: 800, fontSize: '2rem', color: 'white', lineHeight: 1.2, marginBottom: question.note ? 10 : 32, letterSpacing: '-0.01em' }}>
        {question.question}
      </h2>
      {question.note && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 32, lineHeight: 1.5 }}>{question.note}</p>
      )}

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.065, duration: 0.28 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onAnswer(question.id, option.id)}
            style={{
              width: '100%', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 14, cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)';
              e.currentTarget.style.background = 'var(--card-hover)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'var(--card)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ color: 'white', fontWeight: 500, fontSize: '1rem', lineHeight: 1.4 }}>
              {option.label}
            </span>
            <svg style={{ width: 18, height: 18, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
