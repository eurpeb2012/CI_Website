// ===== SVG Icon System — Authored monoline with signature imperfection =====
// Design DNA: one stroke per icon is 5-8% shorter than "correct".
// No <circle>, no <rect>. Organic paths only. Slight asymmetry throughout.
// 24×24 grid, 1.5px base / 1.6px nav, ≤4 paths, #5F7F73 at 75% via CSS.
const _s = `fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;
const icons = {
  // Brand — stem with two unequal leaves, right leaf 8% shorter
  leaf: `<svg viewBox="0 0 24 24" ${_s}><path d="M11.8 21V10.5"/><path d="M11.8 10.5C6.2 11 4.8 4.5 4.8 4.5c4.2-.3 7 2.8 7 6"/><path d="M11.8 14c5.2-.8 6.5-5.8 6.8-6.2-3.5-.2-5.8 2-6.8 5.2"/></svg>`,

  // Search — squashed oval (X scaled 98%), handle at 43° not 45°
  search: `<svg viewBox="0 0 24 24" ${_s}><path d="M16 10.3c0 3.4-2.7 6.1-6.2 5.8-3.2-.3-5.4-3-5.1-6.1.3-3 2.7-5.2 5.7-5.3 3.1 0 5.6 2.4 5.6 5.6z"/><path d="M14.6 15.4L20 21"/></svg>`,

  // Feeling — breath, not signal: inner gap tight, outer gap wide, stem off-center, outer arc broken
  feeling: `<svg viewBox="0 0 24 24" ${_s}><path d="M4.2 13c.8-4.5 4-7.5 8-7.2"/><path d="M12.5 5.8c3.5.5 6 3.5 5.8 7"/><path d="M8 13.2c.5-2 2.2-3.2 4.2-3 1.8.2 3.2 1.8 3 3.5"/><path d="M12.5 16.5v3"/></svg>`,

  // Categories — signature flaw: one stroke shorter per icon
  physical: `<svg viewBox="0 0 24 24" ${_s}><path d="M11.5 3.5c-2.8 3.2-2.5 7 .2 9.5"/><path d="M12.5 3.5c2.5 3 2.2 6.8-.2 10"/><path d="M11.8 13.5v7"/></svg>`,
  mental: `<svg viewBox="0 0 24 24" ${_s}><path d="M5.5 13.5c.2-4.8 3.2-8.2 6.2-8.2s6.3 3.2 6.5 7.5"/><path d="M11.8 21v-4.5"/><path d="M8.8 21h6.5"/></svg>`,
  creative: `<svg viewBox="0 0 24 24" ${_s}><path d="M7.5 17c-.2-5.8 3-12 7.5-13.8"/><path d="M15 3.5c1.2 4.2-.8 9.2-5 13"/><path d="M5.5 20.5c3.2-1.2 6.8-.8 10 .2" opacity=".55"/></svg>`,
  spiritual: `<svg viewBox="0 0 24 24" ${_s}><path d="M20.8 12.2c-.1 4.8-4 8.5-8.8 8.8-5 .2-9.2-3.5-9.2-8.5s3.8-9.2 8.8-9.2c5 0 9.2 3.8 9.2 8.9z"/><path d="M14.8 12.5c-.2 1.6-1.4 2.8-3 2.8-1.8 0-3-1.5-2.8-3.2.2-1.5 1.4-2.6 3-2.5 1.5.1 2.8 1.3 2.8 2.9z"/></svg>`,

  // Retreat — asymmetric mountain: left side longer, apex off-center-right
  retreat: `<svg viewBox="0 0 24 24" ${_s}><path d="M12.5 4.2L21 19.5"/><path d="M12.5 4.2L3 19"/><path d="M2.5 19.8h18.5"/></svg>`,

  // Delivery — one stroke shorter per icon
  inPerson: `<svg viewBox="0 0 24 24" ${_s}><path d="M12 7.5c0 1.8-1.2 3-2.8 3-1.8 0-3-1.2-3-2.8 0-1.8 1.2-3.2 2.8-3.2 1.7 0 3 1.2 3 3z"/><path d="M3.5 20c.2-3.5 2.8-5.8 5.8-5.8 2.8 0 5.2 2.2 5.5 5.5"/><path d="M16.5 9.2c1-.2 2 .5 2 1.5" opacity=".5"/></svg>`,
  video: `<svg viewBox="0 0 24 24" ${_s}><path d="M2.5 8.5c0-1.2.8-2 2-2h9.5c1 0 1.8.8 2 1.8v7c0 1-.8 1.8-1.8 2H4.5c-1.2 0-2-.8-2-2V8.5z"/><path d="M15.5 10.2l5.2-2.5v8.5L15.5 14"/></svg>`,
  telephone: `<svg viewBox="0 0 24 24" ${_s}><path d="M6.5 3.5c-2.2.2-3.5 2-3.5 4.5.2 7 6.8 13.2 13.2 13 2 0 3.8-1 3.8-3"/><path d="M3.2 8l3 1.8 1.8-1.8"/><path d="M16.2 17.5l1.8 3.2 3.2-1"/></svg>`,
  email: `<svg viewBox="0 0 24 24" ${_s}><path d="M3 7.5c0-1.2.8-2 2-2h14c1 0 2 .8 2 1.8v10c0 1-.8 2-1.8 2H5c-1.2 0-2-1-2-2V7.5z"/><path d="M3.2 7.5l8.5 5.5 9-5.2"/></svg>`,

  // Empty states — hand-drawn paths on 80×80 canvas
  emptySearch: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" class="empty-svg"><path d="M49 33c0 8.5-7 15.2-15.5 15-8-.2-14.5-7-14.2-15 .3-8 7-14.5 15-14.5 8.2 0 14.8 6.2 14.7 14.5z" opacity=".2"/><path d="M44 44l15 15" opacity=".2"/></svg>`,
  emptyMessages: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M17.5 24.5c.2-2 2-3.5 4-3.5h29c2 0 3.8 1.5 4 3.5v15.5c-.2 2-2 3.8-4 4H32.5l-8.5 7v-7h-2.5c-2 0-3.8-1.8-4-3.8V24.5z" opacity=".2"/></svg>`,
  emptyFavorites: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M40.5 60.5c-12.5-10-20-18-20.5-27 0-6.2 4.8-10.5 10.2-10.2 4 .2 7 2.2 10 6.2 3-4 6.2-6 10.2-6.2 5.2-.2 10.2 4 10 10.2-.5 9-8 17-19.8 27z" opacity=".18"/></svg>`,
  emptyJournal: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M24 19c0-1.5 1.2-2.8 2.8-3h26.5c1.5.2 2.8 1.5 2.8 3v45c0 1.5-1.2 2.8-2.8 3H26.8c-1.5-.2-2.8-1.5-2.8-3V19z" opacity=".18"/><path d="M34 33h12.5M34 41h8.5" opacity=".15"/></svg>`,
  emptyNotifications: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M25.5 48.5V34.2c.2-8.2 6.2-14.2 14.2-14.2 8.2 0 14.2 6.2 14.5 14v14.5l4 4H21.5l4-4z" opacity=".18"/></svg>`,
  emptyRetreat: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M40.5 18l20.5 38.5H19.5L40.5 18z" opacity=".16"/><path d="M13.5 58.5h53" opacity=".12"/></svg>`,
  emptyBlog: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M20.5 23c0-1.5 1.2-2.5 2.5-2.5h34c1.5 0 2.5 1 2.5 2.5v34c0 1.5-1 2.5-2.5 2.5h-34c-1.5 0-2.5-1-2.5-2.5V23z" opacity=".16"/><path d="M30.5 34.5h19M30.5 42.5h13.5" opacity=".13"/></svg>`,
  emptyProducts: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" class="empty-svg"><path d="M58 40.5c-.2 10-8.2 17.8-18 17.5-9.8-.2-17.5-8.2-17.5-18 0-9.8 8-17.8 17.8-17.8 10 0 17.8 8 17.7 18.3z" opacity=".16"/><path d="M46 40.2c0 3.5-2.8 6.2-6.2 6-3.2-.2-5.8-2.8-5.8-6 0-3.2 2.5-6 5.8-6 3.5 0 6.2 2.5 6.2 6z" opacity=".12"/></svg>`,
  emptyForum: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" class="empty-svg"><path d="M36 34c0 3.5-2.8 6-6.2 5.8-3-.2-5.5-2.8-5.5-6 .2-3 2.8-5.5 5.8-5.5 3.2 0 6 2.5 6 5.7z" opacity=".16"/><path d="M56.5 34.2c-.2 3.2-2.8 5.8-6 5.8-3.2 0-5.8-2.8-5.8-6 0-3.2 2.5-5.8 5.8-5.8 3.5 0 6.2 2.8 6 6z" opacity=".16"/><path d="M36.5 34h7.5" opacity=".1"/></svg>`,

  // Success — organic arc + check
  successCheck: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="success-svg"><path d="M62 40.5c-.2 12.2-10 21.8-22 21.5-12-.2-21.5-10.2-21.5-22 0-12 9.8-22 21.8-22 12.2 0 21.8 10 21.7 22.5z" opacity=".2"/><path d="M28.5 40.5l8.5 8 14.5-16" stroke-width="2"/></svg>`,
  successCelebrate: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="success-svg"><path d="M60.5 40.2c-.2 11.2-9.2 20-20.2 20-11.2 0-20.2-9-20.2-20 0-11 9-20.2 20-20.2 11.2 0 20.5 9 20.4 20.2z" opacity=".18"/><path d="M30 42.5l7 7 13.5-14.5" stroke-width="2"/></svg>`,
  successGift: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="success-svg"><path d="M60.5 40.2c-.2 11.2-9.2 20-20.2 20-11.2 0-20.2-9-20.2-20 0-11 9-20.2 20-20.2 11.2 0 20.5 9 20.4 20.2z" opacity=".18"/><path d="M31.5 40.5h17" stroke-width="1.8"/><path d="M40.2 32v16.5" stroke-width="1.8"/></svg>`,
  thankYou: `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="empty-svg"><path d="M40.2 56.5V32"/><path d="M40.2 32c-5.2.5-9.2-5-9.2-12.2 4.2 0 8.2 4.2 9.2 12.2z" opacity=".25"/><path d="M40 38.5c5.2-.5 9.2-5.2 9.2-12.5-4.2.2-8 4.5-9.2 12.5z" opacity=".2"/></svg>`,

  // Dashboard — signature flaw on each (one stroke shorter)
  schedule: `<svg viewBox="0 0 24 24" ${_s}><path d="M3.2 7c0-1 .8-1.8 1.8-2h14c1 .2 1.8 1 2 2v12c-.2 1-1 1.8-2 2H5c-1-.2-1.8-1-1.8-2V7z"/><path d="M3.2 9.8h17.2"/><path d="M8 3.2v3.5M16 3v3.8"/></svg>`,
  sessions: `<svg viewBox="0 0 24 24" ${_s}><path d="M3.5 6.2h16"/><path d="M3.5 12h12"/><path d="M3.5 17.8h8"/></svg>`,
  clients: `<svg viewBox="0 0 24 24" ${_s}><path d="M12 7.8c0 1.6-1.2 3-2.8 3-1.8 0-3-1.2-3-2.8 0-1.8 1.2-3.2 3-3.2 1.6 0 2.8 1.2 2.8 3z"/><path d="M3 20c.2-3.2 2.8-5.5 6-5.5 2.8 0 5.5 2.2 5.5 5.5"/><path d="M17 9.8c1-.2 1.8.5 1.8 1.5" opacity=".5"/></svg>`,
  earnings: `<svg viewBox="0 0 24 24" ${_s}><path d="M20.8 12.2c-.1 4.8-4 8.5-8.8 8.5-5 0-9-3.5-9-8.5s3.8-9.2 8.8-9.2c5 0 9.2 3.8 9 9.2z"/><path d="M9 9.8c.2-1.2 1.5-1.8 3-1.8 1.5 0 2.8.8 3 1.8.2 1.8-2.8 2-3 3.8-.2 1 1.5 1.8 3 1.8 1.5 0 2.5-.8 2.8-1.8"/></svg>`,
  editProfile: `<svg viewBox="0 0 24 24" ${_s}><path d="M16.2 3.8l3.8 3.8L7.8 19.8H4v-3.8L16.2 3.8z"/></svg>`,
  referrals: `<svg viewBox="0 0 24 24" ${_s}><path d="M12.2 3.2v7.8"/><path d="M12 11L5.8 19"/><path d="M12.2 11l5.8 7.8"/></svg>`,

  // Bento — signature flaw: retreat left line shorter, gift right branch shorter
  bentoRetreat: `<svg viewBox="0 0 24 24" ${_s}><path d="M12.5 4.5L21 19.5"/><path d="M12.5 4.5L3.5 18.5"/><path d="M2.5 19.8h18.5"/></svg>`,
  bentoForum: `<svg viewBox="0 0 24 24" ${_s}><path d="M3.5 7.2c0-1 1-1.8 2-2h8c1 .2 1.8 1 2 2v5.5c-.2 1-1 1.8-2 2H9l-3.2 2.5V15h-1c-1 0-1.3-.5-1.3-1.5V7.2z"/><path d="M15.8 10.2h2c1 0 1.8.8 2 1.8v3.8c-.2 1-1 1.8-2 1.8h-1v2l-2.5-2" opacity=".5"/></svg>`,
  bentoGift: `<svg viewBox="0 0 24 24" ${_s}><path d="M12.2 3.5v17"/><path d="M7 8.2c-2.2-3 .8-6.2 5.2-5"/><path d="M17 8c2-2.8-.8-5.5-4.8-4.8"/></svg>`,
  bentoBlog: `<svg viewBox="0 0 24 24" ${_s}><path d="M6.2 4.2v15c0 1.2.8 2 2 2.2h7.5c1.2 0 2-.8 2.2-2V4.2"/><path d="M9.2 10.2h5.5"/><path d="M9.2 14h3.8"/></svg>`,
  bentoProducts: `<svg viewBox="0 0 24 24" ${_s}><path d="M20.5 12.2c-.1 4.8-4 8.3-8.5 8.3-4.5 0-8.2-3.5-8.5-8.2-.2-5 3.5-8.8 8.3-8.8 4.8 0 8.8 3.5 8.7 8.7z"/><path d="M14.8 12.5c-.2 1.5-1.2 2.5-2.8 2.5-1.5 0-2.8-1.2-2.8-2.8 0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 3.1z"/></svg>`,

  // UI chrome — home base slightly wider, user head slightly smaller
  home: `<svg viewBox="0 0 24 24" ${_s}><path d="M3.5 10.5l8.5-7 8 7v9.2c0 .8-.5 1.2-1.2 1.2H4.8c-.5 0-1.2-.5-1.3-1V10.5z"/><path d="M9 21v-6.5h5.2V21"/></svg>`,
  user: `<svg viewBox="0 0 24 24" ${_s}><path d="M15.2 8.2c0 1.8-1.3 3.2-3.2 3.2-1.8 0-3.2-1.5-3.2-3 0-1.8 1.3-3.2 3-3.2 1.8 0 3.4 1.2 3.4 3z"/><path d="M5.2 21c.2-3.5 3-6 6.8-6 3.5 0 6.2 2.5 6.5 5.8"/></svg>`,
  back: `<svg viewBox="0 0 24 24" ${_s}><path d="M15 18l-6.2-6L15 6.2"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" ${_s}><path d="M9 18l6.2-6L9 6.2"/></svg>`,
  dashboard: `<svg viewBox="0 0 24 24" ${_s}><path d="M3 4.5c0-.8.5-1.5 1.2-1.5h5.3c.8 0 1.5.5 1.5 1.2v5.3c0 .8-.5 1.5-1.2 1.5H4.5c-.8 0-1.5-.5-1.5-1.2V4.5z"/><path d="M13.2 4.5c0-.8.5-1.3 1.2-1.5h5.3c.8.2 1.3.8 1.3 1.5v5.3c0 .8-.5 1.3-1.2 1.5h-5.3c-.8 0-1.5-.5-1.3-1.5V4.5z"/><path d="M3 14.5c0-.8.5-1.3 1.2-1.5h5.3c.8.2 1.3.8 1.5 1.5v5c0 .8-.5 1.5-1.2 1.5H4.5c-.8 0-1.5-.5-1.5-1.2V14.5z"/><path d="M13.2 14.2c0-.8.5-1.2 1.2-1.2h5.3c.8 0 1.3.5 1.3 1.2v5.3c0 .8-.5 1.3-1.2 1.5h-5.3c-.8 0-1.5-.5-1.3-1.5V14.2z"/></svg>`,
};

// Helper to render icon with size
function icon(name, size = 24) {
  return `<span class="svg-icon" style="width:${size}px;height:${size}px;display:inline-flex">${icons[name] || ''}</span>`;
}

// ===== State =====
let state = {
  feeling: null,
  category: null,
  delivery: null,
  bookingSession: null,
  bookingTherapist: null,
  bookingDate: null,
  bookingTime: null,
  bookingCalMonth: new Date().getMonth(),
  bookingCalYear: new Date().getFullYear(),
  bookingConflicts: [],
  criteriaFilters: null,
  generalSearchQuery: null,
};

// ===== Auth State =====
let authState = {
  isLoggedIn: false,
  user: null,
  pendingAction: null,
};

// Restore pending action from sessionStorage (survives OAuth redirect)
const savedPending = sessionStorage.getItem('iyashi-pending-action');
if (savedPending) {
  authState.pendingAction = JSON.parse(savedPending);
}

function saveAuth() {
  // Session/user state managed by Supabase — only persist pending action
  if (authState.pendingAction) {
    sessionStorage.setItem('iyashi-pending-action', JSON.stringify(authState.pendingAction));
  } else {
    sessionStorage.removeItem('iyashi-pending-action');
  }
}

function requireAuth(action, callback) {
  if (authState.isLoggedIn) {
    callback();
  } else {
    authState.pendingAction = { action, hash: window.location.hash };
    saveAuth();
    navigate('#/signup');
  }
}

// Initialize auth from Supabase session
async function initSupabaseAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    setAuthFromSession(session);
  }

  // Listen for auth changes (login, logout, token refresh, OAuth redirect)
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      setAuthFromSession(session);
      // Handle pending action after OAuth redirect
      if (event === 'SIGNED_IN' && authState.pendingAction) {
        const pending = authState.pendingAction;
        authState.pendingAction = null;
        saveAuth();
        if (pending.hash) {
          navigate(pending.hash);
          return;
        }
      }
      if (event === 'SIGNED_IN') {
        if (_needsDob()) {
          navigate('#/age-verify');
        } else {
          navigate(window.location.hash || '#/profile');
        }
      }
    } else {
      authState.isLoggedIn = false;
      authState.user = null;
    }
  });
}

function setAuthFromSession(session) {
  const u = session.user;
  const meta = u.user_metadata || {};
  authState.isLoggedIn = true;
  authState.user = {
    id: u.id,
    name: meta.full_name || meta.name || u.email?.split('@')[0] || '',
    email: u.email || '',
    avatar_url: meta.avatar_url || meta.picture || '',
    provider: u.app_metadata?.provider || 'email',
    plan: 'free',
    dob: meta.dob || localStorage.getItem('iyashi-dob') || null,
    isMinor: false,
    parentalConsent: meta.parental_consent || false,
  };
  // Calculate age
  if (authState.user.dob) {
    authState.user.isMinor = _calculateAge(authState.user.dob) < 18;
  }
  loadUserPlan();
}

function _calculateAge(dobStr) {
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function _needsDob() {
  return authState.isLoggedIn && !authState.user?.dob;
}

async function loadUserPlan() {
  if (!authState.user?.id) return;
  try {
    const { data } = await supabase.from('users').select('plan, plan_expires_at').eq('id', authState.user.id).single();
    if (data) {
      const expired = data.plan_expires_at && new Date(data.plan_expires_at) < new Date();
      authState.user.plan = expired ? 'free' : (data.plan || 'free');
    }
  } catch (e) { /* fallback to free */ }
}

function getBookingWindowDays() {
  const plan = authState.user?.plan || 'free';
  if (plan === 'premium') return 180;
  if (plan === 'standard') return 90;
  return 30;
}

async function signInWithProvider(provider) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + window.location.pathname,
    },
  });
  if (error) {
    console.error('Auth error:', error.message);
    showToast(t('authError'));
  }
}

async function signInWithMagicLink(email) {
  if (!email) return;
  const btn = document.getElementById('magic-link-btn');
  if (btn) { btn.disabled = true; btn.textContent = t('magicLinkSending'); }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
    },
  });
  if (error) {
    console.error('Magic link error:', error.message);
    showToast(t('authError'));
    if (btn) { btn.disabled = false; btn.textContent = t('signInMagicLink'); }
  } else {
    showToast(t('magicLinkSent'));
    if (btn) { btn.textContent = '✓ ' + t('magicLinkSent'); }
  }
}

// ===== Therapist Mode =====
let therapistMode = JSON.parse(localStorage.getItem('iyashi-therapist-mode') || 'null') || {
  active: false,
  therapistId: null,
};

function saveTherapistMode() {
  localStorage.setItem('iyashi-therapist-mode', JSON.stringify(therapistMode));
}

// ===== Favorites =====
let favorites = JSON.parse(localStorage.getItem('iyashi-favorites') || '[]');
function saveFavorites() { localStorage.setItem('iyashi-favorites', JSON.stringify(favorites)); }

async function loadFavorites() {
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  try {
    const { data, error } = await supabase.from('favorites').select('therapist_id').eq('user_id', userId);
    if (!error && data && data.length > 0) {
      favorites = data.map(f => f.therapist_id);
      saveFavorites();
    }
  } catch (e) {
    console.warn('loadFavorites: Supabase failed, using localStorage', e);
  }
}

