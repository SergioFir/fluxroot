'use client';

import { AnimatePresence } from 'framer-motion';
import { useQuiz, STEPS } from '@/hooks/useQuiz';
import Landing from '@/components/quiz/Landing';
import MicroCommit from '@/components/quiz/MicroCommit';
import ProgressBar from '@/components/quiz/ProgressBar';
import QuestionCard from '@/components/quiz/QuestionCard';
import LoadingScreen from '@/components/quiz/LoadingScreen';
import EmailCapture from '@/components/quiz/EmailCapture';
import ResultsDashboard from '@/components/quiz/ResultsDashboard';
import { sendToWebhook } from '@/lib/webhook';

const NAV_H = 64;

export default function QuizController() {
  const {
    step, platform, answers, currentQuestion,
    currentQuestionIndex, totalQuestions, results, email,
    progressPercent, startQuiz, selectPlatform, answerQuestion,
    onLoadingComplete, submitEmail,
  } = useQuiz();

  const handleEmailSubmit = async (emailVal, storeUrlVal) => {
    try {
      await sendToWebhook({
        email: emailVal,
        store_url: storeUrlVal || null,
        platform,
        all_answers: answers,
        monthly_revenue: results?.monthlyRevenue,
        detected_problems: results?.topProblems,
        estimated_loss_min: results?.revenueLossMin,
        estimated_loss_max: results?.revenueLossMax,
      });
    } catch (err) {
      // Don't block the user if webhook fails
      console.error('[Webhook] Submission failed:', err);
    }
    submitEmail(emailVal, storeUrlVal);
  };

  const showNav = [STEPS.MICRO_COMMIT, STEPS.QUIZ, STEPS.EMAIL_CAPTURE].includes(step);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Navbar ── */}
      {showNav && (
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: `${NAV_H}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          background: 'rgba(7,9,15,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <img src="/logo.png" alt="FluxRoot" style={{ height: 26, width: 'auto', objectFit: 'contain' }} />

          {step === STEPS.QUIZ && (
            <div style={{ flex: 1, maxWidth: 360, margin: '0 48px' }}>
              <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} percent={progressPercent} />
            </div>
          )}

          <span style={{ color: 'var(--text-muted)', fontSize: 13, minWidth: 80, textAlign: 'right' }}>
            {step === STEPS.MICRO_COMMIT && 'Pasul 1'}
            {step === STEPS.QUIZ && `${currentQuestionIndex + 1} / ${totalQuestions}`}
            {step === STEPS.EMAIL_CAPTURE && 'Ultimul pas'}
          </span>
        </header>
      )}

      {/* ── Content ── */}
      <AnimatePresence mode="wait">

        {step === STEPS.LANDING && <Landing key="landing" onStart={startQuiz} />}

        {step === STEPS.MICRO_COMMIT && (
          <div key="micro" style={{ minHeight: '100vh', paddingTop: NAV_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 680, padding: '40px 32px' }}>
              <MicroCommit onSelect={selectPlatform} />
            </div>
          </div>
        )}

        {step === STEPS.QUIZ && currentQuestion && (
          <div key={`q-${currentQuestion.id}`} style={{ minHeight: '100vh', paddingTop: NAV_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 680, padding: '40px 32px' }}>
              <QuestionCard question={currentQuestion} onAnswer={answerQuestion} />
            </div>
          </div>
        )}

        {step === STEPS.LOADING && <LoadingScreen key="loading" onComplete={onLoadingComplete} />}

        {step === STEPS.EMAIL_CAPTURE && (
          <div key="email" style={{ minHeight: '100vh', paddingTop: NAV_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 520, padding: '40px 32px' }}>
              <EmailCapture onSubmit={handleEmailSubmit} />
            </div>
          </div>
        )}

        {step === STEPS.RESULTS && results && (
          <ResultsDashboard key="results" results={results} email={email} />
        )}

      </AnimatePresence>
    </div>
  );
}
