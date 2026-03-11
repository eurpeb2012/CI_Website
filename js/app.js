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
        navigate(window.location.hash || '#/profile');
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
  };
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
  await Promise.all([loadFavorites(), loadWaitlist(), loadJournal()]);
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

// Initialize theme
setTheme(getTheme());

// ===== Icons (inline SVG) =====
const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  sessions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
};

// ===== Router =====
function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1); // remove #
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
];

function router() {
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
    renderRoute('landing', content, header, []);
    setActiveNav('home');
  }

  updateBottomNav();
  window.scrollTo(0, 0);
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
  };
  (handlers[handler] || handlers.landing)();
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
    <button class="lang-toggle" onclick="onToggleLang()">${t('language')}</button>
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
      <div class="landing-logo">🌿</div>
      <h1 class="landing-title">${t('landingTitle')}</h1>
      <p class="landing-subtitle">${t('landingSubtitle')}</p>
      <p class="landing-tagline">${t('landingTagline')}</p>
      <button class="btn-primary" onclick="navigate('#/search')">${t('landingCTA')}</button>
      <button class="btn-secondary" onclick="navigate('#/apply')">${t('landingSecondary')}</button>

      <div class="landing-quick-links">
        <button class="quick-link-btn" onclick="navigate('#/retreats')">🏕️ ${t('retreatSectionTitle')}</button>
        <button class="quick-link-btn" onclick="navigate('#/forum')">💬 ${t('forumTitle')}</button>
        <button class="quick-link-btn" onclick="navigate('#/gift-card')">🎁 ${t('giftCardTitle')}</button>
        <button class="quick-link-btn" onclick="navigate('#/blog')">📝 ${t('blogTitle')}</button>
        <button class="quick-link-btn" onclick="navigate('#/digital-products')">📦 ${t('digitalProductsTitle')}</button>
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
        <div class="search-option-icon">🔍</div>
        <div class="search-option-text">
          <h3>${t('searchByCriteria')}</h3>
          <p>${t('searchByCriteriaDesc')}</p>
        </div>
      </div>
      <div class="search-option" onclick="navigate('#/search/feeling')">
        <div class="search-option-icon">💭</div>
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
    { key: 'physical', icon: '💆', label: t('categoryPhysical'), desc: t('categoryPhysicalDesc') },
    { key: 'mental', icon: '🧘', label: t('categoryMental'), desc: t('categoryMentalDesc') },
    { key: 'playful', icon: '🎨', label: t('categoryPlayful'), desc: t('categoryPlayfulDesc') },
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
      <h1 class="page-title">${t('categoryPlayful')}</h1>
      <div class="category-cards">
        <div class="category-card" onclick="state.category='playful'; navigate('#/search/feeling/delivery')">
          <div class="category-icon">🎨</div>
          <div><h3>${t('categoryPlayful')}</h3><p>${t('categoryPlayfulDesc')}</p></div>
        </div>
        <div class="category-card" onclick="state.category='fortune-telling'; navigate('#/search/feeling/delivery')">
          <div class="category-icon">🔮</div>
          <div><h3>${t('categoryFortuneTelling')}</h3><p>${t('categoryFortuneTellingDesc')}</p></div>
        </div>
        <div class="category-card" onclick="state.category='retreat'; state.delivery='in-person'; navigate('#/search/feeling/results')">
          <div class="category-icon">🏕️</div>
          <div><h3>${t('categoryRetreat')}</h3><p>${t('categoryRetreatInPersonDesc')}</p></div>
        </div>
      </div>
    </div>
  `;
}

function renderFeelingStep3(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search/feeling/category');
  const deliveries = [
    { key: 'in-person', icon: '🤝', label: t('deliveryInPerson'), desc: t('deliveryInPersonDesc') },
    { key: 'video', icon: '💻', label: t('deliveryVideo'), desc: t('deliveryVideoDesc') },
    { key: 'telephone', icon: '📞', label: t('deliveryTelephone'), desc: t('deliveryTelephoneDesc') },
    { key: 'email', icon: '✉️', label: t('deliveryEmail'), desc: t('deliveryEmailDesc') },
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
        ${th.responseTime ? `<div class="card-response-time">💬 ${t('responseTime')}: ${th.responseTime}</div>` : ''}
        ${th.slidingScale ? `<div class="card-sliding-scale">💚 ${t('slidingScale')}</div>` : ''}
      </div>
      <button class="fav-btn${isFavorite(th.id) ? ' active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${th.id})" title="${isFavorite(th.id) ? t('removeFavorite') : t('addFavorite')}">${isFavorite(th.id) ? '❤️' : '🤍'}</button>
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
    { value: 'playful', label: t('categoryPlayful') },
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
        ${th.responseTime ? `<p class="profile-response-time">💬 ${t('responseTime')}: ${th.responseTime}</p>` : ''}
        ${th.slidingScale ? `<p class="profile-sliding-scale">💚 ${t('slidingScale')}</p>` : ''}
        <div class="profile-actions-row">
          <button class="btn-icon-action${isFavorite(th.id) ? ' active' : ''}" onclick="toggleFavorite(${th.id})">${isFavorite(th.id) ? '❤️' : '🤍'} ${isFavorite(th.id) ? t('removeFavorite') : t('addFavorite')}</button>
          <button class="btn-icon-action" onclick="onShareTherapist(${th.id})">📤 ${t('shareTherapist')}</button>
        </div>
      </div>

      ${th.credentials && th.credentials.length ? `
      <div class="profile-section">
        <h2>${t('credentials')}</h2>
        <div class="credentials-list">
          ${th.credentials.map(c => `<div class="credential-item">📜 ${getLocalizedText(c.name)} (${c.year})</div>`).join('')}
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
          ${th.gallery.map(g => `<div class="gallery-item"><div class="gallery-placeholder">📷</div><p>${getLocalizedText(g.desc)}</p></div>`).join('')}
        </div>
      </div>
      ` : ''}

      <div class="profile-section">
        <h2>${t('profileSessions')}</h2>
        ${th.sessions.map(s => `
          <div class="session-card">
            <h3>${getLocalizedText(s.name)}</h3>
            <p class="session-desc">${getLocalizedText(s.description)}</p>
            <div class="session-meta">
              <span class="session-price">¥${s.price.toLocaleString()} ${t('profilePerSession')}</span>
              ${s.duration ? `<span class="session-duration">${s.duration}${t('profileMinutes')}</span>` : ''}
              <div class="session-delivery-tags">
                ${s.delivery.map(d => `<span class="delivery-tag">${deliveryLabels[d] || d}</span>`).join('')}
              </div>
            </div>
            <button class="session-book-btn" onclick="onBookSession(${th.id}, ${s.id})">${t('profileBook')}</button>
          </div>
        `).join('')}
      </div>

      ${thProducts.length > 0 ? `
      <div class="profile-section">
        <h2>${t('digitalProductsTitle')}</h2>
        ${thProducts.map(p => `
          <div class="digital-product-card">
            <div class="dp-icon">${p.type === 'pdf' ? '📄' : p.type === 'video' ? '🎬' : '🎵'}</div>
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
        <button class="btn-secondary" style="max-width:100%" onclick="onMessageTherapist(${th.id})">${t('profileMessage')}</button>
        <button class="btn-outline-secondary mt-8" style="max-width:100%" onclick="onToggleWaitlist(${th.id})">
          ${onWaitlist ? `✓ ${t('waitlistJoined')}` : `🔔 ${t('waitlistJoin')}`}
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
      <p class="review-text">${getLocalizedText(r.text)}</p>
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
    const th = getTherapist(therapistId);
    const session = th.sessions.find(s => String(s.id) === String(sessionId));
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
  maxDate.setDate(maxDate.getDate() + 30);

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
  btn.textContent = t('bookingLoading');

  const userId = authState.user?.id || '00000000-0000-0000-0000-000000000001';
  const therapistUUID = toTherapistUUID(th.id);
  const sessionUUID = toSessionUUID(session.id);
  const dateStr = state.bookingDate.getFullYear() + '-' +
    String(state.bookingDate.getMonth() + 1).padStart(2, '0') + '-' +
    String(state.bookingDate.getDate()).padStart(2, '0');
  const timeStr = state.bookingTime + ':00';

  const tier = therapistTiers[th.tier] || therapistTiers.free;
  const platformFee = Math.round(session.price * (tier.platformFee / 100));

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        therapist_id: therapistUUID,
        session_id: sessionUUID,
        booking_date: dateStr,
        booking_time: timeStr,
        price: session.price,
        platform_fee: platformFee,
        status: 'upcoming'
      })
      .select();

    if (error) throw error;
    navigate('#/booking/success');
  } catch (e) {
    console.error('Booking insert failed:', e);
    showToast(t('bookingError'));
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
  // Earn points on booking
  if (state.bookingSession && authState.isLoggedIn) {
    earnPoints(state.bookingSession.price, getLocalizedText(state.bookingSession.name));
  }
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">✓</div>
      <h2>${t('bookingSuccess')}</h2>
      <p>${t('bookingSuccessMsg')}</p>
      ${authState.isLoggedIn && state.bookingSession ? `<p class="points-earned-msg">🎯 +${Math.floor(state.bookingSession.price / 100)} ${t('points')} ${t('pointsEarned')}!</p>` : ''}
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
          <div class="photo-placeholder">📷</div>
          <button class="photo-upload-btn">${t('applyUpload')}</button>
        </div>
        <div class="form-group">
          <label>${t('applyName')}</label>
          <input type="text" placeholder="${t('applyNamePlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyEmail')} *</label>
          <input type="email" placeholder="${t('applyEmailPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyAddress')} *</label>
          <input type="text" placeholder="${t('applyAddressPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applyBirthday')} *</label>
          <input type="date">
        </div>
        <div class="form-group">
          <label>${t('applyIntro')}</label>
          <textarea placeholder="${t('applyIntroPlaceholder')}"></textarea>
        </div>
        <div class="form-group">
          <label>${t('applyLocation')}</label>
          <input type="text" placeholder="${t('applyLocationPlaceholder')}">
        </div>
        <div class="form-group">
          <label>${t('applySessions')}</label>
          <div class="session-entry">
            <input type="text" placeholder="${t('applySessionName')}">
            <textarea placeholder="${t('applySessionDesc')}" style="min-height:60px"></textarea>
            <input type="number" placeholder="${t('applySessionPrice')}">
            <input type="number" placeholder="${t('applySessionDuration')}">
          </div>
          <button class="add-session-btn mt-12">${t('applyAddSession')}</button>
        </div>
        <div class="form-group">
          <label>${t('applyPlanTitle')}</label>
          <div class="plan-cards">
            ${['free', 'standard', 'premium'].map((tier, i) => {
              const td = therapistTiers[tier];
              return `
                <div class="plan-card ${i === 0 ? 'selected' : ''}" onclick="selectPlan(this)">
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
          <div class="info-box mt-12">${t('tierPlatformFee')}<br><br>${t('tierReentryNote')}</div>
        </div>
        <button class="btn-primary mt-12" onclick="navigate('#/apply/success')">${t('applySubmit')}</button>
      </div>
    </div>
  `;
}

function selectPlan(el) {
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function renderApplySuccess(el, header) {
  renderHeaderSimple(header, t('appName'));
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">🎉</div>
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
          ? `<img class="user-avatar" src="${authState.user.avatar_url}" alt="" style="width:56px;height:56px;border-radius:50%;object-fit:cover">`
          : `<div class="user-avatar">👤</div>`}
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
            <p class="review-text">${getLocalizedText(r.text)}</p>
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
            <p class="review-text">${getLocalizedText(r.text)}</p>
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
        <span>💬 ${t('messagesTitle')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/favorites')">
        <span>❤️ ${t('favorites')} (${favorites.length})</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/points')">
        <span>🎯 ${t('pointsBalance')}: ${pointsData.balance} ${t('points')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/journal')">
        <span>📓 ${t('journalTitle')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="navigate('#/notifications')">
        <span>🔔 ${t('notificationTitle')}</span>
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
          <span>⚡ ${t('demoLogin')}</span>
          <span class="arrow" style="font-size:0.75rem;color:var(--text-muted)">${t('demoLoginDesc')}</span>
        </div>
      `}
    </div>
  `;
}

function onDemoLogin() {
  authState.isLoggedIn = true;
  authState.user = { name: testUser.name, email: testUser.email };
  const pending = authState.pendingAction;
  authState.pendingAction = null;
  saveAuth();
  if (pending && pending.hash) {
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

// Settings
function renderSettings(el, header) {
  renderHeaderWithBack(header, t('settingsTitle'), '#/profile');
  const currentTheme = getTheme();
  const suggested = suggestThemeByTime();

  const themes = [
    { key: 'spring', name: t('themeSpring'), desc: t('themeSpringDesc'), color: 'linear-gradient(135deg, #a8e0c0, #5ac78d)' },
    { key: 'summer', name: t('themeSummer'), desc: t('themeSummerDesc'), color: 'linear-gradient(135deg, #fbd5a0, #f59e42)' },
    { key: 'evening', name: t('themeEvening'), desc: t('themeEveningDesc'), color: 'linear-gradient(135deg, #bdb3e0, #7e6bc7)' },
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
    </div>
  `;
}

