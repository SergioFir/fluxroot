// All quiz questions, options, and scoring weights
// Each answer maps to problem categories with a weight 0-3
// Categories: visibility, profit, returns, receivables, cart, retention

export const PLATFORMS = [
  { id: 'shopify', label: 'Shopify' },
  { id: 'woocommerce', label: 'WooCommerce' },
  { id: 'custom', label: 'Platformă proprie' },
  { id: 'other', label: 'Alta' },
];

// Monthly revenue brackets — value used for RON calculations
export const REVENUE_BRACKETS = [
  { id: 'under_50k', label: 'Sub 50.000 RON', value: 30000 },
  { id: '50k_250k', label: '50.000 – 250.000 RON', value: 120000 },
  { id: '250k_1m', label: '250.000 – 1.000.000 RON', value: 500000 },
  { id: 'over_1m', label: 'Peste 1.000.000 RON', value: 1200000 },
];

// Problem category keys
export const CATEGORIES = {
  VISIBILITY: 'visibility',
  PROFIT: 'profit',
  RETURNS: 'returns',
  RECEIVABLES: 'receivables',
  CART: 'cart',
  RETENTION: 'retention',
};

// Loss multipliers per category (applied to monthly revenue)
export const LOSS_MULTIPLIERS = {
  [CATEGORIES.VISIBILITY]: 0.03,
  [CATEGORIES.PROFIT]: 0.04,
  [CATEGORIES.RETURNS]: 0.05,
  [CATEGORIES.RECEIVABLES]: 0.05,
  [CATEGORIES.CART]: 0.20,
  [CATEGORIES.RETENTION]: 0.10,
};

