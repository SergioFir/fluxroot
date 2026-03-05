'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MESSAGES = [
  'Analizăm operațiunile magazinului tău...',
  'Calculăm pierderile estimate...',
  'Construim profilul tău de automatizare...',
  'Identificăm cele mai mari oportunități...',
  'Pregătim recomandările personalizate...',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const duration = 3200;
    const interval = 40;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const p = Math.min(Math.round((current / steps) * 100), 100);
      setProgress(p);
      setMsgIndex(Math.min(Math.floor((current / steps) * (MESSAGES.length - 1)), MESSAGES.length - 1));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'var(--bg)' }}
    >
      {/* Spinner */}
      <div className="relative mb-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-full"
          style={{ border: '2px solid var(--border)', borderTopColor: 'var(--accent)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
            <div className="w-1.5 h-1.5 rounded-full m-auto mt-[3px] animate-pulse" style={{ background: 'var(--accent)' }} />
          </div>
        </div>
      </div>

      {/* Message */}
      <motion.p
        key={msgIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="font-semibold text-white mb-2"
        style={{ fontSize: '1.15rem' }}
      >
        {MESSAGES[msgIndex]}
      </motion.p>
      <p className="mb-10" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        Construim profilul tău de automatizare...
      </p>

      {/* Progress */}
      <div style={{ width: '260px' }}>
        <div className="h-1 rounded-full" style={{ background: 'var(--border)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Analiză în curs</span>
          <span style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 500 }}>{progress}%</span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-10">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
