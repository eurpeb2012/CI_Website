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
  { pattern: /^\/admin\/therapist\/(\d+)$/, handler: 'therapistDetail' },
  { pattern: /^\/admin\/users\/?$/, handler: 'userList' },
  { pattern: /^\/admin\/user\/(.+)$/, handler: 'userDetail' },
  { pattern: /^\/admin\/bookings\/?$/, handler: 'bookings' },
  { pattern: /^\/admin\/revenue\/?$/, handler: 'revenue' },
  { pattern: /^\/admin\/moderation\/?$/, handler: 'moderation' },
  { pattern: /^\/admin\/referrals\/?$/, handler: 'referrals' },
  { pattern: /^\/admin\/calendar-settings\/?$/, handler: 'calendarSettingsPage' },
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

function adminRenderRoute(handler, el, titleEl, params) {
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
  };
  (handlers[handler] || handlers.dashboard)();
}

// --- Helpers ---
function fmt(n) {
  return '¥' + n.toLocaleString();
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

// ===== Screen 1: Dashboard =====
function renderAdminDashboard(el, titleEl) {
  titleEl.textContent = t('adminNavDashboard');
  el.innerHTML = `
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${adminStats.totalTherapists}</div>
        <div class="admin-stat-label">${t('adminStatTherapists')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${adminStats.totalUsers}</div>
        <div class="admin-stat-label">${t('adminStatUsers')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${adminStats.activeBookings}</div>
        <div class="admin-stat-label">${t('adminStatActiveBookings')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(adminStats.monthlyRevenue)}</div>
        <div class="admin-stat-label">${t('adminStatMonthlyRevenue')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(adminStats.platformFees)}</div>
        <div class="admin-stat-label">${t('adminStatPlatformFees')}</div>
      </div>
    </div>
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminQuickLinks')}</h2>
      <div class="admin-quick-links">
        ${adminNavItems.map(item => `<a href="${item.route}" class="admin-quick-link"><span>${item.icon}</span> ${t(item.key)}</a>`).join('')}
      </div>
    </div>
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRecentActivity')}</h2>
      <div class="admin-activity-list">
        ${recentActivity.map(a => `
          <div class="admin-activity-item">
            <span class="admin-activity-type admin-activity-${a.type}">${t('adminActivity_' + a.type)}</span>
            <span class="admin-activity-text">${getLocalizedText(a.text)}</span>
            <span class="admin-activity-date">${a.date}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ===== Screen 2: Therapist List =====
function renderTherapistList(el, titleEl) {
  titleEl.textContent = t('adminNavTherapists');
  const filterTier = document.getElementById('filter-tier')?.value || 'all';
  const filterStatus = document.getElementById('filter-status')?.value || 'all';

  let filtered = therapists.map(th => {
    const status = th._adminStatus || 'active';
    return { ...th, adminStatus: status };
  });
  if (filterTier !== 'all') filtered = filtered.filter(th => th.tier === filterTier);
  if (filterStatus !== 'all') filtered = filtered.filter(th => th.adminStatus === filterStatus);

  el.innerHTML = `
    <div class="admin-toolbar">
      <select id="filter-tier" onchange="renderTherapistList(document.getElementById('admin-content'), document.getElementById('admin-page-title'))" class="admin-select">
        <option value="all">${t('adminFilterAllTiers')}</option>
        <option value="free" ${filterTier === 'free' ? 'selected' : ''}>🌱 ${t('tierFreeName')}</option>
        <option value="standard" ${filterTier === 'standard' ? 'selected' : ''}>🌿 ${t('tierStandardName')}</option>
        <option value="premium" ${filterTier === 'premium' ? 'selected' : ''}>🌳 ${t('tierPremiumName')}</option>
      </select>
      <select id="filter-status" onchange="renderTherapistList(document.getElementById('admin-content'), document.getElementById('admin-page-title'))" class="admin-select">
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
            <th>${t('adminColFounding')}</th>
            <th>${t('adminColActions')}</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(th => `
            <tr>
              <td>
                <div class="admin-user-cell">
                  <div class="admin-avatar-sm" style="background:${th.avatarColor}">${getLocalizedText(th.name).charAt(0)}</div>
                  <span>${getLocalizedText(th.name)}</span>
                </div>
              </td>
              <td>${tierBadge(th.tier)}</td>
              <td>${adminStatusBadge(th.adminStatus)}</td>
              <td>${th.isFoundingMember ? '⭐' : '—'}</td>
              <td>
                <a href="#/admin/therapist/${th.id}" class="admin-btn admin-btn-sm">${t('adminActionView')}</a>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ===== Screen 3: Therapist Detail =====
function renderTherapistDetail(el, titleEl, id) {
  const th = getTherapist(id);
  if (!th) { el.innerHTML = '<p>Not found</p>'; return; }
  const dash = getDashboardData(th.id);
  const currentWindow = calendarSettings.overrides[th.id] || calendarSettings.tierDefaults[th.tier] || calendarSettings.globalMaxDays;
  titleEl.textContent = getLocalizedText(th.name);

  el.innerHTML = `
    <button class="admin-back-btn" onclick="window.location.hash='#/admin/therapists'">&larr; ${t('back')}</button>
    <div class="admin-detail-grid">
      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminThProfile')}</h3>
        <div class="admin-profile-header">
          <div class="admin-avatar-lg" style="background:${th.avatarColor}">${getLocalizedText(th.name).charAt(0)}</div>
          <div>
            <div class="admin-profile-name">${getLocalizedText(th.name)}</div>
            <div class="admin-profile-username">${th.username}</div>
            ${th.isFoundingMember ? `<span class="admin-badge badge-founding">⭐ ${t('foundingMember')}</span>` : ''}
          </div>
        </div>
        <p class="admin-profile-intro">${getLocalizedText(th.intro)}</p>
        <div class="admin-meta"><strong>${t('profileLocation')}:</strong> ${getLocalizedText(th.location)}</div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminThTierMgmt')}</h3>
        <div class="admin-form-group">
          <label>${t('adminColTier')}</label>
          <select id="tier-select" class="admin-select" onchange="adminChangeTier(${th.id}, this.value)">
            <option value="free" ${th.tier === 'free' ? 'selected' : ''}>🌱 ${t('tierFreeName')}</option>
            <option value="standard" ${th.tier === 'standard' ? 'selected' : ''}>🌿 ${t('tierStandardName')}</option>
            <option value="premium" ${th.tier === 'premium' ? 'selected' : ''}>🌳 ${t('tierPremiumName')}</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label>${t('adminColStatus')}</label>
          <select id="status-select" class="admin-select" onchange="adminChangeStatus(${th.id}, this.value)">
            <option value="active" ${(th._adminStatus || 'active') === 'active' ? 'selected' : ''}>${t('adminStatus_active')}</option>
            <option value="suspended" ${th._adminStatus === 'suspended' ? 'selected' : ''}>${t('adminStatus_suspended')}</option>
            <option value="pending" ${th._adminStatus === 'pending' ? 'selected' : ''}>${t('adminStatus_pending')}</option>
          </select>
        </div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminCalBookingWindow')}</h3>
        <p class="admin-help-text">${t('adminCalBookingWindowDesc')}</p>
        <div class="admin-form-group">
          <label>${t('adminCalMaxDays')}</label>
          <select id="booking-window-select" class="admin-select" onchange="adminSetBookingWindow(${th.id}, parseInt(this.value))">
            <option value="14" ${currentWindow === 14 ? 'selected' : ''}>14 ${t('adminCalDays')}</option>
            <option value="30" ${currentWindow === 30 ? 'selected' : ''}>30 ${t('adminCalDays')}</option>
            <option value="60" ${currentWindow === 60 ? 'selected' : ''}>60 ${t('adminCalDays')}</option>
            <option value="90" ${currentWindow === 90 ? 'selected' : ''}>90 ${t('adminCalDays')}</option>
          </select>
          <div class="admin-help-text">${t('adminCalTierDefault')}: ${calendarSettings.tierDefaults[th.tier]} ${t('adminCalDays')}</div>
        </div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminThStats')}</h3>
        <div class="admin-kv-list">
          <div class="admin-kv"><span>${t('dashboardBookings')}</span><strong>${dash.bookingsCount}</strong></div>
          <div class="admin-kv"><span>${t('dashboardRating')}</span><strong>${dash.averageRating}</strong></div>
          <div class="admin-kv"><span>${t('earningsSessionRevenue')}</span><strong>${fmt(dash.sessionRevenue)}</strong></div>
          <div class="admin-kv"><span>${t('earningsPlatformFee')}</span><strong>${fmt(dash.platformFee)}</strong></div>
          <div class="admin-kv"><span>${t('earningsReferralIncome')}</span><strong>${fmt(dash.referralIncome)}</strong></div>
          <div class="admin-kv"><span>${t('earningsNet')}</span><strong>${fmt(dash.netEarnings)}</strong></div>
          <div class="admin-kv"><span>${t('profileReviews')}</span><strong>${th.reviews.filter(r => r.type === 'client-to-therapist').length}</strong></div>
        </div>
      </div>

      <div class="admin-card admin-card-wide">
        <h3 class="admin-card-title">${t('profileSessions')}</h3>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>${t('adminColName')}</th><th>${t('bookingPrice')}</th><th>${t('profileMinutes')}</th></tr></thead>
            <tbody>
              ${th.sessions.map(s => `
                <tr><td>${getLocalizedText(s.name)}</td><td>${fmt(s.price)}</td><td>${s.duration || '—'}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function adminChangeTier(id, tier) {
  const th = getTherapist(id);
  if (th) { th.tier = tier; showAdminToast(t('adminSaved')); }
}
function adminChangeStatus(id, status) {
  const th = getTherapist(id);
  if (th) { th._adminStatus = status; showAdminToast(t('adminSaved')); }
}
function adminSetBookingWindow(id, days) {
  calendarSettings.overrides[id] = days;
  showAdminToast(t('adminSaved'));
}

// ===== Screen 4: User List =====
function renderUserList(el, titleEl) {
  titleEl.textContent = t('adminNavUsers');

  el.innerHTML = `
    <div class="admin-toolbar">
      <input type="text" id="user-search" class="admin-input" placeholder="${t('adminSearchUsers')}" oninput="filterUserList()">
    </div>
    <div class="admin-table-wrap" id="user-table-wrap">
      ${buildUserTable(adminUsers)}
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
        <th>${t('adminColBookings')}</th>
        <th>${t('adminColStatus')}</th>
        <th>${t('adminColActions')}</th>
      </tr>
    </thead>
    <tbody>
      ${users.map(u => `
        <tr>
          <td>${getLocalizedText(u.name)}</td>
          <td>${u.email}</td>
          <td>${u.joinDate}</td>
          <td>${u.bookingsCount}</td>
          <td>${adminStatusBadge(u.status)}</td>
          <td><a href="#/admin/user/${u.id}" class="admin-btn admin-btn-sm">${t('adminActionView')}</a></td>
        </tr>
      `).join('')}
    </tbody>
  </table>`;
}

function filterUserList() {
  const q = document.getElementById('user-search').value.toLowerCase();
  const filtered = adminUsers.filter(u =>
    getLocalizedText(u.name).toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
  document.getElementById('user-table-wrap').innerHTML = buildUserTable(filtered);
}

// ===== Screen 5: User Detail =====
function renderUserDetail(el, titleEl, userId) {
  const user = adminUsers.find(u => u.id === userId);
  if (!user) { el.innerHTML = '<p>Not found</p>'; return; }
  titleEl.textContent = getLocalizedText(user.name);

  const userBookings = adminBookings.filter(b =>
    getLocalizedText(b.clientName) === getLocalizedText(user.name)
  );

  el.innerHTML = `
    <button class="admin-back-btn" onclick="window.location.hash='#/admin/users'">&larr; ${t('back')}</button>
    <div class="admin-detail-grid">
      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminUserProfile')}</h3>
        <div class="admin-kv-list">
          <div class="admin-kv"><span>${t('adminColName')}</span><strong>${getLocalizedText(user.name)}</strong></div>
          <div class="admin-kv"><span>${t('adminColEmail')}</span><strong>${user.email}</strong></div>
          <div class="admin-kv"><span>${t('adminColJoinDate')}</span><strong>${user.joinDate}</strong></div>
          <div class="admin-kv"><span>${t('adminColBookings')}</span><strong>${user.bookingsCount}</strong></div>
          <div class="admin-kv"><span>${t('adminColStatus')}</span>${adminStatusBadge(user.status)}</div>
        </div>
        <div class="admin-form-group" style="margin-top:16px;">
          <label>${t('adminChangeStatus')}</label>
          <select class="admin-select" onchange="adminChangeUserStatus('${user.id}', this.value)">
            <option value="active" ${user.status === 'active' ? 'selected' : ''}>${t('adminStatus_active')}</option>
            <option value="suspended" ${user.status === 'suspended' ? 'selected' : ''}>${t('adminStatus_suspended')}</option>
          </select>
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
                    <td>${b.date}</td>
                    <td>${getLocalizedText(b.therapistName)}</td>
                    <td>${getLocalizedText(b.session)}</td>
                    <td>${fmt(b.amount)}</td>
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

function adminChangeUserStatus(userId, status) {
  const user = adminUsers.find(u => u.id === userId);
  if (user) { user.status = status; showAdminToast(t('adminSaved')); }
}

// ===== Screen 6: Bookings =====
function renderBookings(el, titleEl) {
  titleEl.textContent = t('adminNavBookings');

  const statusFilter = document.getElementById('booking-status-filter')?.value || 'all';
  let filtered = adminBookings;
  if (statusFilter !== 'all') filtered = filtered.filter(b => b.status === statusFilter);

  const totalAmount = filtered.reduce((sum, b) => sum + b.amount, 0);

  el.innerHTML = `
    <div class="admin-toolbar">
      <select id="booking-status-filter" onchange="renderBookings(document.getElementById('admin-content'), document.getElementById('admin-page-title'))" class="admin-select">
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
              <td>${b.date}</td>
              <td>${getLocalizedText(b.clientName)}</td>
              <td><a href="#/admin/therapist/${b.therapistId}">${getLocalizedText(b.therapistName)}</a></td>
              <td>${getLocalizedText(b.session)}</td>
              <td>${fmt(b.amount)}</td>
              <td>${adminStatusBadge(b.status)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ===== Screen 7: Revenue =====
function renderRevenue(el, titleEl) {
  titleEl.textContent = t('adminNavRevenue');
  const maxGross = Math.max(...monthlyRevenueData.map(m => m.gross));

  el.innerHTML = `
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(adminStats.monthlyRevenue)}</div>
        <div class="admin-stat-label">${t('adminRevGross')}</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(adminStats.platformFees)}</div>
        <div class="admin-stat-label">${t('adminRevPlatformFees')} (9%)</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(adminStats.referralPayouts)}</div>
        <div class="admin-stat-label">${t('adminRevReferralPayouts')} (2%)</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${fmt(adminStats.netPlatformIncome)}</div>
        <div class="admin-stat-label">${t('adminRevNet')}</div>
      </div>
    </div>

    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRevMonthlyChart')}</h2>
      <div class="admin-chart">
        ${monthlyRevenueData.map(m => `
          <div class="admin-chart-bar-group">
            <div class="admin-chart-bar" style="height:${(m.gross / maxGross * 160)}px" title="${fmt(m.gross)}">
              <span class="admin-chart-val">${(m.gross / 1000).toFixed(0)}k</span>
            </div>
            <div class="admin-chart-label">${m.month.slice(5)}</div>
          </div>
        `).join('')}
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
              <th>${t('earningsSessionRevenue')}</th>
              <th>${t('earningsPlatformFee')}</th>
              <th>${t('earningsReferralIncome')}</th>
              <th>${t('earningsNet')}</th>
            </tr>
          </thead>
          <tbody>
            ${therapists.map(th => {
              const d = getDashboardData(th.id);
              return `<tr>
                <td><a href="#/admin/therapist/${th.id}">${getLocalizedText(th.name)}</a></td>
                <td>${tierBadge(th.tier)}</td>
                <td>${fmt(d.sessionRevenue)}</td>
                <td>${fmt(d.platformFee)}</td>
                <td>${fmt(d.referralIncome)}</td>
                <td>${fmt(d.netEarnings)}</td>
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
function renderModeration(el, titleEl) {
  titleEl.textContent = t('adminNavModeration');

  const pending = moderationQueue.filter(m => m.status === 'pending');
  const resolved = moderationQueue.filter(m => m.status !== 'pending');

  el.innerHTML = `
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminModPending')} (${pending.length})</h2>
      ${pending.length ? pending.map(m => moderationCard(m)).join('') : `<p class="admin-empty">${t('adminModNoPending')}</p>`}
    </div>
    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminModResolved')}</h2>
      ${resolved.map(m => moderationCard(m)).join('')}
    </div>
  `;
}

function moderationCard(m) {
  return `
    <div class="admin-mod-card ${m.status !== 'pending' ? 'admin-mod-resolved' : ''}">
      <div class="admin-mod-header">
        <span class="admin-badge ${m.type === 'review' ? 'badge-info' : 'badge-warning'}">${t('adminModType_' + m.type)}</span>
        ${adminStatusBadge(m.status)}
        <span class="admin-mod-date">${m.date}</span>
      </div>
      <div class="admin-mod-content">"${getLocalizedText(m.content)}"</div>
      <div class="admin-mod-meta">
        <span>${t('adminModReporter')}: ${getLocalizedText(m.reporter)}</span>
        <span>${t('adminModTarget')}: ${getLocalizedText(m.targetTherapist)}</span>
      </div>
      <div class="admin-mod-reason">${t('adminModReason')}: ${getLocalizedText(m.reason)}</div>
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

function adminModAction(id, action) {
  const item = moderationQueue.find(m => m.id === id);
  if (item) {
    item.status = action;
    showAdminToast(t('adminSaved'));
    renderModeration(document.getElementById('admin-content'), document.getElementById('admin-page-title'));
  }
}

// ===== Screen 9: Referrals =====
function renderReferrals(el, titleEl) {
  titleEl.textContent = t('adminNavReferrals');

  const totalCommission = adminReferrals.reduce((s, r) => s + r.totalCommission, 0);
  const totalReferred = adminReferrals.reduce((s, r) => s + r.totalReferred, 0);

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
              <th>${t('adminColStatus')}</th>
              <th>${t('adminColActions')}</th>
            </tr>
          </thead>
          <tbody>
            ${adminReferrals.map(r => `
              <tr>
                <td><a href="#/admin/therapist/${r.therapistId}">${getLocalizedText(r.therapistName)}</a></td>
                <td class="admin-mono">${r.code}</td>
                <td>${r.totalReferred}</td>
                <td>${fmt(r.totalCommission)}</td>
                <td>${adminStatusBadge(r.status)}</td>
                <td>
                  <button class="admin-btn admin-btn-sm ${r.status === 'active' ? 'admin-btn-outline' : 'admin-btn-success'}" onclick="adminToggleReferral('${r.code}')">
                    ${r.status === 'active' ? t('adminRefDisable') : t('adminRefEnable')}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="admin-section">
      <h2 class="admin-section-title">${t('adminRefChain')}</h2>
      <div class="admin-ref-chain">
        ${adminReferrals.filter(r => r.totalReferred > 0).map(r => `
          <div class="admin-ref-chain-item">
            <strong>${getLocalizedText(r.therapistName)}</strong> (${r.code})
            <div class="admin-ref-chain-arrow">&darr;</div>
            <div class="admin-ref-chain-children">
              ${r.referredIds.map(rid => {
                const rth = getTherapist(rid);
                return rth ? `<span class="admin-badge badge-info">${getLocalizedText(rth.name)}</span>` : '';
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function adminToggleReferral(code) {
  const ref = adminReferrals.find(r => r.code === code);
  if (ref) {
    ref.status = ref.status === 'active' ? 'suspended' : 'active';
    showAdminToast(t('adminSaved'));
    renderReferrals(document.getElementById('admin-content'), document.getElementById('admin-page-title'));
  }
}

// ===== Screen 10: Calendar Settings =====
function renderCalendarSettings(el, titleEl) {
  titleEl.textContent = t('adminNavCalendar');

  el.innerHTML = `
    <div class="admin-detail-grid">
      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminCalGlobal')}</h3>
        <div class="admin-form-group">
          <label>${t('adminCalGlobalMax')}</label>
          <select id="global-max-days" class="admin-select" onchange="calendarSettings.globalMaxDays=parseInt(this.value);showAdminToast(t('adminSaved'))">
            <option value="14" ${calendarSettings.globalMaxDays === 14 ? 'selected' : ''}>14 ${t('adminCalDays')}</option>
            <option value="30" ${calendarSettings.globalMaxDays === 30 ? 'selected' : ''}>30 ${t('adminCalDays')}</option>
            <option value="60" ${calendarSettings.globalMaxDays === 60 ? 'selected' : ''}>60 ${t('adminCalDays')}</option>
            <option value="90" ${calendarSettings.globalMaxDays === 90 ? 'selected' : ''}>90 ${t('adminCalDays')}</option>
          </select>
        </div>
      </div>

      <div class="admin-card">
        <h3 class="admin-card-title">${t('adminCalTierDefaults')}</h3>
        <div class="admin-form-group">
          <label>🌱 ${t('tierFreeName')}</label>
          <select class="admin-select" onchange="calendarSettings.tierDefaults.free=parseInt(this.value);showAdminToast(t('adminSaved'))">
            ${[7,14,30,60].map(d => `<option value="${d}" ${calendarSettings.tierDefaults.free === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
          </select>
        </div>
        <div class="admin-form-group">
          <label>🌿 ${t('tierStandardName')}</label>
          <select class="admin-select" onchange="calendarSettings.tierDefaults.standard=parseInt(this.value);showAdminToast(t('adminSaved'))">
            ${[14,30,60,90].map(d => `<option value="${d}" ${calendarSettings.tierDefaults.standard === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
          </select>
        </div>
        <div class="admin-form-group">
          <label>🌳 ${t('tierPremiumName')}</label>
          <select class="admin-select" onchange="calendarSettings.tierDefaults.premium=parseInt(this.value);showAdminToast(t('adminSaved'))">
            ${[30,60,90,120].map(d => `<option value="${d}" ${calendarSettings.tierDefaults.premium === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="admin-card admin-card-wide">
        <h3 class="admin-card-title">${t('adminCalOverrides')}</h3>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>${t('adminColName')}</th>
                <th>${t('adminColTier')}</th>
                <th>${t('adminCalTierDefault')}</th>
                <th>${t('adminCalCurrentWindow')}</th>
              </tr>
            </thead>
            <tbody>
              ${therapists.map(th => {
                const tierDefault = calendarSettings.tierDefaults[th.tier];
                const current = calendarSettings.overrides[th.id] || tierDefault;
                return `<tr>
                  <td><a href="#/admin/therapist/${th.id}">${getLocalizedText(th.name)}</a></td>
                  <td>${tierBadge(th.tier)}</td>
                  <td>${tierDefault} ${t('adminCalDays')}</td>
                  <td>
                    <select class="admin-select admin-select-sm" onchange="calendarSettings.overrides[${th.id}]=parseInt(this.value);showAdminToast(t('adminSaved'))">
                      <option value="" ${!calendarSettings.overrides[th.id] ? 'selected' : ''}>${t('adminCalUseDefault')}</option>
                      ${[7,14,30,60,90,120].map(d => `<option value="${d}" ${calendarSettings.overrides[th.id] === d ? 'selected' : ''}>${d} ${t('adminCalDays')}</option>`).join('')}
                    </select>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="admin-card admin-card-wide">
        <h3 class="admin-card-title">${t('adminCalBlackout')}</h3>
        <div class="admin-blackout-list">
          ${calendarSettings.blackoutDates.map((d, i) => `
            <div class="admin-blackout-item">
              <span>${d}</span>
              <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="calendarSettings.blackoutDates.splice(${i},1);renderCalendarSettings(document.getElementById('admin-content'),document.getElementById('admin-page-title'))">✕</button>
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

function adminAddBlackout() {
  const input = document.getElementById('new-blackout-date');
  if (input.value && !calendarSettings.blackoutDates.includes(input.value)) {
    calendarSettings.blackoutDates.push(input.value);
    calendarSettings.blackoutDates.sort();
    showAdminToast(t('adminSaved'));
    renderCalendarSettings(document.getElementById('admin-content'), document.getElementById('admin-page-title'));
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

// --- Init ---
window.addEventListener('hashchange', adminRouter);
window.addEventListener('DOMContentLoaded', () => {
  adminSetTheme(adminGetTheme());
  document.getElementById('admin-lang-label').textContent = t('language');
  if (!window.location.hash || !window.location.hash.startsWith('#/admin')) {
    window.location.hash = '#/admin';
  }
  adminRouter();
});