export const QUESTIONS = [
  {
    id: 'q1',
    question: 'Care este venitul tău lunar aproximativ?',
    note: 'Folosim această informație pentru a estima impactul financiar al problemelor detectate.',
    type: 'revenue', // special type — stores revenue bracket
    options: REVENUE_BRACKETS.map(b => ({ id: b.id, label: b.label, scores: {} })),
  },
  {
    id: 'q2',
    question: 'Cum îți monitorizezi performanța afacerii în prezent?',
    options: [
      {
        id: 'platform_only',
        label: 'Doar analytics-ul platformei',
        scores: { [CATEGORIES.VISIBILITY]: 1, [CATEGORIES.PROFIT]: 0 },
      },
      {
        id: 'multiple_dash',
        label: 'Mai multe dashboard-uri / spreadsheet-uri',
        scores: { [CATEGORIES.VISIBILITY]: 2, [CATEGORIES.PROFIT]: 2 },
      },
      {
        id: 'manual',
        label: 'Verific manual din când în când',
        scores: { [CATEGORIES.VISIBILITY]: 3, [CATEGORIES.PROFIT]: 2 },
      },
      {
        id: 'no_tracking',
        label: 'Nu am un sistem clar de tracking',
        scores: { [CATEGORIES.VISIBILITY]: 3, [CATEGORIES.PROFIT]: 3 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'Știi exact unde pierzi profit în fiecare lună?',
    options: [
      {
        id: 'yes_clear',
        label: 'Da, am vizibilitate completă',
        scores: { [CATEGORIES.PROFIT]: 0 },
      },
      {
        id: 'somewhat',
        label: 'Parțial',
        scores: { [CATEGORIES.PROFIT]: 1 },
      },
      {
        id: 'not_really',
        label: 'Nu prea',
        scores: { [CATEGORIES.PROFIT]: 2, [CATEGORIES.VISIBILITY]: 1 },
      },
      {
        id: 'no_idea',
        label: 'Nu știu deloc',
        scores: { [CATEGORIES.PROFIT]: 3, [CATEGORIES.VISIBILITY]: 2 },
      },
    ],
  },
  {
    id: 'q4',
    question: 'Cum gestionezi retururile de produse?',
    options: [
      {
        id: 'analyze_actively',
        label: 'Analizăm activ motivele retururilor',
        scores: { [CATEGORIES.RETURNS]: 0 },
      },
      {
        id: 'occasional',
        label: 'Le analizăm ocazional',
        scores: { [CATEGORIES.RETURNS]: 1 },
      },
      {
        id: 'just_process',
        label: 'Le procesăm, atât',
        scores: { [CATEGORIES.RETURNS]: 2 },
      },
      {
        id: 'no_tracking',
        label: 'Nu urmărim motivele',
        scores: { [CATEGORIES.RETURNS]: 3 },
      },
    ],
  },
  {
    id: 'q5',
    question: 'Ai clienți B2B care primesc produsele și plătesc ulterior (facturi cu termen)?',
    type: 'b2b_trigger', // triggers follow-up q5b if yes/sometimes
    options: [
      {
        id: 'never',
        label: 'Niciodată',
        scores: { [CATEGORIES.RECEIVABLES]: 0 },
        triggerFollowUp: false,
      },
      {
        id: 'rarely',
        label: 'Rar',
        scores: { [CATEGORIES.RECEIVABLES]: 1 },
        triggerFollowUp: false,
      },
      {
        id: 'sometimes',
        label: 'Uneori',
        scores: { [CATEGORIES.RECEIVABLES]: 2 },
        triggerFollowUp: true,
      },
      {
        id: 'yes_often',
        label: 'Da, frecvent',
        scores: { [CATEGORIES.RECEIVABLES]: 3 },
        triggerFollowUp: true,
      },
    ],
  },
  {
    id: 'q5b',
    question: 'Cum urmărești facturile neplătite?',
    conditional: true, // only shown if q5 triggered
    options: [
      {
        id: 'automated',
        label: 'Remindere automate',
        scores: { [CATEGORIES.RECEIVABLES]: 0 },
      },
      {
        id: 'spreadsheet',
        label: 'Spreadsheet manual',
        scores: { [CATEGORIES.RECEIVABLES]: 2 },
      },
      {
        id: 'manual_check',
        label: 'Verificăm manual',
        scores: { [CATEGORIES.RECEIVABLES]: 2 },
      },
      {
        id: 'sometimes_forget',
        label: 'Uneori uităm',
        scores: { [CATEGORIES.RECEIVABLES]: 3 },
      },
    ],
  },
  {
    id: 'q6',
    question: 'Ai un sistem automatizat de recuperare a coșurilor abandonate?',
    options: [
      {
        id: 'advanced_flows',
        label: 'Da, fluxuri avansate (email + SMS + WhatsApp)',
        scores: { [CATEGORIES.CART]: 0 },
      },
      {
        id: 'basic_email',
        label: 'Doar email-uri de bază',
        scores: { [CATEGORIES.CART]: 2 },
      },
      {
        id: 'only_ads',
        label: 'Doar retargeting prin reclame',
        scores: { [CATEGORIES.CART]: 2 },
      },
      {
        id: 'no_recovery',
        label: 'Nu am niciun sistem de recuperare',
        scores: { [CATEGORIES.CART]: 3 },
      },
    ],
  },
  {
    id: 'q7',
    question: 'Ai campanii automatizate pentru a readuce clienții anteriori?',
    options: [
      {
        id: 'advanced_retention',
        label: 'Da, fluxuri avansate de retenție',
        scores: { [CATEGORIES.RETENTION]: 0 },
      },
      {
        id: 'basic_newsletter',
        label: 'Newsletter-uri de bază',
        scores: { [CATEGORIES.RETENTION]: 1 },
      },
      {
        id: 'occasional_manual',
        label: 'Campanii manuale ocazionale',
        scores: { [CATEGORIES.RETENTION]: 2 },
      },
      {
        id: 'no_retention',
        label: 'Nu am automatizări de retenție',
        scores: { [CATEGORIES.RETENTION]: 3 },
      },
    ],
  },
  {
    id: 'q8',
    question: 'Câte comenzi procesezi lunar?',
    note: 'Folosim această informație pentru a calibra estimarea.',
    options: [
      { id: 'under_100', label: 'Sub 100 comenzi', scores: {} },
      { id: '100_500', label: '100 – 500 comenzi', scores: {} },
      { id: '500_2000', label: '500 – 2.000 comenzi', scores: {} },
      { id: 'over_2000', label: 'Peste 2.000 comenzi', scores: {} },
    ],
  },
];
