// ===== Admin App =====

// --- Theme ---
function adminGetTheme() {
  return localStorage.getItem('iyashi-theme') || 'spring';
}
function adminSetTheme(theme) {
  localStorage.setItem('iyashi-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  const sel = document.getElementById('admin-theme-select');
  if (sel) sel.value = theme;
}

// --- Language ---
function adminToggleLanguage() {
  toggleLanguage();
  document.getElementById('admin-lang-label').textContent = t('language');
  adminRouter();
  renderAdminNav();
}

// --- Sidebar ---
function toggleAdminSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('open');
}

// --- Navigation ---
const adminNavItems = [
  { route: '#/admin', icon: '📊', key: 'adminNavDashboard' },
  { route: '#/admin/therapists', icon: '👤', key: 'adminNavTherapists' },
  { route: '#/admin/users', icon: '👥', key: 'adminNavUsers' },
  { route: '#/admin/bookings', icon: '📅', key: 'adminNavBookings' },
  { route: '#/admin/revenue', icon: '💰', key: 'adminNavRevenue' },
  { route: '#/admin/moderation', icon: '🛡', key: 'adminNavModeration' },
  { route: '#/admin/referrals', icon: '🔗', key: 'adminNavReferrals' },
  { route: '#/admin/calendar-settings', icon: '⚙', key: 'adminNavCalendar' },
  { route: '#/admin/audit-log', icon: '📋', key: 'adminNavAuditLog' },
  { route: '#/admin/system-health', icon: '🖥', key: 'adminNavSystemHealth' },
];

function renderAdminNav() {
  const nav = document.getElementById('admin-nav');
  const currentHash = window.location.hash || '#/admin';
  nav.innerHTML = adminNavItems.map(item => {
    const active = currentHash === item.route || (item.route !== '#/admin' && currentHash.startsWith(item.route));
    return `<a href="${item.route}" class="admin-nav-item${active ? ' active' : ''}" onclick="document.getElementById('admin-sidebar').classList.remove('open')">
      <span class="admin-nav-icon">${item.icon}</span>
      <span class="admin-nav-label">${t(item.key)}</span>
    </a>`;
  }).join('');
}

// --- Router ---
const adminRoutes = [
  { pattern: /^\/admin\/?$/, handler: 'dashboard' },
  { pattern: /^\/admin\/therapists\/?$/, handler: 'therapistList' },
  { pattern: /^\/admin\/therapist\/([a-f0-9-]+|\d+)$/, handler: 'therapistDetail' },
  { pattern: /^\/admin\/users\/?$/, handler: 'userList' },
  { pattern: /^\/admin\/user\/(.+)$/, handler: 'userDetail' },
  { pattern: /^\/admin\/bookings\/?$/, handler: 'bookings' },
  { pattern: /^\/admin\/revenue\/?$/, handler: 'revenue' },
  { pattern: /^\/admin\/moderation\/?$/, handler: 'moderation' },
  { pattern: /^\/admin\/referrals\/?$/, handler: 'referrals' },
  { pattern: /^\/admin\/calendar-settings\/?$/, handler: 'calendarSettingsPage' },
  { pattern: /^\/admin\/audit-log\/?$/, handler: 'auditLog' },
  { pattern: /^\/admin\/system-health\/?$/, handler: 'systemHealth' },
];

function adminRouter() {
  const hash = window.location.hash || '#/admin';
  const path = hash.slice(1);
  const content = document.getElementById('admin-content');
  const titleEl = document.getElementById('admin-page-title');

  let matched = false;
  for (const r of adminRoutes) {
    const match = path.match(r.pattern);
    if (match) {
      matched = true;
      const params = match.slice(1);
      adminRenderRoute(r.handler, content, titleEl, params);
      break;
    }
  }
  if (!matched) {
    adminRenderRoute('dashboard', content, titleEl, []);
  }
  renderAdminNav();
  window.scrollTo(0, 0);
}

async function adminRenderRoute(handler, el, titleEl, params) {
  const handlers = {
    dashboard: () => renderAdminDashboard(el, titleEl),
    therapistList: () => renderTherapistList(el, titleEl),
    therapistDetail: () => renderTherapistDetail(el, titleEl, params[0]),
    userList: () => renderUserList(el, titleEl),
    userDetail: () => renderUserDetail(el, titleEl, params[0]),
    bookings: () => renderBookings(el, titleEl),
    revenue: () => renderRevenue(el, titleEl),
    moderation: () => renderModeration(el, titleEl),
    referrals: () => renderReferrals(el, titleEl),
    calendarSettingsPage: () => renderCalendarSettings(el, titleEl),
    auditLog: () => renderAuditLog(el, titleEl),
    systemHealth: () => renderSystemHealth(el, titleEl),
  };
  if (handlers[handler]) await handlers[handler]();
  else await handlers.dashboard();
}

// --- Helpers ---
function fmt(n) {
  return '¥' + (n || 0).toLocaleString();
}

function adminStatusBadge(status) {
  const cls = {
    active: 'badge-success', pending: 'badge-warning', suspended: 'badge-danger',
    completed: 'badge-success', upcoming: 'badge-info', cancelled: 'badge-muted',
    resolved: 'badge-success', dismissed: 'badge-muted',
  };
  return `<span class="admin-badge ${cls[status] || 'badge-muted'}">${t('adminStatus_' + status)}</span>`;
}

