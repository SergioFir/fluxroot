'use client';

import { useState, useCallback } from 'react';
import { QUESTIONS } from '@/data/questions';
import { calculateResults } from '@/lib/scoring';

export const STEPS = {
  LANDING: 'LANDING',
  MICRO_COMMIT: 'MICRO_COMMIT',
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  EMAIL_CAPTURE: 'EMAIL_CAPTURE',
  RESULTS: 'RESULTS',
};

export function useQuiz() {
  const [step, setStep] = useState(STEPS.LANDING);
  const [platform, setPlatform] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showB2BFollowUp, setShowB2BFollowUp] = useState(false);
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [storeUrl, setStoreUrl] = useState('');

  // Build the active question list (with/without q5b)
  const activeQuestions = QUESTIONS.filter(q => {
    if (q.conditional) return showB2BFollowUp;
    return true;
  });

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const totalQuestions = activeQuestions.length;

  const startQuiz = useCallback(() => {
    setStep(STEPS.MICRO_COMMIT);
  }, []);

  const selectPlatform = useCallback((platformId) => {
    setPlatform(platformId);
    setStep(STEPS.QUIZ);
  }, []);

  const answerQuestion = useCallback((questionId, answerId) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);

    // Check if q5 triggers B2B follow-up
    if (questionId === 'q5') {
      const question = QUESTIONS.find(q => q.id === 'q5');
      const selectedOption = question?.options.find(o => o.id === answerId);
      setShowB2BFollowUp(selectedOption?.triggerFollowUp ?? false);
    }

    // Check if this is the last question
    const updatedActiveQuestions = QUESTIONS.filter(q => {
      if (q.conditional) {
        if (questionId === 'q5') {
          const question = QUESTIONS.find(q2 => q2.id === 'q5');
          const selectedOption = question?.options.find(o => o.id === answerId);
          return selectedOption?.triggerFollowUp ?? false;
        }
        return showB2BFollowUp;
      }
      return true;
    });

    if (currentQuestionIndex >= updatedActiveQuestions.length - 1) {
      // All questions answered — go to loading
      const computed = calculateResults(newAnswers, updatedActiveQuestions);
      setResults(computed);
      setStep(STEPS.LOADING);
    } else {
      setCurrentQuestionIndex(i => i + 1);
    }
  }, [answers, currentQuestionIndex, showB2BFollowUp]);

  const onLoadingComplete = useCallback(() => {
    setStep(STEPS.EMAIL_CAPTURE);
  }, []);

  const submitEmail = useCallback((emailVal, storeUrlVal) => {
    setEmail(emailVal);
    setStoreUrl(storeUrlVal);
    setStep(STEPS.RESULTS);
  }, []);

  // Progress: only count QUIZ step questions
  const progressPercent = totalQuestions > 0
    ? Math.round(((currentQuestionIndex) / totalQuestions) * 100)
    : 0;

  return {
    step,
    platform,
    answers,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    results,
    email,
    storeUrl,
    progressPercent,
    startQuiz,
    selectPlatform,
    answerQuestion,
    onLoadingComplete,
    submitEmail,
  };
}
