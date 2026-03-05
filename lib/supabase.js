// Supabase client — placeholder, not wired yet
// Will be connected when Supabase project is ready
//
// Schema for table: quiz_submissions
// --------------------------------------------------
// id              uuid          default gen_random_uuid()
// email           text          not null
// store_url       text          nullable
// platform        text          not null  (micro commitment answer)
// all_answers     jsonb         not null  (every single choice keyed by question id)
// monthly_revenue int           not null  (RON value)
// detected_problems text[]      not null
// estimated_loss_min int        not null
// estimated_loss_max int        not null
// created_at      timestamptz   default now()
// --------------------------------------------------

// TODO: uncomment and configure when Supabase is ready
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

/**
 * Save a completed quiz submission
 * @param {Object} submission
 */
export async function saveSubmission(submission) {
  // TODO: replace with actual Supabase insert
  // const { error } = await supabase
  //   .from('quiz_submissions')
  //   .insert([submission])
  // if (error) throw error

  console.log('[Supabase] Submission (not yet wired):', submission);
  return { success: true };
}