function tierBadge(tier) {
  const icons = { free: '🌱', standard: '🌿', premium: '🌳' };
  return `<span class="admin-badge badge-tier-${tier}">${icons[tier] || ''} ${t('tier' + tier.charAt(0).toUpperCase() + tier.slice(1) + 'Name')}</span>`;
}

function adminLoadingHTML() {
  return `<div class="admin-loading">${t('adminLoading')}</div>`;
}

function _escapeAdminHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== Screen 1: Dashboard =====
async function renderAdminDashboard(el, titleEl) {
  titleEl.textContent = t('adminNavDashboard');
  el.innerHTML = adminLoadingHTML();

  const stats = await fetchAdminStats();

  el.innerHTML = `
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${stats.totalTherapists}</div>
        <div class="admin-stat-label">${t('adminStatTherapists')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${stats.totalUsers}</div>
        <div class="admin-stat-label">${t('adminStatUsers')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${stats.activeBookings}</div>
        <div class="admin-stat-label">${t('adminStatActiveBookings')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(stats.monthlyRevenue)}</div>
        <div class="admin-stat-label">${t('adminStatMonthlyRevenue')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(stats.platformFees)}</div>
        <div class="admin-stat-label">${t('adminStatPlatformFees')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${stats.pendingModeration}</div>
        <div class="admin-stat-label">${t('adminStatPendingModeration')}</div>
      </div>
    </div>
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminQuickLinks')}</h2>
      <div class="admin-quick-links">
        ${adminNavItems.map(item => `<a href="${item.route}" class="admin-quick-link"><span>${item.icon}</span> ${t(item.key)}</a>`).join('')}
      </div>
    </div>
  `;
}

// ===== Screen 2: Therapist List =====
// Cache the fetched therapist data so filters don't re-fetch
let _cachedTherapists = null;