function onSelectTheme(theme) {
  setTheme(theme);
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
        <button class="btn-primary" onclick="onDemoLogin()">⚡ ${t('demoLogin')}</button>
        <p class="signup-notice">${t('signupNotice')}</p>
      </div>
    </div>
  `;
}

// ===== Messages List =====
function renderMessagesList(el, header) {
  renderHeaderWithBack(header, t('messagesTitle'), '#/profile');

  // Build conversation list from booking history (therapists user has interacted with)
  const conversations = [];
  if (authState.isLoggedIn) {
    const seen = new Set();
    mockBookingHistory.forEach(b => {
      if (seen.has(b.therapistId)) return;
      seen.add(b.therapistId);
      const th = getTherapist(b.therapistId);
      if (!th) return;
      const msgs = getChatMessages(b.therapistId);
      const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
      conversations.push({
        therapistId: b.therapistId,
        name: getLocalizedText(th.name),
        initial: getLocalizedText(th.name).charAt(0),
        avatarColor: th.avatarColor,
        lastMessage: lastMsg ? getLocalizedText(lastMsg.text) : t('messagesNoMessages'),
        time: lastMsg ? lastMsg.time : '',
      });
    });
  }

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('messagesTitle')}</h1>
      ${!authState.isLoggedIn ? `<div class="empty-state-box"><div class="empty-state-icon">💬</div><p>${t('messagesLoginRequired')}</p><button class="btn-primary mt-12" onclick="navigate('#/signup')">${t('signupSubmit')}</button></div>` :
        conversations.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">💬</div><p>${t('messagesEmpty')}</p></div>` :
        conversations.map(c => `
          <div class="profile-menu-item" onclick="navigate('#/chat/${c.therapistId}')" style="padding:12px 16px">
            <div style="display:flex;align-items:center;gap:12px;flex:1">
              <div class="profile-avatar" style="background-color:${c.avatarColor};width:40px;height:40px;min-width:40px;font-size:1rem;display:flex;align-items:center;justify-content:center;border-radius:50%;color:#fff">${c.initial}</div>
              <div style="flex:1;min-width:0">
                <h3 style="margin:0;font-size:0.95rem">${c.name}</h3>
                <p style="margin:2px 0 0;font-size:0.85rem;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.lastMessage}</p>
              </div>
              ${c.time ? `<span style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap">${c.time}</span>` : ''}
            </div>
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
  let body, time, isSent;
  if (msg.sender_id) {
    // Supabase or local message object
    isSent = msg.sender_id === userId;
    body = msg.body;
    time = _formatChatTime(msg.created_at);
  } else {
    // Mock message object
    isSent = msg.from === 'user';
    body = getLocalizedText(msg.text);
    time = msg.time;
  }
  return `<div class="chat-bubble ${isSent ? 'chat-sent' : 'chat-received'}">
    ${_escapeHtml(body)}
    <span class="chat-time">${time}</span>
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
  renderHeaderWithBack(header, name, 'javascript:void(0)');
  header.querySelector('.header-back').onclick = () => history.back();

  // Render skeleton with loading state
  el.innerHTML = `
    <div class="chat-screen">
      <div class="chat-info-bar">${t('chatInfoWindow')}</div>
      <button class="chat-video-btn" onclick="navigate('#/videocall/${therapistId}')">${t('chatStartVideo')}</button>
      <div class="chat-messages">
        <div class="chat-loading">${t('chatLoadingMessages')}</div>
      </div>
      <div class="chat-input-bar">
        <input type="text" placeholder="${t('chatPlaceholder')}" onkeydown="if(event.key==='Enter'){event.preventDefault();onSendChatMessage('${therapistId}');}">
        <button class="chat-send-btn" onclick="onSendChatMessage('${therapistId}')">➤</button>
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

  if (result.source === 'supabase') {
    const allMessages = [...result.messages, ...localMsgs];
    allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    container.innerHTML = allMessages.map(m => _renderChatBubble(m)).join('');
  } else {
    // Mock messages + any local messages appended
    const mockHtml = result.messages.map(m => _renderChatBubble(m)).join('');
    const localHtml = localMsgs.map(m => _renderChatBubble(m)).join('');
    container.innerHTML = mockHtml + localHtml;
  }

  _scrollChatToBottom();

  // Mark unread messages as read
  _markMessagesAsRead(therapistId);

  // Subscribe to real-time updates
  window._chatSubscription = _subscribeToChatMessages(therapistId);
}

// ===== Video Call =====
function renderVideoCall(el, header, therapistId) {
  const th = getTherapist(therapistId);
  if (!th) { navigate('#/search'); return; }

  const name = getLocalizedText(th.name);
  header.innerHTML = '';

  el.innerHTML = `
    <div class="videocall-screen">
      <div class="videocall-remote">
        <div class="videocall-remote-placeholder">
          <div class="avatar-large" style="background-color:${th.avatarColor}">${name.charAt(0)}</div>
          <p>${name}</p>
          <p class="call-status">${t('videoConnecting')}</p>
        </div>
      </div>
      <div class="videocall-self">${t('videoSelfView')}</div>
      <div class="videocall-controls">
        <button class="vc-btn vc-mute" onclick="toggleVCBtn(this)">🎤<br><span>${t('videoMute')}</span></button>
        <button class="vc-btn vc-camera" onclick="toggleVCBtn(this)">📷<br><span>${t('videoCamera')}</span></button>
        <button class="vc-btn vc-end" onclick="navigate('#/chat/${therapistId}')">📞<br><span>${t('videoEnd')}</span></button>
        <button class="vc-btn vc-blur" onclick="toggleVCBtn(this)">🌫️<br><span>${t('videoBlur')}</span></button>
      </div>
    </div>
  `;
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
        <button class="btn-primary" onclick="onSubmitReview(${therapistId})">${t('reviewSubmit')}</button>
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
          <span><span class="menu-icon">📅</span>${t('dashboardSchedule')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/sessions')">
          <span><span class="menu-icon">🗂️</span>${t('dashboardSessions')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/clients')">
          <span><span class="menu-icon">👥</span>${t('dashboardClients')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/earnings')">
          <span><span class="menu-icon">💰</span>${t('dashboardEarningsMenu')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/profile-edit')">
          <span><span class="menu-icon">✏️</span>${t('dashboardProfileEdit')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
        <div class="dashboard-menu-item" onclick="navigate('#/therapist-dashboard/referrals')">
          <span><span class="menu-icon">🔗</span>${t('dashboardReferrals')}</span>
          <span class="arrow">${icons.chevron}</span>
        </div>
      </div>

      <div class="mt-20">
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
  const session = th.sessions.find(s => s.id === parseInt(sessionId));
  if (!session) { navigate('#/therapist-dashboard/sessions'); return; }

  const name = getLocalizedText(session.name);
  const desc = getLocalizedText(session.description);

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
          <div class="client-avatar-sm">👤</div>
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
          <div class="profile-avatar" style="background-color:${th.avatarColor};width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:white">${name.charAt(0)}</div>
          <button class="photo-upload-btn">${t('applyUpload')}</button>
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
          <input type="text" value="${location}">
        </div>
        <button class="btn-primary" onclick="navigate('#/therapist-dashboard')">${t('profileEditSave')}</button>
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
        <div class="landing-logo">🌿</div>
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
      ${favTherapists.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">🤍</div><p>${t('favoritesEmpty')}</p></div>` : ''}
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
        <div class="gift-card-icon">🎁</div>
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
        <button class="btn-primary" onclick="navigate('#/gift-card/success')">${t('giftCardSend')}</button>
      </div>
    </div>
  `;
}

function selectGiftAmount(btn) {
  document.querySelectorAll('.gift-amount-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function renderGiftCardSuccess(el, header) {
  renderHeaderSimple(header, t('appName'));
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">🎁</div>
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

function renderBlogDetail(el, header, blogId) {
  const article = blogArticles.find(a => a.id === blogId);
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
      ${digitalProducts.map(p => {
        const th = getTherapist(p.therapistId);
        return `
          <div class="digital-product-card">
            <div class="dp-icon">${p.type === 'pdf' ? '📄' : p.type === 'video' ? '🎬' : '🎵'}</div>
            <div class="dp-info">
              <h3>${getLocalizedText(p.name)}</h3>
              <p>${getLocalizedText(p.description)}</p>
              ${th ? `<span class="dp-author">${getLocalizedText(th.name)}</span>` : ''}
              <span class="dp-price">¥${p.price.toLocaleString()}</span>
            </div>
            <button class="btn-small" onclick="alert('${t('digitalProductBuy')}!')">${t('digitalProductBuy')}</button>
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
      ${journalEntries.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">📓</div><p>${t('journalEmpty')}</p></div>` : ''}
      ${journalEntries.map((e, i) => `
        <div class="journal-entry">
          <div class="journal-entry-header">
            <span class="journal-mood">${e.moodEmoji}</span>
            <span class="journal-date">${e.date}</span>
          </div>
          <p class="journal-notes">${e.notes}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderJournalNew(el, header) {
  renderHeaderWithBack(header, t('journalNew'), '#/journal');
  const moods = [
    { key: 'great', emoji: '😊', label: t('journalMoodGreat') },
    { key: 'good', emoji: '🙂', label: t('journalMoodGood') },
    { key: 'okay', emoji: '😐', label: t('journalMoodOkay') },
    { key: 'low', emoji: '😔', label: t('journalMoodLow') },
    { key: 'bad', emoji: '😢', label: t('journalMoodBad') },
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
function renderNotifications(el, header) {
  renderHeaderWithBack(header, t('notificationTitle'), '#/profile');
  const notifications = [];
  // Generate mock notifications from booking data
  if (authState.isLoggedIn) {
    mockBookingHistory.filter(b => b.status === 'upcoming').forEach(b => {
      notifications.push({
        icon: '📅',
        text: `${t('reminderTitle')}: ${getLocalizedText(b.sessionName)} - ${b.date} ${b.time}`,
        date: b.date,
      });
    });
    if (waitlistIds.length > 0) {
      waitlistIds.forEach(id => {
        const th = getTherapist(id);
        if (th) notifications.push({ icon: '🔔', text: `${t('waitlistJoined')}: ${getLocalizedText(th.name)}`, date: '' });
      });
    }
  }
  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('notificationTitle')}</h1>
      ${notifications.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">🔔</div><p>${t('notificationEmpty')}</p></div>` : ''}
      ${notifications.map(n => `
        <div class="notification-item">
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
      ${retreats.map(r => `
        <div class="retreat-card" onclick="navigate('#/retreats/${r.id}')">
          <div class="retreat-card-header">
            <div class="retreat-card-icon">🏕️</div>
            <div class="retreat-card-info">
              <h3>${getLocalizedText(r.title)}</h3>
              <p class="retreat-location">📍 ${getLocalizedText(r.location)}</p>
            </div>
          </div>
          <p class="retreat-card-desc">${getLocalizedText(r.description)}</p>
          <div class="retreat-card-meta">
            <span class="retreat-duration">📅 ${r.duration}${t('retreatDays')}</span>
            <span class="retreat-price">¥${r.price.toLocaleString()}</span>
          </div>
          <div class="retreat-tags">${r.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderRetreatDetail(el, header, id) {
  const retreat = retreats.find(r => r.id === parseInt(id));
  if (!retreat) { navigate('#/retreats'); return; }
  renderHeaderWithBack(header, getLocalizedText(retreat.title), '#/retreats');
  const includes = getLocalizedText(retreat.includes);
  el.innerHTML = `
    <div class="page">
      <div class="retreat-detail-hero">
        <div class="retreat-hero-icon">🏕️</div>
        <h1 class="page-title">${getLocalizedText(retreat.title)}</h1>
        <p class="retreat-location-lg">📍 ${getLocalizedText(retreat.location)}</p>
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
      <button class="btn-primary mt-16" onclick="requireAuth('book-retreat', () => { showToast(t('retreatBookNow') + '!'); })">${t('retreatBookNow')}</button>
    </div>
  `;
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
      ${allThreads.length === 0 ? `<div class="empty-state-box"><div class="empty-state-icon">💬</div><p>${t('forumEmpty')}</p></div>` : ''}
      ${allThreads.map(thread => {
        const replyCount = (thread.replies ? thread.replies.length : 0) + ((forumReplyData[thread.id] || []).length);
        return `
          <div class="forum-thread-card" onclick="navigate('#/forum/${thread.id}')">
            <h3 class="forum-thread-title">${getLocalizedText(thread.title)}</h3>
            <p class="forum-thread-preview">${getLocalizedText(thread.body).slice(0, 80)}...</p>
            <div class="forum-thread-meta">
              <span class="forum-author">${t('forumPostedBy')}: ${getLocalizedText(thread.author)}</span>
              <span class="forum-date">${thread.date}</span>
              <span class="forum-reply-count">💬 ${replyCount} ${t('forumReplies')}</span>
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
        <h1 class="forum-detail-title">${getLocalizedText(thread.title)}</h1>
        <div class="forum-detail-meta">
          <span>${t('forumPostedBy')}: ${getLocalizedText(thread.author)}</span>
          <span>${thread.date}</span>
        </div>
        <div class="forum-detail-body">${getLocalizedText(thread.body)}</div>
      </div>
      <div class="forum-replies-section">
        <h2>${allReplies.length} ${t('forumReplies')}</h2>
        ${allReplies.map(r => `
          <div class="forum-reply">
            <div class="forum-reply-header">
              <span class="forum-reply-author">${getLocalizedText(r.author)}</span>
              <span class="forum-reply-date">${r.date}</span>
            </div>
            <p class="forum-reply-text">${getLocalizedText(r.text)}</p>
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

// ===== Init =====
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
  await Promise.all([
    initSupabaseAuth(),
    loadSupabaseData(),
  ]);
  await loadUserData();
  router();
});