function toggleFavorite(id) {
  id = String(id);
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  const idx = favorites.indexOf(id);
  if (idx > -1) {
    favorites.splice(idx, 1);
    supabase.from('favorites').delete().eq('user_id', userId).eq('therapist_id', id)
      .then(({ error }) => { if (error) console.warn('Supabase favorites delete failed:', error); });
  } else {
    favorites.push(id);
    supabase.from('favorites').insert({ user_id: userId, therapist_id: id })
      .then(({ error }) => { if (error) console.warn('Supabase favorites insert failed:', error); });
  }
  saveFavorites();
  router();
}
function isFavorite(id) { return favorites.includes(String(id)); }

// ===== Points =====
let pointsData = JSON.parse(localStorage.getItem('iyashi-points') || 'null') || { balance: 0, history: [] };
function savePoints() { localStorage.setItem('iyashi-points', JSON.stringify(pointsData)); }
function earnPoints(amount, desc) {
  const pts = Math.floor(amount / 100);
  pointsData.balance += pts;
  pointsData.history.unshift({ type: 'earned', points: pts, desc, date: new Date().toISOString().slice(0,10) });
  savePoints();
  // Sync to Supabase
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  supabase.from('points_transactions').insert({
    user_id: userId, points: pts, transaction_type: 'earned', description: desc,
  }).then(({ error }) => { if (error) console.warn('Points sync failed:', error); });
}
function redeemPoints(pts, desc) {
  if (pts > pointsData.balance) return false;
  pointsData.balance -= pts;
  pointsData.history.unshift({ type: 'redeemed', points: pts, desc, date: new Date().toISOString().slice(0,10) });
  savePoints();
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  supabase.from('points_transactions').insert({
    user_id: userId, points: -pts, transaction_type: 'redeemed', description: desc,
  }).then(({ error }) => { if (error) console.warn('Points redeem sync failed:', error); });
  return true;
}
async function loadPoints() {
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  try {
    const { data, error } = await supabase.from('points_transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      let balance = 0;
      const history = data.map(t => {
        balance += t.points;
        return { type: t.transaction_type, points: Math.abs(t.points), desc: t.description || '', date: t.created_at ? t.created_at.slice(0, 10) : '' };
      });
      pointsData = { balance, history };
      savePoints();
    }
  } catch (e) { console.warn('loadPoints: Supabase failed, using localStorage', e); }
}

// ===== Journal =====
let journalEntries = JSON.parse(localStorage.getItem('iyashi-journal') || '[]');
function saveJournal() { localStorage.setItem('iyashi-journal', JSON.stringify(journalEntries)); }

async function loadJournal() {
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  try {
    const { data, error } = await supabase.from('journal_entries').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      journalEntries = data.map(e => ({
        mood: e.mood,
        moodEmoji: e.mood_emoji,
        notes: e.notes,
        date: e.created_at ? e.created_at.slice(0, 10) : '',
      }));
      saveJournal();
    }
  } catch (e) {
    console.warn('loadJournal: Supabase failed, using localStorage', e);
  }
}

// ===== Waitlist =====
let waitlistIds = JSON.parse(localStorage.getItem('iyashi-waitlist') || '[]');
function saveWaitlist() { localStorage.setItem('iyashi-waitlist', JSON.stringify(waitlistIds)); }

async function loadWaitlist() {
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  try {
    const { data, error } = await supabase.from('waitlist').select('therapist_id').eq('user_id', userId);
    if (!error && data && data.length > 0) {
      waitlistIds = data.map(w => w.therapist_id);
      saveWaitlist();
    }
  } catch (e) {
    console.warn('loadWaitlist: Supabase failed, using localStorage', e);
  }
}

// ===== Load User Data (Supabase with localStorage fallback) =====
async function loadUserData() {
  await Promise.all([loadFavorites(), loadWaitlist(), loadJournal(), loadPoints(), loadNotifications()]);
}

// ===== File Upload (Supabase Storage) =====
function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', quality);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

