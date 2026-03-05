import { CATEGORIES, LOSS_MULTIPLIERS, REVENUE_BRACKETS } from '@/data/questions';

// Category display metadata
export const CATEGORY_META = {
  [CATEGORIES.VISIBILITY]: {
    label: 'Vizibilitate operațională',
    description: 'Nu ai o vedere clară asupra operațiunilor în timp real.',
    solution: 'Dashboard Live de Operațiuni E-commerce',
    solutionDetails: [
      'Toate vânzările din Shopify + eMAG + FAN Courier + PayU/Netopia',
      'Stocuri în timp real din toate sursele',
      'AWB-uri generate automat cu status live',
      'Comenzi cu probleme detectate instant',
      'Notificări Telegram la orice problemă',
    ],
    deliveryDays: 4,
  },
  [CATEGORIES.PROFIT]: {
    label: 'Vizibilitate profit & analytics',
    description: 'Nu știi exact unde pierzi bani în fiecare lună.',
    solution: 'Profit Tracker per Produs / Comandă',
    solutionDetails: [
      'Profit REAL per comandă (nu doar revenue)',
      'Include: cost produs + transport + packaging + taxe PayU/Netopia + retururi',
      'Identifică produsele care de fapt pierd bani',
      'Compară profit Shopify vs eMAG vs FAN (după comisioane)',
      'Rapoarte automate săptămânale prin email/Telegram',
    ],
    deliveryDays: 3,
  },
  [CATEGORIES.RETURNS]: {
    label: 'Optimizare retururi',
    description: 'Pierzi bani din retururi fără să știi de ce vin.',
    solution: 'Return Intelligence System',
    solutionDetails: [
      'Formular smart de retur — clientul completează motivul',
      'AI categorisează automat retururile: mărime, calitate, schimbare decizie',
      'Dashboard cu top 5 produse returnate + motivul principal',
      'Alert dacă un produs depășește 15% rată de retur',
      'Email automat către furnizor pentru probleme de calitate',
    ],
    deliveryDays: 3,
  },
  [CATEGORIES.RECEIVABLES]: {
    label: 'Conturi de încasat (B2B)',
    description: 'Facturile neplătite îți blochează cashflow-ul.',
    solution: 'B2B Payment Chase System',
    solutionDetails: [
      'Tracking facturi: emise vs plătite vs scadente',
      'Email/SMS automat: 7 zile înainte, la scadență, 3 zile după, 7 zile după',
      'Escalation: mesaj prietenos → formal → penalizare',
      'Dashboard: cine îți datorează + câți bani + de câte zile',
      'Integration SmartBill / Factura.ro pentru facturi automate',
    ],
    deliveryDays: 4,
  },
  [CATEGORIES.CART]: {
    label: 'Coșuri abandonate',
    description: 'Pierzi vânzări de la clienți care au vrut să cumpere.',
    solution: 'Smart Cart Recovery — Romanian Edition',
    solutionDetails: [
      'Secvență emails: 1h, 24h, 72h după abandon',
      'SMS la 6h după abandon (70% open rate vs 20% email)',
      'Discount dinamic: 5% la 24h, 10% la 72h (doar dacă nu cumpără)',
      'WhatsApp message personalizat',
      'Copy în română — nu traducere automată',
    ],
    deliveryDays: 3,
  },
  [CATEGORIES.RETENTION]: {
    label: 'Retenție clienți & LTV',
    description: 'Nu reactivezi clienții existenți — cei mai profitabili.',
    solution: 'Customer Lifecycle Automation',
    solutionDetails: [
      'Segmentare automată: VIP, Repeat, One-time, Dormant',
      'Reactivare după 60/90/120 zile fără comandă',
      'Upsell automat: cumpărător produs X → sugestie produs Y',
      'Birthday/Anniversary discount automat',
      'Review request la 7 zile post-livrare',
    ],
    deliveryDays: 3,
  },
};

/**
 * Calculate scores and results from all quiz answers
 * @param {Object} answers — { q1: 'under_50k', q2: 'multiple_dash', ... }
 * @param {Array} questions — full questions array
 * @returns {Object} — { scores, topProblems, revenueLossMin, revenueLossMax, monthlyRevenue }
 */
export function calculateResults(answers, questions) {
  const scores = {
    [CATEGORIES.VISIBILITY]: 0,
    [CATEGORIES.PROFIT]: 0,
    [CATEGORIES.RETURNS]: 0,
    [CATEGORIES.RECEIVABLES]: 0,
    [CATEGORIES.CART]: 0,
    [CATEGORIES.RETENTION]: 0,
  };

  // Get monthly revenue value
  const revenueAnswer = answers['q1'];
  const revenueBracket = REVENUE_BRACKETS.find(b => b.id === revenueAnswer);
  const monthlyRevenue = revenueBracket ? revenueBracket.value : 30000;

  // Accumulate scores from each answer
  for (const question of questions) {
    const answerId = answers[question.id];
    if (!answerId) continue;

    const selectedOption = question.options.find(o => o.id === answerId);
    if (!selectedOption || !selectedOption.scores) continue;

    for (const [category, weight] of Object.entries(selectedOption.scores)) {
      if (scores[category] !== undefined) {
        scores[category] += weight;
      }
    }
  }

  // Sort categories by score descending — pick top 3
  const sortedCategories = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);

  const topProblems = sortedCategories.slice(0, 3).map(([category]) => category);

  // Calculate estimated loss
  let totalLoss = 0;
  for (const category of topProblems) {
    totalLoss += monthlyRevenue * LOSS_MULTIPLIERS[category];
  }

  const revenueLossMin = Math.round(totalLoss);
  const revenueLossMax = Math.round(totalLoss * 1.6);

  return {
    scores,
    topProblems,
    revenueLossMin,
    revenueLossMax,
    monthlyRevenue,
    allScores: sortedCategories,
  };
}

export function formatRON(amount) {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(amount);
}
