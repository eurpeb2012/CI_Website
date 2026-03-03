// ===== State =====
let state = {
  feeling: null,
  category: null,
  delivery: null,
  bookingSession: null,
  bookingTherapist: null,
};

// ===== Icons (inline SVG) =====
const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
};

// ===== Router =====
function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1); // remove #
}

function router() {
  const route = getRoute();
  const content = document.getElementById('content');
  const header = document.getElementById('header');

  // Parse route
  if (route === '/') {
    renderLanding(content, header);
    setActiveNav('home');
  } else if (route === '/search') {
    renderSearchEntry(content, header);
    setActiveNav('search');
  } else if (route === '/search/feeling') {
    renderFeelingStep1(content, header);
    setActiveNav('search');
  } else if (route === '/search/feeling/category') {
    renderFeelingStep2(content, header);
    setActiveNav('search');
  } else if (route === '/search/feeling/delivery') {
    renderFeelingStep3(content, header);
    setActiveNav('search');
  } else if (route === '/search/feeling/results') {
    renderResults(content, header, { category: state.category, delivery: state.delivery });
    setActiveNav('search');
  } else if (route === '/search/criteria') {
    renderCriteria(content, header);
    setActiveNav('search');
  } else if (route === '/search/criteria/results') {
    renderResults(content, header, state.criteriaFilters || {});
    setActiveNav('search');
  } else if (route.startsWith('/therapist/')) {
    const id = route.split('/')[2];
    renderTherapistProfile(content, header, id);
    setActiveNav('search');
  } else if (route === '/booking') {
    renderBooking(content, header);
    setActiveNav('search');
  } else if (route === '/booking/success') {
    renderBookingSuccess(content, header);
    setActiveNav('search');
  } else if (route === '/apply') {
    renderApply(content, header);
    setActiveNav('home');
  } else if (route === '/apply/success') {
    renderApplySuccess(content, header);
    setActiveNav('home');
  } else if (route === '/profile') {
    renderUserProfile(content, header);
    setActiveNav('profile');
  } else {
    renderLanding(content, header);
    setActiveNav('home');
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

function setActiveNav(tab) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
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
  updateNavLabels();
  router(); // re-render
}

function updateNavLabels() {
  document.querySelectorAll('.bottom-nav [data-t]').forEach(el => {
    el.textContent = t(el.dataset.t);
  });
}

// ===== Screen Renderers =====

function renderLanding(el, header) {
  renderHeaderSimple(header, t('appName'));
  el.innerHTML = `
    <div class="landing">
      <div class="landing-logo">🌿</div>
      <h1 class="landing-title">${t('landingTitle')}</h1>
      <p class="landing-subtitle">${t('landingSubtitle')}</p>
      <p class="landing-tagline">${t('landingTagline')}</p>
      <button class="btn-primary" onclick="navigate('#/search')">${t('landingCTA')}</button>
      <button class="btn-secondary" onclick="navigate('#/apply')">${t('landingSecondary')}</button>
    </div>
  `;
}

function renderSearchEntry(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/');
  el.innerHTML = `
    <div class="page search-entry">
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

// Feeling Flow Step 1: How are you feeling?
function renderFeelingStep1(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search');
  const feelings = [
    { key: 'stressed', label: t('feelingStressed') },
    { key: 'low-energy', label: t('feelingLowEnergy') },
    { key: 'anxious', label: t('feelingAnxious') },
    { key: 'lonely', label: t('feelingLonely') },
    { key: 'overwhelmed', label: t('feelingOverwhelmed') },
    { key: 'curious', label: t('feelingCurious') },
  ];

  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('feelingTitle')}</h1>
      <div class="feeling-options">
        ${feelings.map(f => `
          <button class="feeling-btn" onclick="state.feeling='${f.key}'; navigate('#/search/feeling/category')">
            ${f.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// Feeling Flow Step 2: Category
function renderFeelingStep2(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search/feeling');
  const categories = [
    { key: 'physical', icon: '💆', label: t('categoryPhysical'), desc: t('categoryPhysicalDesc') },
    { key: 'mental', icon: '🧘', label: t('categoryMental'), desc: t('categoryMentalDesc') },
    { key: 'playful', icon: '🔮', label: t('categoryPlayful'), desc: t('categoryPlayfulDesc') },
    { key: 'pro', icon: '👨‍⚕️', label: t('categoryPro'), desc: t('categoryProDesc') },
  ];

  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot"></div>
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('categoryTitle')}</h1>
      <div class="category-cards">
        ${categories.map(c => `
          <div class="category-card" onclick="state.category='${c.key}'; navigate('#/search/feeling/delivery')">
            <div class="category-icon">${c.icon}</div>
            <div>
              <h3>${c.label}</h3>
              <p>${c.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Feeling Flow Step 3: Delivery
function renderFeelingStep3(el, header) {
  renderHeaderWithBack(header, t('navSearch'), '#/search/feeling/category');
  const deliveries = [
    { key: 'in-person', icon: '🤝', label: t('deliveryInPerson'), desc: t('deliveryInPersonDesc') },
    { key: 'video', icon: '💻', label: t('deliveryVideo'), desc: t('deliveryVideoDesc') },
    { key: 'email', icon: '✉️', label: t('deliveryEmail'), desc: t('deliveryEmailDesc') },
  ];

  el.innerHTML = `
    <div class="page">
      <div class="step-indicator">
        <div class="step-dot"></div>
        <div class="step-dot"></div>
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
      </div>
      <h1 class="page-title">${t('deliveryTitle')}</h1>
      <div class="delivery-options">
        ${deliveries.map(d => `
          <button class="delivery-btn" onclick="state.delivery='${d.key}'; navigate('#/search/feeling/results')">
            <div class="delivery-icon">${d.icon}</div>
            <div>
              <h3>${d.label}</h3>
              <p>${d.desc}</p>
            </div>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// Results (shared between feeling and criteria flows)
function renderResults(el, header, filters) {
  const isFeeling = getRoute().includes('feeling');
  const backRoute = isFeeling ? '#/search/feeling/delivery' : '#/search/criteria';
  renderHeaderWithBack(header, t('resultsTitle'), backRoute);

  const results = searchTherapists(filters);
  const lang = getLang();

  let stepIndicator = '';
  if (isFeeling) {
    stepIndicator = `
      <div class="step-indicator">
        <div class="step-dot"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
        <div class="step-dot active"></div>
      </div>
    `;
  }

  el.innerHTML = `
    <div class="page">
      ${stepIndicator}
      <h1 class="page-title">${t('resultsTitle')}</h1>
      ${results.length === 0 ? `<div class="results-empty">${t('resultsEmpty')}</div>` : ''}
      ${results.map(th => {
        const name = getLocalizedText(th.name);
        const location = getLocalizedText(th.location);
        const minPrice = Math.min(...th.sessions.map(s => s.price));
        const initial = name.charAt(0);
        return `
          <div class="therapist-card" onclick="navigate('#/therapist/${th.id}')">
            <div class="therapist-avatar" style="background-color: ${th.avatarColor}">${initial}</div>
            <div class="therapist-card-info">
              <h3>${name}</h3>
              <div class="username">${th.username}</div>
              <div class="location">${location}</div>
              <div class="price">¥${minPrice.toLocaleString()} ${t('resultsFrom')}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Criteria Search
function renderCriteria(el, header) {
  renderHeaderWithBack(header, t('criteriaTitle'), '#/search');
  const lang = getLang();

  const typeOptions = [
    { value: '', label: t('criteriaTypeAll') },
    { value: 'physical', label: t('categoryPhysical') },
    { value: 'mental', label: t('categoryMental') },
    { value: 'playful', label: t('categoryPlayful') },
    { value: 'pro', label: t('categoryPro') },
  ];

  const locationOptions = [
    { value: '', label: t('criteriaLocationAll') },
    { value: 'in-person', label: t('deliveryInPerson') },
    { value: 'video', label: t('deliveryVideo') },
    { value: 'email', label: t('deliveryEmail') },
  ];

  const priceOptions = [
    { value: '', label: t('criteriaPriceAll') },
    { value: '3000', label: '〜¥3,000' },
    { value: '5000', label: '〜¥5,000' },
    { value: '8000', label: '〜¥8,000' },
    { value: '10000', label: '〜¥10,000' },
  ];

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('criteriaTitle')}</h1>
      <div class="criteria-form">
        <div class="form-group">
          <label>${t('criteriaType')}</label>
          <select id="criteria-type">
            ${typeOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>${t('criteriaLocation')}</label>
          <select id="criteria-delivery">
            ${locationOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>${t('criteriaPrice')}</label>
          <select id="criteria-price">
            ${priceOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
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
  renderHeaderWithBack(header, name, window.history.length > 1 ? 'javascript:history.back()' : '#/search');
  // Override back button for history
  header.querySelector('.header-back').onclick = () => history.back();

  const intro = getLocalizedText(th.intro);
  const location = getLocalizedText(th.location);
  const initial = name.charAt(0);
  const lang = getLang();

  // Calendar mockup for current month
  const calendarHtml = renderCalendar(th.availability);

  const deliveryLabels = {
    'in-person': t('deliveryInPerson'),
    'video': t('deliveryVideo'),
    'email': t('deliveryEmail'),
  };

  el.innerHTML = `
    <div class="page">
      <div class="profile-header">
        <div class="profile-avatar" style="background-color: ${th.avatarColor}">${initial}</div>
        <h1 class="profile-name">${name}</h1>
        <p class="profile-username">${th.username}</p>
        <p class="profile-location-text">${location}</p>
      </div>

      <div class="profile-section">
        <h2>${t('profileIntro')}</h2>
        <p class="profile-intro-text">${intro}</p>
      </div>

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

      <div class="profile-section">
        <h2>${t('profileAvailability')}</h2>
        ${calendarHtml}
      </div>

      <div class="profile-section">
        <h2>${t('profileReviews')} (${th.reviews.length})</h2>
        ${th.reviews.map(r => `
          <div class="review-card">
            <div class="review-header">
              <span class="review-author">${getLocalizedText(r.author)}</span>
              <span class="review-date">${r.date}</span>
            </div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <p class="review-text">${getLocalizedText(r.text)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCalendar(availability) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayKeys = ['calSun', 'calMon', 'calTue', 'calWed', 'calThu', 'calFri', 'calSat'];
  const availDays = new Set(availability.map(a => a.day));

  let html = '<div class="calendar-grid">';

  // Headers
  dayKeys.forEach(k => {
    html += `<div class="cal-header">${t(k)}</div>`;
  });

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="cal-day empty"></div>';
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = new Date(year, month, d).getDay();
    const isAvail = availDays.has(dayOfWeek);
    html += `<div class="cal-day${isAvail ? ' available' : ''}">${d}</div>`;
  }

  html += '</div>';
  return html;
}

function onBookSession(therapistId, sessionId) {
  const th = getTherapist(therapistId);
  const session = th.sessions.find(s => s.id === sessionId);
  state.bookingTherapist = th;
  state.bookingSession = session;
  navigate('#/booking');
}

// Booking
function renderBooking(el, header) {
  renderHeaderWithBack(header, t('bookingTitle'), 'javascript:history.back()');
  header.querySelector('.header-back').onclick = () => history.back();

  const th = state.bookingTherapist;
  const session = state.bookingSession;
  if (!th || !session) { navigate('#/'); return; }

  const name = getLocalizedText(th.name);
  const sessionName = getLocalizedText(session.name);

  // Pick a mock date
  const mockDate = new Date();
  mockDate.setDate(mockDate.getDate() + 7);
  const dateStr = mockDate.toLocaleDateString(getLang() === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  }) + ' 14:00';

  el.innerHTML = `
    <div class="page">
      <h1 class="page-title">${t('bookingTitle')}</h1>
      <div class="booking-summary">
        <div class="booking-row">
          <span class="booking-label">${t('bookingSession')}</span>
          <span class="booking-value">${sessionName}</span>
        </div>
        <div class="booking-row">
          <span class="booking-label">${t('bookingTherapist')}</span>
          <span class="booking-value">${name}</span>
        </div>
        <div class="booking-row">
          <span class="booking-label">${t('bookingDate')}</span>
          <span class="booking-value">${dateStr}</span>
        </div>
        <div class="booking-row">
          <span class="booking-label">${t('bookingPrice')}</span>
          <span class="booking-value">¥${session.price.toLocaleString()}</span>
        </div>
      </div>

      <div class="cancel-policy">
        <h3>${t('bookingCancelPolicy')}</h3>
        <ul>
          <li>${t('bookingCancel2w')}</li>
          <li>${t('bookingCancel1w')}</li>
          <li>${t('bookingCancel3d')}</li>
          <li>${t('bookingCancelSame')}</li>
        </ul>
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="agree-check" onchange="document.getElementById('confirm-btn').disabled = !this.checked">
        <label for="agree-check">${t('bookingAgree')}</label>
      </div>

      <button id="confirm-btn" class="btn-primary" disabled onclick="navigate('#/booking/success')">${t('bookingConfirm')}</button>
    </div>
  `;
}

function renderBookingSuccess(el, header) {
  renderHeaderSimple(header, t('appName'));
  el.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">✓</div>
      <h2>${t('bookingSuccess')}</h2>
      <p>${t('bookingSuccessMsg')}</p>
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
            <div class="plan-card selected" onclick="selectPlan(this)">
              <h3>${t('applyPlanFree')}</h3>
              <p>${t('applyPlanFreeDesc')}</p>
            </div>
            <div class="plan-card" onclick="selectPlan(this)">
              <h3>${t('applyPlanPaid')}</h3>
              <p>${t('applyPlanPaidDesc')}</p>
              <div class="plan-price">${t('applyPlanPaidPrice')}</div>
            </div>
          </div>
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

  el.innerHTML = `
    <div class="page">
      <div class="user-profile-header">
        <div class="user-avatar">👤</div>
        <div class="user-info">
          <h2>${t('userProfileAnon')}</h2>
          <p>${t('userProfileId')}: #USR-29481</p>
        </div>
      </div>

      <div class="profile-section">
        <h2>${t('userProfileHistory')}</h2>
        <div class="empty-state">${t('userProfileNoHistory')}</div>
      </div>

      <div class="profile-section">
        <h2>${t('userProfileReviews')}</h2>
        <div class="empty-state">${t('userProfileNoReviews')}</div>
      </div>

      <div class="profile-menu-item" onclick="void(0)">
        <span>${t('userProfileSettings')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
      <div class="profile-menu-item" onclick="void(0)">
        <span>${t('userProfileLogout')}</span>
        <span class="arrow">${icons.chevron}</span>
      </div>
    </div>
  `;
}

// ===== Init =====
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  // Set initial hash if none
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
  router();
});