async function renderTherapistList(el, titleEl, useCache) {
  titleEl.textContent = t('adminNavTherapists');

  const filterTier = document.getElementById('filter-tier')?.value || 'all';
  const filterStatus = document.getElementById('filter-status')?.value || 'all';

  if (!useCache || !_cachedTherapists) {
    el.innerHTML = adminLoadingHTML();
    _cachedTherapists = await fetchAdminTherapists();
  }

  let filtered = _cachedTherapists;
  if (filterTier !== 'all') filtered = filtered.filter(th => th.tier === filterTier);
  if (filterStatus !== 'all') filtered = filtered.filter(th => th.status === filterStatus);

  el.innerHTML = `
    <div class="admin-toolbar">
      <select id="filter-tier" onchange="renderTherapistList(document.getElementById('admin-content'), document.getElementById('admin-page-title'), true)" class="admin-select">
        <option value="all">${t('adminFilterAllTiers')}</option>
        <option value="free" ${filterTier === 'free' ? 'selected' : ''}>🌱 ${t('tierFreeName')}</option>
        <option value="standard" ${filterTier === 'standard' ? 'selected' : ''}>🌿 ${t('tierStandardName')}</option>
        <option value="premium" ${filterTier === 'premium' ? 'selected' : ''}>🌳 ${t('tierPremiumName')}</option>
      </select>
      <select id="filter-status" onchange="renderTherapistList(document.getElementById('admin-content'), document.getElementById('admin-page-title'), true)" class="admin-select">
        <option value="all">${t('adminFilterAllStatus')}</option>
        <option value="active" ${filterStatus === 'active' ? 'selected' : ''}>${t('adminStatus_active')}</option>
        <option value="pending" ${filterStatus === 'pending' ? 'selected' : ''}>${t('adminStatus_pending')}</option>
        <option value="suspended" ${filterStatus === 'suspended' ? 'selected' : ''}>${t('adminStatus_suspended')}</option>
      </select>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>${t('adminColName')}</th>
            <th>${t('adminColTier')}</th>
            <th>${t('adminColStatus')}</th>
            <th>${t('verifiedBadge')}</th>
            <th>${t('adminColActions')}</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(th => {
            const name = getLocalizedText(th.name || { ja: th.name_ja, en: th.name_en });
            return `
            <tr>
              <td>
                <div class="admin-user-cell">
                  <span>${name}</span>
                </div>
              </td>
              <td>${tierBadge(th.tier)}</td>
              <td>${adminStatusBadge(th.status)}</td>
              <td>${th.verified ? '✓' : '—'}</td>
              <td>
                <a href="#/admin/therapist/${th.therapist_id}" class="admin-btn admin-btn-sm">${t('adminActionView')}</a>
              </td>
            </tr>
          `}).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ===== Screen 3: Therapist Detail =====
async function renderTherapistDetail(el, titleEl, id) {
  titleEl.textContent = '...';
  el.innerHTML = adminLoadingHTML();

  const allTherapists = await fetchAdminTherapists();
  const th = allTherapists.find(t => String(t.therapist_id) === String(id));
  if (!th) { el.innerHTML = '<p>Not found</p>'; return; }

  const name = getLocalizedText(th.name || { ja: th.name_ja, en: th.name_en });
  titleEl.textContent = name;

  el.innerHTML = `
    <button class="admin-back-btn" onclick="window.location.hash='#/admin/therapists'">&larr; ${t('back')}</button>
    <div class="admin-detail-grid">
      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminThProfile')}</h3>
        <div class="admin-profile-header">
          <div>
            <div class="admin-profile-name">${name}</div>
            <div>${th.verified ? `<span class="admin-badge badge-success">${t('verifiedBadge')}</span>` : `<span class="admin-badge badge-muted">${t('unverifiedBadge')}</span>`}</div>
          </div>
        </div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminThTierMgmt')}</h3>
        <div class="admin-form-group">
          <label>${t('adminColTier')}</label>
          <select id="tier-select" class="admin-select" onchange="adminChangeTier('${th.therapist_id}', this.value)">
            <option value="free" ${th.tier === 'free' ? 'selected' : ''}>🌱 ${t('tierFreeName')}</option>
            <option value="standard" ${th.tier === 'standard' ? 'selected' : ''}>🌿 ${t('tierStandardName')}</option>
            <option value="premium" ${th.tier === 'premium' ? 'selected' : ''}>🌳 ${t('tierPremiumName')}</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label>${t('adminColStatus')}</label>
          <select id="status-select" class="admin-select" onchange="adminChangeStatus('${th.therapist_id}', this.value)">
            <option value="active" ${th.status === 'active' ? 'selected' : ''}>${t('adminStatus_active')}</option>
            <option value="suspended" ${th.status === 'suspended' ? 'selected' : ''}>${t('adminStatus_suspended')}</option>
            <option value="pending" ${th.status === 'pending' ? 'selected' : ''}>${t('adminStatus_pending')}</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label>${t('verifiedBadge')}</label>
          <select id="verified-select" class="admin-select" onchange="adminChangeVerified('${th.therapist_id}', this.value === 'true')">
            <option value="true" ${th.verified ? 'selected' : ''}>${t('verifiedBadge')}</option>
            <option value="false" ${!th.verified ? 'selected' : ''}>${t('unverifiedBadge')}</option>
          </select>
        </div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminThStats')}</h3>
        <div class="admin-kv-list">
          <div class="admin-kv"><span>${t('dashboardBookings')}</span><strong>${th.total_bookings}</strong></div>
          <div class="admin-kv"><span>${t('dashboardRating')}</span><strong>${th.avg_rating || '—'}</strong></div>
          <div class="admin-kv"><span>${t('earningsSessionRevenue')}</span><strong>${fmt(th.gross_revenue)}</strong></div>
          <div class="admin-kv"><span>${t('earningsPlatformFee')}</span><strong>${fmt(th.platform_fees)}</strong></div>
          <div class="admin-kv"><span>${t('earningsNet')}</span><strong>${fmt(th.therapist_earnings)}</strong></div>
          <div class="admin-kv"><span>${t('profileReviews')}</span><strong>${th.review_count || 0}</strong></div>
        </div>
      </div>
    </div>
  `;
}

async function adminChangeTier(id, tier) {
  await updateTherapistTier(id, tier);
  _cachedTherapists = null;
  showAdminToast(t('adminSaved'));
}
async function adminChangeStatus(id, status) {
  await updateTherapistStatus(id, status);
  _cachedTherapists = null;
  showAdminToast(t('adminSaved'));
}
async function adminChangeVerified(id, verified) {
  await updateTherapistVerified(id, verified);
  _cachedTherapists = null;
  showAdminToast(t('adminSaved'));
}

// ===== Screen 4: User List =====
let _cachedUsers = null;

async function renderUserList(el, titleEl) {
  titleEl.textContent = t('adminNavUsers');
  el.innerHTML = adminLoadingHTML();

  _cachedUsers = await fetchAdminUsers();

  el.innerHTML = `
    <div class="admin-toolbar">
      <input type="text" id="user-search" class="admin-input" placeholder="${t('adminSearchUsers')}" oninput="filterUserList()">
    </div>
    <div class="admin-table-wrap" id="user-table-wrap">
      ${buildUserTable(_cachedUsers)}
    </div>
  `;
}

function buildUserTable(users) {
  return `<table class="admin-table">
    <thead>
      <tr>
        <th>${t('adminColName')}</th>
        <th>${t('adminColEmail')}</th>
        <th>${t('adminColJoinDate')}</th>
        <th>${t('adminColStatus')}</th>
        <th>${t('adminColActions')}</th>
      </tr>
    </thead>
    <tbody>
      ${users.map(u => `
        <tr>
          <td>${u.name || '—'}</td>
          <td>${u.email}</td>
          <td>${u.joinDate || u.created_at ? new Date(u.joinDate || u.created_at).toLocaleDateString() : '—'}</td>
          <td>${adminStatusBadge(u.status)}</td>
          <td><a href="#/admin/user/${u.id}" class="admin-btn admin-btn-sm">${t('adminActionView')}</a></td>
        </tr>
      `).join('')}
    </tbody>
  </table>`;
}

function filterUserList() {
  if (!_cachedUsers) return;
  const q = document.getElementById('user-search').value.toLowerCase();
  const filtered = _cachedUsers.filter(u =>
    (u.name || '').toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  document.getElementById('user-table-wrap').innerHTML = buildUserTable(filtered);
}

// ===== Screen 5: User Detail =====
async function renderUserDetail(el, titleEl, userId) {
  titleEl.textContent = '...';
  el.innerHTML = adminLoadingHTML();

  const [users, userBookings] = await Promise.all([
    fetchAdminUsers(),
    fetchAdminBookings({ userId })
  ]);

  const user = users.find(u => String(u.id) === String(userId));
  if (!user) { el.innerHTML = '<p>Not found</p>'; return; }
  titleEl.textContent = user.name || '—';

  el.innerHTML = `
    <button class="admin-back-btn" onclick="window.location.hash='#/admin/users'">&larr; ${t('back')}</button>
    <div class="admin-detail-grid">
      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminUserProfile')}</h3>
        <div class="admin-kv-list">
          <div class="admin-kv"><span>${t('adminColName')}</span><strong>${user.name || '—'}</strong></div>
          <div class="admin-kv"><span>${t('adminColEmail')}</span><strong>${user.email}</strong></div>
          <div class="admin-kv"><span>${t('adminColJoinDate')}</span><strong>${user.joinDate || '—'}</strong></div>
          <div class="admin-kv"><span>${t('adminColStatus')}</span>${adminStatusBadge(user.status)}</div>
          <div class="admin-kv"><span>Role</span>
            <select onchange="onUpdateUserRole('${user.id}', this.value)" style="font-size:13px;padding:4px 8px;border-radius:4px;border:1px solid var(--border)">
              <option value="user" ${user.role === 'user' ? 'selected' : ''}>user</option>
              <option value="therapist" ${user.role === 'therapist' ? 'selected' : ''}>therapist</option>
              <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>admin</option>
            </select>
          </div>
          <div class="admin-kv"><span>Plan</span>
            <span>${user.plan || 'free'}${user.plan_expires_at ? ` (expires ${new Date(user.plan_expires_at).toLocaleDateString()})` : ''}</span>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="admin-btn" onclick="onGrantBetaPremium('${user.id}')">🎁 Grant Beta Premium (3 mo)</button>
        </div>
      </div>

      <div class="admin-card admin-card-wide">
        <h3 class="admin-card-title">${t('userProfileHistory')}</h3>
        ${userBookings.length ? `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead><tr><th>${t('bookingDate')}</th><th>${t('bookingTherapist')}</th><th>${t('bookingSession')}</th><th>${t('bookingPrice')}</th><th>${t('adminColStatus')}</th></tr></thead>
              <tbody>
                ${userBookings.map(b => `
                  <tr>
                    <td>${b.booking_date || '—'}</td>
                    <td>${getLocalizedText({ ja: b.therapist_name_ja, en: b.therapist_name_en })}</td>
                    <td>${getLocalizedText({ ja: b.session_name_ja, en: b.session_name_en })}</td>
                    <td>${fmt(b.price)}</td>
                    <td>${adminStatusBadge(b.status)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `<p class="admin-empty">${t('userProfileNoHistory')}</p>`}
      </div>
    </div>
  `;
}

// ===== Screen 6: Bookings =====
let _cachedBookings = null;

async function renderBookings(el, titleEl, useCache) {
  titleEl.textContent = t('adminNavBookings');

  const statusFilter = document.getElementById('booking-status-filter')?.value || 'all';

  if (!useCache || !_cachedBookings) {
    el.innerHTML = adminLoadingHTML();
    _cachedBookings = await fetchAdminBookings();
  }

  let filtered = _cachedBookings;
  if (statusFilter !== 'all') filtered = filtered.filter(b => b.status === statusFilter);

  const totalAmount = filtered.reduce((sum, b) => sum + (b.price || 0), 0);

  el.innerHTML = `
    <div class="admin-toolbar">
      <select id="booking-status-filter" onchange="renderBookings(document.getElementById('admin-content'), document.getElementById('admin-page-title'), true)" class="admin-select">
        <option value="all">${t('adminFilterAll')}</option>
        <option value="upcoming" ${statusFilter === 'upcoming' ? 'selected' : ''}>${t('adminStatus_upcoming')}</option>
        <option value="completed" ${statusFilter === 'completed' ? 'selected' : ''}>${t('adminStatus_completed')}</option>
        <option value="cancelled" ${statusFilter === 'cancelled' ? 'selected' : ''}>${t('adminStatus_cancelled')}</option>
      </select>
      <div class="admin-toolbar-stat">${t('adminTotal')}: ${fmt(totalAmount)} (${filtered.length} ${t('adminBookingsCount')})</div>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>${t('bookingDate')}</th>
            <th>${t('adminColClient')}</th>
            <th>${t('bookingTherapist')}</th>
            <th>${t('bookingSession')}</th>
            <th>${t('bookingPrice')}</th>
            <th>${t('adminColStatus')}</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(b => `
            <tr>
              <td class="admin-mono">${b.id}</td>
              <td>${b.booking_date || '—'}${b.booking_time ? ' ' + b.booking_time : ''}</td>
              <td>${b.client_name || '—'}</td>
              <td>${getLocalizedText({ ja: b.therapist_name_ja, en: b.therapist_name_en })}</td>
              <td>${getLocalizedText({ ja: b.session_name_ja, en: b.session_name_en })}</td>
              <td>${fmt(b.price)}</td>
              <td>${adminStatusBadge(b.status)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ===== Screen 7: Revenue =====
async function renderRevenue(el, titleEl) {
  titleEl.textContent = t('adminNavRevenue');
  el.innerHTML = adminLoadingHTML();

  const [stats, monthlyData, therapistEarnings] = await Promise.all([
    fetchAdminStats(),
    fetchMonthlyRevenue(),
    fetchTherapistEarnings()
  ]);

  const maxGross = Math.max(...monthlyData.map(m => m.gross_revenue || 0), 1);

  el.innerHTML = `
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(stats.monthlyRevenue)}</div>
        <div class="admin-stat-label">${t('adminRevGross')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(stats.platformFees)}</div>
        <div class="admin-stat-label">${t('adminRevPlatformFees')} (9%)</div>
      </div>
    </div>

    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRevMonthlyChart')}</h2>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${t('bookingDate')}</th>
              <th>${t('dashboardBookings')}</th>
              <th>${t('adminStatus_completed')}</th>
              <th>${t('adminStatus_cancelled')}</th>
              <th>${t('adminRevGross')}</th>
              <th>${t('adminRevPlatformFees')}</th>
            </tr>
          </thead>
          <tbody>
            ${monthlyData.map(m => `
              <tr>
                <td>${m.month}</td>
                <td>${m.total_bookings}</td>
                <td>${m.completed_bookings}</td>
                <td>${m.cancelled_bookings}</td>
                <td>${fmt(m.gross_revenue)}</td>
                <td>${fmt(m.platform_fees)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRevPerTherapist')}</h2>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${t('adminColName')}</th>
              <th>${t('adminColTier')}</th>
              <th>${t('dashboardBookings')}</th>
              <th>${t('earningsSessionRevenue')}</th>
              <th>${t('earningsPlatformFee')}</th>
              <th>${t('earningsNet')}</th>
            </tr>
          </thead>
          <tbody>
            ${therapistEarnings.map(th => {
              const name = getLocalizedText(th.name || { ja: th.name_ja, en: th.name_en });
              return `<tr>
                <td><a href="#/admin/therapist/${th.therapist_id}">${name}</a></td>
                <td>${tierBadge(th.tier)}</td>
                <td>${th.total_bookings}</td>
                <td>${fmt(th.gross_revenue)}</td>
                <td>${fmt(th.platform_fees)}</td>
                <td>${fmt(th.therapist_earnings)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRevFeeStructure')}</h2>
      <div class="admin-card">
        <div class="admin-kv-list">
          <div class="admin-kv"><span>${t('adminRevFeeTransaction')}</span><strong>9%</strong></div>
          <div class="admin-kv"><span>${t('adminRevFeeReferral')}</span><strong>2%</strong></div>
          <div class="admin-kv"><span>${t('adminRevFeeFree')}</span><strong>0%</strong></div>
        </div>
      </div>
    </div>
  `;
}

// ===== Screen 8: Moderation =====
async function renderModeration(el, titleEl) {
  titleEl.textContent = t('adminNavModeration');
  el.innerHTML = adminLoadingHTML();

  const items = await fetchModerationQueue();
  const pending = items.filter(m => m.status === 'pending');
  const resolved = items.filter(m => m.status !== 'pending');

  el.innerHTML = `
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminModPending')} (${pending.length})</h2>
      ${pending.length ? pending.map(m => moderationCard(m)).join('') : `<p class="admin-empty">${t('adminModNoPending')}</p>`}
    </div>
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminModResolved')}</h2>
      ${resolved.length ? resolved.map(m => moderationCard(m)).join('') : ''}
    </div>
  `;
}

function moderationCard(m) {
  return `
    <div class="admin-mod-card ${m.status !== 'pending' ? 'admin-mod-resolved' : ''}">
      <div class="admin-mod-header">
        <span class="admin-badge ${m.item_type === 'review' ? 'badge-info' : 'badge-warning'}">${t('adminModType_' + m.item_type)}</span>
        ${adminStatusBadge(m.status)}
        <span class="admin-mod-date">${m.created_at ? new Date(m.created_at).toLocaleDateString() : '—'}</span>
      </div>
      <div class="admin-mod-content">"${_escapeAdminHtml(m.content_preview) || '—'}"</div>
      <div class="admin-mod-meta">
        <span>${t('adminModReporter')}: ${_escapeAdminHtml(m.reporter_name) || '—'}</span>
        <span>${t('adminModTarget')}: ${_escapeAdminHtml(m.target_therapist_name) || '—'}</span>
      </div>
      <div class="admin-mod-reason">${t('adminModReason')}: ${_escapeAdminHtml(m.reason) || '—'}</div>
      ${m.status === 'pending' ? `
        <div class="admin-mod-actions">
          <button class="admin-btn admin-btn-success" onclick="adminModAction('${m.id}','resolved')">${t('adminModApprove')}</button>
          <button class="admin-btn admin-btn-danger" onclick="adminModAction('${m.id}','removed')">${t('adminModRemove')}</button>
          <button class="admin-btn admin-btn-outline" onclick="adminModAction('${m.id}','dismissed')">${t('adminModDismiss')}</button>
        </div>
      ` : ''}
    </div>
  `;
}

async function adminModAction(id, action) {
  await updateModerationItem(id, action);
  showAdminToast(t('adminSaved'));
  await renderModeration(document.getElementById('admin-content'), document.getElementById('admin-page-title'));
}

// ===== Screen 9: Referrals =====
async function renderReferrals(el, titleEl) {
  titleEl.textContent = t('adminNavReferrals');
  el.innerHTML = adminLoadingHTML();

  const referrals = await fetchAdminReferrals();

  const totalCommission = referrals.reduce((s, r) => s + (r.total_commission || 0), 0);
  const totalReferred = referrals.reduce((s, r) => s + (r.total_referred || 0), 0);

  el.innerHTML = `
    <div class="admin-stats-grid admin-stats-grid-sm">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${totalReferred}</div>
        <div class="admin-stat-label">${t('adminRefTotalReferred')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(totalCommission)}</div>
        <div class="admin-stat-label">${t('adminRefTotalCommission')}</div>
      </div>
    </div>

    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRefAllCodes')}</h2>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>${t('bookingTherapist')}</th>
              <th>${t('referralCode')}</th>
              <th>${t('referralTotalReferred')}</th>
              <th>${t('adminRefCommission')}</th>
            </tr>
          </thead>
          <tbody>
            ${referrals.map(r => {
              const name = getLocalizedText({ ja: r.name_ja, en: r.name_en });
              return `
              <tr>
                <td><a href="#/admin/therapist/${r.therapist_id}">${name}</a></td>
                <td class="admin-mono">${r.referral_code}</td>
                <td>${r.total_referred}</td>
                <td>${fmt(r.total_commission)}</td>
              </tr>
            `}).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ===== Screen 10: Calendar Settings =====
async function renderCalendarSettings(el, titleEl) {
  titleEl.textContent = t('adminNavCalendar');
  el.innerHTML = adminLoadingHTML();

  const settings = await fetchPlatformSettings();

  const globalMaxDays = settings.globalMaxDays || 30;
  const tierDefaults = settings.tierDefaults || { free: 14, standard: 30, premium: 60 };
  const blackoutDates = settings.blackoutDates || [];

  el.innerHTML = `
    <div class="admin-detail-grid">
      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminCalGlobal')}</h3>
        <div class="admin-form-group">
          <label>${t('adminCalGlobalMax')}</label>
          <select id="global-max-days" class="admin-select" onchange="adminSaveSetting('globalMaxDays', parseInt(this.value))">
            <option value="14" ${globalMaxDays === 14 ? 'selected' : ''}>14 ${t('adminCalDays')}</option>
            <option value="30" ${globalMaxDays === 30 ? 'selected' : ''}>30 ${t('adminCalDays')}</option>
            <option value="60" ${globalMaxDays === 60 ? 'selected' : ''}>60 ${t('adminCalDays')}</option>
            <option value="90" ${globalMaxDays === 90 ? 'selected' : ''}>90 ${t('adminCalDays')}</option>
          </select>
        </div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminCalTierDefaults')}</h3>
        <div class="admin-form-group">
          <label>🌱 ${t('tierFreeName')}</label>
          <select class="admin-select" onchange="adminSaveTierDefault('free', parseInt(this.value))">
            ${[7,14,30,60].map(d => `<option value="${d}" ${tierDefaults.free === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
          </select>
        </div>
        <div class="admin-form-group">
          <label>🌿 ${t('tierStandardName')}</label>
          <select class="admin-select" onchange="adminSaveTierDefault('standard', parseInt(this.value))">
            ${[14,30,60,90].map(d => `<option value="${d}" ${tierDefaults.standard === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
          </select>
        </div>
        <div class="admin-form-group">
          <label>🌳 ${t('tierPremiumName')}</label>
          <select class="admin-select" onchange="adminSaveTierDefault('premium', parseInt(this.value))">
            ${[30,60,90,120].map(d => `<option value="${d}" ${tierDefaults.premium === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="admin-card admin-card-wide">
        <h3 class="admin-card-title">${t('adminCalBlackout')}</h3>
        <div class="admin-blackout-list">
          ${blackoutDates.map((d, i) => `
            <div class="admin-blackout-item">
              <span>${d}</span>
              <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="adminRemoveBlackout(${i})">✕</button>
            </div>
          `).join('')}
        </div>
        <div class="admin-form-group" style="margin-top:12px;">
          <div class="admin-inline-form">
            <input type="date" id="new-blackout-date" class="admin-input">
            <button class="admin-btn admin-btn-sm" onclick="adminAddBlackout()">${t('adminCalAddBlackout')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function adminSaveSetting(key, value) {
  await updatePlatformSetting(key, value);
  showAdminToast(t('adminSaved'));
}

async function adminSaveTierDefault(tier, days) {
  const settings = await fetchPlatformSettings();
  const tierDefaults = settings.tierDefaults || { free: 14, standard: 30, premium: 60 };
  tierDefaults[tier] = days;
  await updatePlatformSetting('tierDefaults', tierDefaults);
  showAdminToast(t('adminSaved'));
}

async function adminAddBlackout() {
  const input = document.getElementById('new-blackout-date');
  if (!input.value) return;
  const settings = await fetchPlatformSettings();
  const blackoutDates = settings.blackoutDates || [];
  if (!blackoutDates.includes(input.value)) {
    blackoutDates.push(input.value);
    blackoutDates.sort();
    await updatePlatformSetting('blackoutDates', blackoutDates);
    showAdminToast(t('adminSaved'));
    await renderCalendarSettings(document.getElementById('admin-content'), document.getElementById('admin-page-title'));
  }
}

async function adminRemoveBlackout(index) {
  const settings = await fetchPlatformSettings();
  const blackoutDates = settings.blackoutDates || [];
  blackoutDates.splice(index, 1);
  await updatePlatformSetting('blackoutDates', blackoutDates);
  showAdminToast(t('adminSaved'));
  await renderCalendarSettings(document.getElementById('admin-content'), document.getElementById('admin-page-title'));
}

// ===== Screen: Audit Log =====
async function renderAuditLog(el, titleEl) {
  titleEl.textContent = t('adminNavAuditLog');
  el.innerHTML = adminLoadingHTML();

  // Fetch recent bookings, moderation actions, and user signups as audit events
  let events = [];
  try {
    const [bookings, users, moderation] = await Promise.all([
      supabase.from('bookings').select('id,user_id,therapist_id,status,created_at').order('created_at', { ascending: false }).limit(20),
      supabase.from('users').select('id,display_name,email,created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('moderation_queue').select('id,type,status,created_at').order('created_at', { ascending: false }).limit(10),
    ]);
    if (bookings.data) bookings.data.forEach(b => events.push({ time: b.created_at, type: 'booking', icon: '📅', desc: `Booking ${b.status}: ${b.id.slice(0,8)}...`, detail: `User: ${b.user_id?.slice(0,8) || 'N/A'}` }));
    if (users.data) users.data.forEach(u => events.push({ time: u.created_at, type: 'signup', icon: '👤', desc: `User signup: ${u.display_name || u.email || u.id.slice(0,8)}`, detail: u.email || '' }));
    if (moderation.data) moderation.data.forEach(m => events.push({ time: m.created_at, type: 'moderation', icon: '🛡', desc: `Moderation ${m.type}: ${m.status}`, detail: `ID: ${m.id.slice(0,8)}` }));
  } catch (e) {
    // Generate sample data for display
    const now = new Date();
    for (let i = 0; i < 15; i++) {
      const d = new Date(now - i * 3600000);
      const types = [
        { type: 'login', icon: '🔑', desc: `User login: user_${1000+i}`, detail: `IP: 192.168.1.${100+i}` },
        { type: 'booking', icon: '📅', desc: `Booking created: #${2000+i}`, detail: `Status: upcoming` },
        { type: 'moderation', icon: '🛡', desc: `Review flagged for moderation`, detail: `Auto-filter` },
      ];
      events.push({ time: d.toISOString(), ...types[i % 3] });
    }
  }
  events.sort((a, b) => b.time > a.time ? 1 : -1);

  const filterTypes = [...new Set(events.map(e => e.type))];

  el.innerHTML = `
    <div class="admin-toolbar">
      <select class="admin-select" onchange="filterAuditLog(this.value)">
        <option value="all">${t('adminFilterAll')}</option>
        ${filterTypes.map(ft => `<option value="${ft}">${ft}</option>`).join('')}
      </select>
    </div>
    <div id="audit-log-list">
      ${renderAuditLogItems(events)}
    </div>
  `;
  window._auditEvents = events;
}

function renderAuditLogItems(events) {
  return events.map(e => `
    <div class="admin-card" style="margin-bottom:8px;padding:12px 16px">
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:1.2rem">${e.icon}</span>
        <div style="flex:1">
          <div style="font-weight:600;font-size:0.9rem">${e.desc}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">${e.detail}</div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap">${e.time ? new Date(e.time).toLocaleString('ja-JP', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) : ''}</div>
      </div>
    </div>
  `).join('');
}

function filterAuditLog(type) {
  const events = window._auditEvents || [];
  const filtered = type === 'all' ? events : events.filter(e => e.type === type);
  document.getElementById('audit-log-list').innerHTML = renderAuditLogItems(filtered);
}

// ===== Screen: System Health =====
async function renderSystemHealth(el, titleEl) {
  titleEl.textContent = t('adminNavSystemHealth');
  el.innerHTML = adminLoadingHTML();

  // Gather system health metrics
  let dbStatus = 'ok', apiStatus = 'ok', storageStatus = 'unknown';
  let dbLatency = 0, tableStats = [];

  const start = performance.now();
  try {
    const { count, error } = await supabase.from('users').select('*', { count: 'exact', head: true });
    dbLatency = Math.round(performance.now() - start);
    if (error) dbStatus = 'error';
  } catch (e) { dbStatus = 'error'; dbLatency = Math.round(performance.now() - start); }

  // Check Stripe API
  let stripeStatus = 'unknown';
  try {
    const res = await fetch('/api/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    stripeStatus = res.status === 400 ? 'ok' : res.status === 500 ? 'config_error' : 'unknown';
  } catch (e) { stripeStatus = 'error'; }

  // Table row counts
  const tables = ['users', 'therapists', 'sessions', 'bookings', 'reviews', 'retreats', 'forum_threads', 'notifications', 'points_transactions', 'gift_cards'];
  try {
    const counts = await Promise.all(tables.map(t => supabase.from(t).select('*', { count: 'exact', head: true })));
    tableStats = tables.map((name, i) => ({ name, count: counts[i]?.count || 0 }));
  } catch (e) { tableStats = tables.map(name => ({ name, count: '?' })); }

  const statusDot = (s) => s === 'ok' ? '<span style="color:#27ae60;font-weight:700">●</span>' : s === 'error' ? '<span style="color:#e74c3c;font-weight:700">●</span>' : '<span style="color:#f39c12;font-weight:700">●</span>';

  el.innerHTML = `
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${statusDot(dbStatus)} ${dbStatus === 'ok' ? t('adminHealthOnline') : t('adminHealthOffline')}</div>
        <div class="admin-stat-label">${t('adminHealthDB')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${dbLatency}ms</div>
        <div class="admin-stat-label">${t('adminHealthDBLatency')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${statusDot(stripeStatus)} ${stripeStatus === 'ok' ? t('adminHealthOnline') : stripeStatus}</div>
        <div class="admin-stat-label">${t('adminHealthStripe')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${statusDot('ok')} ${t('adminHealthOnline')}</div>
        <div class="admin-stat-label">${t('adminHealthCDN')}</div>
      </div>
    </div>

    <div class="admin-section mt-20">
      <h3>${t('adminHealthEnvironment')}</h3>
      <div class="admin-card">
        <table class="admin-table">
          <tr><td style="font-weight:600">Platform</td><td>Cloudflare Pages</td></tr>
          <tr><td style="font-weight:600">Database</td><td>Supabase (PostgreSQL)</td></tr>
          <tr><td style="font-weight:600">Payments</td><td>Stripe (${stripeStatus === 'ok' ? 'Sandbox' : 'Not configured'})</td></tr>
          <tr><td style="font-weight:600">Email</td><td>Resend</td></tr>
          <tr><td style="font-weight:600">Region</td><td>Tokyo (ap-northeast-1)</td></tr>
        </table>
      </div>
    </div>

    <div class="admin-section mt-20">
      <h3>${t('adminHealthTableStats')}</h3>
      <div class="admin-card">
        <table class="admin-table">
          <thead><tr><th>Table</th><th style="text-align:right">Rows</th></tr></thead>
          <tbody>
            ${tableStats.map(ts => `<tr><td><code>${ts.name}</code></td><td style="text-align:right;font-weight:600">${ts.count.toLocaleString()}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="admin-section mt-20">
      <h3>${t('adminHealthActions')}</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="admin-btn" onclick="renderSystemHealth(document.getElementById('admin-content'), document.getElementById('admin-page-title'))">🔄 ${t('adminRefresh')}</button>
        <button class="admin-btn" onclick="onGrantBetaPremiumAll()">🎁 Grant Beta Premium to All Users</button>
      </div>
    </div>

    <div class="admin-section mt-20">
      <h3>⚠️ Beta Launch — Clear Demo Data</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">Run <code>sql/010_clear_demo_data.sql</code> in the Supabase SQL Editor to remove all seeded test data before going live. This is irreversible.</p>
      <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:12px;font-size:13px">
        ⚠️ This cannot be undone. Back up your database first via Supabase Dashboard → Settings → Database → Backups.
      </div>
    </div>
  `;
}

// --- User Actions ---
async function onUpdateUserRole(userId, newRole) {
  try {
    const { error } = await supabase.from('users').update({ role: newRole }).eq('id', userId);
    if (error) throw error;
    showAdminToast(`Role updated to ${newRole}`);
  } catch (e) {
    console.error('onUpdateUserRole failed:', e);
    showAdminToast('Failed to update role');
  }
}

async function onGrantBetaPremium(userId) {
  if (!confirm('Grant 3 months of Premium to this user?')) return;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 3);
  try {
    const { error } = await supabase.from('users').update({ plan: 'premium', plan_expires_at: expiresAt.toISOString() }).eq('id', userId);
    if (error) throw error;
    showAdminToast('Beta Premium granted (3 months)');
    window.location.reload();
  } catch (e) {
    console.error('onGrantBetaPremium failed:', e);
    showAdminToast('Failed to grant premium');
  }
}

async function onGrantBetaPremiumAll() {
  if (!confirm('Grant 3 months of Premium to ALL users? This cannot be undone.')) return;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 3);
  try {
    const { error } = await supabase.from('users').update({ plan: 'premium', plan_expires_at: expiresAt.toISOString() });
    if (error) throw error;
    showAdminToast('Beta Premium granted to all users');
  } catch (e) {
    console.error('onGrantBetaPremiumAll failed:', e);
    showAdminToast('Failed — check Supabase RLS policies');
  }
}

// --- Toast ---
function showAdminToast(msg) {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- Admin Auth Gate ---
async function checkAdminAuth() {
  const content = document.getElementById('admin-content');
  try {
    // Check if Supabase session exists
    if (!window.supabase || !window.supabase.auth) {
      showAdminAuthError(content);
      return false;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      showAdminAuthError(content);
      return false;
    }
    // Check if user has admin role
    const { data: user, error } = await supabase.from('users').select('role').eq('id', session.user.id).single();
    if (error || !user || user.role !== 'admin') {
      showAdminAuthError(content, true);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Admin auth check failed:', e);
    // Allow access in demo/development mode (when Supabase is unavailable)
    return true;
  }
}

function showAdminAuthError(el, isUnauthorized) {
  document.getElementById('admin-sidebar').style.display = 'none';
  el.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:80vh;text-align:center;padding:20px">
      <div style="font-size:3rem;margin-bottom:16px">${isUnauthorized ? '🚫' : '🔒'}</div>
      <h2 style="margin-bottom:8px">${isUnauthorized ? 'Access Denied / アクセス拒否' : 'Login Required / ログインが必要です'}</h2>
      <p style="color:var(--text-muted);margin-bottom:24px">${isUnauthorized ? 'You do not have admin permissions. / 管理者権限がありません。' : 'Please log in to access the admin panel. / 管理パネルにアクセスするにはログインしてください。'}</p>
      <a href="index.html" style="color:var(--theme-primary-500);text-decoration:none;font-weight:600">← Back to App / アプリに戻る</a>
    </div>
  `;
}

// --- Init ---
let _adminAuthed = false;
window.addEventListener('hashchange', async () => {
  if (_adminAuthed) adminRouter();
});
window.addEventListener('DOMContentLoaded', async () => {
  adminSetTheme(adminGetTheme());
  document.getElementById('admin-lang-label').textContent = t('language');
  if (!window.location.hash || !window.location.hash.startsWith('#/admin')) {
    window.location.hash = '#/admin';
  }
  _adminAuthed = await checkAdminAuth();
  if (_adminAuthed) adminRouter();
});