async function uploadAvatar(file, bucket, path) {
  if (!file) return null;
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) { showToast(t('uploadTooLarge')); return null; }
  const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || file.name.match(/\.(heic|heif)$/i);
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
  if (!allowed.includes(file.type) && !isHeic) { showToast(t('uploadInvalidType')); return null; }
  try {
    let uploadFile = file;
    let contentType = file.type || 'image/jpeg';
    let ext = 'jpg';
    if (isHeic) {
      // Browsers can't decode HEIC via canvas — upload original, Supabase serves it fine
      ext = 'heic';
    } else {
      uploadFile = await compressImage(file);
      contentType = 'image/jpeg';
    }
    const filePath = `${path}/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, uploadFile, { upsert: true, contentType });
    if (error) { console.error('Upload failed:', error); showToast(t('uploadFailed')); return null; }
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return urlData?.publicUrl || null;
  } catch (e) { console.error('Upload error:', e); showToast(t('uploadFailed')); return null; }
}

function createFileInput(onSelect) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif';
  input.onchange = () => { if (input.files[0]) onSelect(input.files[0]); };
  input.click();
}

async function onUploadUserAvatar() {
  createFileInput(async (file) => {
    const url = await uploadAvatar(file, 'avatars', 'users');
    if (!url) return;
    const userId = authState.user?.id;
    if (userId) {
      await supabase.from('users').update({ avatar_url: url }).eq('id', userId);
      authState.user.avatar_url = url;
    }
    showToast(t('uploadSuccess'));
    router();
  });
}

async function onUploadTherapistAvatar(therapistId) {
  createFileInput(async (file) => {
    const url = await uploadAvatar(file, 'avatars', 'therapists');
    if (!url) return;
    await supabase.from('therapists').update({ avatar_url: url }).eq('id', therapistId);
    showToast(t('uploadSuccess'));
    router();
  });
}

// ===== Sort State =====
let currentSort = 'recommended';

// ===== Theme =====
function getTheme() {
  return localStorage.getItem('iyashi-theme') || 'spring';
}

function setTheme(theme) {
  localStorage.setItem('iyashi-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

function suggestThemeByTime() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'spring';
  if (hour >= 12 && hour < 18) return 'summer';
  return 'evening';
}

// ===== Accent Style =====
function getAccentStyle() {
  return localStorage.getItem('iyashi-accent') || 'warm-wood';
}

function setAccentStyle(style) {
  localStorage.setItem('iyashi-accent', style);
  document.documentElement.setAttribute('data-accent', style);
}

// Initialize theme + accent
setTheme(getTheme());
setAccentStyle(getAccentStyle());

// ===== Router =====
let _prevRoute = '/';
let _navDirection = 'forward'; // 'forward', 'back', 'tab'

function navigate(hash) {
  const newRoute = hash.slice(1);
  const oldRoute = getRoute();
  // Determine transition type
  const newDepth = newRoute.split('/').filter(Boolean).length;
  const oldDepth = oldRoute.split('/').filter(Boolean).length;
  if (newDepth > oldDepth) {
    _navDirection = 'forward';
  } else if (newDepth < oldDepth) {
    _navDirection = 'back';
  } else {
    _navDirection = 'tab';
  }
  _prevRoute = oldRoute;
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1); // remove #
}

function _getPageTransitionClass() {
  if (_navDirection === 'forward') return 'slide-in';
  if (_navDirection === 'back') return 'slide-back';
  return 'fade-up';
}

// Route table with regex matching
const routes = [
  { pattern: /^\/$/, handler: 'landing', nav: 'home' },
  { pattern: /^\/search$/, handler: 'searchEntry', nav: 'search' },
  { pattern: /^\/search\/feeling$/, handler: 'feelingStep1', nav: 'search' },
  { pattern: /^\/search\/feeling\/category$/, handler: 'feelingStep2', nav: 'search' },
  { pattern: /^\/search\/feeling\/category\/playful$/, handler: 'playfulSubMenu', nav: 'search' },
  { pattern: /^\/search\/feeling\/delivery$/, handler: 'feelingStep3', nav: 'search' },
  { pattern: /^\/search\/feeling\/results$/, handler: 'feelingResults', nav: 'search' },
  { pattern: /^\/search\/criteria$/, handler: 'criteria', nav: 'search' },
  { pattern: /^\/search\/criteria\/results$/, handler: 'criteriaResults', nav: 'search' },
  { pattern: /^\/search\/general-results$/, handler: 'generalSearchResults', nav: 'search' },
  { pattern: /^\/therapist\/([a-f0-9-]+|\d+)$/, handler: 'therapistProfile', nav: 'search' },
  { pattern: /^\/booking$/, handler: 'booking', nav: 'search' },
  { pattern: /^\/booking\/success$/, handler: 'bookingSuccess', nav: 'search' },
  { pattern: /^\/apply$/, handler: 'apply', nav: 'home' },
  { pattern: /^\/apply\/success$/, handler: 'applySuccess', nav: 'home' },
  { pattern: /^\/profile$/, handler: 'userProfile', nav: 'profile' },
  { pattern: /^\/settings$/, handler: 'settings', nav: 'profile' },
  { pattern: /^\/signup$/, handler: 'signup', nav: 'profile' },
  { pattern: /^\/age-verify$/, handler: 'ageVerify', nav: 'profile' },
  { pattern: /^\/messages$/, handler: 'messagesList', nav: 'profile' },
  { pattern: /^\/chat\/([a-f0-9-]+|\d+)$/, handler: 'chat', nav: 'profile' },
  { pattern: /^\/videocall\/([a-f0-9-]+|\d+)$/, handler: 'videocall', nav: 'profile' },
  { pattern: /^\/review\/([a-f0-9-]+|\d+)$/, handler: 'reviewForm', nav: 'search' },
  { pattern: /^\/therapist-dashboard$/, handler: 'therapistDashboard', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/schedule$/, handler: 'therapistSchedule', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/sessions$/, handler: 'therapistSessions', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/sessions\/edit\/([a-f0-9-]+|\d+)$/, handler: 'therapistSessionEdit', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/clients$/, handler: 'therapistClients', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/earnings$/, handler: 'therapistEarnings', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/profile-edit$/, handler: 'therapistProfileEdit', nav: 'dashboard' },
  { pattern: /^\/therapist-dashboard\/referrals$/, handler: 'therapistReferrals', nav: 'dashboard' },
  { pattern: /^\/referral\/([A-Z0-9]+)$/, handler: 'referralLanding', nav: 'home' },
  { pattern: /^\/favorites$/, handler: 'favorites', nav: 'profile' },
  { pattern: /^\/gift-card$/, handler: 'giftCard', nav: 'home' },
  { pattern: /^\/gift-card\/success$/, handler: 'giftCardSuccess', nav: 'home' },
  { pattern: /^\/blog$/, handler: 'blog', nav: 'home' },
  { pattern: /^\/blog\/(.+)$/, handler: 'blogDetail', nav: 'home' },
  { pattern: /^\/digital-products$/, handler: 'digitalProductsList', nav: 'home' },
  { pattern: /^\/journal$/, handler: 'journal', nav: 'profile' },
  { pattern: /^\/journal\/new$/, handler: 'journalNew', nav: 'profile' },
  { pattern: /^\/points$/, handler: 'pointsPage', nav: 'profile' },
  { pattern: /^\/notifications$/, handler: 'notifications', nav: 'profile' },
  { pattern: /^\/retreats$/, handler: 'retreats', nav: 'home' },
  { pattern: /^\/retreats\/([a-f0-9-]+|\d+)$/, handler: 'retreatDetail', nav: 'home' },
  { pattern: /^\/forum$/, handler: 'forum', nav: 'home' },
  { pattern: /^\/forum\/new$/, handler: 'forumNew', nav: 'home' },
  { pattern: /^\/forum\/([a-f0-9-]+|\d+)$/, handler: 'forumThread', nav: 'home' },
  { pattern: /^\/privacy$/, handler: 'privacy', nav: 'home' },
  { pattern: /^\/terms$/, handler: 'terms', nav: 'home' },
  { pattern: /^\/feedback$/, handler: 'feedback', nav: 'profile' },
];

function router() {
  try {
    // Clean up chat subscription when navigating away
    _cleanupChatSubscription();

    const route = getRoute();
    const content = document.getElementById('content');
    const header = document.getElementById('header');

    let matched = false;
    for (const r of routes) {
      const match = route.match(r.pattern);
      if (match) {
        matched = true;
        const params = match.slice(1);
        renderRoute(r.handler, content, header, params);
        setActiveNav(r.nav);
        break;
      }
    }

    if (!matched) {
      _navDirection = 'tab';
      renderRoute('landing', content, header, []);
      setActiveNav('home');
    }

    // Apply page transition class
    const pageEl = content.querySelector('.page, .landing');
    if (pageEl) {
      const cls = _getPageTransitionClass();
      pageEl.classList.add(cls);
    }

    // Apply staggered card entrance
    requestAnimationFrame(() => {
      applyStagger('.therapist-card, .retreat-card, .blog-card-mini, .digital-product-card, .session-card, .review-card, .forum-thread-card', 60);
      observeReveals();
    });

    updateBottomNav();
    window.scrollTo(0, 0);
  } catch (e) {
    console.error('Router error:', e);
  }
}

function renderRoute(handler, el, header, params) {
  const handlers = {
    landing: () => renderLanding(el, header),
    searchEntry: () => renderSearchEntry(el, header),
    feelingStep1: () => renderFeelingStep1(el, header),
    feelingStep2: () => renderFeelingStep2(el, header),
    playfulSubMenu: () => renderPlayfulSubMenu(el, header),
    feelingStep3: () => renderFeelingStep3(el, header),
    feelingResults: () => renderResults(el, header, { category: state.category, delivery: state.delivery }),
    criteria: () => renderCriteria(el, header),
    criteriaResults: () => renderResults(el, header, state.criteriaFilters || {}),
    generalSearchResults: () => renderGeneralSearchResults(el, header),
    therapistProfile: () => renderTherapistProfile(el, header, params[0]),
    booking: () => renderBooking(el, header),
    bookingSuccess: () => renderBookingSuccess(el, header),
    apply: () => renderApply(el, header),
    applySuccess: () => renderApplySuccess(el, header),
    userProfile: () => renderUserProfile(el, header),
    settings: () => renderSettings(el, header),
    signup: () => renderSignup(el, header),
    ageVerify: () => renderAgeVerify(el, header),
    messagesList: () => renderMessagesList(el, header),
    chat: () => renderChat(el, header, params[0]),
    videocall: () => renderVideoCall(el, header, params[0]),
    reviewForm: () => renderReviewForm(el, header, params[0]),
    therapistDashboard: () => renderTherapistDashboard(el, header),
    therapistSchedule: () => renderTherapistSchedule(el, header),
    therapistSessions: () => renderTherapistSessions(el, header),
    therapistSessionEdit: () => renderTherapistSessionEdit(el, header, params[0]),
    therapistClients: () => renderTherapistClients(el, header),
    therapistEarnings: () => renderTherapistEarnings(el, header),
    therapistProfileEdit: () => renderTherapistProfileEdit(el, header),
    therapistReferrals: () => renderTherapistReferrals(el, header),
    referralLanding: () => renderReferralLanding(el, header, params[0]),
    favorites: () => renderFavorites(el, header),
    giftCard: () => renderGiftCard(el, header),
    giftCardSuccess: () => renderGiftCardSuccess(el, header),
    blog: () => renderBlog(el, header),
    blogDetail: () => renderBlogDetail(el, header, params[0]),
    digitalProductsList: () => renderDigitalProducts(el, header),
    journal: () => renderJournal(el, header),
    journalNew: () => renderJournalNew(el, header),
    pointsPage: () => renderPoints(el, header),
    notifications: () => renderNotifications(el, header),
    retreats: () => renderRetreats(el, header),
    retreatDetail: () => renderRetreatDetail(el, header, params[0]),
    forum: () => renderForum(el, header),
    forumThread: () => renderForumThread(el, header, params[0]),
    forumNew: () => renderForumNewThread(el, header),
    privacy: () => renderPrivacy(el, header),
    terms: () => renderTerms(el, header),
    feedback: () => renderFeedback(el, header),
  };
  try {
    (handlers[handler] || handlers.landing)();
  } catch (e) {
    console.error('Render error [' + handler + ']:', e);
    el.innerHTML = '<div class="page"><div class="empty-state-box"><div class="empty-state-icon">—</div><p>Error loading page. <button class="btn-primary mt-12" onclick="navigate(\'#/\')">Back to Home</button></p></div></div>';
  }
}

function setActiveNav(tab) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
}

function updateBottomNav() {
  const nav = document.querySelector('.bottom-nav');
  if (therapistMode.active) {
    nav.innerHTML = `
      <button class="nav-item" data-tab="dashboard" onclick="navigate('#/therapist-dashboard')">
        ${icons.dashboard}
        <span data-t="navDashboard">${t('navDashboard')}</span>
      </button>
      <button class="nav-item" data-tab="sessions" onclick="navigate('#/therapist-dashboard/sessions')">
        ${icons.sessions}
        <span data-t="navSessions">${t('navSessions')}</span>
      </button>
      <button class="nav-item" data-tab="profile" onclick="navigate('#/profile')">
        ${icons.user}
        <span data-t="navProfile">${t('navProfile')}</span>
      </button>
    `;
  } else {
    nav.innerHTML = `
      <button class="nav-item" data-tab="home" onclick="navigate('#/')">
        ${icons.home}
        <span data-t="navHome">${t('navHome')}</span>
      </button>
      <button class="nav-item" data-tab="search" onclick="navigate('#/search')">
        ${icons.search}
        <span data-t="navSearch">${t('navSearch')}</span>
      </button>
      <button class="nav-item" data-tab="profile" onclick="navigate('#/profile')">
        ${icons.user}
        <span data-t="navProfile">${t('navProfile')}</span>
      </button>
    `;
  }
  // Re-apply active state
  const route = getRoute();
  let activeTab = 'home';
  for (const r of routes) {
    if (route.match(r.pattern)) {
      activeTab = r.nav;
      break;
    }
  }
  setActiveNav(activeTab);
}

// ===== Header Helpers =====
function renderHeaderSimple(header, title) {
  header.innerHTML = `
    <div class="header-title">${title}</div>
    <div class="header-actions">
      ${!authState.isLoggedIn ? `<button class="login-btn-header" onclick="navigate('#/signup')">${t('loginButton')}</button>` : ''}
      <button class="lang-toggle" onclick="onToggleLang()">${t('language')}</button>
    </div>
  `;
}

function renderHeaderWithBack(header, title, backRoute) {
  header.innerHTML = `
    <button class="header-back" onclick="navigate('${backRoute}')">${icons.back} ${t('back')}</button>
    <div class="header-title">${title}</div>
    <button class="lang-toggle" onclick="onToggleLang()">${t('language')}</button>
  `;
}

// ===== Language Toggle =====
function onToggleLang() {
  toggleLanguage();
  router(); // re-render
}

// ===== Tier Badge Helper =====
function renderTierBadge(tier, isFoundingMember) {
  const tierInfo = therapistTiers[tier];
  if (!tierInfo) return '';
  const tierClass = `tier-${tier}`;
  let badge = `<span class="tier-badge ${tierClass}">${tierInfo.icon} ${t('tier' + tier.charAt(0).toUpperCase() + tier.slice(1))}</span>`;
  if (isFoundingMember) {
    badge += ` <span class="tier-badge founding-member">⭐ ${t('foundingMember')}</span>`;
  }
  return badge;
}

// ===== Screen Renderers =====

function renderLanding(el, header) {
  renderHeaderSimple(header, t('appName'));
  // Get trending therapists (top 3 by popularity)
  const trending = [...therapists].sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0)).slice(0, 3);
  el.innerHTML = `
    <div class="landing">
      <div class="landing-logo-wrap">
        <div class="landing-logo">${icons.leaf}</div>
      </div>
      <h1 class="landing-title">${t('landingTitle')}</h1>
      <p class="landing-subtitle">${t('landingSubtitle')}</p>
      <p class="landing-tagline">${t('landingTagline')}</p>
      <p class="landing-empathy">${t('landingEmpathy')}</p>
      <button class="btn-primary" onclick="navigate('#/search')">${t('landingCTA')}</button>
      <button class="btn-secondary" onclick="navigate('#/apply')">${t('landingSecondary')}</button>

      <div class="bento-grid">
        <button class="bento-tile bento-retreat" onclick="navigate('#/retreats')">
          <span class="bento-icon">${icons.bentoRetreat}</span>
          <span class="bento-label">${t('retreatSectionTitle')}</span>
        </button>
        <button class="bento-tile bento-forum" onclick="navigate('#/forum')">
          <span class="bento-icon">${icons.bentoForum}</span>
          <span class="bento-label">${t('forumTitle')}</span>
        </button>
        <button class="bento-tile bento-gift" onclick="navigate('#/gift-card')">
          <span class="bento-icon">${icons.bentoGift}</span>
          <span class="bento-label">${t('giftCardTitle')}</span>
        </button>
        <button class="bento-tile bento-blog" onclick="navigate('#/blog')">
          <span class="bento-icon">${icons.bentoBlog}</span>
          <span class="bento-label">${t('blogTitle')}</span>
        </button>
        <button class="bento-tile bento-products bento-wide" onclick="navigate('#/digital-products')">
          <span class="bento-icon">${icons.bentoProducts}</span>
          <span class="bento-label">${t('digitalProductsTitle')}</span>
        </button>
      </div>

      <div class="trending-section">
        <h2 class="section-title">${t('trendingTitle')}</h2>
        <div class="trending-cards">
          ${trending.map(th => {
            const name = getLocalizedText(th.name);
            const minPrice = Math.min(...th.sessions.map(s => s.price));
            return `
              <div class="trending-card" onclick="navigate('#/therapist/${th.id}')">
                <div class="trending-avatar" style="background-color:${th.avatarColor}">${name.charAt(0)}</div>
                <div class="trending-name">${name}</div>
                <div class="trending-price">¥${minPrice.toLocaleString()}〜</div>
                ${th.verified ? '<div class="verified-badge-sm">✓</div>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="trending-section">
        <h2 class="section-title">${t('blogTitle')}</h2>
        ${blogArticles.slice(0, 2).map(a => {
          const th = getTherapist(a.therapistId);
          return `
            <div class="blog-card-mini" onclick="navigate('#/blog/${a.id}')">
              <div class="blog-card-mini-text">
                <h3>${getLocalizedText(a.title)}</h3>
                <p>${getLocalizedText(a.excerpt)}</p>
              </div>
            </div>
          `;
        }).join('')}
        <button class="btn-text" onclick="navigate('#/blog')">${t('blogReadMore')} →</button>
      </div>

      <div class="landing-footer">
        <a href="#/privacy" class="legal-link">${t('privacyPolicyTitle')}</a> · <a href="#/terms" class="legal-link">${t('termsOfServiceTitle')}</a>
      </div>
    </div>
  `;
}

function renderSearchEntry(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/');
  el.innerHTML = `
    <div class="page search-entry">
      <div class="general-search-bar" style="display:flex;gap:8px;margin-bottom:24px">
        <input type="text" id="general-search-input" placeholder="${t('generalSearchPlaceholder')}" style="flex:1;padding:12px;border:1px solid var(--gray-300);border-radius:8px;font-size:0.95rem">
        <button class="btn-primary" style="white-space:nowrap;padding:12px 16px" onclick="onGeneralSearch()">${t('generalSearchButton')}</button>
      </div>
      <h1 class="page-title">${t('searchTitle')}</h1>
      <div class="search-option" onclick="navigate('#/search/criteria')">
        <div class="search-option-icon">${icons.search}</div>
        <div class="search-option-text">
          <h3>${t('searchByCriteria')}</h3>
          <p>${t('searchByCriteriaDesc')}</p>
        </div>
      </div>
      <div class="search-option" onclick="navigate('#/search/feeling')">
        <div class="search-option-icon">${icons.feeling}</div>
        <div class="search-option-text">
          <h3>${t('searchByFeeling')}</h3>
          <p>${t('searchByFeelingDesc')}</p>
        </div>
      </div>
    </div>
  `;
}

function onGeneralSearch() {
  const query = document.getElementById('general-search-input').value.trim();
  if (!query) return;
  state.generalSearchQuery = query;
  navigate('#/search/general-results');
}

function renderGeneralSearchResults(el, header) {
  renderHeaderWithBack(header, t('resultsTitle'), '#/search');
  const results = searchTherapistsByText(state.generalSearchQuery || '');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('resultsTitle')}</h1>
      ${results.length === 0 ? `<div class="results-empty">${t('resultsEmpty')}</div>` : ''}
      ${results.map(th => renderTherapistCard(th)).join('')}
    </div>
  `;
}

function renderFeelingStep1(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search');
  const feelings = [
    { key: 'stressed', label: t('feelingStressed') },
    { key: 'anxious', label: t('feelingAnxious') },
    { key: 'lonely', label: t('feelingLonely') },
    { key: 'overwhelmed', label: t('feelingOverwhelmed') },
    { key: 'low-energy', label: t('feelingLowEnergy') },
    { key: 'change-myself', label: t('feelingChangeMyself') },
    { key: 'future', label: t('feelingFuture') },
    { key: 'partner', label: t('feelingPartner') },
    { key: 'dream-job', label: t('feelingDreamJob') },
    { key: 'curious', label: t('feelingCurious') },
  ];
  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot active"></div><div class="step-dot"></div><div class="step-dot"></div><div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('feelingTitle')}</h1>
      <div class="feeling-options">
        ${feelings.map(f => `
          <button class="feeling-btn" onclick="state.feeling='${f.key}'; navigate('#/search/feeling/category')">${f.label}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFeelingStep2(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search/feeling');
  const categories = [
    { key: 'physical', icon: icons.physical, label: t('categoryPhysical'), desc: t('categoryPhysicalDesc') },
    { key: 'mental', icon: icons.mental, label: t('categoryMental'), desc: t('categoryMentalDesc') },
    { key: 'playful', icon: icons.creative, label: t('categoryPlayful'), desc: t('categoryPlayfulDesc') },
  ];
  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot"></div><div class="step-dot active"></div><div class="step-dot"></div><div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('categoryTitle')}</h1>
      <div class="category-cards">
        ${categories.map(c => `
          <div class="category-card" onclick="${c.key === 'playful' ? "navigate('#/search/feeling/category/playful')" : `state.category='${c.key}'; navigate('#/search/feeling/delivery')`}">
            <div class="category-icon">${c.icon}</div>
            <div><h3>${c.label}</h3><p>${c.desc}</p></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPlayfulSubMenu(el, header) {
  renderHeaderWithBack(header, t('categoryPlayful'), '#/search/feeling/category');
  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot"></div><div class="step-dot active"></div><div class="step-dot"></div><div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('categoryTitle')}</h1>
      <div class="category-cards">
        <div class="category-card" onclick="state.category='experiences'; navigate('#/search/feeling/delivery')">
          <div class="category-icon">${icons.creative}</div>
          <div><h3>${t('categoryExperiences')}</h3><p>${t('categoryExperiencesDesc')}</p></div>
        </div>
        <div class="category-card" onclick="state.category='fortune-telling'; navigate('#/search/feeling/delivery')">
          <div class="category-icon">${icons.spiritual}</div>
          <div><h3>${t('categoryFortuneTelling')}</h3><p>${t('categoryFortuneTellingDesc')}</p></div>
        </div>
        <div class="category-card" onclick="state.category='retreat'; state.delivery='in-person'; navigate('#/search/feeling/results')">
          <div class="category-icon">${icons.retreat}</div>
          <div><h3>${t('categoryRetreat')}</h3><p>${t('categoryRetreatInPersonDesc')}</p></div>
        </div>
      </div>
    </div>
  `;
}

function renderFeelingStep3(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search/feeling/category');
  const deliveries = [
    { key: 'in-person', icon: icons.inPerson, label: t('deliveryInPerson'), desc: t('deliveryInPersonDesc') },
    { key: 'video', icon: icons.video, label: t('deliveryVideo'), desc: t('deliveryVideoDesc') },
    { key: 'telephone', icon: icons.telephone, label: t('deliveryTelephone'), desc: t('deliveryTelephoneDesc') },
    { key: 'email', icon: icons.email, label: t('deliveryEmail'), desc: t('deliveryEmailDesc') },
  ];
  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot"></div><div class="step-dot"></div><div class="step-dot active"></div><div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('deliveryTitle')}</h1>
      <div class="delivery-options">
        ${deliveries.map(d => `
          <button class="delivery-btn" onclick="state.delivery='${d.key}'; navigate('#/search/feeling/results')">
            <div class="delivery-icon">${d.icon}</div>
            <div><h3>${d.label}</h3><p>${d.desc}</p></div>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTherapistCard(th) {
  const name = getLocalizedText(th.name);
  const location = getLocalizedText(th.location);
  const minPrice = Math.min(...th.sessions.map(s => s.price));
  const initial = name.charAt(0);
  const avgRating = th.reviews.filter(r => r.type === 'client-to-therapist').length > 0
    ? (th.reviews.filter(r => r.type === 'client-to-therapist').reduce((s,r) => s + r.rating, 0) / th.reviews.filter(r => r.type === 'client-to-therapist').length).toFixed(1)
    : null;
  const reviewCount = th.reviews.filter(r => r.type === 'client-to-therapist').length;
  return `
    <div class="therapist-card" onclick="navigate('#/therapist/${th.id}')">
      <div class="therapist-avatar" style="background-color: ${th.avatarColor}">
        ${initial}
        ${th.verified ? '<span class="verified-check">✓</span>' : ''}
      </div>
      <div class="therapist-card-info">
        <h3>${name} ${renderTierBadge(th.tier, th.isFoundingMember)}</h3>
        <div class="username">${th.username}</div>
        <div class="location">${location}</div>
        ${th.tags ? `<div class="card-tags">${th.tags.slice(0,3).map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>` : ''}
        <div class="card-meta-row">
          <span class="price">¥${minPrice.toLocaleString()} ${t('resultsFrom')}</span>
          ${avgRating ? `<span class="card-rating">★ ${avgRating} (${reviewCount})</span>` : ''}
        </div>
        ${th.responseTime ? `<div class="card-response-time">${t('responseTime')}: ${th.responseTime}</div>` : ''}
        ${th.slidingScale ? `<div class="card-sliding-scale">${t('slidingScale')}</div>` : ''}
        ${authState.user?.isMinor && !th.accepts_minors ? `<div class="card-minor-blocked">${t('minorBookingBlocked')}</div>` : ''}
      </div>
      <button class="fav-btn${isFavorite(th.id) ? ' active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${th.id}'); this.classList.add('pop')" title="${isFavorite(th.id) ? t('removeFavorite') : t('addFavorite')}">
        <svg viewBox="0 0 24 24" class="heart-svg" fill="${isFavorite(th.id) ? 'var(--theme-primary-500)' : 'none'}" stroke="${isFavorite(th.id) ? 'var(--theme-primary-500)' : 'var(--gray-400)'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
  `;
}

function applySorting(results, sort) {
  const sorted = [...results];
  switch(sort) {
    case 'priceLow':
      sorted.sort((a, b) => Math.min(...a.sessions.map(s => s.price)) - Math.min(...b.sessions.map(s => s.price)));
      break;
    case 'priceHigh':
      sorted.sort((a, b) => Math.min(...b.sessions.map(s => s.price)) - Math.min(...a.sessions.map(s => s.price)));
      break;
    case 'rating':
      sorted.sort((a, b) => {
        const ra = a.reviews.filter(r => r.type === 'client-to-therapist');
        const rb = b.reviews.filter(r => r.type === 'client-to-therapist');
        const avgA = ra.length ? ra.reduce((s,r) => s + r.rating, 0) / ra.length : 0;
        const avgB = rb.length ? rb.reduce((s,r) => s + r.rating, 0) / rb.length : 0;
        return avgB - avgA;
      });
      break;
    case 'reviews':
      sorted.sort((a, b) => b.reviews.filter(r => r.type === 'client-to-therapist').length - a.reviews.filter(r => r.type === 'client-to-therapist').length);
      break;
  }
  return sorted;
}

function renderResults(el, header, filters) {
  const isFeeling = getRoute().includes('feeling');
  const backRoute = isFeeling ? '#/search/feeling/delivery' : '#/search/criteria';
  renderHeaderWithBack(header, t('resultsTitle'), backRoute);

  let results = searchTherapists(filters);
  results = applySorting(results, currentSort);

  let stepIndicator = '';
  if (isFeeling) {
    stepIndicator = `<div class="step-indicator"><div class="step-dot"></div><div class="step-dot"></div><div class="step-dot"></div><div class="step-dot active"></div></div>`;
  }

  el.innerHTML = `
    <div class="page">
      ${stepIndicator}
      <h1 class="page-title">${t('resultsTitle')}</h1>
      <div class="sort-bar">
        <label>${t('sortBy')}:</label>
        <select onchange="currentSort=this.value; router()">
          <option value="recommended" ${currentSort==='recommended'?'selected':''}>${t('sortRecommended')}</option>
          <option value="priceLow" ${currentSort==='priceLow'?'selected':''}>${t('sortPriceLow')}</option>
          <option value="priceHigh" ${currentSort==='priceHigh'?'selected':''}>${t('sortPriceHigh')}</option>
          <option value="rating" ${currentSort==='rating'?'selected':''}>${t('sortRating')}</option>
          <option value="reviews" ${currentSort==='reviews'?'selected':''}>${t('sortReviews')}</option>
        </select>
      </div>
      ${results.length === 0 ? `<div class="results-empty">${t('resultsEmpty')}</div>` : ''}
      ${results.map(th => renderTherapistCard(th)).join('')}
    </div>
  `;
}

function renderCriteria(el, header) {
  renderHeaderWithBack(header, t('criteriaTitle'), '#/search');
  const typeOptions = [
    { value: '', label: t('criteriaTypeAll') },
    { value: 'physical', label: t('categoryPhysical') },
    { value: 'mental', label: t('categoryMental') },
    { value: 'experiences', label: t('categoryExperiences') },
    { value: 'fortune-telling', label: t('categoryFortuneTelling') },
    { value: 'retreat', label: t('categoryRetreat') },
  ];
  const locationOptions = [
    { value: '', label: t('criteriaLocationAll') },
    { value: 'in-person', label: t('deliveryInPerson') },
    { value: 'video', label: t('deliveryVideo') },
    { value: 'telephone', label: t('deliveryTelephone') },
    { value: 'email', label: t('deliveryEmail') },
  ];
  const priceOptions = [
    { value: '', label: t('criteriaPriceAll') },
    { value: '8000', label: '〜¥8,000' },
    { value: '15000', label: '〜¥15,000' },
    { value: '35000', label: '〜¥35,000' },
    { value: '35001', label: '¥35,000+' },
  ];
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('criteriaTitle')}</h1>
      <div class="criteria-form">
        <div class="form-group">
          <label>${t('criteriaType')}</label>
          <select id="criteria-type">${typeOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label>${t('criteriaLocation')}</label>
          <select id="criteria-delivery">${locationOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label>${t('criteriaPrice')}</label>
          <select id="criteria-price">${priceOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}</select>
        </div>
        <button class="btn-primary" onclick="onCriteriaSearch()">${t('criteriaSearch')}</button>
      </div>
    </div>
  `;
}

function onCriteriaSearch() {
  const category = document.getElementById('criteria-type').value || undefined;
  const delivery = document.getElementById('criteria-delivery').value || undefined;
  const maxPrice = document.getElementById('criteria-price').value ? parseInt(document.getElementById('criteria-price').value) : undefined;
  state.criteriaFilters = { category, delivery, maxPrice };
  navigate('#/search/criteria/results');
}

// Therapist Profile
function renderTherapistProfile(el, header, id) {
  const th = getTherapist(id);
  if (!th) { navigate('#/search'); return; }

  const name = getLocalizedText(th.name);
  renderHeaderWithBack(header, name, 'javascript:void(0)');
  header.querySelector('.header-back').onclick = () => history.back();

  const intro = getLocalizedText(th.intro);
  const location = getLocalizedText(th.location);
  const initial = name.charAt(0);

  const calendarHtml = renderCalendar(th.availability);
  const deliveryLabels = {
    'in-person': t('deliveryInPerson'),
    'video': t('deliveryVideo'),
    'telephone': t('deliveryTelephone'),
    'email': t('deliveryEmail'),
  };

  const clientReviews = th.reviews.filter(r => r.type === 'client-to-therapist');
  const therapistReviews = th.reviews.filter(r => r.type === 'therapist-to-client');

  // Calculate structured rating averages
  const ratedReviews = clientReviews.filter(r => r.ratings);
  const avgRatings = ratedReviews.length ? {
    communication: (ratedReviews.reduce((s,r) => s + r.ratings.communication, 0) / ratedReviews.length).toFixed(1),
    effectiveness: (ratedReviews.reduce((s,r) => s + r.ratings.effectiveness, 0) / ratedReviews.length).toFixed(1),
    atmosphere: (ratedReviews.reduce((s,r) => s + r.ratings.atmosphere, 0) / ratedReviews.length).toFixed(1),
    value: (ratedReviews.reduce((s,r) => s + r.ratings.value, 0) / ratedReviews.length).toFixed(1),
  } : null;
  const overallAvg = clientReviews.length ? (clientReviews.reduce((s,r) => s + r.rating, 0) / clientReviews.length).toFixed(1) : null;

  const referredTherapists = (th.referrals || []).map(rid => getTherapist(rid)).filter(Boolean);

  // Digital products for this therapist
  const thProducts = (typeof digitalProducts !== 'undefined' ? digitalProducts : []).filter(p => p.therapistId === th.id);

  // Check waitlist
  const onWaitlist = waitlistIds.includes(th.id);

  el.innerHTML = `
    <div class="page">
      <div class="profile-header">
        <div class="profile-avatar" style="background-color: ${th.avatarColor}">
          ${initial}
          ${th.verified ? '<span class="verified-check-lg">✓</span>' : ''}
        </div>
        <h1 class="profile-name">${name}</h1>
        <p class="profile-username">${th.username}</p>
        <div class="mb-12">${renderTierBadge(th.tier, th.isFoundingMember)}</div>
        ${th.verified ? `<div class="verified-badge-full">✓ ${t('verifiedBadge')}</div>` : `<div class="unverified-badge">${t('unverifiedBadge')}</div>`}
        <p class="profile-location-text">${location}</p>
        ${th.responseTime ? `<p class="profile-response-time">${t('responseTime')}: ${th.responseTime}</p>` : ''}
        ${th.slidingScale ? `<p class="profile-sliding-scale">${t('slidingScale')}</p>` : ''}
        <div class="profile-actions-row">
          <button class="btn-icon-action${isFavorite(th.id) ? ' active' : ''}" onclick="toggleFavorite('${th.id}')">
            <svg viewBox="0 0 24 24" class="heart-svg" width="16" height="16" fill="${isFavorite(th.id) ? 'var(--theme-primary-500)' : 'none'}" stroke="${isFavorite(th.id) ? 'var(--theme-primary-500)' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${isFavorite(th.id) ? t('removeFavorite') : t('addFavorite')}
          </button>
          <button class="btn-icon-action" onclick="onShareTherapist('${th.id}')">${t('shareTherapist')}</button>
        </div>
      </div>

      ${th.credentials && th.credentials.length ? `
      <div class="profile-section">
        <h2>${t('credentials')}</h2>
        <div class="credentials-list">
          ${th.credentials.map(c => `<div class="credential-item">${getLocalizedText(c.name)} (${c.year})</div>`).join('')}
        </div>
      </div>
      ` : ''}

      ${th.tags && th.tags.length ? `
      <div class="profile-section">
        <div class="profile-tags">${th.tags.map(tag => `<span class="profile-tag">${tag}</span>`).join('')}</div>
      </div>
      ` : ''}

      <div class="profile-section">
        <h2>${t('profileIntro')}</h2>
        <p class="profile-intro-text">${intro}</p>
      </div>

      ${th.gallery && th.gallery.length ? `
      <div class="profile-section">
        <h2>${t('galleryTitle')}</h2>
        <div class="gallery-grid">
          ${th.gallery.map(g => `<div class="gallery-item"><div class="gallery-placeholder"></div><p>${getLocalizedText(g.desc)}</p></div>`).join('')}
        </div>
      </div>
      ` : ''}

      <div class="profile-section">
        <h2>${t('profileSessions')}</h2>
        ${authState.user?.isMinor && !th.accepts_minors ? `<div class="minor-notice">${t('minorBookingBlocked')}</div>` : ''}
        ${th.sessions.map(s => {
          const minorBlocked = authState.user?.isMinor && s.price > 3000;
          const therapistBlocksMinor = authState.user?.isMinor && !th.accepts_minors;
          return `
          <div class="session-card${minorBlocked || therapistBlocksMinor ? ' session-card-blocked' : ''}">
            <h3>${getLocalizedText(s.name)}</h3>
            <p class="session-desc">${getLocalizedText(s.description)}</p>
            <div class="session-meta">
              <span class="session-price">¥${s.price.toLocaleString()} ${t('profilePerSession')}</span>
              ${s.duration ? `<span class="session-duration">${s.duration}${t('profileMinutes')}</span>` : ''}
              <div class="session-delivery-tags">
                ${s.delivery.map(d => `<span class="delivery-tag">${deliveryLabels[d] || d}</span>`).join('')}
              </div>
            </div>
            ${minorBlocked ? `<div class="minor-price-note">${t('minorPriceExceeded')}</div>` : ''}
            <button class="session-book-btn" ${minorBlocked || therapistBlocksMinor ? 'disabled' : ''} onclick="onBookSession('${th.id}', '${s.id}')">${t('profileBook')}</button>
          </div>
        `}).join('')}
      </div>

      ${thProducts.length > 0 ? `
      <div class="profile-section">
        <h2>${t('digitalProductsTitle')}</h2>
        ${thProducts.map(p => `
          <div class="digital-product-card">
            <div class="dp-icon">${p.type === 'pdf' ? 'PDF' : p.type === 'video' ? 'VID' : 'AUD'}</div>
            <div class="dp-info">
              <h3>${getLocalizedText(p.name)}</h3>
              <p>${getLocalizedText(p.description)}</p>
              <span class="dp-price">¥${p.price.toLocaleString()}</span>
            </div>
            <button class="btn-small" onclick="event.stopPropagation(); alert('${t('digitalProductBuy')}!')">${t('digitalProductBuy')}</button>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div class="profile-section">
        <button class="btn-secondary" style="max-width:100%" onclick="onMessageTherapist('${th.id}')">${t('profileMessage')}</button>
        <button class="btn-outline-secondary mt-8" style="max-width:100%" onclick="onToggleWaitlist('${th.id}')">
          ${onWaitlist ? `✓ ${t('waitlistJoined')}` : t('waitlistJoin')}
        </button>
        <p class="help-text mt-4">${t('waitlistDesc')}</p>
      </div>

      <div class="profile-section">
        <h2>${t('profileAvailability')}</h2>
        ${calendarHtml}
      </div>

      <div class="profile-section">
        <h2>${t('profileReviews')} (${clientReviews.length})</h2>
        ${overallAvg ? `
          <div class="rating-summary">
            <div class="rating-overall"><span class="rating-big">${overallAvg}</span><span class="rating-stars">${'★'.repeat(Math.round(overallAvg))}${'☆'.repeat(5-Math.round(overallAvg))}</span><span class="rating-count">(${clientReviews.length})</span></div>
            ${avgRatings ? `
            <div class="rating-bars">
              <div class="rating-bar-row"><span>${t('ratingCommunication')}</span><div class="rating-bar"><div class="rating-bar-fill" style="width:${avgRatings.communication/5*100}%"></div></div><span>${avgRatings.communication}</span></div>
              <div class="rating-bar-row"><span>${t('ratingEffectiveness')}</span><div class="rating-bar"><div class="rating-bar-fill" style="width:${avgRatings.effectiveness/5*100}%"></div></div><span>${avgRatings.effectiveness}</span></div>
              <div class="rating-bar-row"><span>${t('ratingAtmosphere')}</span><div class="rating-bar"><div class="rating-bar-fill" style="width:${avgRatings.atmosphere/5*100}%"></div></div><span>${avgRatings.atmosphere}</span></div>
              <div class="rating-bar-row"><span>${t('ratingValue')}</span><div class="rating-bar"><div class="rating-bar-fill" style="width:${avgRatings.value/5*100}%"></div></div><span>${avgRatings.value}</span></div>
            </div>
            ` : ''}
          </div>
        ` : ''}
        <div class="review-tabs">
          <button class="review-tab active" onclick="showReviewTab(this, 'client')">${t('reviewsFromClients')}</button>
          <button class="review-tab" onclick="showReviewTab(this, 'therapist')">${t('reviewsFromTherapists')}</button>
        </div>
        <div id="reviews-client">
          ${clientReviews.map(r => renderReviewCard(r)).join('')}
        </div>
        <div id="reviews-therapist" style="display:none">
          ${therapistReviews.map(r => renderReviewCard(r)).join('')}
        </div>
        ${authState.isLoggedIn ? `<button class="btn-secondary mt-12" style="max-width:100%" onclick="navigate('#/review/${th.id}')">${t('reviewSubmitTitle')}</button>` : ''}
      </div>

      ${referredTherapists.length > 0 ? `
        <div class="profile-section">
          <h2>${t('profileSuggested')}</h2>
          <div class="referral-cards">
            ${referredTherapists.map(ref => {
              const refName = getLocalizedText(ref.name);
              return `
                <div class="referral-card" onclick="navigate('#/therapist/${ref.id}')">
                  <div class="ref-avatar" style="background-color:${ref.avatarColor}">${refName.charAt(0)}</div>
                  <div class="ref-info">
                    <h4>${refName} ${renderTierBadge(ref.tier, ref.isFoundingMember)}</h4>
                    <p>${getLocalizedText(ref.location)}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function onShareTherapist(id) {
  const url = window.location.origin + window.location.pathname + '#/therapist/' + id;
  navigator.clipboard.writeText(url).catch(() => {});
  showToast(t('shareCopied'));
}

function onToggleWaitlist(id) {
  id = String(id);
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  const idx = waitlistIds.indexOf(id);
  if (idx > -1) {
    waitlistIds.splice(idx, 1);
    supabase.from('waitlist').delete().eq('user_id', userId).eq('therapist_id', id)
      .then(({ error }) => { if (error) console.warn('Supabase waitlist delete failed:', error); });
  } else {
    waitlistIds.push(id);
    supabase.from('waitlist').insert({ user_id: userId, therapist_id: id })
      .then(({ error }) => { if (error) console.warn('Supabase waitlist insert failed:', error); });
  }
  saveWaitlist();
  router();
}

function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function renderReviewCard(r) {
  return `
    <div class="review-card">
      <div class="review-header">
        <span class="review-author">${getLocalizedText(r.author || r.clientName)}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      ${r.ratings ? `
        <div class="review-sub-ratings">
          <span>${t('ratingCommunication')}: ${r.ratings.communication}</span>
          <span>${t('ratingEffectiveness')}: ${r.ratings.effectiveness}</span>
          <span>${t('ratingAtmosphere')}: ${r.ratings.atmosphere}</span>
          <span>${t('ratingValue')}: ${r.ratings.value}</span>
        </div>
      ` : ''}
      <p class="review-text">${_escapeHtml(getLocalizedText(r.text))}</p>
    </div>
  `;
}

function showReviewTab(btn, type) {
  document.querySelectorAll('.review-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('reviews-client').style.display = type === 'client' ? 'block' : 'none';
  document.getElementById('reviews-therapist').style.display = type === 'therapist' ? 'block' : 'none';
}

function renderCalendar(availability) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayKeys = ['calSun', 'calMon', 'calTue', 'calWed', 'calThu', 'calFri', 'calSat'];
  const availDays = new Set(availability.map(a => a.day));

  let html = '<div class="calendar-grid">';
  dayKeys.forEach(k => { html += `<div class="cal-header">${t(k)}</div>`; });
  for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = new Date(year, month, d).getDay();
    const isAvail = availDays.has(dayOfWeek);
    html += `<div class="cal-day${isAvail ? ' available' : ''}">${d}</div>`;
  }
  html += '</div>';
  return html;
}

function onBookSession(therapistId, sessionId) {
  requireAuth('book', () => {
    // Check if user needs DOB first
    if (_needsDob()) {
      authState.pendingAction = { action: 'book', hash: '#/booking' };
      saveAuth();
      navigate('#/age-verify');
      return;
    }

    const th = getTherapist(therapistId);
    const session = th.sessions.find(s => String(s.id) === String(sessionId));

    // Minor restrictions
    if (authState.user?.isMinor) {
      if (!th.accepts_minors) {
        showToast(t('minorBookingBlocked'));
        return;
      }
      if (session.price > 3000) {
        showToast(t('minorPriceExceeded'));
        return;
      }
    }

    state.bookingTherapist = th;
    state.bookingSession = session;
    state.bookingDate = null;
    state.bookingTime = null;
    state.bookingCalMonth = new Date().getMonth();
    state.bookingCalYear = new Date().getFullYear();
    state.bookingConflicts = [];
    navigate('#/booking');
  });
}

function toTherapistUUID(id) {
  return '10000000-0000-0000-0000-' + String(id).padStart(12, '0');
}
function toSessionUUID(id) {
  return '20000000-0000-0000-0000-' + String(id).padStart(12, '0');
}

function onMessageTherapist(therapistId) {
  requireAuth('message', () => {
    navigate('#/chat/' + therapistId);
  });
}

// Booking
function renderBookingCalendar() {
  const th = state.bookingTherapist;
  const year = state.bookingCalYear;
  const month = state.bookingCalMonth;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + getBookingWindowDays());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const availDays = new Set((th.availability || []).map(a => a.day));

  const monthLabel = new Date(year, month).toLocaleDateString(getLang() === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long' });

  // Can navigate to previous month? Only if it's current month or later
  const canPrev = (year > now.getFullYear()) || (year === now.getFullYear() && month > now.getMonth());
  // Can navigate to next month? Only if last day of next month is within 30 days
  const nextMonthFirst = new Date(year, month + 1, 1);
  const canNext = nextMonthFirst <= maxDate;

  const dayKeys = ['calSun', 'calMon', 'calTue', 'calWed', 'calThu', 'calFri', 'calSat'];

  let html = `<div class="booking-calendar">`;
  html += `<div class="booking-cal-nav">`;
  html += `<button onclick="bookingCalPrev()" ${canPrev ? '' : 'disabled'}>${t('bookingPrevMonth')}</button>`;
  html += `<span class="cal-month-label">${monthLabel}</span>`;
  html += `<button onclick="bookingCalNext()" ${canNext ? '' : 'disabled'}>${t('bookingNextMonth')}</button>`;
  html += `</div>`;
  html += `<div class="calendar-grid">`;
  dayKeys.forEach(k => { html += `<div class="cal-header">${t(k)}</div>`; });
  for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayOfWeek = date.getDay();
    const isAvail = availDays.has(dayOfWeek);
    const isPast = date < today;
    const isBeyond = date > maxDate;
    const isSelectable = isAvail && !isPast && !isBeyond;
    const isSelected = state.bookingDate && date.toDateString() === state.bookingDate.toDateString();
    let cls = 'cal-day';
    if (isPast || isBeyond) cls += ' past';
    if (isSelectable) cls += ' available';
    if (isSelected) cls += ' selected';
    const onclick = isSelectable ? ` onclick="bookingSelectDate(${year},${month},${d})"` : '';
    html += `<div class="${cls}"${onclick}>${d}</div>`;
  }
  html += '</div></div>';
  return html;
}

function bookingCalPrev() {
  if (state.bookingCalMonth === 0) {
    state.bookingCalMonth = 11;
    state.bookingCalYear--;
  } else {
    state.bookingCalMonth--;
  }
  updateBookingCalendarUI();
}

function bookingCalNext() {
  if (state.bookingCalMonth === 11) {
    state.bookingCalMonth = 0;
    state.bookingCalYear++;
  } else {
    state.bookingCalMonth++;
  }
  updateBookingCalendarUI();
}

function updateBookingCalendarUI() {
  const calContainer = document.getElementById('booking-cal-container');
  if (calContainer) calContainer.innerHTML = renderBookingCalendar();
  updateBookingTimeSlotsUI();
  updateBookingDateDisplay();
}

async function bookingSelectDate(year, month, day) {
  state.bookingDate = new Date(year, month, day);
  state.bookingTime = null;
  state.bookingConflicts = [];

  // Query existing bookings for this therapist on this date
  const th = state.bookingTherapist;
  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  try {
    const therapistUUID = toTherapistUUID(th.id);
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('therapist_id', therapistUUID)
      .eq('booking_date', dateStr)
      .neq('status', 'cancelled');
    if (!error && data) {
      state.bookingConflicts = data.map(b => b.booking_time.slice(0, 5));
    }
  } catch (e) {
    // If query fails, proceed without conflict data
  }

  updateBookingCalendarUI();
}

function updateBookingTimeSlotsUI() {
  const container = document.getElementById('booking-time-container');
  if (!container) return;

  if (!state.bookingDate) {
    container.innerHTML = '';
    return;
  }

  const th = state.bookingTherapist;
  const dayOfWeek = state.bookingDate.getDay();
  const avail = (th.availability || []).find(a => a.day === dayOfWeek);

  if (!avail || !avail.slots || avail.slots.length === 0) {
    container.innerHTML = `<p class="booking-no-slots">${t('bookingNoSlots')}</p>`;
    return;
  }

  let html = `<p class="booking-time-label">${t('bookingSelectTime')}</p><div class="booking-time-slots">`;
  avail.slots.forEach(slot => {
    const isConflict = state.bookingConflicts.includes(slot);
    const isSelected = state.bookingTime === slot;
    let cls = 'booking-time-slot';
    if (isConflict) cls += ' conflict';
    if (isSelected) cls += ' selected';
    const onclick = isConflict ? '' : ` onclick="bookingSelectTime('${slot}')"`;
    html += `<button class="${cls}"${onclick}${isConflict ? ' disabled title="' + t('bookingTimeConflict') + '"' : ''}>${slot}</button>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

function bookingSelectTime(time) {
  state.bookingTime = time;
  updateBookingTimeSlotsUI();
  updateBookingDateDisplay();
  updateBookingConfirmBtn();
}

function updateBookingDateDisplay() {
  const el = document.getElementById('booking-date-display');
  if (!el) return;
  if (state.bookingDate && state.bookingTime) {
    const dateStr = state.bookingDate.toLocaleDateString(getLang() === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
    }) + ' ' + state.bookingTime;
    el.textContent = dateStr;
  } else {
    el.textContent = t('bookingSelectDate');
  }
}

function updateBookingConfirmBtn() {
  const btn = document.getElementById('confirm-btn');
  const chk = document.getElementById('agree-check');
  if (btn) {
    btn.disabled = !(chk && chk.checked && state.bookingDate && state.bookingTime);
  }
}

async function confirmBooking() {
  const btn = document.getElementById('confirm-btn');
  if (!btn) return;
  const th = state.bookingTherapist;
  const session = state.bookingSession;
  if (!th || !session || !state.bookingDate || !state.bookingTime) return;

  btn.disabled = true;
  btn.textContent = t('paymentProcessing');

  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  const therapistId = String(th.id);
  const sessionId = String(session.id);
  const dateStr = state.bookingDate.getFullYear() + '-' +
    String(state.bookingDate.getMonth() + 1).padStart(2, '0') + '-' +
    String(state.bookingDate.getDate()).padStart(2, '0');
  const timeStr = state.bookingTime;

  const tier = therapistTiers[th.tier] || therapistTiers.free;
  const platformFee = Math.round(session.price * (tier.platformFee / 100));
  const lang = localStorage.getItem('iyashi-lang') || 'ja';

  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        therapistId,
        sessionId,
        bookingDate: dateStr,
        bookingTime: timeStr,
        userId,
        sessionName: getLocalizedText(session.name),
        therapistName: getLocalizedText(th.name),
        price: session.price,
        platformFee,
        locale: lang,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } catch (e) {
    console.error('Checkout failed:', e);
    showToast(t('paymentError'));
    btn.disabled = false;
    btn.textContent = t('bookingConfirm');
  }
}

function renderBooking(el, header) {
  renderHeaderWithBack(header, t('bookingTitle'), 'javascript:void(0)');
  header.querySelector('.header-back').onclick = () => history.back();

  const th = state.bookingTherapist;
  const session = state.bookingSession;
  if (!th || !session) { navigate('#/'); return; }

  const name = getLocalizedText(th.name);
  const sessionName = getLocalizedText(session.name);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('bookingTitle')}</h1>
      <p class="booking-reassurance">${t('bookingReassurance')}</p>
      <div class="booking-summary">
        <div class="booking-row"><span class="booking-label">${t('bookingSession')}</span><span class="booking-value">${sessionName}</span></div>
        <div class="booking-row"><span class="booking-label">${t('bookingTherapist')}</span><span class="booking-value">${name}</span></div>
        <div class="booking-row"><span class="booking-label">${t('bookingDate')}</span><span class="booking-value" id="booking-date-display">${t('bookingSelectDate')}</span></div>
        <div class="booking-row"><span class="booking-label">${t('bookingPrice')}</span><span class="booking-value">&yen;${session.price.toLocaleString()}</span></div>
      </div>
      <p class="booking-time-label">${t('bookingSelectDate')}</p>
      <div id="booking-cal-container">${renderBookingCalendar()}</div>
      <div id="booking-time-container"></div>
      <div class="cancel-policy">
        <h3>${t('bookingCancelPolicy')}</h3>
        <ul>
          <li>${t('bookingCancel2w')}</li><li>${t('bookingCancel1w')}</li>
          <li>${t('bookingCancel3d')}</li><li>${t('bookingCancelSame')}</li>
        </ul>
        <p class="reschedule-note">${t('bookingRescheduleNote')}</p>
      </div>
      <div class="checkbox-group">
        <input type="checkbox" id="agree-check" onchange="updateBookingConfirmBtn()">
        <label for="agree-check">${t('bookingAgree')}</label>
      </div>
      <button id="confirm-btn" class="btn-primary" disabled onclick="confirmBooking()">${t('bookingConfirm')}</button>
    </div>
  `;
}

function renderBookingSuccess(el, header) {
  renderHeaderSimple(header, t('appName'));
  // Check for Stripe session_id in URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const stripeSessionId = urlParams.get('session_id');
  // Clean up the URL query param
  if (stripeSessionId) {
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
  }
  // Earn points on booking
  if (state.bookingSession && authState.isLoggedIn) {
    earnPoints(state.bookingSession.price, getLocalizedText(state.bookingSession.name));
  }
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">${icons.successCheck}</div>
      <h2>${t('bookingSuccess')}</h2>
      <p>${t('bookingSuccessMsg')}</p>
      <p class="success-encourage">${t('bookingSuccessEncourage')}</p>
      ${stripeSessionId ? `<p class="payment-confirmed-msg">${t('paymentConfirmed')}</p>` : ''}
      <button class="btn-primary" onclick="navigate('#/')">${t('bookingBackHome')}</button>
    </div>
  `;
}

// Apply
function renderApply(el, header) {
  renderHeaderWithBack(header, t('applyTitle'), '#/');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('applyTitle')}</h1>
      <div class="apply-form">
        <div class="photo-upload">
          <div class="photo-placeholder" id="apply-photo-preview"></div>
          <button class="photo-upload-btn" onclick="createFileInput(async (file) => { const url = await uploadAvatar(file, 'avatars', 'applicants'); if(url) document.getElementById('apply-photo-preview').innerHTML = '<img src=&quot;'+url+'&quot; style=&quot;width:100px;height:100px;border-radius:50%;object-fit:cover&quot;>'; })">${t('applyUpload')}</button>
        </div>
        <div class="form-group">
          <label>${t('applyName')}</label>
          <input type="text" id="apply-display-name" placeholder="${t('applyNamePlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyLegalName')} * <span style="font-size:11px;color:var(--theme-primary-600);font-weight:400">${t('applyLegalNameNote')}</span></label>
          <input type="text" id="apply-legal-name" placeholder="${t('applyLegalNamePlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyEmail')} *</label>
          <input type="email" id="apply-email" placeholder="${t('applyEmailPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyPhone')}</label>
          <input type="tel" id="apply-phone" placeholder="${t('applyPhonePlaceholder')}">
        </div>
        <div class="privacy-notice" style="margin-bottom:16px;padding:16px 18px;background:var(--theme-primary-100);border:2px solid var(--theme-primary-400);border-radius:var(--radius-sm);font-size:13px;line-height:1.6;font-weight:500;color:var(--theme-primary-800)">${t('applyPrivacyNote')}</div>
        <div class="form-group">
          <label>${t('applyStreet')} *</label>
          <input type="text" id="apply-addr-street" placeholder="${t('applyStreetPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyCity')} *</label>
          <input type="text" id="apply-addr-city" placeholder="${t('applyCityPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyPrefecture')} *</label>
          <select id="apply-addr-prefecture">
            <option value="">--</option>
            ${['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'].map(p => `<option value="${p}">${p}</option>`).join('')}
            <option value="other">その他 / Other</option>
          </select>
        </div>
        <div style="display:flex;gap:12px">
          <div class="form-group" style="flex:1">
            <label>${t('applyPostcode')} *</label>
            <input type="text" id="apply-addr-postcode" placeholder="${t('applyPostcodePlaceholder')}">
          </div>
          <div class="form-group" style="flex:1">
            <label>${t('applyCountry')}</label>
            <input type="text" id="apply-addr-country" value="Japan">
          </div>
        </div>
        <div class="form-group">
          <label>${t('applyBirthday')} * <span style="font-size:11px;color:var(--theme-primary-600);font-weight:400">${t('applyDobPrivacy')}</span></label>
          <div style="display:flex;gap:8px">
            <select id="apply-dob-year" style="flex:2">
              <option value="">${t('applyDobYear')}</option>
              ${Array.from({length: 70}, (_, i) => new Date().getFullYear() - 18 - i).map(y => `<option value="${y}">${y}</option>`).join('')}
            </select>
            <select id="apply-dob-month" style="flex:1.5">
              <option value="">${t('applyDobMonth')}</option>
              ${Array.from({length: 12}, (_, i) => i + 1).map(m => `<option value="${m}">${m}</option>`).join('')}
            </select>
            <select id="apply-dob-day" style="flex:1.5">
              <option value="">${t('applyDobDay')}</option>
              ${Array.from({length: 31}, (_, i) => i + 1).map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>${t('applyIntro')}</label>
          <textarea id="apply-intro" placeholder="${t('applyIntroPlaceholder')}" maxlength="500" oninput="updateIntroCount()"></textarea>
          <div id="intro-char-count" style="text-align:right;font-size:12px;color:var(--text-secondary);margin-top:4px">0 / 500 ${t('applyIntroLimit')}</div>
        </div>
        <div class="form-group">
          <label>${t('applyLocation')}</label>
          <input type="text" placeholder="${t('applyLocationPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyPlanTitle')}</label>
          <div class="plan-cards">
            ${['free', 'standard', 'premium'].map((tier, i) => {
              const td = therapistTiers[tier];
              return `
                <div class="plan-card ${i === 0 ? 'selected' : ''}" data-tier="${tier}" onclick="selectPlan(this, '${tier}')">
                  <h3>${t(td.nameKey)}</h3>
                  <p>${t(td.descKey)}</p>
                  <div class="plan-price">${t(td.priceKey)}</div>
                  <ul class="plan-features">
                    ${td.features.map(f => `<li>${t(f)}</li>`).join('')}
                  </ul>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="form-group">
          <label>${t('applySessions')} <span id="session-limit-label" style="font-size:12px;color:var(--text-secondary)">(1 / 3)</span></label>
          <div id="session-entries">
            <div class="session-entry">
              <input type="text" placeholder="${t('applySessionName')}">
              <textarea placeholder="${t('applySessionDesc')}" style="min-height:60px"></textarea>
              <input type="number" placeholder="${t('applySessionPrice')}">
              <input type="number" placeholder="${t('applySessionDuration')}">
              <select class="mt-4">
                <option value="">${t('applySessionCategory')}</option>
                <option value="physical">${t('categoryPhysical')}</option>
                <option value="mental">${t('categoryMental')}</option>
                <option value="experiences">${t('categoryExperiences')}</option>
                <option value="fortune-telling">${t('categoryFortuneTelling')}</option>
                <option value="retreat">${t('categoryRetreat')}</option>
              </select>
              <div class="mt-4" style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${t('applySessionDelivery')}</div>
              <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:4px">
                <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="in-person"> ${t('deliveryInPerson')}</label>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="video"> ${t('deliveryVideo')}</label>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="telephone"> ${t('deliveryTelephone')}</label>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="email"> ${t('deliveryEmail')}</label>
              </div>
            </div>
          </div>
          <button class="add-session-btn mt-12" id="add-session-btn" onclick="addSessionEntry()">${t('applyAddSession')}</button>
        </div>
        <button class="btn-primary mt-12" onclick="navigate('#/apply/success')">${t('applySubmit')}</button>
      </div>
    </div>
  `;
}

let selectedTier = 'free';

function selectPlan(el, tier) {
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedTier = tier;
  enforceSessionLimit();
}

function getSessionLimit() {
  const td = therapistTiers[selectedTier];
  return td ? (td.maxSessions || td.maxBookings) : 3;
}

function addSessionEntry() {
  const container = document.getElementById('session-entries');
  const limit = getSessionLimit();
  if (container.children.length >= limit) {
    showToast(t('applySessionLimitReached'));
    return;
  }
  const entry = document.createElement('div');
  entry.className = 'session-entry';
  entry.innerHTML = `
    <input type="text" placeholder="${t('applySessionName')}">
    <textarea placeholder="${t('applySessionDesc')}" style="min-height:60px"></textarea>
    <input type="number" placeholder="${t('applySessionPrice')}">
    <input type="number" placeholder="${t('applySessionDuration')}">
    <select class="mt-4">
      <option value="">${t('applySessionCategory')}</option>
      <option value="physical">${t('categoryPhysical')}</option>
      <option value="mental">${t('categoryMental')}</option>
      <option value="experiences">${t('categoryExperiences')}</option>
      <option value="fortune-telling">${t('categoryFortuneTelling')}</option>
      <option value="retreat">${t('categoryRetreat')}</option>
    </select>
    <div class="mt-4" style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">${t('applySessionDelivery')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:4px">
      <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="in-person"> ${t('deliveryInPerson')}</label>
      <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="video"> ${t('deliveryVideo')}</label>
      <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="telephone"> ${t('deliveryTelephone')}</label>
      <label style="display:flex;align-items:center;gap:6px;font-size:13px"><input type="checkbox" value="email"> ${t('deliveryEmail')}</label>
    </div>
  `;
  container.appendChild(entry);
  updateSessionLabel();
}

function enforceSessionLimit() {
  const container = document.getElementById('session-entries');
  if (!container) return;
  const limit = getSessionLimit();
  while (container.children.length > limit) {
    container.removeChild(container.lastChild);
  }
  updateSessionLabel();
}

function updateSessionLabel() {
  const container = document.getElementById('session-entries');
  const label = document.getElementById('session-limit-label');
  const btn = document.getElementById('add-session-btn');
  if (!container || !label) return;
  const count = container.children.length;
  const limit = getSessionLimit();
  if (limit === Infinity) {
    label.textContent = `(${count})`;
  } else {
    label.textContent = `(${count} / ${limit})`;
  }
  if (btn) btn.style.display = count >= limit ? 'none' : '';
}

function updateIntroCount() {
  const ta = document.getElementById('apply-intro');
  const counter = document.getElementById('intro-char-count');
  if (ta && counter) counter.textContent = `${ta.value.length} / 500 ${t('applyIntroLimit')}`;
}

function renderApplySuccess(el, header) {
  renderHeaderSimple(header, t('appName'));
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">${icons.successCelebrate}</div>
      <h2>${t('applySuccess')}</h2>
      <p>${t('applySuccessMsg')}</p>
      <button class="btn-primary" onclick="navigate('#/')">${t('bookingBackHome')}</button>
    </div>
  `;
}

// User Profile
function renderUserProfile(el, header) {
  renderHeaderSimple(header, t('userProfileTitle'));

  const isLoggedIn = authState.isLoggedIn;
  const userName = isLoggedIn ? authState.user.name : t('userProfileAnon');
  const userIdDisplay = isLoggedIn ? authState.user.email : '#USR-29481';

  // Show booking history and reviews only when logged in
  const bookings = isLoggedIn ? mockBookingHistory : [];
  const writtenReviews = isLoggedIn ? mockUserWrittenReviews : [];
  const receivedReviews = isLoggedIn ? mockUserReviews : [];

  el.innerHTML = `
    <div class="page">
      <div class="user-profile-header">
        ${isLoggedIn && authState.user.avatar_url
          ? `<img class="user-avatar" src="${authState.user.avatar_url}" alt="" style="width:56px;height:56px;border-radius:50%;object-fit:cover;cursor:pointer" onclick="onUploadUserAvatar()" title="${t('applyUpload')}">`
          : `<div class="user-avatar" style="cursor:pointer" onclick="onUploadUserAvatar()" title="${t('applyUpload')}">${userName ? userName.charAt(0).toUpperCase() : '·'}</div>`}
        <div class="user-info">
          <h2>${userName}</h2>
          <p>${userIdDisplay}</p>
        </div>
      </div>

      <div class="profile-section">
        <h2>${t('userProfileHistory')}</h2>
        ${bookings.length > 0 ? bookings.map(b => {
          const statusClass = b.status === 'upcoming' ? 'pending' : 'reviewed';
          const statusLabel = b.status === 'upcoming' ? t('bookingStatusUpcoming') : t('bookingStatusCompleted');
          return `
            <div class="client-item" onclick="navigate('#/therapist/${b.therapistId}')" style="cursor:pointer">
              <div class="client-avatar-sm" style="background:var(--theme-primary-200);font-size:0.75rem">${b.date.slice(5)}</div>
              <div class="client-info">
                <h3>${getLocalizedText(b.sessionName)}</h3>
                <p>${getLocalizedText(b.therapistName)} · ¥${b.price.toLocaleString()}</p>
              </div>
              <span class="client-review-status ${statusClass}">${statusLabel}</span>
            </div>
          `;
        }).join('') : `<div class="empty-state">${t('userProfileNoHistory')}</div>`}
      </div>

      <div class="profile-section">
        <h2>${t('userProfileReviews')}</h2>
        ${writtenReviews.length > 0 ? writtenReviews.map(r => `
          <div class="review-card" onclick="navigate('#/therapist/${r.therapistId}')" style="cursor:pointer">
            <div class="review-header">
              <span class="review-author">${getLocalizedText(r.therapistName)}</span>
              <span class="review-date">${r.date}</span>
            </div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <p class="review-text">${_escapeHtml(getLocalizedText(r.text))}</p>
          </div>
        `).join('') : `<div class="empty-state">${t('userProfileNoReviews')}</div>`}
      </div>

      <div class="profile-section">
        <h2>${t('userProfileReceivedReviews')}</h2>
        ${receivedReviews.length > 0 ? receivedReviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <span class="review-author">${getLocalizedText(r.therapistName)}</span>
              <span class="review-date">${r.date}</span>
            </div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <p class="review-text">${_escapeHtml(getLocalizedText(r.text))}</p>
          </div>
        `).join('') : `<div class="empty-state">${t('userProfileNoReceivedReviews')}</div>`}
      </div>

      ${isLoggedIn ? `
      <div class="profile-section">
        <h2>${t('clientReferralTitle')}</h2>
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:12px">${t('clientReferralDesc')}</p>
        <div class="referral-code-box" style="display:flex;align-items:center;gap:8px;padding:12px;background:var(--theme-primary-100);border-radius:8px;margin-bottom:8px">
          <code style="flex:1;font-size:1.1rem;font-weight:600">FRIEND-${(authState.user.name || 'USER').toUpperCase().slice(0,6)}</code>
          <button class="btn-small" onclick="navigator.clipboard.writeText('FRIEND-${(authState.user.name || 'USER').toUpperCase().slice(0,6)}'); this.textContent='${t('referralCopied')}'">${t('referralCopy')}</button>
        </div>
        <p style="font-size:0.85rem;color:var(--theme-primary-700)">${t('clientReferralReward')}</p>
      </div>
      ` : ''}

      <div class="profile-menu-item" onclick="navigate('#/messages')">
        <span>${t('messagesTitle')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/favorites')">
        <span>${t('favorites')} (${favorites.length})</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/points')">
        <span>${t('pointsBalance')}: ${pointsData.balance} ${t('points')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/journal')">
        <span>${t('journalTitle')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/notifications')">
        <span>${t('notificationTitle')}${notificationsData.filter(n => !n.isRead).length > 0 ? ` <span style="background:#e74c3c;color:#fff;border-radius:10px;padding:1px 7px;font-size:0.75rem;margin-left:4px">${notificationsData.filter(n => !n.isRead).length}</span>` : ''}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/settings')">
        <span>${t('userProfileSettings')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="onSwitchTherapistMode()">
        <span>${t('userProfileSwitchTherapist')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      ${isLoggedIn ? `
        <div class="profile-menu-item" onclick="onLogout()">
          <span>${t('userProfileLogout')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
      ` : `
        <div class="profile-menu-item" onclick="navigate('#/signup')">
          <span>${t('signupSubmit')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="profile-menu-item" onclick="onDemoLogin()" style="color:var(--theme-primary-600)">
          <span>${t('demoLogin')}</span>
          <span class="arrow" style="font-size:0.75rem;color:var(--text-muted)">${t('demoLoginDesc')}</span>
        </div>
      `}
    </div>
  `;
}

function onDemoLogin() {
  authState.isLoggedIn = true;
  const savedDob = localStorage.getItem('iyashi-dob');
  authState.user = {
    name: testUser.name,
    email: testUser.email,
    dob: savedDob || null,
    isMinor: savedDob ? _calculateAge(savedDob) < 18 : false,
    parentalConsent: savedDob ? JSON.parse(localStorage.getItem('iyashi-parental-consent') || 'false') : false,
  };
  const pending = authState.pendingAction;
  authState.pendingAction = null;
  saveAuth();
  if (!authState.user.dob) {
    navigate('#/age-verify');
  } else if (pending && pending.hash) {
    navigate(pending.hash);
  } else {
    navigate('#/profile');
  }
}

async function onLogout() {
  await supabase.auth.signOut();
  authState = { isLoggedIn: false, user: null, pendingAction: null };
  saveAuth();
  therapistMode = { active: false, therapistId: null };
  saveTherapistMode();
  navigate('#/profile');
}

function onSwitchTherapistMode() {
  if (therapistMode.active) {
    therapistMode.active = false;
    therapistMode.therapistId = null;
    saveTherapistMode();
    navigate('#/profile');
  } else {
    // Default to therapist 1 for demo
    therapistMode.active = true;
    therapistMode.therapistId = 1;
    saveTherapistMode();
    navigate('#/therapist-dashboard');
  }
}

async function onToggleTherapistVisibility() {
  const thId = therapistMode.therapistId;
  if (!thId) return;
  const th = getTherapist(thId);
  if (!th) return;
  const newStatus = th.status === 'hidden' ? 'active' : 'hidden';
  try {
    await supabase.from('therapists').update({ status: newStatus }).eq('id', String(thId));
    th.status = newStatus;
    showToast(newStatus === 'hidden' ? t('dashboardHideAccount') : t('dashboardUnhideAccount'));
  } catch (e) {
    console.warn('onToggleTherapistVisibility failed:', e);
  }
  navigate('#/therapist-dashboard');
}

async function onToggleContactVisibility(field, value) {
  const thId = therapistMode.therapistId;
  if (!thId) return;
  const update = field === 'email' ? { show_email: value } : { show_phone: value };
  try {
    await supabase.from('therapists').update(update).eq('id', String(thId));
    const th = getTherapist(thId);
    if (th) field === 'email' ? th.show_email = value : th.show_phone = value;
  } catch (e) {
    console.warn('onToggleContactVisibility failed:', e);
  }
}

function onToggleAcceptsMinors(checked) {
  const section = document.getElementById('minor-terms-section');
  if (section) section.style.display = checked ? 'block' : 'none';
}

async function onSaveTherapistProfile() {
  const thId = therapistMode.therapistId;
  if (!thId) { navigate('#/therapist-dashboard'); return; }

  const acceptsMinors = document.getElementById('accepts-minors')?.checked || false;
  const minorTermsAgreed = document.getElementById('therapist-minor-terms')?.checked || false;

  // If accepting minors, must agree to terms
  if (acceptsMinors && !minorTermsAgreed) {
    showToast(t('therapistMinorTermsAgree'));
    return;
  }

  const th = getTherapist(thId);
  if (th) {
    th.accepts_minors = acceptsMinors;
    th.minor_terms_agreed = acceptsMinors && minorTermsAgreed;
  }

  try {
    await supabase.from('therapists').update({
      accepts_minors: acceptsMinors,
      minor_terms_agreed: acceptsMinors && minorTermsAgreed,
    }).eq('id', String(thId));
  } catch (e) {
    console.warn('onSaveTherapistProfile failed:', e);
  }

  navigate('#/therapist-dashboard');
}

// Settings
function renderSettings(el, header) {
  renderHeaderWithBack(header, t('settingsTitle'), '#/profile');
  const currentTheme = getTheme();
  const currentAccent = getAccentStyle();
  const suggested = suggestThemeByTime();

  const themes = [
    { key: 'spring', name: t('themeSpring'), desc: t('themeSpringDesc'), color: 'linear-gradient(135deg, #a8e0c0, #5ac78d)' },
    { key: 'summer', name: t('themeSummer'), desc: t('themeSummerDesc'), color: 'linear-gradient(135deg, #fbd5a0, #f59e42)' },
    { key: 'evening', name: t('themeEvening'), desc: t('themeEveningDesc'), color: 'linear-gradient(135deg, #bdb3e0, #7e6bc7)' },
  ];

  const accents = [
    { key: 'subtle-light-wood', name: t('accentLightWood'), desc: t('accentLightWoodDesc'), swatch: 'linear-gradient(90deg, #E7D8C9, #D9C2A8)' },
    { key: 'warm-wood', name: t('accentWarmWood'), desc: t('accentWarmWoodDesc'), swatch: 'linear-gradient(90deg, #DCC3A7, #CFAE8B)' },
    { key: 'very-subtle-mineral', name: t('accentMineral'), desc: t('accentMineralDesc'), swatch: 'linear-gradient(90deg, rgba(217,194,168,0.5), rgba(231,216,201,0.6))' },
    { key: 'bamboo', name: t('accentBamboo'), desc: t('accentBambooDesc'), swatch: 'linear-gradient(90deg, #8DB592, #7AA680)' },
  ];

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('settingsTitle')}</h1>
      <div class="profile-section">
        <h2>${t('settingsTheme')}</h2>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px">${t('settingsThemeDesc')}</p>
        <div class="theme-cards">
          ${themes.map(th => `
            <div class="theme-card ${currentTheme === th.key ? 'active' : ''}" onclick="onSelectTheme('${th.key}')">
              <div class="theme-swatch" style="background:${th.color}"></div>
              <div class="theme-card-info">
                <h3>${th.name} ${suggested === th.key ? t('themeSuggested') : ''}</h3>
                <p>${th.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="profile-section">
        <h2>${t('settingsAccent')}</h2>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px">${t('settingsAccentDesc')}</p>
        <div class="theme-cards">
          ${accents.map(a => `
            <div class="theme-card ${currentAccent === a.key ? 'active' : ''}" onclick="onSelectAccent('${a.key}')">
              <div class="theme-swatch accent-swatch" style="background:${a.swatch}"></div>
              <div class="theme-card-info">
                <h3>${a.name}</h3>
                <p>${a.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function onSelectTheme(theme) {
  setTheme(theme);
  router();
}

function onSelectAccent(style) {
  setAccentStyle(style);
  router();
}

// Signup / Login
function renderSignup(el, header) {
  renderHeaderWithBack(header, t('signupTitle'), '#/profile');
  const hasAction = authState.pendingAction;

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('signupTitle')}</h1>
      ${hasAction ? `<p class="text-center mb-20" style="font-size:0.9rem;color:var(--text-secondary)">${t('signupRequired')}</p>` : ''}
      <div class="signup-form">
        <p class="signup-social-hint">${t('signupSocialHint')}</p>
        <button class="social-login-btn line-btn" onclick="window.location.href='/api/auth/line'">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
          ${t('signInLine')}
        </button>
        <button class="social-login-btn google-btn" onclick="signInWithProvider('google')">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          ${t('signInGoogle')}
        </button>
        <button class="social-login-btn apple-btn" onclick="signInWithProvider('apple')">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          ${t('signInApple')}
        </button>

        <div class="login-divider"><span>${t('or')}</span></div>

        <div class="magic-link-form">
          <input type="email" id="magic-link-email" placeholder="${t('magicLinkPlaceholder')}" class="magic-link-input">
          <button id="magic-link-btn" class="social-login-btn magic-link-btn" onclick="signInWithMagicLink(document.getElementById('magic-link-email').value)">
            ${t('signInMagicLink')}
          </button>
        </div>

        <div class="login-divider"><span>${t('or')}</span></div>

        <button class="social-login-btn demo-btn" onclick="onDemoLogin()">${t('demoLogin')}</button>
        <p class="signup-notice">${t('signupNotice')}<br><a href="#/privacy" class="legal-link">${t('privacyPolicyTitle')}</a> · <a href="#/terms" class="legal-link">${t('termsOfServiceTitle')}</a></p>
      </div>
    </div>
  `;
}

// ===== Age Verification =====
function renderAgeVerify(el, header) {
  renderHeaderSimple(header, t('dobLabel'));
  if (!authState.isLoggedIn) { navigate('#/signup'); return; }

  const now = new Date();
  const years = [];
  for (let y = now.getFullYear(); y >= now.getFullYear() - 100; y--) years.push(y);
  const months = [];
  for (let m = 1; m <= 12; m++) months.push(m);
  const days = [];
  for (let d = 1; d <= 31; d++) days.push(d);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('dobLabel')}</h1>
      <div class="age-verify-form">
        <div class="dob-selects">
          <div class="form-group">
            <label>${t('dobYear')}</label>
            <select id="dob-year" onchange="onDobChanged()">
              <option value="">--</option>
              ${years.map(y => `<option value="${y}">${y}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>${t('dobMonth')}</label>
            <select id="dob-month" onchange="onDobChanged()">
              <option value="">--</option>
              ${months.map(m => `<option value="${m}">${m}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>${t('dobDay')}</label>
            <select id="dob-day" onchange="onDobChanged()">
              <option value="">--</option>
              ${days.map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
          </div>
        </div>

        <div id="age-status" class="age-status" style="display:none"></div>
        <div id="minor-section" style="display:none">
          <div class="minor-consent-box">
            <h3>${t('parentalConsentTitle')}</h3>
            <p>${t('parentalConsentDesc')}</p>
            <div class="form-group" style="margin-top:12px">
              <label>${t('parentalConsentGuardian')}</label>
              <input type="text" id="guardian-name" placeholder="${t('parentalConsentGuardianPlaceholder')}">
            </div>
            <div class="checkbox-group" style="margin-top:12px">
              <input type="checkbox" id="parental-consent-check" onchange="updateAgeVerifyBtn()">
              <label for="parental-consent-check">${t('parentalConsentCheck')}</label>
            </div>
          </div>
          <div class="minor-terms-box">
            <h3>${t('minorTermsTitle')}</h3>
            <p class="minor-terms-text">${t('minorTermsContent')}</p>
            <div class="checkbox-group" style="margin-top:12px">
              <input type="checkbox" id="minor-terms-check" onchange="updateAgeVerifyBtn()">
              <label for="minor-terms-check">${t('minorTermsAgree')}</label>
            </div>
          </div>
        </div>

        <button id="age-verify-btn" class="btn-primary" disabled onclick="onSubmitAgeVerify()">${t('signupSubmit')}</button>
      </div>
    </div>
  `;
}

function onDobChanged() {
  const y = document.getElementById('dob-year').value;
  const m = document.getElementById('dob-month').value;
  const d = document.getElementById('dob-day').value;
  const statusEl = document.getElementById('age-status');
  const minorEl = document.getElementById('minor-section');

  if (!y || !m || !d) {
    statusEl.style.display = 'none';
    minorEl.style.display = 'none';
    updateAgeVerifyBtn();
    return;
  }

  const age = _calculateAge(`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
  statusEl.style.display = 'block';

  if (age < 0 || age > 120) {
    statusEl.innerHTML = `<span class="age-badge age-invalid">${t('dobInvalid')}</span>`;
    minorEl.style.display = 'none';
  } else if (age < 18) {
    statusEl.innerHTML = `<span class="age-badge age-minor">${t('ageMinor')} (${age})</span>`;
    minorEl.style.display = 'block';
  } else {
    statusEl.innerHTML = `<span class="age-badge age-adult">${t('ageAdult')} (${age})</span>`;
    minorEl.style.display = 'none';
  }
  updateAgeVerifyBtn();
}

function updateAgeVerifyBtn() {
  const y = document.getElementById('dob-year')?.value;
  const m = document.getElementById('dob-month')?.value;
  const d = document.getElementById('dob-day')?.value;
  const btn = document.getElementById('age-verify-btn');
  if (!btn) return;

  if (!y || !m || !d) { btn.disabled = true; return; }

  const age = _calculateAge(`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
  if (age < 0 || age > 120) { btn.disabled = true; return; }

  if (age < 18) {
    const consent = document.getElementById('parental-consent-check')?.checked;
    const terms = document.getElementById('minor-terms-check')?.checked;
    const guardian = document.getElementById('guardian-name')?.value.trim();
    btn.disabled = !(consent && terms && guardian);
  } else {
    btn.disabled = false;
  }
}

function onSubmitAgeVerify() {
  const y = document.getElementById('dob-year').value;
  const m = document.getElementById('dob-month').value;
  const d = document.getElementById('dob-day').value;
  const dob = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const age = _calculateAge(dob);
  const isMinor = age < 18;

  // Store DOB
  localStorage.setItem('iyashi-dob', dob);
  authState.user.dob = dob;
  authState.user.isMinor = isMinor;

  if (isMinor) {
    const guardian = document.getElementById('guardian-name').value.trim();
    localStorage.setItem('iyashi-parental-consent', 'true');
    localStorage.setItem('iyashi-guardian-name', guardian);
    authState.user.parentalConsent = true;
  }

  // Update Supabase user metadata if available
  if (authState.user.id) {
    supabase.auth.updateUser({ data: { dob, parental_consent: isMinor } })
      .catch(e => console.warn('Failed to update user metadata:', e));
  }

  // Navigate to pending action or profile
  const pending = authState.pendingAction;
  if (pending && pending.hash) {
    authState.pendingAction = null;
    saveAuth();
    navigate(pending.hash);
  } else {
    navigate('#/profile');
  }
  showToast(isMinor ? t('ageMinor') : t('ageAdult'));
}

// ===== Messages List =====
function _getConversations() {
  const conversations = [];
  if (!authState.isLoggedIn) return conversations;
  const seen = new Set();

  // Include therapists from booking history
  mockBookingHistory.forEach(b => {
    if (seen.has(b.therapistId)) return;
    seen.add(b.therapistId);
    const th = getTherapist(b.therapistId);
    if (th) conversations.push(_buildConversation(th));
  });

  // Include any therapist with mock chat data not already covered
  for (const idStr of Object.keys(typeof mockChats !== 'undefined' ? mockChats : {})) {
    const id = parseInt(idStr);
    if (seen.has(id)) continue;
    seen.add(id);
    const th = getTherapist(id);
    if (th) conversations.push(_buildConversation(th));
  }

  // Include therapists with local messages
  for (const uuid of Object.keys(_localMessages)) {
    const id = _uuidToTherapistId(uuid);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const th = getTherapist(id);
    if (th) conversations.push(_buildConversation(th));
  }

  // Sort: conversations with messages first (by time desc), then no-message ones
  conversations.sort((a, b) => {
    if (a.hasMessages && !b.hasMessages) return -1;
    if (!a.hasMessages && b.hasMessages) return 1;
    return 0;
  });

  return conversations;
}

function _buildConversation(th) {
  const msgs = getChatMessages(th.id);
  const therapistUUID = _getTherapistUUID(th.id);
  const localMsgs = _localMessages[therapistUUID] || [];
  const lastMock = msgs.length > 0 ? msgs[msgs.length - 1] : null;
  const lastLocal = localMsgs.length > 0 ? localMsgs[localMsgs.length - 1] : null;
  const hasMessages = msgs.length > 0 || localMsgs.length > 0;

  let lastMessage = t('messagesNoMessages');
  let time = '';
  let unread = false;

  if (lastLocal) {
    lastMessage = lastLocal.body;
    time = _formatChatTime(lastLocal.created_at);
  } else if (lastMock) {
    lastMessage = getLocalizedText(lastMock.text);
    time = lastMock.time;
    // Mock: last message from therapist counts as "unread"
    if (lastMock.from === 'therapist') unread = true;
  }

  const name = getLocalizedText(th.name);
  return {
    therapistId: th.id,
    name,
    initial: name.charAt(0),
    avatarColor: th.avatarColor,
    lastMessage,
    time,
    hasMessages,
    unread,
    responseTime: th.responseTime || '',
  };
}

function _uuidToTherapistId(uuid) {
  for (const [id, u] of Object.entries(therapistUUIDs)) {
    if (u === uuid) return parseInt(id);
  }
  return null;
}

function renderMessagesList(el, header) {
  renderHeaderWithBack(header, t('messagesTitle'), '#/profile');

  const conversations = _getConversations();

  el.innerHTML = `
    <div class="page">
      <div class="messages-header-row">
        <h1 class="page-title" style="margin:0">${t('messagesTitle')}</h1>
        <button class="btn-small" onclick="navigate('#/search')" style="white-space:nowrap">+ ${t('messagesNewChat')}</button>
      </div>
      ${!authState.isLoggedIn ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyMessages}</div><p>${t('messagesLoginRequired')}</p><button class="btn-primary mt-12" onclick="navigate('#/signup')">${t('signupSubmit')}</button></div>` :
        conversations.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyMessages}</div><p>${t('messagesEmpty')}</p><button class="btn-primary mt-12" onclick="navigate('#/search')">${t('messagesStartConversation')}</button></div>` :
        conversations.map(c => `
          <div class="conversation-item${c.unread ? ' conversation-unread' : ''}" onclick="navigate('#/chat/${c.therapistId}')">
            <div class="conversation-avatar" style="background-color:${c.avatarColor}">${c.initial}</div>
            <div class="conversation-info">
              <div class="conversation-top-row">
                <h3 class="conversation-name">${c.name}</h3>
                ${c.time ? `<span class="conversation-time">${c.time}</span>` : ''}
              </div>
              <p class="conversation-preview">${c.lastMessage}</p>
            </div>
            ${c.unread ? '<div class="conversation-unread-dot"></div>' : ''}
          </div>
        `).join('')}
    </div>
  `;
}

// ===== Chat =====

// Therapist integer ID -> UUID mapping (matches DB therapists table)
const therapistUUIDs = {
  1: '10000000-0000-0000-0000-000000000001',
  2: '10000000-0000-0000-0000-000000000002',
  3: '10000000-0000-0000-0000-000000000003',
  4: '10000000-0000-0000-0000-000000000004',
  5: '10000000-0000-0000-0000-000000000005',
  6: '10000000-0000-0000-0000-000000000006',
  7: '10000000-0000-0000-0000-000000000007',
  8: '10000000-0000-0000-0000-000000000008',
};

// Local messages stored when Supabase insert fails (RLS blocks demo user)
let _localMessages = {};

function _getCurrentUserId() {
  return (authState.user && authState.user.id) || '00000000-0000-0000-0000-000000000001';
}

function _getTherapistUUID(therapistId) {
  return therapistUUIDs[parseInt(therapistId)] || therapistUUIDs[1];
}

function _formatChatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return (isToday ? '' : (d.getMonth() + 1) + '/' + d.getDate() + ' ') + hh + ':' + mm;
}

function _cleanupChatSubscription() {
  if (window._chatSubscription) {
    supabase.removeChannel(window._chatSubscription);
    window._chatSubscription = null;
  }
}

function _renderChatBubble(msg) {
  const userId = _getCurrentUserId();
  let body, time, isSent, isRead;
  if (msg.sender_id) {
    // Supabase or local message object
    isSent = msg.sender_id === userId;
    body = msg.body;
    time = _formatChatTime(msg.created_at);
    isRead = msg.is_read;
  } else {
    // Mock message object
    isSent = msg.from === 'user';
    body = getLocalizedText(msg.text);
    time = msg.time;
    isRead = true; // mock messages are always "read"
  }
  const status = isSent ? `<span class="chat-status">${isRead ? '✓✓' : '✓'}</span>` : '';
  return `<div class="chat-bubble ${isSent ? 'chat-sent' : 'chat-received'}">
    ${_escapeHtml(body)}
    <div class="chat-meta"><span class="chat-time">${time}</span>${status}</div>
  </div>`;
}

function _escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function _scrollChatToBottom() {
  const container = document.querySelector('.chat-messages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

async function _loadChatMessages(therapistId) {
  const userId = _getCurrentUserId();
  const therapistUUID = _getTherapistUUID(therapistId);

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('therapist_id', therapistUUID)
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) return { source: 'supabase', messages: data };
  } catch (e) {
    console.log('Supabase messages load failed (RLS or network), falling back to mock data:', e.message);
  }

  // Fallback to mock data
  return { source: 'mock', messages: getChatMessages(parseInt(therapistId)) };
}

async function _markMessagesAsRead(therapistId) {
  const userId = _getCurrentUserId();
  const therapistUUID = _getTherapistUUID(therapistId);

  try {
    await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('therapist_id', therapistUUID)
      .eq('recipient_id', userId)
      .eq('is_read', false);
  } catch (e) {
    console.log('Mark as read failed (RLS):', e.message);
  }
}

function _subscribeToChatMessages(therapistId) {
  const therapistUUID = _getTherapistUUID(therapistId);
  const userId = _getCurrentUserId();

  const channel = supabase
    .channel('chat-' + therapistUUID)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: 'therapist_id=eq.' + therapistUUID,
      },
      (payload) => {
        const msg = payload.new;
        // Skip if it's our own message (already displayed locally)
        if (msg.sender_id === userId) return;
        const container = document.querySelector('.chat-messages');
        if (container) {
          container.insertAdjacentHTML('beforeend', _renderChatBubble(msg));
          _scrollChatToBottom();
        }
      }
    )
    .subscribe();

  return channel;
}

async function onSendChatMessage(therapistId) {
  const input = document.querySelector('.chat-input-bar input');
  if (!input) return;
  const body = input.value.trim();
  if (!body) return;

  const userId = _getCurrentUserId();
  const therapistUUID = _getTherapistUUID(therapistId);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();

  const msgObj = {
    sender_id: userId,
    recipient_id: therapistUUID,
    therapist_id: therapistUUID,
    body: body,
    is_read: false,
    expires_at: expiresAt,
    created_at: now.toISOString(),
  };

  // Clear input immediately for responsive UX
  input.value = '';
  input.focus();

  // Render locally right away
  const container = document.querySelector('.chat-messages');
  if (container) {
    container.insertAdjacentHTML('beforeend', _renderChatBubble(msgObj));
    _scrollChatToBottom();
  }

  // Try to persist to Supabase
  try {
    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: userId,
        recipient_id: therapistUUID,
        therapist_id: therapistUUID,
        body: body,
        expires_at: expiresAt,
      });
    if (error) throw error;
  } catch (e) {
    console.log('Supabase insert failed (RLS), stored locally:', e.message);
    // Store in local array for session persistence
    const key = therapistUUID;
    if (!_localMessages[key]) _localMessages[key] = [];
    _localMessages[key].push(msgObj);
  }
}

async function renderChat(el, header, therapistId) {
  const th = getTherapist(therapistId);
  if (!th) { navigate('#/messages'); return; }

  // Clean up any previous subscription
  _cleanupChatSubscription();

  const name = getLocalizedText(th.name);
  const location = getLocalizedText(th.location);
  const initial = name.charAt(0);
  renderHeaderWithBack(header, name, 'javascript:void(0)');
  header.querySelector('.header-back').onclick = () => history.back();

  // Render skeleton with loading state
  el.innerHTML = `
    <div class="chat-screen">
      <div class="chat-therapist-bar" onclick="navigate('#/therapist/${therapistId}')">
        <div class="chat-therapist-avatar" style="background-color:${th.avatarColor}">${initial}</div>
        <div class="chat-therapist-info">
          <span class="chat-therapist-name">${name}</span>
          <span class="chat-therapist-detail">${location}${th.responseTime ? ' · ' + th.responseTime : ''}</span>
        </div>
      </div>
      <div class="chat-info-bar">${t('chatInfoWindow')}</div>
      <div class="chat-actions-bar">
        <button class="chat-action-btn" onclick="navigate('#/videocall/${therapistId}')">${t('chatStartVideo')}</button>
        <button class="chat-action-btn" onclick="navigate('#/therapist/${therapistId}')">${t('chatViewProfile')}</button>
        <button class="chat-action-btn" onclick="onBookFromChat('${therapistId}')">${t('chatBookSession')}</button>
      </div>
      <div class="chat-messages">
        <div class="chat-loading">${t('chatLoadingMessages')}</div>
      </div>
      <div class="chat-input-bar">
        <input type="text" placeholder="${t('chatPlaceholder')}" onkeydown="if(event.key==='Enter'){event.preventDefault();onSendChatMessage('${therapistId}');}">
        <button class="chat-send-btn" onclick="onSendChatMessage('${therapistId}')">→</button>
      </div>
    </div>
  `;

  // Load messages
  const result = await _loadChatMessages(therapistId);
  const container = document.querySelector('.chat-messages');
  if (!container) return; // User navigated away

  // Also include any locally stored messages
  const therapistUUID = _getTherapistUUID(therapistId);
  const localMsgs = _localMessages[therapistUUID] || [];

  let allMsgs = [];
  if (result.source === 'supabase') {
    allMsgs = [...result.messages, ...localMsgs];
    allMsgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else {
    allMsgs = [...result.messages, ...localMsgs];
  }

  if (allMsgs.length === 0) {
    // Empty state - encourage user to start the conversation
    container.innerHTML = `
      <div class="chat-empty-state">
        <div class="chat-empty-avatar" style="background-color:${th.avatarColor}">${initial}</div>
        <h3>${name}</h3>
        <p>${t('chatEmptyPrompt')}</p>
      </div>
    `;
  } else {
    container.innerHTML = allMsgs.map(m => _renderChatBubble(m)).join('');
    _scrollChatToBottom();
  }

  // Mark unread messages as read
  _markMessagesAsRead(therapistId);

  // Subscribe to real-time updates
  window._chatSubscription = _subscribeToChatMessages(therapistId);
}

function onBookFromChat(therapistId) {
  const th = getTherapist(therapistId);
  if (th && th.sessions.length > 0) {
    state.bookingTherapist = th;
    state.bookingSession = th.sessions[0];
    state.bookingDate = null;
    state.bookingTime = null;
    state.bookingCalMonth = new Date().getMonth();
    state.bookingCalYear = new Date().getFullYear();
    state.bookingConflicts = [];
    navigate('#/booking');
  } else {
    navigate('#/therapist/' + therapistId);
  }
}

// ===== Video Call =====
async function renderVideoCall(el, header, therapistId) {
  const th = getTherapist(therapistId);
  if (!th) { navigate('#/search'); return; }

  const name = getLocalizedText(th.name);
  header.innerHTML = '';

  // Show connecting screen
  el.innerHTML = `
    <div class="videocall-screen">
      <div class="videocall-remote">
        <div class="videocall-remote-placeholder">
          <div class="avatar-large" style="background-color:${th.avatarColor}">${name.charAt(0)}</div>
          <p>${name}</p>
          <p class="call-status">${t('videoConnecting')}</p>
        </div>
      </div>
      <div class="videocall-controls">
        <button class="vc-btn vc-end" onclick="endVideoCall('${therapistId}')">×<br><span>${t('videoEnd')}</span></button>
      </div>
    </div>
  `;

  // Track call start time
  window._vcStartTime = Date.now();

  // Request video room from API
  try {
    const res = await fetch('/api/create-video-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        therapistId: String(th.id),
        userId: authState.user?.id || null,
        sessionName: authState.user?.name || 'User',
      }),
    });
    const data = await res.json();

    if (data.error) {
      // API not configured — show placeholder UI
      renderVideoCallPlaceholder(el, th, name, therapistId);
      return;
    }

    // Embed Daily.co prebuilt iframe
    const roomUrl = data.token ? `${data.roomUrl}?t=${data.token}` : data.roomUrl;
    el.innerHTML = `
      <div class="videocall-screen">
        <iframe id="daily-frame" src="${roomUrl}" allow="camera;microphone;fullscreen;display-capture"
          style="width:100%;height:100%;border:none;position:absolute;top:0;left:0"></iframe>
        <div class="videocall-controls" style="position:absolute;bottom:0;left:0;right:0;z-index:10">
          <button class="vc-btn vc-end" onclick="endVideoCall('${therapistId}')">×<br><span>${t('videoEnd')}</span></button>
        </div>
      </div>
    `;
  } catch (e) {
    console.warn('Video room creation failed, using placeholder:', e);
    renderVideoCallPlaceholder(el, th, name, therapistId);
  }
}

function renderVideoCallPlaceholder(el, th, name, therapistId) {
  el.innerHTML = `
    <div class="videocall-screen">
      <div class="videocall-remote">
        <div class="videocall-remote-placeholder">
          <div class="avatar-large" style="background-color:${th.avatarColor}">${name.charAt(0)}</div>
          <p>${name}</p>
          <p class="call-status" id="vc-status">${t('videoConnecting')}</p>
        </div>
      </div>
      <div class="videocall-self">${t('videoSelfView')}</div>
      <div class="videocall-controls">
        <button class="vc-btn vc-mute" onclick="toggleVCBtn(this)">◐<br><span>${t('videoMute')}</span></button>
        <button class="vc-btn vc-camera" onclick="toggleVCBtn(this)"><span style="font-size:1.2rem">⦿</span><br><span>${t('videoCamera')}</span></button>
        <button class="vc-btn vc-end" onclick="endVideoCall('${therapistId}')">×<br><span>${t('videoEnd')}</span></button>
        <button class="vc-btn vc-blur" onclick="toggleVCBtn(this)">◌<br><span>${t('videoBlur')}</span></button>
      </div>
    </div>
  `;
  // Simulate connection after delay
  setTimeout(() => {
    const status = document.getElementById('vc-status');
    if (status) status.textContent = t('videoConnected');
  }, 2000);
}

function endVideoCall(therapistId) {
  // Track call duration
  const duration = window._vcStartTime ? Math.round((Date.now() - window._vcStartTime) / 1000) : 0;
  window._vcStartTime = null;
  // Remove Daily iframe if present
  const frame = document.getElementById('daily-frame');
  if (frame) frame.src = '';
  if (duration > 0) {
    console.log(`Video call ended. Duration: ${duration}s`);
    // Record duration to Supabase if logged in
    const userId = authState.user?.id;
    if (userId && therapistId) {
      supabase.from('video_call_logs').insert({
        user_id: userId, therapist_id: therapistId, duration_seconds: duration,
      }).then(({ error }) => { if (error) console.warn('Video log insert failed:', error); });
    }
  }
  navigate('#/chat/' + therapistId);
}

function toggleVCBtn(btn) {
  btn.classList.toggle('active');
}

// ===== Review Form =====
function renderReviewForm(el, header, therapistId) {
  const th = getTherapist(therapistId);
  if (!th) { navigate('#/search'); return; }

  if (!authState.isLoggedIn) {
    requireAuth('review', () => navigate('#/review/' + therapistId));
    return;
  }

  const name = getLocalizedText(th.name);
  renderHeaderWithBack(header, t('reviewSubmitTitle'), '#/therapist/' + therapistId);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('reviewSubmitTitle')}</h1>
      <p class="text-center mb-20" style="font-size:0.9rem;color:var(--text-secondary)">${name}</p>
      <div class="review-form">
        <div class="form-group">
          <label>${t('reviewRating')}</label>
          <div class="star-input" id="star-input">
            ${[1,2,3,4,5].map(i => `<span onclick="setStarRating(${i})" data-star="${i}">☆</span>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label>${t('reviewText')}</label>
          <textarea id="review-text" placeholder="${t('reviewTextPlaceholder')}"></textarea>
        </div>
        <button class="btn-primary" onclick="onSubmitReview('${therapistId}')">${t('reviewSubmit')}</button>
      </div>
    </div>
  `;
}

let selectedRating = 0;
function setStarRating(rating) {
  selectedRating = rating;
  document.querySelectorAll('#star-input span').forEach(s => {
    const star = parseInt(s.dataset.star);
    s.textContent = star <= rating ? '★' : '☆';
    s.classList.toggle('active', star <= rating);
  });
}

function onSubmitReview(therapistId) {
  if (selectedRating === 0) return;
  selectedRating = 0;
  navigate('#/therapist/' + therapistId);
}

// ===== Therapist Dashboard =====
function renderTherapistDashboard(el, header) {
  renderHeaderSimple(header, t('dashboardTitle'));
  const thId = therapistMode.therapistId || 1;
  const data = getDashboardData(thId);
  const th = getTherapist(thId);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('dashboardTitle')}</h1>
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-value">${data.bookingsCount}</div>
          <div class="stat-label">${t('dashboardBookings')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.averageRating}</div>
          <div class="stat-label">${t('dashboardRating')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">¥${(data.monthlyEarnings / 1000).toFixed(0)}k</div>
          <div class="stat-label">${t('dashboardEarnings')}</div>
        </div>
      </div>

      <div class="dashboard-menu">
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/schedule')">
          <span><span class="menu-icon">${icons.schedule}</span>${t('dashboardSchedule')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/sessions')">
          <span><span class="menu-icon">${icons.sessions}</span>${t('dashboardSessions')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/clients')">
          <span><span class="menu-icon">${icons.clients}</span>${t('dashboardClients')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/earnings')">
          <span><span class="menu-icon">${icons.earnings}</span>${t('dashboardEarningsMenu')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/profile-edit')">
          <span><span class="menu-icon">${icons.editProfile}</span>${t('dashboardProfileEdit')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/referrals')">
          <span><span class="menu-icon">${icons.referrals}</span>${t('dashboardReferrals')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
      </div>

      <div class="mt-20" style="display:flex;flex-direction:column;gap:10px">
        ${th && th.status === 'hidden' ? `
          <div style="background:var(--theme-warm-100);border:1px solid var(--theme-warm-300);border-radius:var(--radius-sm);padding:10px 14px;font-size:13px;color:var(--theme-warm-700)">${t('dashboardAccountHiddenNote')}</div>
          <button class="btn-secondary" style="max-width:100%" onclick="onToggleTherapistVisibility()">${t('dashboardUnhideAccount')}</button>
        ` : `
          <button class="btn-secondary" style="max-width:100%;color:var(--text-secondary)" onclick="onToggleTherapistVisibility()">${t('dashboardHideAccount')}</button>
        `}
        <button class="btn-secondary" style="max-width:100%" onclick="onSwitchTherapistMode()">${t('back')} → ${t('navProfile')}</button>
      </div>
    </div>
  `;
}

// Schedule Editor
function renderTherapistSchedule(el, header) {
  renderHeaderWithBack(header, t('scheduleTitle'), '#/therapist-dashboard');
  const thId = therapistMode.therapistId || 1;
  const th = getTherapist(thId);
  const tierInfo = therapistTiers[th.tier];
  const canEdit = tierInfo.canEditSchedule;

  const days = ['schedSun', 'schedMon', 'schedTue', 'schedWed', 'schedThu', 'schedFri', 'schedSat'];
  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const availMap = {};
  th.availability.forEach(a => {
    a.slots.forEach(s => { availMap[a.day + '-' + s] = true; });
  });

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('scheduleTitle')}</h1>
      <div class="schedule-grid">
        <div class="schedule-header"></div>
        ${days.map(d => `<div class="schedule-header">${t(d)}</div>`).join('')}
        ${timeSlots.map(time => `
          <div class="schedule-time">${time}</div>
          ${[0,1,2,3,4,5,6].map(day => {
            const key = day + '-' + time;
            const isAvail = availMap[key];
            const locked = !canEdit ? 'locked' : '';
            return `<div class="schedule-slot ${isAvail ? 'available' : 'unavailable'} ${locked}" onclick="${canEdit ? `toggleScheduleSlot(this)` : ''}">${isAvail ? t('scheduleAvailable') : t('scheduleUnavailable')}</div>`;
          }).join('')}
        `).join('')}
      </div>
      ${!canEdit ? `
        <div class="upgrade-prompt">
          ${t('scheduleLocked')}
          <button onclick="navigate('#/apply')">${t('scheduleUpgrade')}</button>
        </div>
      ` : ''}
    </div>
  `;
}

function toggleScheduleSlot(slot) {
  slot.classList.toggle('available');
  slot.classList.toggle('unavailable');
  slot.textContent = slot.classList.contains('available') ? t('scheduleAvailable') : t('scheduleUnavailable');
}

// Sessions Management
function renderTherapistSessions(el, header) {
  renderHeaderWithBack(header, t('sessionsManageTitle'), '#/therapist-dashboard');
  const thId = therapistMode.therapistId || 1;
  const th = getTherapist(thId);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('sessionsManageTitle')}</h1>
      ${th.sessions.map(s => `
        <div class="session-list-item">
          <div class="session-list-info">
            <h3>${getLocalizedText(s.name)}</h3>
            <p>¥${s.price.toLocaleString()} ${s.duration ? '· ' + s.duration + t('profileMinutes') : ''}</p>
          </div>
          <div class="session-list-actions">
            <button class="btn-small btn-edit" onclick="navigate('#/therapist-dashboard/sessions/edit/${s.id}')">${t('sessionEditTitle')}</button>
          </div>
        </div>
      `).join('')}
      <button class="add-session-btn mt-20">${t('sessionsAdd')}</button>
    </div>
  `;
}

// Session Edit
function renderTherapistSessionEdit(el, header, sessionId) {
  renderHeaderWithBack(header, t('sessionEditTitle'), '#/therapist-dashboard/sessions');
  const thId = therapistMode.therapistId || 1;
  const th = getTherapist(thId);
  const session = th.sessions.find(s => String(s.id) === String(sessionId));
  if (!session) { navigate('#/therapist-dashboard/sessions'); return; }

  const name = getLocalizedText(session.name);
  const desc = getLocalizedText(session.description);

  const currentCategory = session.category || '';
  const currentDelivery = session.delivery || '';

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('sessionEditTitle')}</h1>
      <div class="apply-form">
        <div class="form-group">
          <label>${t('applySessionName')}</label>
          <input type="text" value="${name}">
        </div>
        <div class="form-group">
          <label>${t('applySessionDesc')}</label>
          <textarea style="min-height:80px">${desc}</textarea>
        </div>
        <div class="form-group">
          <label>${t('applySessionPrice')}</label>
          <input type="number" value="${session.price}">
        </div>
        <div class="form-group">
          <label>${t('applySessionDuration')}</label>
          <input type="number" value="${session.duration}">
        </div>
        <div class="form-group">
          <label>${t('applySessionCategory')}</label>
          <select>
            <option value="">${t('applySessionCategory')}</option>
            <option value="physical" ${currentCategory === 'physical' ? 'selected' : ''}>${t('categoryPhysical')}</option>
            <option value="mental" ${currentCategory === 'mental' ? 'selected' : ''}>${t('categoryMental')}</option>
            <option value="experiences" ${currentCategory === 'experiences' || currentCategory === 'playful' ? 'selected' : ''}>${t('categoryExperiences')}</option>
            <option value="fortune-telling" ${currentCategory === 'fortune-telling' ? 'selected' : ''}>${t('categoryFortuneTelling')}</option>
            <option value="retreat" ${currentCategory === 'retreat' ? 'selected' : ''}>${t('categoryRetreat')}</option>
          </select>
        </div>
        <div class="form-group">
          <label>${t('applySessionDelivery')}</label>
          <select>
            <option value="">${t('applySessionDelivery')}</option>
            <option value="in-person" ${currentDelivery === 'in-person' ? 'selected' : ''}>${t('deliveryInPerson')}</option>
            <option value="video" ${currentDelivery === 'video' ? 'selected' : ''}>${t('deliveryVideo')}</option>
            <option value="telephone" ${currentDelivery === 'telephone' ? 'selected' : ''}>${t('deliveryTelephone')}</option>
            <option value="email" ${currentDelivery === 'email' ? 'selected' : ''}>${t('deliveryEmail')}</option>
          </select>
        </div>
        <button class="btn-primary" onclick="navigate('#/therapist-dashboard/sessions')">${t('sessionSave')}</button>
      </div>
    </div>
  `;
}

// Clients
function renderTherapistClients(el, header) {
  renderHeaderWithBack(header, t('clientsTitle'), '#/therapist-dashboard');
  const thId = therapistMode.therapistId || 1;
  const data = getDashboardData(thId);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('clientsTitle')}</h1>
      ${data.clients.map((c, i) => `
        <div class="client-item">
          <div class="client-avatar-sm">○</div>
          <div class="client-info">
            <h3>${getLocalizedText(c.name)}</h3>
            <p>${t('clientLastBooking')}: ${c.lastBooking}</p>
          </div>
          <span class="client-review-status ${c.reviewed ? 'reviewed' : 'pending'}">
            ${c.reviewed ? t('clientReviewed') : t('clientPendingReview')}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

// Earnings
function renderTherapistEarnings(el, header) {
  renderHeaderWithBack(header, t('earningsTitle'), '#/therapist-dashboard');
  const thId = therapistMode.therapistId || 1;
  const data = getDashboardData(thId);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('earningsTitle')}</h1>
      <div class="earnings-total">
        <div class="amount">¥${data.netEarnings.toLocaleString()}</div>
        <div class="label">${t('earningsThisMonth')}</div>
      </div>

      <div class="profile-section">
        <h2>${t('earningsThisMonth')}</h2>
        <div class="earnings-breakdown">
          <div class="earnings-row">
            <span class="label">${t('earningsSessionRevenue')}</span>
            <span class="amount positive">¥${data.sessionRevenue.toLocaleString()}</span>
          </div>
          <div class="earnings-row">
            <span class="label">${t('earningsPlatformFee')}</span>
            <span class="amount negative">-¥${data.platformFee.toLocaleString()}</span>
          </div>
          <div class="earnings-row">
            <span class="label">${t('earningsReferralIncome')}</span>
            <span class="amount positive">+¥${data.referralIncome.toLocaleString()}</span>
          </div>
          <div class="earnings-row" style="border-top:2px solid var(--gray-200);padding-top:12px">
            <span class="label" style="font-weight:700">${t('earningsNet')}</span>
            <span class="amount positive" style="font-size:1.1rem">¥${data.netEarnings.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h2>${t('earningsHistory')}</h2>
        ${data.earningsHistory.map(h => `
          <div class="earnings-row">
            <span class="label">${h.month}</span>
            <span class="amount positive">¥${h.net.toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Profile Edit
function renderTherapistProfileEdit(el, header) {
  renderHeaderWithBack(header, t('profileEditTitle'), '#/therapist-dashboard');
  const thId = therapistMode.therapistId || 1;
  const th = getTherapist(thId);
  const name = getLocalizedText(th.name);
  const intro = getLocalizedText(th.intro);
  const location = getLocalizedText(th.location);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('profileEditTitle')}</h1>
      <div class="profile-edit-form">
        <div class="photo-upload">
          ${th.avatar_url
            ? `<img id="therapist-avatar-preview" src="${th.avatar_url}" style="width:80px;height:80px;border-radius:50%;object-fit:cover">`
            : `<div id="therapist-avatar-preview" class="profile-avatar" style="background-color:${th.avatarColor};width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:white">${name.charAt(0)}</div>`
          }
          <button class="photo-upload-btn" onclick="onUploadTherapistAvatar('${th.id}')">${t('applyUpload')}</button>
        </div>
        <div class="form-group">
          <label>${t('applyName')}</label>
          <input type="text" value="${name}">
        </div>
        <div class="form-group">
          <label>${t('applyIntro')}</label>
          <textarea>${intro}</textarea>
        </div>
        <div class="form-group">
          <label>${t('applyLocation')}</label>
          <input type="text" id="profile-edit-location" value="${location}">
        </div>
        <div class="form-group">
          <label>${t('profileVisibility')}</label>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:6px">
            <label style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:400">
              <input type="checkbox" id="profile-show-email" ${th.show_email ? 'checked' : ''} onchange="onToggleContactVisibility('email', this.checked)">
              ${t('profileShowEmail')}
            </label>
            <label style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:400">
              <input type="checkbox" id="profile-show-phone" ${th.show_phone ? 'checked' : ''} onchange="onToggleContactVisibility('phone', this.checked)">
              ${t('profileShowPhone')}
            </label>
          </div>
        </div>

        <div class="minor-settings-box">
          <h3>${t('therapistAcceptsMinors')}</h3>
          <label style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:400;margin-bottom:12px">
            <input type="checkbox" id="accepts-minors" ${th.accepts_minors ? 'checked' : ''} onchange="onToggleAcceptsMinors(this.checked)">
            ${t('therapistAcceptsMinors')}
          </label>
          <div id="minor-terms-section" style="display:${th.accepts_minors ? 'block' : 'none'}">
            <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px">${t('therapistMinorTermsContent')}</p>
            <div class="checkbox-group">
              <input type="checkbox" id="therapist-minor-terms" ${th.minor_terms_agreed ? 'checked' : ''}>
              <label for="therapist-minor-terms">${t('therapistMinorTermsAgree')}</label>
            </div>
            <div class="minor-price-note">${t('therapistMinorPriceNote')}</div>
          </div>
        </div>

        <button class="btn-primary" onclick="onSaveTherapistProfile()">${t('profileEditSave')}</button>
      </div>
    </div>
  `;
}

// Referral Program
function renderTherapistReferrals(el, header) {
  renderHeaderWithBack(header, t('referralTitle'), '#/therapist-dashboard');
  const thId = therapistMode.therapistId || 1;
  const th = getTherapist(thId);
  const data = getDashboardData(thId);

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('referralTitle')}</h1>

      <div class="profile-section">
        <h2>${t('referralCode')}</h2>
        <div class="referral-code-box">
          <code id="ref-code">${th.referralCode}</code>
          <button onclick="onCopyReferralCode()">${t('referralCopy')}</button>
        </div>
      </div>

      <div class="referral-stats">
        <div class="referral-stat">
          <div class="value">${data.referralStats.totalReferred}</div>
          <div class="label">${t('referralTotalReferred')}</div>
        </div>
        <div class="referral-stat">
          <div class="value">¥${data.referralStats.totalEarnings.toLocaleString()}</div>
          <div class="label">${t('referralTotalEarnings')}</div>
        </div>
      </div>

      <div class="info-box">
        <strong>${t('referralCommission')}</strong><br>
        ${t('referralDesc')}
      </div>

      <div class="profile-section mt-20">
        <h2>${t('earningsReferralIncome')}</h2>
        <div class="earnings-breakdown">
          ${data.earningsHistory.map(h => `
            <div class="earnings-row">
              <span class="label">${h.month}</span>
              <span class="amount positive">+¥${h.referral.toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function onCopyReferralCode() {
  const code = document.getElementById('ref-code').textContent;
  navigator.clipboard.writeText(code).catch(() => {});
  const btn = document.querySelector('.referral-code-box button');
  btn.textContent = t('referralCopied');
  setTimeout(() => { btn.textContent = t('referralCopy'); }, 2000);
}

// Referral Landing
function renderReferralLanding(el, header, code) {
  renderHeaderSimple(header, t('appName'));
  const referrer = getTherapistByReferralCode(code);

  el.innerHTML = `
    <div class="page">
      <div class="referral-landing">
        <div class="landing-logo">${icons.leaf}</div>
        <h1 class="landing-title" style="font-size:1.5rem">${t('referralLandingTitle')}</h1>
        ${referrer ? `
          <div class="referrer-info">
            <div class="ref-avatar" style="background-color:${referrer.avatarColor};width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:700;color:white;flex-shrink:0">${getLocalizedText(referrer.name).charAt(0)}</div>
            <div>
              <strong>${getLocalizedText(referrer.name)}</strong>
              <p style="font-size:0.8rem;color:var(--text-muted)">${t('referralLandingDesc')}</p>
            </div>
          </div>
        ` : ''}
        <button class="btn-primary" onclick="navigate('#/apply')" style="margin:20px auto">${t('referralLandingCTA')}</button>
        <button class="btn-secondary" onclick="navigate('#/')" style="margin:0 auto">${t('bookingBackHome')}</button>
      </div>
    </div>
  `;
}

// ===== Favorites =====
function renderFavorites(el, header) {
  renderHeaderWithBack(header, t('favorites'), '#/profile');
  const favTherapists = favorites.map(id => getTherapist(id)).filter(Boolean);
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('favorites')}</h1>
      ${favTherapists.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyFavorites}</div><p>${t('favoritesEmpty')}</p></div>` : ''}
      ${favTherapists.map(th => renderTherapistCard(th)).join('')}
    </div>
  `;
}

// ===== Points =====
function renderPoints(el, header) {
  renderHeaderWithBack(header, t('pointsBalance'), '#/profile');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('pointsBalance')}</h1>
      <div class="points-balance-card">
        <div class="points-big">${pointsData.balance}</div>
        <div class="points-label">${t('points')}</div>
      </div>
      <div class="info-box">${t('pointsPerYen')}<br>${t('pointsRedeemable')}</div>
      <div class="profile-section mt-20">
        <h2>${t('pointsHistory')}</h2>
        ${pointsData.history.length === 0 ? `<div class="empty-state">${t('journalEmpty')}</div>` : ''}
        ${pointsData.history.map(h => `
          <div class="points-history-item">
            <div class="points-history-info">
              <span class="points-type ${h.type}">${h.type === 'earned' ? t('pointsEarned') : t('pointsUsed')}</span>
              <span class="points-desc">${h.desc}</span>
            </div>
            <div class="points-amount ${h.type}">
              ${h.type === 'earned' ? '+' : '-'}${h.points}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ===== Gift Card =====
function renderGiftCard(el, header) {
  renderHeaderWithBack(header, t('giftCardTitle'), '#/');
  el.innerHTML = `
    <div class="page">
      <div class="gift-card-hero">
        <div class="gift-card-icon">${icons.bentoGift}</div>
        <h1 class="page-title">${t('giftCardTitle')}</h1>
        <p class="gift-card-desc">${t('giftCardDesc')}</p>
      </div>
      <div class="gift-card-form">
        <div class="form-group">
          <label>${t('giftCardAmount')}</label>
          <div class="gift-amount-options">
            ${giftCardOptions.map((g, i) => `
              <button class="gift-amount-btn${i === 1 ? ' selected' : ''}" onclick="selectGiftAmount(this)">${getLocalizedText(g.label)}</button>
            `).join('')}
          </div>
        </div>
        <div class="form-group">
          <label>${t('giftCardRecipient')}</label>
          <input type="email" placeholder="email@example.com">
        </div>
        <div class="form-group">
          <label>${t('giftCardMessage')}</label>
          <textarea placeholder="${t('giftCardMessagePlaceholder')}" style="min-height:80px"></textarea>
        </div>
        <button class="btn-primary" onclick="purchaseGiftCard()">${t('giftCardSend')}</button>
      </div>
      <div class="gift-card-redeem mt-20">
        <h2>${t('giftCardRedeemTitle')}</h2>
        <p class="section-desc">${t('giftCardRedeemDesc')}</p>
        <div class="form-group">
          <input type="text" id="gift-code-input" placeholder="GC-XXXXXXXX" maxlength="11" style="text-transform:uppercase;letter-spacing:2px;font-weight:600;text-align:center">
        </div>
        <button class="btn-secondary" onclick="redeemGiftCard()">${t('giftCardRedeem')}</button>
        <div id="gift-redeem-result"></div>
      </div>
    </div>
  `;
}

function selectGiftAmount(btn) {
  document.querySelectorAll('.gift-amount-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

async function purchaseGiftCard() {
  const selectedBtn = document.querySelector('.gift-amount-btn.selected');
  const emailInput = document.querySelector('.gift-card-form input[type="email"]');
  const messageInput = document.querySelector('.gift-card-form textarea');

  if (!selectedBtn || !emailInput) return;
  const email = emailInput.value.trim();
  if (!email) { showToast(t('giftCardEmailRequired')); return; }

  const amountIdx = Array.from(document.querySelectorAll('.gift-amount-btn')).indexOf(selectedBtn);
  const amount = giftCardOptions[amountIdx]?.amount;
  if (!amount) return;

  const btn = document.querySelector('.gift-card-form .btn-primary');
  btn.disabled = true;
  btn.textContent = t('paymentProcessing');
  const lang = localStorage.getItem('iyashi-lang') || 'ja';

  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'gift_card',
        amount,
        recipientEmail: email,
        message: messageInput?.value?.trim() || '',
        userId: authState.user?.id || null,
        locale: lang,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    window.location.href = data.url;
  } catch (e) {
    console.error('Gift card checkout failed:', e);
    showToast(t('paymentError'));
    btn.disabled = false;
    btn.textContent = t('giftCardSend');
  }
}

async function redeemGiftCard() {
  const input = document.getElementById('gift-code-input');
  const resultEl = document.getElementById('gift-redeem-result');
  if (!input || !resultEl) return;
  const code = input.value.trim().toUpperCase();
  if (!code || code.length < 5) { showToast(t('giftCardInvalidCode')); return; }

  resultEl.innerHTML = `<p style="color:var(--text-muted);margin-top:12px">${t('paymentProcessing')}</p>`;
  try {
    // Look up gift card in Supabase
    const { data, error } = await supabase.from('gift_cards').select('*').eq('code', code).eq('status', 'active').single();
    if (error || !data) {
      resultEl.innerHTML = `<p style="color:#c0392b;margin-top:12px">${t('giftCardInvalidCode')}</p>`;
      return;
    }
    // Check expiry
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      resultEl.innerHTML = `<p style="color:#c0392b;margin-top:12px">${t('giftCardExpired')}</p>`;
      return;
    }
    // Mark as redeemed
    await supabase.from('gift_cards').update({ status: 'redeemed' }).eq('id', data.id);
    // Add points equivalent (¥100 = 1 point, so gift card amount gives proportional points)
    earnPoints(data.amount, `${t('giftCardRedeemed')} (${code})`);
    resultEl.innerHTML = `
      <div class="gift-redeem-success" style="background:#f0faf4;border-radius:12px;padding:16px;margin-top:12px;text-align:center">
        <p style="font-size:1.2rem;font-weight:600;color:#2d9a62">¥${Number(data.amount).toLocaleString()} ${t('giftCardRedeemed')}</p>
        <p style="color:#555;margin-top:4px">+${Math.floor(data.amount / 100)} ${t('points')} ${t('pointsEarned')}</p>
      </div>`;
    input.value = '';
  } catch (e) {
    console.error('Gift card redeem error:', e);
    resultEl.innerHTML = `<p style="color:#c0392b;margin-top:12px">${t('paymentError')}</p>`;
  }
}

function renderGiftCardSuccess(el, header) {
  renderHeaderSimple(header, t('appName'));
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">${icons.successGift}</div>
      <h2>${t('giftCardSuccess')}</h2>
      <button class="btn-primary" onclick="navigate('#/')">${t('bookingBackHome')}</button>
    </div>
  `;
}

// ===== Blog =====
function renderBlog(el, header) {
  renderHeaderWithBack(header, t('blogTitle'), '#/');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('blogTitle')}</h1>
      ${blogArticles.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyBlog}</div><p>${t('resultsEmpty')}</p></div>` : ''}
      ${blogArticles.map(a => {
        const th = getTherapist(a.therapistId);
        return `
          <div class="blog-card" onclick="navigate('#/blog/${a.id}')">
            <div class="blog-card-content">
              <h3>${getLocalizedText(a.title)}</h3>
              <p>${getLocalizedText(a.excerpt)}</p>
              <div class="blog-card-footer">
                <span class="blog-author">${t('blogByTherapist')}: ${th ? getLocalizedText(th.name) : ''}</span>
                <span class="blog-date">${a.date}</span>
              </div>
              <div class="blog-tags">${a.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

async function purchaseDigitalProduct(productId, productName, price) {
  const lang = localStorage.getItem('iyashi-lang') || 'ja';
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'digital_product',
        productId,
        productName,
        price,
        userId: authState.user?.id || null,
        locale: lang,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    window.location.href = data.url;
  } catch (e) {
    console.error('Digital product checkout failed:', e);
    showToast(t('paymentError'));
  }
}

function renderBlogDetail(el, header, blogId) {
  const article = blogArticles.find(a => String(a.id) === String(blogId));
  if (!article) { navigate('#/blog'); return; }
  const th = getTherapist(article.therapistId);
  renderHeaderWithBack(header, t('blogTitle'), '#/blog');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title" style="font-size:1.3rem">${getLocalizedText(article.title)}</h1>
      <div class="blog-detail-meta">
        ${th ? `<span class="blog-author" onclick="navigate('#/therapist/${th.id}')" style="cursor:pointer">${t('blogByTherapist')}: ${getLocalizedText(th.name)}</span>` : ''}
        <span class="blog-date">${article.date}</span>
      </div>
      <div class="blog-detail-body">
        <p>${getLocalizedText(article.excerpt)}</p>
        <p style="color:var(--text-muted);font-style:italic;margin-top:20px">（${getLang() === 'ja' ? '記事の全文はプレミアム会員向けです' : 'Full article is for premium members'}）</p>
      </div>
      <div class="blog-tags mt-12">${article.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>
      ${th ? `
        <div class="profile-section mt-20">
          <h2>${t('blogByTherapist')}</h2>
          ${renderTherapistCard(th)}
        </div>
      ` : ''}
    </div>
  `;
}

// ===== Digital Products =====
function renderDigitalProducts(el, header) {
  renderHeaderWithBack(header, t('digitalProductsTitle'), '#/');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('digitalProductsTitle')}</h1>
      <p class="section-desc">${t('digitalProductsDesc')}</p>
      ${digitalProducts.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyProducts}</div><p>${t('resultsEmpty')}</p></div>` : ''}
      ${digitalProducts.map(p => {
        const th = getTherapist(p.therapistId);
        return `
          <div class="digital-product-card">
            <div class="dp-icon">${p.type === 'pdf' ? 'PDF' : p.type === 'video' ? 'VID' : 'AUD'}</div>
            <div class="dp-info">
              <h3>${getLocalizedText(p.name)}</h3>
              <p>${getLocalizedText(p.description)}</p>
              ${th ? `<span class="dp-author">${getLocalizedText(th.name)}</span>` : ''}
              <span class="dp-price">¥${p.price.toLocaleString()}</span>
            </div>
            <button class="btn-small" onclick="purchaseDigitalProduct('${p.id}', '${getLocalizedText(p.name).replace(/'/g, "\\'")}', ${p.price})">${t('digitalProductBuy')}</button>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ===== Journal =====
function renderJournal(el, header) {
  renderHeaderWithBack(header, t('journalTitle'), '#/profile');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('journalTitle')}</h1>
      <button class="btn-primary mb-20" onclick="navigate('#/journal/new')">+ ${t('journalNew')}</button>
      ${journalEntries.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyJournal}</div><p>${t('journalEmpty')}</p></div>` : ''}
      ${journalEntries.map((e, i) => `
        <div class="journal-entry">
          <div class="journal-entry-header">
            <span class="journal-mood">${e.moodEmoji}</span>
            <span class="journal-date">${e.date}</span>
          </div>
          <p class="journal-notes">${_escapeHtml(e.notes)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderJournalNew(el, header) {
  renderHeaderWithBack(header, t('journalNew'), '#/journal');
  const moods = [
    { key: 'great', emoji: '', label: t('journalMoodGreat') },
    { key: 'good', emoji: '', label: t('journalMoodGood') },
    { key: 'okay', emoji: '', label: t('journalMoodOkay') },
    { key: 'low', emoji: '', label: t('journalMoodLow') },
    { key: 'bad', emoji: '', label: t('journalMoodBad') },
  ];
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('journalNew')}</h1>
      <div class="form-group">
        <label>${t('journalMood')}</label>
        <div class="mood-selector" id="mood-selector">
          ${moods.map(m => `<button class="mood-btn" data-mood="${m.key}" data-emoji="${m.emoji}" onclick="selectMood(this)">${m.emoji}<br><small>${m.label}</small></button>`).join('')}
        </div>
      </div>
      <div class="form-group">
        <label>${t('journalNotes')}</label>
        <textarea id="journal-notes" placeholder="${t('journalNotesPlaceholder')}" style="min-height:120px"></textarea>
      </div>
      <button class="btn-primary" onclick="onSaveJournal()">${t('journalSave')}</button>
    </div>
  `;
}

let selectedMood = null;
function selectMood(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedMood = { key: btn.dataset.mood, emoji: btn.dataset.emoji };
}

function onSaveJournal() {
  const notes = document.getElementById('journal-notes').value.trim();
  if (!selectedMood || !notes) return;
  const entry = {
    mood: selectedMood.key,
    moodEmoji: selectedMood.emoji,
    notes: notes,
    date: new Date().toISOString().slice(0, 10),
  };
  journalEntries.unshift(entry);
  saveJournal();

  // Try Supabase insert (fire-and-forget with fallback)
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  supabase.from('journal_entries').insert({
    user_id: userId,
    mood: entry.mood,
    mood_emoji: entry.moodEmoji,
    notes: entry.notes,
  }).then(({ error }) => { if (error) console.warn('Supabase journal insert failed:', error); });

  selectedMood = null;
  showToast(t('journalSaved'));
  navigate('#/journal');
}

// ===== Notifications =====
let notificationsData = [];
async function loadNotifications() {
  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  try {
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50);
    if (!error && data) {
      notificationsData = data.map(n => ({
        id: n.id,
        icon: n.type === 'booking' ? '◉' : n.type === 'gift_card' ? '◈' : n.type === 'waitlist' ? '○' : n.type === 'points' ? '◎' : '·',
        text: n.body || n.title || '',
        date: n.created_at ? n.created_at.slice(0, 10) : '',
        isRead: n.is_read,
      }));
    }
  } catch (e) { console.warn('loadNotifications: Supabase failed', e); }
}
async function markNotificationsRead() {
  const unreadIds = notificationsData.filter(n => !n.isRead).map(n => n.id);
  if (unreadIds.length === 0) return;
  notificationsData.forEach(n => n.isRead = true);
  const userId = authState.user?.id;
  if (userId) {
    supabase.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false)
      .then(({ error }) => { if (error) console.warn('Mark read failed:', error); });
  }
}
async function renderNotifications(el, header) {
  renderHeaderWithBack(header, t('notificationTitle'), '#/profile');
  // Load from Supabase
  await loadNotifications();
  // Merge local fallback notifications from bookings/waitlist if DB returned nothing
  const notifications = [...notificationsData];
  if (notifications.length === 0 && authState.isLoggedIn) {
    mockBookingHistory.filter(b => b.status === 'upcoming').forEach(b => {
      notifications.push({
        icon: '◉',
        text: `${t('reminderTitle')}: ${getLocalizedText(b.sessionName)} - ${b.date} ${b.time}`,
        date: b.date,
        isRead: true,
      });
    });
    if (waitlistIds.length > 0) {
      waitlistIds.forEach(id => {
        const th = getTherapist(id);
        if (th) notifications.push({ icon: '○', text: `${t('waitlistJoined')}: ${getLocalizedText(th.name)}`, date: '', isRead: true });
      });
    }
  }
  // Mark as read
  markNotificationsRead();
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('notificationTitle')}</h1>
      ${notifications.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyNotifications}</div><p>${t('notificationEmpty')}</p></div>` : ''}
      ${notifications.map(n => `
        <div class="notification-item${n.isRead === false ? ' notification-unread' : ''}">
          <span class="notification-icon">${n.icon}</span>
          <div class="notification-text">${n.text}</div>
          ${n.date ? `<span class="notification-date">${n.date}</span>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// ===== Retreats =====
function renderRetreats(el, header) {
  renderHeaderWithBack(header, t('retreatSectionTitle'), '#/');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('retreatSectionTitle')}</h1>
      <p class="section-desc">${t('retreatSectionDesc')}</p>
      <p class="retreat-note">${t('retreatNote')}</p>
      ${retreats.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyRetreat}</div><p>${t('resultsEmpty')}</p></div>` : ''}
      ${retreats.map(r => `
        <div class="retreat-card" onclick="navigate('#/retreats/${r.id}')">
          <div class="retreat-card-header">
            <div class="retreat-card-icon">${icons.retreat}</div>
            <div class="retreat-card-info">
              <h3>${getLocalizedText(r.title)}</h3>
              <p class="retreat-location">${getLocalizedText(r.location)}</p>
            </div>
          </div>
          <p class="retreat-card-desc">${getLocalizedText(r.description)}</p>
          <div class="retreat-card-meta">
            <span class="retreat-duration">${r.duration}${t('retreatDays')}</span>
            <span class="retreat-price">¥${r.price.toLocaleString()}</span>
          </div>
          <div class="retreat-tags">${r.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderRetreatDetail(el, header, id) {
  const retreat = retreats.find(r => String(r.id) === String(id));
  if (!retreat) { navigate('#/retreats'); return; }
  renderHeaderWithBack(header, getLocalizedText(retreat.title), '#/retreats');
  const includes = getLocalizedText(retreat.includes);
  el.innerHTML = `
    <div class="page">
      <div class="retreat-detail-hero">
        <div class="retreat-hero-icon">${icons.retreat}</div>
        <h1 class="page-title">${getLocalizedText(retreat.title)}</h1>
        <p class="retreat-location-lg">${getLocalizedText(retreat.location)}</p>
      </div>
      <div class="profile-section">
        <p class="retreat-detail-desc">${getLocalizedText(retreat.description)}</p>
      </div>
      <div class="profile-section">
        <h2>${t('retreatProvider')}</h2>
        <p>${getLocalizedText(retreat.provider)}</p>
      </div>
      <div class="profile-section">
        <h2>${t('retreatIncludes')}</h2>
        <ul class="retreat-includes-list">
          ${Array.isArray(includes) ? includes.map(item => `<li>✓ ${item}</li>`).join('') : `<li>${includes}</li>`}
        </ul>
      </div>
      <div class="retreat-detail-meta">
        <div class="retreat-meta-item">
          <span class="meta-label">${t('retreatDuration')}</span>
          <span class="meta-value">${retreat.duration}${t('retreatDays')}</span>
        </div>
        <div class="retreat-meta-item">
          <span class="meta-label">${t('bookingPrice')}</span>
          <span class="meta-value retreat-price-lg">¥${retreat.price.toLocaleString()}</span>
        </div>
      </div>
      <div class="retreat-note mt-12">${t('retreatNote')}</div>
      <button class="btn-primary mt-16" id="retreat-book-btn" onclick="requireAuth('book-retreat', () => { bookRetreat('${retreat.id}'); })">${t('retreatBookNow')} - ¥${retreat.price.toLocaleString()}</button>
    </div>
  `;
}

async function bookRetreat(retreatId) {
  const retreat = retreats.find(r => String(r.id) === String(retreatId));
  if (!retreat) return;
  const btn = document.getElementById('retreat-book-btn');
  if (btn) { btn.disabled = true; btn.textContent = t('paymentProcessing'); }
  const lang = localStorage.getItem('iyashi-lang') || 'ja';
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        therapistId: '00000000-0000-0000-0000-000000000000',
        sessionId: String(retreat.id),
        bookingDate: new Date().toISOString().slice(0, 10),
        bookingTime: '00:00',
        userId: authState.user?.id || null,
        sessionName: getLocalizedText(retreat.title),
        therapistName: getLocalizedText(retreat.provider),
        price: retreat.price,
        platformFee: Math.round(retreat.price * 0.09),
        locale: lang,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    window.location.href = data.url;
  } catch (e) {
    console.error('Retreat checkout failed:', e);
    showToast(t('paymentError'));
    if (btn) { btn.disabled = false; btn.textContent = `${t('retreatBookNow')} - ¥${retreat.price.toLocaleString()}`; }
  }
}

// ===== Forum / Message Board =====
// In-memory arrays for user-created threads/replies (no longer persisted to localStorage)
let forumReplyData = {};
let forumUserThreads = [];

function renderForum(el, header) {
  renderHeaderWithBack(header, t('forumTitle'), '#/');
  const allThreads = [...forumUserThreads, ...forumThreads].sort((a, b) => b.date > a.date ? 1 : -1);
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('forumTitle')}</h1>
      <p class="section-desc">${t('forumDesc')}</p>
      <p class="forum-rules">${t('forumRules')}</p>
      ${authState.isLoggedIn
        ? `<button class="btn-primary mb-16" onclick="navigate('#/forum/new')">+ ${t('forumNewThread')}</button>`
        : `<div class="info-box mb-16">${t('forumLoginRequired')}</div>`
      }
      ${allThreads.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">${icons.emptyMessages}</div><p>${t('forumEmpty')}</p></div>` : ''}
      ${allThreads.map(thread => {
        const replyCount = (thread.replies ? thread.replies.length : 0) + ((forumReplyData[thread.id] || []).length);
        return `
          <div class="forum-thread-card" onclick="navigate('#/forum/${thread.id}')">
            <h3 class="forum-thread-title">${_escapeHtml(getLocalizedText(thread.title))}</h3>
            <p class="forum-thread-preview">${_escapeHtml(getLocalizedText(thread.body).slice(0, 80))}...</p>
            <div class="forum-thread-meta">
              <span class="forum-author">${t('forumPostedBy')}: ${getLocalizedText(thread.author)}</span>
              <span class="forum-date">${thread.date}</span>
              <span class="forum-reply-count">${replyCount} ${t('forumReplies')}</span>
            </div>
            ${thread.tags ? `<div class="forum-tags">${thread.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderForumThread(el, header, id) {
  if (id === 'new') {
    renderForumNewThread(el, header);
    return;
  }
  const thread = forumThreads.find(t => String(t.id) === String(id)) || forumUserThreads.find(t => String(t.id) === String(id));
  if (!thread) { navigate('#/forum'); return; }
  renderHeaderWithBack(header, t('forumTitle'), '#/forum');
  const userReplies = forumReplyData[thread.id] || [];
  const allReplies = [...(thread.replies || []), ...userReplies];
  el.innerHTML = `
    <div class="page">
      <div class="forum-thread-detail">
        <h1 class="forum-detail-title">${_escapeHtml(getLocalizedText(thread.title))}</h1>
        <div class="forum-detail-meta">
          <span>${t('forumPostedBy')}: ${_escapeHtml(getLocalizedText(thread.author))}</span>
          <span>${thread.date}</span>
        </div>
        <div class="forum-detail-body">${_escapeHtml(getLocalizedText(thread.body))}</div>
      </div>
      <div class="forum-replies-section">
        <h2>${allReplies.length} ${t('forumReplies')}</h2>
        ${allReplies.map(r => `
          <div class="forum-reply">
            <div class="forum-reply-header">
              <span class="forum-reply-author">${_escapeHtml(getLocalizedText(r.author))}</span>
              <span class="forum-reply-date">${r.date}</span>
            </div>
            <p class="forum-reply-text">${_escapeHtml(getLocalizedText(r.text))}</p>
          </div>
        `).join('')}
      </div>
      ${authState.isLoggedIn ? `
        <div class="forum-reply-form">
          <textarea id="forum-reply-input" placeholder="${t('forumReplyPlaceholder')}" style="min-height:80px"></textarea>
          <button class="btn-primary mt-8" onclick="onForumReply(${typeof thread.id === 'string' ? `'${thread.id}'` : thread.id})">${t('forumReply')}</button>
        </div>
      ` : `<div class="info-box">${t('forumLoginRequired')}</div>`}
    </div>
  `;
}

function renderForumNewThread(el, header) {
  renderHeaderWithBack(header, t('forumNewThread'), '#/forum');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('forumNewThread')}</h1>
      <div class="form-group">
        <label>${t('forumThreadTitle')}</label>
        <input type="text" id="forum-thread-title" placeholder="${t('forumThreadTitlePlaceholder')}">
      </div>
      <div class="form-group">
        <label>${t('forumThreadBody')}</label>
        <textarea id="forum-thread-body" placeholder="${t('forumThreadBodyPlaceholder')}" style="min-height:120px"></textarea>
      </div>
      <button class="btn-primary" onclick="onForumCreateThread()">${t('forumPost')}</button>
    </div>
  `;
}

async function onForumCreateThread() {
  const title = document.getElementById('forum-thread-title').value.trim();
  const body = document.getElementById('forum-thread-body').value.trim();
  if (!title || !body) return;

  const lang = getLang();
  const authorName = authState.user?.name || 'Anonymous';
  const authorId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  const now = new Date().toISOString();

  const row = {
    author_id: authorId,
    title_ja: lang === 'ja' ? title : '',
    title_en: lang === 'en' ? title : '',
    body_ja: lang === 'ja' ? body : '',
    body_en: lang === 'en' ? body : '',
    tags: [],
  };

  // Build the local thread object used by the UI
  const localThread = {
    id: null, // will be set from Supabase or fallback
    title: { ja: row.title_ja, en: row.title_en },
    body: { ja: row.body_ja, en: row.body_en },
    author: { ja: authorName, en: authorName },
    date: now.slice(0, 10),
    replies: [],
    tags: [],
  };

  try {
    const { data, error } = await supabase
      .from('forum_threads')
      .insert(row)
      .select()
      .single();

    if (error) throw error;

    // Success — use the Supabase-generated id
    localThread.id = data.id;
    localThread.date = data.created_at ? data.created_at.slice(0, 10) : localThread.date;
    forumThreads.unshift(localThread);
  } catch (err) {
    console.warn('Supabase forum_threads insert failed (RLS or network), adding locally:', err);
    localThread.id = 'local-' + Date.now();
    forumUserThreads.unshift(localThread);
  }

  showToast(t('forumPost') + '!');
  navigate('#/forum');
}

async function onForumReply(threadId) {
  const text = document.getElementById('forum-reply-input').value.trim();
  if (!text) return;

  const lang = getLang();
  const authorName = authState.user?.name || 'Anonymous';
  const authorId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  const now = new Date().toISOString();

  const row = {
    thread_id: threadId,
    author_id: authorId,
    body_ja: lang === 'ja' ? text : '',
    body_en: lang === 'en' ? text : '',
  };

  const localReply = {
    author: { ja: authorName, en: authorName },
    text: { ja: row.body_ja, en: row.body_en },
    date: now.slice(0, 10),
  };

  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .insert(row)
      .select()
      .single();

    if (error) throw error;

    // Success — add to the thread's replies array directly
    localReply.date = data.created_at ? data.created_at.slice(0, 10) : localReply.date;
    const thread = forumThreads.find(t => String(t.id) === String(threadId))
                || forumUserThreads.find(t => String(t.id) === String(threadId));
    if (thread) {
      thread.replies.push(localReply);
    }
  } catch (err) {
    console.warn('Supabase forum_replies insert failed (RLS or network), adding locally:', err);
    if (!forumReplyData[threadId]) forumReplyData[threadId] = [];
    forumReplyData[threadId].push(localReply);
  }

  router();
}

// ===== Privacy & Terms =====
function renderPrivacy(el, header) {
  renderHeaderWithBack(header, t('privacyPolicyTitle'), '#/');
  const sections = [1, 2, 3, 4, 5].map(i => `
    <div class="legal-section">
      <h2>${t('privacySection' + i + 'Title')}</h2>
      <p>${t('privacySection' + i)}</p>
    </div>
  `).join('');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('privacyPolicyTitle')}</h1>
      <p class="legal-updated">${t('privacyLastUpdated')}</p>
      <p class="legal-intro">${t('privacyIntro')}</p>
      ${sections}
    </div>
  `;
}

function renderTerms(el, header) {
  renderHeaderWithBack(header, t('termsOfServiceTitle'), '#/');
  const sections = [1, 2, 3, 4, 5, 6].map(i => `
    <div class="legal-section">
      <h2>${t('termsSection' + i + 'Title')}</h2>
      <p>${t('termsSection' + i)}</p>
    </div>
  `).join('');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('termsOfServiceTitle')}</h1>
      <p class="legal-updated">${t('termsLastUpdated')}</p>
      <p class="legal-intro">${t('termsIntro')}</p>
      ${sections}
    </div>
  `;
}

// ===== Feedback =====
function renderFeedback(el, header) {
  renderHeaderWithBack(header, t('feedbackTitle'), '#/profile');
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('feedbackTitle')}</h1>
      <p style="color:var(--text-secondary);margin-bottom:20px">${t('feedbackDesc')}</p>
      <textarea id="feedback-text" class="magic-link-input" rows="6" placeholder="${t('feedbackPlaceholder')}" style="width:100%;resize:vertical;min-height:120px"></textarea>
      <button class="btn-primary mt-12" onclick="onSubmitFeedback()" style="width:100%">${t('feedbackSubmit')}</button>
      <div id="feedback-result"></div>
    </div>
  `;
}

async function onSubmitFeedback() {
  const text = document.getElementById('feedback-text')?.value?.trim();
  if (!text) return;
  const btn = document.querySelector('#content .btn-primary');
  btn.disabled = true;
  btn.textContent = '...';
  try {
    await supabase.from('feedback').insert({
      user_id: authState.user?.id || null,
      message: text,
      user_agent: navigator.userAgent,
      page: window.location.hash,
    });
  } catch (e) {
    console.warn('Feedback insert failed, storing locally:', e);
  }
  document.getElementById('feedback-result').innerHTML = `
    <div class="empty-state-box" style="margin-top:20px"><div class="empty-state-icon">${icons.thankYou}</div><p>${t('feedbackThanks')}</p></div>
  `;
  document.getElementById('feedback-text').value = '';
  btn.disabled = false;
  btn.textContent = t('feedbackSubmit');
}

// ===== Onboarding =====
function showOnboarding() {
  if (localStorage.getItem('iyashi-onboarded')) return;
  const overlay = document.createElement('div');
  overlay.className = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="onboarding-card">
      <div style="width:40px;height:40px;margin:0 auto 12px;color:rgba(95,127,115,0.75)">${icons.leaf}</div>
      <h2>${t('onboardingWelcome')}</h2>
      <div class="onboarding-steps">
        <div class="onboarding-step"><span class="onboarding-num">1</span>${t('onboardingStep1')}</div>
        <div class="onboarding-step"><span class="onboarding-num">2</span>${t('onboardingStep2')}</div>
        <div class="onboarding-step"><span class="onboarding-num">3</span>${t('onboardingStep3')}</div>
      </div>
      <button class="btn-primary" onclick="dismissOnboarding()" style="width:100%">${t('onboardingGotIt')}</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

function dismissOnboarding() {
  localStorage.setItem('iyashi-onboarded', '1');
  const overlay = document.querySelector('.onboarding-overlay');
  if (overlay) overlay.remove();
}

// ===== Init =====
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
  // Show skeleton loading screen while data loads
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="page" style="padding-top:20px">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text" style="width:80%"></div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
      </div>
      <div class="skeleton skeleton-card-wide"></div>
      <div class="skeleton skeleton-card-wide"></div>
      <div class="skeleton skeleton-card-wide"></div>
    </div>
  `;
  try {
    await Promise.all([
      initSupabaseAuth(),
      loadSupabaseData(),
    ]);
    await loadUserData();
  } catch (e) {
    console.warn('Init data load failed, using mock data:', e);
  }
  router();
  showOnboarding();
  // Feedback FAB
  const fab = document.createElement('button');
  fab.className = 'feedback-fab';
  fab.textContent = t('feedbackButton');
  fab.onclick = () => navigate('#/feedback');
  document.body.appendChild(fab);
});

// ===== Scroll-triggered reveal =====
const _revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      _revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => _revealObserver.observe(el));
}

function applyStagger(selector, baseDelay = 50) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('stagger-item');
    el.style.animationDelay = `${i * baseDelay}ms`;
  });
}
