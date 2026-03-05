const WEBHOOK_URL = 'https://primary-production-a519.up.railway.app/webhook/6fc19594-9155-4659-bafa-2512f7e1d0ee';

/**
 * Send quiz submission to n8n webhook → Google Sheets
 */
export async function sendToWebhook(submission) {
  const payload = {
    timestamp: new Date().toISOString(),
    email: submission.email,
    store_url: submission.store_url || '',
    platform: submission.platform,

    // All individual answers (question id → selected option id)
    answers: submission.all_answers,

    // Computed results
    monthly_revenue_ron: submission.monthly_revenue,
    detected_problems: submission.detected_problems?.join(', '),
    estimated_loss_min_ron: submission.estimated_loss_min,
    estimated_loss_max_ron: submission.estimated_loss_max,
  };

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('[Webhook] Failed:', res.status, await res.text());
    throw new Error(`Webhook error: ${res.status}`);
  }

  return true;
}
