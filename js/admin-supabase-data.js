// ===== Admin Supabase Data Layer =====
// Fetches admin panel data from Supabase views and tables,
// with fallback to mock data in admin-data.js.
// Expects global `supabase` client from js/supabase.js.

// ---------------------------------------------------------------------------
// Dashboard stats
// ---------------------------------------------------------------------------
async function fetchAdminStats() {
  try {
    const [
      { count: totalTherapists, error: e1 },
      { count: totalUsers, error: e2 },
      { count: activeBookings, error: e3 },
      { data: revenueRows, error: e4 },
      { count: pendingModeration, error: e5 },
    ] = await Promise.all([
      supabase.from('therapists').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'upcoming'),
      supabase.from('admin_monthly_revenue').select('*').order('month', { ascending: false }).limit(1),
      supabase.from('moderation_queue').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);

    const errors = [e1, e2, e3, e4, e5].filter(Boolean);
    if (errors.length > 0) {
      console.warn('fetchAdminStats: Supabase errors, falling back to mock:', errors);
      return { ...adminStats };
    }

    const latest = (revenueRows && revenueRows.length > 0) ? revenueRows[0] : {};

    return {
      totalTherapists: totalTherapists || 0,
      totalUsers: totalUsers || 0,
      activeBookings: activeBookings || 0,
      monthlyRevenue: parseFloat(latest.gross_revenue) || 0,
      platformFees: parseFloat(latest.platform_fees) || 0,
      pendingModeration: pendingModeration || 0,
    };
  } catch (err) {
    console.warn('fetchAdminStats failed, using mock data:', err);
    return { ...adminStats };
  }
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------
async function fetchAdminBookings(filters = {}) {
  try {
    let query = supabase.from('admin_booking_detail').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.therapistId) {
      query = query.eq('therapist_id', filters.therapistId);
    }
    if (filters.dateFrom) {
      query = query.gte('booking_date', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.lte('booking_date', filters.dateTo);
    }

    query = query.order('booking_date', { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.warn('fetchAdminBookings: Supabase error, falling back to mock:', error);
      return applyBookingFilters([...adminBookings], filters);
    }

    return (data || []).map(transformBookingRow);
  } catch (err) {
    console.warn('fetchAdminBookings failed, using mock data:', err);
    return applyBookingFilters([...adminBookings], filters);
  }
}

function transformBookingRow(row) {
  return {
    id: row.id,
    date: row.booking_date,
    time: row.booking_time || '',
    clientName: { ja: row.client_name || '匿名ユーザー', en: row.client_email || 'Anonymous' },
    therapistName: { ja: row.therapist_name_ja || '', en: row.therapist_name_en || '' },
    therapistId: row.therapist_id,
    session: { ja: row.session_name_ja || '', en: row.session_name_en || '' },
    amount: parseFloat(row.price) || 0,
    platformFee: parseFloat(row.platform_fee) || 0,
    status: row.status,
    createdAt: row.created_at,
    cancelledAt: row.cancelled_at,
    duration: row.session_duration,
    therapistTier: row.therapist_tier,
  };
}

function applyBookingFilters(bookings, filters) {
  let result = bookings;
  if (filters.status) {
    result = result.filter(b => b.status === filters.status);
  }
  if (filters.therapistId) {
    result = result.filter(b => b.therapistId === filters.therapistId || b.therapistId === String(filters.therapistId));
  }
  if (filters.dateFrom) {
    result = result.filter(b => b.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    result = result.filter(b => b.date <= filters.dateTo);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Revenue
// ---------------------------------------------------------------------------
async function fetchMonthlyRevenue() {
  try {
    const { data, error } = await supabase
      .from('admin_monthly_revenue')
      .select('*')
      .order('month', { ascending: true });

    if (error) {
      console.warn('fetchMonthlyRevenue: Supabase error, falling back to mock:', error);
      return [...monthlyRevenueData];
    }

    return (data || []).map(row => ({
      month: row.month,
      total_bookings: row.total_bookings,
      completed_bookings: row.completed_bookings,
      cancelled_bookings: row.cancelled_bookings,
      upcoming_bookings: row.upcoming_bookings,
      gross_revenue: parseFloat(row.gross_revenue) || 0,
      platform_fees: parseFloat(row.platform_fees) || 0,
      therapist_payouts: parseFloat(row.therapist_payouts) || 0,
    }));
  } catch (err) {
    console.warn('fetchMonthlyRevenue failed, using mock data:', err);
    return [...monthlyRevenueData];
  }
}

async function fetchTherapistEarnings() {
  try {
    const { data, error } = await supabase
      .from('admin_therapist_earnings')
      .select('*')
      .order('gross_revenue', { ascending: false });

    if (error) {
      console.warn('fetchTherapistEarnings: Supabase error, falling back to mock:', error);
      return buildTherapistFallback();
    }

    return (data || []).map(row => ({
      therapist_id: row.therapist_id,
      name: { ja: row.name_ja || '', en: row.name_en || '' },
      name_ja: row.name_ja || '',
      name_en: row.name_en || '',
      tier: row.tier,
      verified: row.verified,
      status: row.status,
      total_bookings: row.total_bookings,
      completed_bookings: row.completed_bookings,
      gross_revenue: parseFloat(row.gross_revenue) || 0,
      platform_fees: parseFloat(row.platform_fees) || 0,
      therapist_earnings: parseFloat(row.therapist_earnings) || 0,
      avg_rating: parseFloat(row.avg_rating) || 0,
      review_count: row.review_count,
    }));
  } catch (err) {
    console.warn('fetchTherapistEarnings failed, using mock data:', err);
    return buildTherapistFallback();
  }
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------
async function fetchAdminUsers(filters = {}) {
  try {
    let query = supabase.from('users').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.search) {
      const term = `%${filters.search}%`;
      query = query.or(`display_name.ilike.${term},email.ilike.${term}`);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.warn('fetchAdminUsers: Supabase error, falling back to mock:', error);
      return applyUserFilters([...adminUsers], filters);
    }

    return (data || []).map(row => ({
      id: row.id,
      name: { ja: row.display_name || '匿名ユーザー', en: row.display_name || 'Anonymous' },
      email: row.email || '',
      joinDate: row.created_at ? row.created_at.slice(0, 10) : '',
      bookingsCount: row.bookings_count || 0,
      status: row.status || 'active',
    }));
  } catch (err) {
    console.warn('fetchAdminUsers failed, using mock data:', err);
    return applyUserFilters([...adminUsers], filters);
  }
}

function applyUserFilters(users, filters) {
  let result = users;
  if (filters.status) {
    result = result.filter(u => u.status === filters.status);
  }
  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(u =>
      u.name.ja.toLowerCase().includes(term) ||
      u.name.en.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  }
  return result;
}

// ---------------------------------------------------------------------------
// Therapists (admin CRUD)
// ---------------------------------------------------------------------------
function buildTherapistFallback() {
  return (typeof therapists !== 'undefined' ? therapists : []).map(th => ({
    therapist_id: th.id,
    name: typeof th.name === 'object' ? th.name : { ja: th.name_ja || '', en: th.name_en || '' },
    name_ja: typeof th.name === 'object' ? th.name.ja : (th.name_ja || ''),
    name_en: typeof th.name === 'object' ? th.name.en : (th.name_en || ''),
    tier: th.tier || 'free',
    verified: th.verified || false,
    status: th.status || 'active',
    total_bookings: 0,
    completed_bookings: 0,
    gross_revenue: 0,
    platform_fees: 0,
    therapist_earnings: 0,
    avg_rating: 0,
    review_count: th.reviews ? th.reviews.length : 0,
  }));
}

async function fetchAdminTherapists() {
  try {
    const { data, error } = await supabase
      .from('admin_therapist_earnings')
      .select('*')
      .order('name_ja', { ascending: true });

    if (error) {
      console.warn('fetchAdminTherapists: Supabase error, falling back to mock:', error);
      return buildTherapistFallback();
    }

    return (data || []).map(row => ({
      therapist_id: row.therapist_id,
      name: { ja: row.name_ja || '', en: row.name_en || '' },
      name_ja: row.name_ja || '',
      name_en: row.name_en || '',
      tier: row.tier,
      verified: row.verified,
      status: row.status,
      total_bookings: row.total_bookings,
      completed_bookings: row.completed_bookings,
      gross_revenue: parseFloat(row.gross_revenue) || 0,
      platform_fees: parseFloat(row.platform_fees) || 0,
      therapist_earnings: parseFloat(row.therapist_earnings) || 0,
      avg_rating: parseFloat(row.avg_rating) || 0,
      review_count: row.review_count,
    }));
  } catch (err) {
    console.warn('fetchAdminTherapists failed, using mock data:', err);
    return buildTherapistFallback();
  }
}

async function updateTherapistStatus(therapistId, status) {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .update({ status })
      .eq('id', therapistId)
      .select()
      .single();

    if (error) {
      console.warn('updateTherapistStatus: Supabase error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('updateTherapistStatus failed:', err);
    return { success: false, error: err };
  }
}

async function updateTherapistTier(therapistId, tier) {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .update({ tier })
      .eq('id', therapistId)
      .select()
      .single();

    if (error) {
      console.warn('updateTherapistTier: Supabase error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('updateTherapistTier failed:', err);
    return { success: false, error: err };
  }
}

async function updateTherapistVerified(therapistId, verified) {
  try {
    const { data, error } = await supabase
      .from('therapists')
      .update({ verified })
      .eq('id', therapistId)
      .select()
      .single();

    if (error) {
      console.warn('updateTherapistVerified: Supabase error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('updateTherapistVerified failed:', err);
    return { success: false, error: err };
  }
}

// ---------------------------------------------------------------------------
// Moderation
// ---------------------------------------------------------------------------
async function fetchModerationQueue(filters = {}) {
  try {
    let query = supabase.from('admin_moderation_detail').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.warn('fetchModerationQueue: Supabase error, falling back to mock:', error);
      return applyModerationFilters([...moderationQueue], filters);
    }

    return (data || []).map(transformModerationRow);
  } catch (err) {
    console.warn('fetchModerationQueue failed, using mock data:', err);
    return applyModerationFilters([...moderationQueue], filters);
  }
}

function transformModerationRow(row) {
  return {
    id: row.id,
    type: row.item_type || 'report',
    content: { ja: row.content_preview || '', en: row.content_preview || '' },
    reporter: { ja: row.reporter_name || '匿名', en: row.reporter_email || 'Anonymous' },
    targetTherapist: { ja: row.target_therapist_name || '', en: row.target_therapist_name || '' },
    reason: { ja: row.reason || '', en: row.reason || '' },
    date: row.created_at ? row.created_at.slice(0, 10) : '',
    status: row.status,
    resolvedAt: row.resolved_at,
    itemId: row.item_id,
  };
}

function applyModerationFilters(items, filters) {
  let result = items;
  if (filters.status) {
    result = result.filter(m => m.status === filters.status);
  }
  return result;
}

async function updateModerationItem(itemId, newStatus, resolvedBy) {
  try {
    const updatePayload = {
      status: newStatus,
      resolved_at: (newStatus === 'resolved' || newStatus === 'dismissed') ? new Date().toISOString() : null,
    };
    if (resolvedBy) {
      updatePayload.resolved_by = resolvedBy;
    }

    const { data, error } = await supabase
      .from('moderation_queue')
      .update(updatePayload)
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      console.warn('updateModerationItem: Supabase error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('updateModerationItem failed:', err);
    return { success: false, error: err };
  }
}

// ---------------------------------------------------------------------------
// Referrals
// ---------------------------------------------------------------------------
async function fetchAdminReferrals() {
  try {
    const { data, error } = await supabase
      .from('admin_referral_summary')
      .select('*')
      .order('total_commission', { ascending: false });

    if (error) {
      console.warn('fetchAdminReferrals: Supabase error, falling back to mock:', error);
      return [...adminReferrals];
    }

    return (data || []).map(row => ({
      therapist_id: row.therapist_id,
      name_ja: row.name_ja || '',
      name_en: row.name_en || '',
      referral_code: row.referral_code || '',
      total_referred: row.total_referred || 0,
      referred_ids: row.referred_ids || [],
      commission_rate: parseFloat(row.commission_rate) || 0,
      total_commission: parseFloat(row.total_commission) || 0,
      status: 'active',
    }));
  } catch (err) {
    console.warn('fetchAdminReferrals failed, using mock data:', err);
    return [...adminReferrals];
  }
}

// ---------------------------------------------------------------------------
// Content stats
// ---------------------------------------------------------------------------
async function fetchContentStats() {
  try {
    const [
      { count: forumThreads, error: e1 },
      { count: forumReplies, error: e2 },
      { count: blogArticles, error: e3 },
      { count: reviews, error: e4 },
      { count: totalMessages, error: e5 },
    ] = await Promise.all([
      supabase.from('forum_threads').select('*', { count: 'exact', head: true }),
      supabase.from('forum_replies').select('*', { count: 'exact', head: true }),
      supabase.from('blog_articles').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
    ]);

    const errors = [e1, e2, e3, e4, e5].filter(Boolean);
    if (errors.length > 0) {
      console.warn('fetchContentStats: Supabase errors, falling back to defaults:', errors);
      return { forumThreads: 0, forumReplies: 0, blogArticles: 0, reviews: 0, totalMessages: 0 };
    }

    return {
      forumThreads: forumThreads || 0,
      forumReplies: forumReplies || 0,
      blogArticles: blogArticles || 0,
      reviews: reviews || 0,
      totalMessages: totalMessages || 0,
    };
  } catch (err) {
    console.warn('fetchContentStats failed:', err);
    return { forumThreads: 0, forumReplies: 0, blogArticles: 0, reviews: 0, totalMessages: 0 };
  }
}

// ---------------------------------------------------------------------------
// Platform settings
// ---------------------------------------------------------------------------
async function fetchPlatformSettings() {
  try {
    const { data, error } = await supabase
      .from('platform_settings')
      .select('*');

    if (error) {
      console.warn('fetchPlatformSettings: Supabase error, falling back to mock:', error);
      return { ...calendarSettings };
    }

    // Convert key/value rows into an object
    const raw = {};
    for (const row of (data || [])) {
      // value is already JSONB, no need to parse
      raw[row.key] = row.value;
    }

    // Map DB keys to the shape the render expects
    const bookingWindow = raw.booking_window || {};
    return {
      globalMaxDays: bookingWindow.global_max_days || 30,
      tierDefaults: bookingWindow.tier_defaults || { free: 14, standard: 30, premium: 60 },
      blackoutDates: raw.blocked_dates || [],
      platformFeePercent: raw.platform_fee_percent || 9,
    };
  } catch (err) {
    console.warn('fetchPlatformSettings failed, using mock data:', err);
    return { ...calendarSettings };
  }
}

async function updatePlatformSetting(key, value) {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);

    const { data, error } = await supabase
      .from('platform_settings')
      .upsert({ key, value: serialized }, { onConflict: 'key' })
      .select()
      .single();

    if (error) {
      console.warn('updatePlatformSetting: Supabase error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('updatePlatformSetting failed:', err);
    return { success: false, error: err };
  }
}
