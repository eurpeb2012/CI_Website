// ===== Supabase Data Layer =====
// Fetches data from Supabase and transforms it into the same shape
// as the mock data in data.js, so app.js needs zero changes.

async function loadSupabaseData() {
  try {
    const [
      { data: dbTherapists, error: e1 },
      { data: dbSessions, error: e2 },
      { data: dbReviews, error: e3 },
      { data: dbRetreats, error: e4 },
      { data: dbBlogArticles, error: e5 },
      { data: dbDigitalProducts, error: e6 },
      { data: dbForumThreads, error: e7 },
      { data: dbForumReplies, error: e8 },
      { data: dbAvailability, error: e9 },
      { data: dbReferrals, error: e10 },
    ] = await Promise.all([
      supabase.from('therapists').select('*'),
      supabase.from('sessions').select('*'),
      supabase.from('reviews').select('*'),
      supabase.from('retreats').select('*').eq('is_active', true),
      supabase.from('blog_articles').select('*').order('published_at', { ascending: false }),
      supabase.from('digital_products').select('*'),
      supabase.from('forum_threads').select('*').order('created_at', { ascending: false }),
      supabase.from('forum_replies').select('*').order('created_at', { ascending: true }),
      supabase.from('availability').select('*'),
      supabase.from('therapist_referrals').select('*'),
    ]);

    const errors = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10].filter(Boolean);
    if (errors.length > 0) {
      console.warn('Supabase load errors (falling back to mock data):', errors);
      return false;
    }

    // Build lookup maps
    const sessionsByTherapist = groupBy(dbSessions, 'therapist_id');
    const reviewsByTherapist = groupBy(dbReviews, 'therapist_id');
    const availByTherapist = groupBy(dbAvailability, 'therapist_id');
    const repliesByThread = groupBy(dbForumReplies, 'thread_id');

    // Build referral map: therapist_id -> array of referred therapist_ids
    const referralMap = {};
    for (const ref of (dbReferrals || [])) {
      if (!referralMap[ref.referrer_id]) referralMap[ref.referrer_id] = [];
      referralMap[ref.referrer_id].push(ref.referred_id);
    }

    // Transform therapists
    therapists.length = 0; // Clear mock array, keep same reference
    for (const t of (dbTherapists || [])) {
      const sessions = (sessionsByTherapist[t.id] || []).map(s => ({
        id: s.id,
        name: { ja: s.name_ja, en: s.name_en || '' },
        description: { ja: s.description_ja || '', en: s.description_en || '' },
        price: s.price,
        duration: s.duration || 0,
        delivery: s.delivery || [],
      }));

      const reviews = (reviewsByTherapist[t.id] || []).map(r => ({
        author: r.review_type === 'therapist-to-client'
          ? { ja: t.name_ja, en: t.name_en || '' }
          : { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: r.rating,
        ratings: {
          communication: r.rating_communication,
          effectiveness: r.rating_effectiveness,
          atmosphere: r.rating_atmosphere,
          value: r.rating_value,
        },
        text: { ja: r.text_ja || '', en: r.text_en || '' },
        date: r.created_at ? r.created_at.slice(0, 10) : '',
        type: r.review_type,
        clientName: r.review_type === 'therapist-to-client'
          ? { ja: '匿名ユーザー', en: 'Anonymous' }
          : undefined,
      }));

      // Group availability by day_of_week
      const avail = (availByTherapist[t.id] || []);
      const availByDay = {};
      for (const a of avail) {
        if (!availByDay[a.day_of_week]) availByDay[a.day_of_week] = [];
        availByDay[a.day_of_week].push(a.start_time.slice(0, 5)); // "HH:MM"
      }
      const availability = Object.entries(availByDay).map(([day, slots]) => ({
        day: parseInt(day),
        slots: slots.sort(),
      }));

      // Find referred therapist integer-style IDs (will be resolved after all therapists loaded)
      const referredIds = referralMap[t.id] || [];

      therapists.push({
        id: t.id, // UUID now
        _numericId: null, // not used anymore
        name: { ja: t.name_ja, en: t.name_en || '' },
        username: '',
        avatar: t.avatar_url,
        avatarColor: t.avatar_color || '#a8d5ba',
        tier: t.tier || 'free',
        isFoundingMember: t.is_founding_member || false,
        referralCode: t.referral_code || '',
        referrals: referredIds,
        intro: { ja: t.intro_ja || '', en: t.intro_en || '' },
        location: { ja: t.location_ja || '', en: t.location_en || '' },
        categories: t.categories || [],
        delivery: t.delivery_methods || [],
        sessions,
        availability,
        verified: t.verified || false,
        credentials: (t.credentials || []).map(c => ({
          name: { ja: c.name_ja || c.name || '', en: c.name_en || '' },
          year: c.year,
        })),
        tags: t.tags || [],
        responseTime: t.response_time || '',
        gallery: [], // Gallery images not in DB yet
        slidingScale: t.sliding_scale || false,
        popularityScore: t.popularity_score || 0,
        reviews,
        status: t.status,
      });
    }

    // Transform retreats
    retreats.length = 0;
    for (const r of (dbRetreats || [])) {
      retreats.push({
        id: r.id,
        title: { ja: r.title_ja, en: r.title_en || '' },
        description: { ja: r.description_ja || '', en: r.description_en || '' },
        location: { ja: r.location_ja || '', en: r.location_en || '' },
        provider: { ja: r.provider_ja || '', en: r.provider_en || '' },
        duration: r.duration,
        price: r.price,
        includes: {
          ja: r.includes_ja || [],
          en: r.includes_en || [],
        },
        tags: r.tags || [],
        image: r.image_url,
      });
    }

    // Transform blog articles
    blogArticles.length = 0;
    for (const a of (dbBlogArticles || [])) {
      blogArticles.push({
        id: a.id,
        therapistId: a.therapist_id,
        title: { ja: a.title_ja, en: a.title_en || '' },
        excerpt: { ja: a.excerpt_ja || '', en: a.excerpt_en || '' },
        body: { ja: a.body_ja || '', en: a.body_en || '' },
        tags: a.tags || [],
        date: a.published_at ? a.published_at.slice(0, 10) : '',
      });
    }

    // Transform digital products
    digitalProducts.length = 0;
    for (const p of (dbDigitalProducts || [])) {
      digitalProducts.push({
        id: p.id,
        therapistId: p.therapist_id,
        name: { ja: p.name_ja, en: p.name_en || '' },
        description: { ja: p.description_ja || '', en: p.description_en || '' },
        price: p.price,
        type: p.product_type,
      });
    }

    // Transform forum threads
    forumThreads.length = 0;
    for (const t of (dbForumThreads || [])) {
      const replies = (repliesByThread[t.id] || []).map(r => ({
        id: r.id,
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        text: { ja: r.body_ja || '', en: r.body_en || '' },
        date: r.created_at ? r.created_at.slice(0, 10) : '',
      }));

      forumThreads.push({
        id: t.id,
        title: { ja: t.title_ja || '', en: t.title_en || '' },
        body: { ja: t.body_ja || '', en: t.body_en || '' },
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        tags: t.tags || [],
        isPinned: t.is_pinned || false,
        date: t.created_at ? t.created_at.slice(0, 10) : '',
        replies,
      });
    }

    console.log('Supabase data loaded:', {
      therapists: therapists.length,
      retreats: retreats.length,
      blogArticles: blogArticles.length,
      digitalProducts: digitalProducts.length,
      forumThreads: forumThreads.length,
    });

    return true;
  } catch (err) {
    console.warn('Supabase load failed, using mock data:', err);
    return false;
  }
}

// Utility: group array by key
function groupBy(arr, key) {
  const map = {};
  for (const item of (arr || [])) {
    const k = item[key];
    if (!map[k]) map[k] = [];
    map[k].push(item);
  }
  return map;
}
