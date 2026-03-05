'use client';

import { motion } from 'framer-motion';

export default function ProgressBar({ current, total, percent }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
          Întrebarea {current} din {total}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{percent}%</span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: 'var(--border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'var(--accent)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
