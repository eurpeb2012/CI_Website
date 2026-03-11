// Supabase Client Configuration
const SUPABASE_URL = 'https://lmgznapsmdgmbwgulsyt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZ3puYXBzbWRnbWJ3Z3Vsc3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNTU4MjcsImV4cCI6MjA4ODczMTgyN30.-ng14VSY64AeGO7DMNqy_LjmaSxsoCOsyFDEcn9HJEc';

// CDN puts the library on window.supabase; create client then overwrite
// Wrapped in try-catch to prevent CDN load failures from breaking the app
try {
  if (window.supabase && window.supabase.createClient) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabase = window.supabaseClient;
  } else {
    console.warn('Supabase CDN not loaded, app will use mock data');
    window.supabase = {
      auth: { getSession: () => Promise.resolve({ data: { session: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) },
      from: () => ({ select: () => ({ eq: () => ({ eq: () => ({ data: null, error: 'No Supabase' }), data: null, error: 'No Supabase', order: () => ({ data: null, error: 'No Supabase' }) }), order: () => ({ data: null, error: 'No Supabase' }), data: null, error: 'No Supabase' }), insert: () => Promise.resolve({ error: 'No Supabase' }), update: () => ({ eq: () => ({ eq: () => ({ eq: () => Promise.resolve({}) }) }) }), delete: () => ({ eq: () => ({ eq: () => Promise.resolve({}) }) }) }),
      removeChannel: () => {},
      channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
    };
  }
} catch (e) {
  console.warn('Supabase init failed:', e);
  window.supabase = {
    auth: { getSession: () => Promise.resolve({ data: { session: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) },
    from: () => ({ select: () => ({ eq: () => ({ data: null, error: 'No Supabase' }), order: () => ({ data: null, error: 'No Supabase' }), data: null, error: 'No Supabase' }), insert: () => Promise.resolve({ error: 'No Supabase' }), update: () => ({ eq: () => ({ eq: () => ({ eq: () => Promise.resolve({}) }) }) }), delete: () => ({ eq: () => ({ eq: () => Promise.resolve({}) }) }) }),
    removeChannel: () => {},
    channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  };
}
