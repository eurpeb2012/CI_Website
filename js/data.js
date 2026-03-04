// ===== Therapist Tiers =====
const therapistTiers = {
  free: {
    key: 'free',
    icon: '🌱',
    nameKey: 'tierFreeName',
    descKey: 'tierFreeDesc',
    priceKey: 'tierFreePrice',
    features: ['tierFeatureBasicListing', 'tierFeature3Bookings', 'tierFeatureScheduleView'],
    maxBookings: 3,
    canEditSchedule: false,
    platformFee: 0,
  },
  standard: {
    key: 'standard',
    icon: '🌿',
    nameKey: 'tierStandardName',
    descKey: 'tierStandardDesc',
    priceKey: 'tierStandardPrice',
    features: ['tierFeatureUnlimitedBookings', 'tierFeatureScheduleEdit', 'tierFeature9Fee'],
    maxBookings: Infinity,
    canEditSchedule: true,
    platformFee: 9,
  },
  premium: {
    key: 'premium',
    icon: '🌳',
    nameKey: 'tierPremiumName',
    descKey: 'tierPremiumDesc',
    priceKey: 'tierPremiumPrice',
    features: ['tierFeaturePriority', 'tierFeatureAnalytics', 'tierFeatureScheduleEdit', 'tierFeature9Fee'],
    maxBookings: Infinity,
    canEditSchedule: true,
    platformFee: 9,
  },
};

// ===== Therapist Data =====
const therapists = [
  {
    id: 1,
    name: { ja: '山田 花子', en: 'Hanako Yamada' },
    username: '@hanako_healing',
    avatar: null,
    avatarColor: '#a8d5ba',
    tier: 'premium',
    isFoundingMember: true,
    referralCode: 'HANAKO2026',
    referrals: [2],
    intro: {
      ja: '10年以上のアロマセラピー経験を持ち、心と身体のバランスを大切にしたセッションを提供しています。お一人おひとりに寄り添った癒しの時間をお約束します。',
      en: 'With over 10 years of aromatherapy experience, I offer sessions focused on balancing mind and body. I promise a healing experience tailored to each individual.'
    },
    location: { ja: '東京都渋谷区', en: 'Shibuya, Tokyo' },
    categories: ['mental', 'physical'],
    delivery: ['in-person', 'video'],
    sessions: [
      {
        id: 101,
        name: { ja: 'アロマリラクゼーション', en: 'Aroma Relaxation' },
        description: {
          ja: '厳選されたエッセンシャルオイルを使用した全身リラクゼーション。ストレス解消と深いリラックスを促します。',
          en: 'Full-body relaxation using carefully selected essential oils. Promotes stress relief and deep relaxation.'
        },
        price: 8000,
        duration: 60,
        delivery: ['in-person']
      },
      {
        id: 102,
        name: { ja: 'オンライン瞑想ガイド', en: 'Online Meditation Guide' },
        description: {
          ja: 'ビデオ通話での瞑想セッション。呼吸法と瞑想のテクニックを丁寧にガイドします。',
          en: 'Meditation session via video call. Gentle guidance through breathing and meditation techniques.'
        },
        price: 4000,
        duration: 45,
        delivery: ['video']
      }
    ],
    availability: [
      { day: 1, slots: ['10:00', '14:00', '16:00'] },
      { day: 3, slots: ['10:00', '13:00'] },
      { day: 5, slots: ['11:00', '15:00'] },
    ],
    reviews: [
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 5,
        text: { ja: 'とても癒されました。アロマの香りが素晴らしく、リラックスできました。', en: 'Very healing. The aroma was wonderful and I felt so relaxed.' },
        date: '2026-02-15',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Kさん', en: 'K.' },
        rating: 4,
        text: { ja: 'オンライン瞑想がとても良かったです。続けたいと思います。', en: 'The online meditation was great. I want to continue.' },
        date: '2026-01-28',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '山田 花子', en: 'Hanako Yamada' },
        rating: 5,
        text: { ja: 'とても真摯にセッションに取り組まれていました。また是非お会いしたいです。', en: 'Very sincere during the session. I would love to meet again.' },
        date: '2026-02-16',
        type: 'therapist-to-client',
        clientName: { ja: '匿名ユーザー', en: 'Anonymous' }
      }
    ]
  },
  {
    id: 2,
    name: { ja: '鈴木 太郎', en: 'Taro Suzuki' },
    username: '@taro_bodywork',
    avatar: null,
    avatarColor: '#7ec8a0',
    tier: 'standard',
    isFoundingMember: false,
    referralCode: 'TARO2026',
    referrals: [],
    intro: {
      ja: '整体師として15年の実績。スポーツ整体から日常の疲れまで、幅広く対応します。身体の声に耳を傾け、根本からの改善を目指します。',
      en: '15 years as a bodywork practitioner. From sports injuries to daily fatigue, I address a wide range of needs. I listen to your body and aim for fundamental improvement.'
    },
    location: { ja: '大阪府大阪市', en: 'Osaka City, Osaka' },
    categories: ['physical'],
    delivery: ['in-person'],
    sessions: [
      {
        id: 201,
        name: { ja: '全身整体コース', en: 'Full Body Adjustment' },
        description: {
          ja: '全身の歪みを整え、血流を改善する本格整体。肩こり・腰痛にお悩みの方に。',
          en: 'Professional bodywork to correct alignment and improve circulation. For those with shoulder and back pain.'
        },
        price: 7000,
        duration: 60,
        delivery: ['in-person']
      },
      {
        id: 202,
        name: { ja: 'スポーツ整体', en: 'Sports Bodywork' },
        description: {
          ja: 'スポーツ後のケアや怪我の予防に特化した整体コース。',
          en: 'Bodywork specialized for post-sport care and injury prevention.'
        },
        price: 9000,
        duration: 75,
        delivery: ['in-person']
      }
    ],
    availability: [
      { day: 0, slots: ['10:00', '13:00', '15:00'] },
      { day: 2, slots: ['11:00', '14:00'] },
      { day: 4, slots: ['10:00', '13:00', '16:00'] },
      { day: 6, slots: ['10:00', '12:00'] },
    ],
    reviews: [
      {
        author: { ja: 'Mさん', en: 'M.' },
        rating: 5,
        text: { ja: '長年の腰痛が改善しました！通い続けたいです。', en: 'My chronic back pain improved! I want to keep coming.' },
        date: '2026-02-20',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '鈴木 太郎', en: 'Taro Suzuki' },
        rating: 5,
        text: { ja: '回復への意欲が高く、しっかりとホームケアにも取り組んでいただけました。', en: 'Very motivated for recovery and diligently followed home care instructions.' },
        date: '2026-02-21',
        type: 'therapist-to-client',
        clientName: { ja: 'Mさん', en: 'M.' }
      }
    ]
  },
  {
    id: 3,
    name: { ja: '佐藤 美月', en: 'Mitsuki Sato' },
    username: '@mitsuki_tarot',
    avatar: null,
    avatarColor: '#c4a8d5',
    tier: 'premium',
    isFoundingMember: true,
    referralCode: 'MITSUKI2026',
    referrals: [4],
    intro: {
      ja: 'タロットリーディング歴8年。あなたの心の奥にある答えを一緒に見つけましょう。対面・オンライン・メールすべてに対応しています。',
      en: '8 years of tarot reading experience. Let\'s find the answers hidden in your heart. Available in person, online, and via email.'
    },
    location: { ja: '京都府京都市', en: 'Kyoto City, Kyoto' },
    categories: ['playful', 'mental'],
    delivery: ['in-person', 'video', 'email'],
    sessions: [
      {
        id: 301,
        name: { ja: 'タロットリーディング', en: 'Tarot Reading' },
        description: {
          ja: '78枚のタロットカードを使った本格リーディング。恋愛・仕事・人生の悩みに。',
          en: 'Full reading with 78 tarot cards. For love, career, and life questions.'
        },
        price: 5000,
        duration: 45,
        delivery: ['in-person', 'video']
      },
      {
        id: 302,
        name: { ja: 'メールタロット鑑定', en: 'Email Tarot Reading' },
        description: {
          ja: 'お悩みをメールでお送りいただき、カードの結果を詳しくレポートでお返しします。',
          en: 'Send your question via email and receive a detailed card reading report.'
        },
        price: 3000,
        duration: 0,
        delivery: ['email']
      },
      {
        id: 303,
        name: { ja: 'オラクルカード体験', en: 'Oracle Card Experience' },
        description: {
          ja: '初心者向けのやさしいカードリーディング体験。気軽にお試しください。',
          en: 'A gentle card reading experience for beginners. Feel free to try!'
        },
        price: 2500,
        duration: 30,
        delivery: ['in-person', 'video']
      }
    ],
    availability: [
      { day: 1, slots: ['13:00', '15:00', '17:00'] },
      { day: 2, slots: ['13:00', '15:00'] },
      { day: 4, slots: ['10:00', '13:00', '15:00', '17:00'] },
      { day: 5, slots: ['13:00', '15:00'] },
    ],
    reviews: [
      {
        author: { ja: 'Aさん', en: 'A.' },
        rating: 5,
        text: { ja: '的確なリーディングで驚きました。とても参考になりました。', en: 'I was amazed by the accurate reading. Very helpful.' },
        date: '2026-02-10',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Yさん', en: 'Y.' },
        rating: 5,
        text: { ja: 'メール鑑定がとても丁寧で、心が軽くなりました。', en: 'The email reading was very thorough and my heart feels lighter.' },
        date: '2026-01-15',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 4,
        text: { ja: 'オラクルカード体験、初めてでしたが楽しかったです！', en: 'It was my first oracle card experience and it was fun!' },
        date: '2026-02-25',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '佐藤 美月', en: 'Mitsuki Sato' },
        rating: 5,
        text: { ja: 'とてもオープンな気持ちでセッションに臨んでいただき、素晴らしい時間でした。', en: 'Approached the session with such an open mind. It was a wonderful time.' },
        date: '2026-02-11',
        type: 'therapist-to-client',
        clientName: { ja: 'Aさん', en: 'A.' }
      }
    ]
  },
  {
    id: 4,
    name: { ja: '田中 誠', en: 'Makoto Tanaka' },
    username: '@makoto_counselor',
    avatar: null,
    avatarColor: '#8bc4c1',
    tier: 'free',
    isFoundingMember: false,
    referralCode: 'MAKOTO2026',
    referrals: [],
    intro: {
      ja: '臨床心理士・公認心理師。大学病院での10年の臨床経験を経て、オンラインカウンセリングを中心に活動しています。うつ・不安・人間関係のお悩みに寄り添います。',
      en: 'Licensed clinical psychologist. After 10 years at a university hospital, I now focus on online counseling. I support those dealing with depression, anxiety, and relationship issues.'
    },
    location: { ja: '東京都（オンライン中心）', en: 'Tokyo (primarily online)' },
    categories: ['pro'],
    delivery: ['video', 'email'],
    sessions: [
      {
        id: 401,
        name: { ja: 'オンラインカウンセリング', en: 'Online Counseling' },
        description: {
          ja: 'ビデオ通話による個別カウンセリング。初回はお悩みの整理と方向性の相談を行います。',
          en: 'Individual counseling via video call. First session includes organizing concerns and discussing direction.'
        },
        price: 10000,
        duration: 50,
        delivery: ['video']
      },
      {
        id: 402,
        name: { ja: 'メール相談', en: 'Email Consultation' },
        description: {
          ja: 'メールでのやり取りによる相談。じっくり考えて返信したい方に。週2回のやり取りを基本とします。',
          en: 'Consultation via email exchange. For those who prefer to think carefully. Based on 2 exchanges per week.'
        },
        price: 6000,
        duration: 0,
        delivery: ['email']
      }
    ],
    availability: [
      { day: 1, slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 2, slots: ['10:00', '11:00', '14:00', '15:00'] },
      { day: 3, slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 4, slots: ['10:00', '11:00', '14:00'] },
    ],
    reviews: [
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 5,
        text: { ja: '丁寧に話を聞いていただき、気持ちが楽になりました。継続してお世話になっています。', en: 'They listened carefully and I felt much better. I continue to see them regularly.' },
        date: '2026-02-18',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Tさん', en: 'T.' },
        rating: 5,
        text: { ja: 'メール相談でも十分な支援を感じました。文章で整理できるのが自分に合っています。', en: 'I felt well supported even through email. Organizing my thoughts in writing suits me.' },
        date: '2026-01-30',
        type: 'client-to-therapist'
      }
    ]
  }
];

// ===== Mock Chat Data =====
const mockChats = {
  1: [
    { from: 'user', text: { ja: 'こんにちは！アロマセッションについて質問があります。', en: 'Hello! I have a question about the aroma session.' }, time: '14:00' },
    { from: 'therapist', text: { ja: 'こんにちは！お気軽にどうぞ。何でもお聞きください。', en: 'Hello! Feel free to ask anything.' }, time: '14:02' },
    { from: 'user', text: { ja: '初回でも60分のフルセッションは受けられますか？', en: 'Can I get the full 60-minute session on my first visit?' }, time: '14:05' },
    { from: 'therapist', text: { ja: 'もちろんです！初回はカウンセリングも含めて少し長めにお時間をいただいています。お気軽にご予約ください。', en: 'Of course! For the first visit, we take a bit extra time including a consultation. Feel free to book.' }, time: '14:08' },
  ],
  2: [
    { from: 'user', text: { ja: '腰痛がひどいのですが、整体で改善できますか？', en: 'I have severe back pain. Can bodywork help?' }, time: '10:00' },
    { from: 'therapist', text: { ja: 'はい、多くの方が改善されています。まず状態を確認させていただき、適切なアプローチを提案します。', en: 'Yes, many clients have improved. Let me assess your condition first and suggest the right approach.' }, time: '10:05' },
    { from: 'user', text: { ja: 'ありがとうございます。予約したいです！', en: 'Thank you. I\'d like to book!' }, time: '10:08' },
  ],
  3: [
    { from: 'user', text: { ja: 'タロットは初めてなのですが、大丈夫ですか？', en: 'This is my first time with tarot. Is that okay?' }, time: '13:00' },
    { from: 'therapist', text: { ja: '初めての方大歓迎です！オラクルカード体験コースがおすすめですよ。リラックスして楽しんでいただけます。', en: 'First-timers are welcome! I recommend the Oracle Card Experience. You can relax and enjoy it.' }, time: '13:03' },
    { from: 'user', text: { ja: 'それ良いですね！オンラインでもできますか？', en: 'That sounds great! Is it available online too?' }, time: '13:06' },
    { from: 'therapist', text: { ja: 'はい、ビデオ通話でも対応しています。画面越しでも十分にカードのエネルギーを感じていただけますよ。', en: 'Yes, it\'s available via video call too. You can still feel the card energy through the screen.' }, time: '13:10' },
  ],
  4: [
    { from: 'user', text: { ja: 'カウンセリングを受けたいのですが、どのように進みますか？', en: 'I\'d like to try counseling. How does it work?' }, time: '10:00' },
    { from: 'therapist', text: { ja: '初回ではまずお話をお聞きし、一緒にお悩みを整理していきます。安心してお話しいただける環境を大切にしています。', en: 'In the first session, I listen to you and we organize your concerns together. I prioritize creating a safe space.' }, time: '10:05' },
    { from: 'user', text: { ja: 'わかりました。メール相談から始めても良いですか？', en: 'I see. Can I start with email consultation?' }, time: '10:10' },
  ],
};

// ===== Mock Dashboard Data =====
const mockDashboardData = {
  1: {
    bookingsCount: 24,
    averageRating: 4.8,
    monthlyEarnings: 186000,
    sessionRevenue: 192000,
    platformFee: 17280,
    referralIncome: 3200,
    netEarnings: 177920,
    clients: [
      { name: { ja: '匿名ユーザー', en: 'Anonymous' }, lastBooking: '2026-02-28', reviewed: true },
      { name: { ja: 'Kさん', en: 'K.' }, lastBooking: '2026-02-25', reviewed: true },
      { name: { ja: 'Sさん', en: 'S.' }, lastBooking: '2026-02-20', reviewed: false },
      { name: { ja: 'Nさん', en: 'N.' }, lastBooking: '2026-02-15', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 192000, fee: 17280, referral: 3200, net: 177920 },
      { month: '2026-01', revenue: 168000, fee: 15120, referral: 2800, net: 155680 },
      { month: '2025-12', revenue: 144000, fee: 12960, referral: 2400, net: 133440 },
    ],
    referralStats: { totalReferred: 1, totalEarnings: 8400 },
  },
  2: {
    bookingsCount: 18,
    averageRating: 4.9,
    monthlyEarnings: 142000,
    sessionRevenue: 144000,
    platformFee: 12960,
    referralIncome: 0,
    netEarnings: 131040,
    clients: [
      { name: { ja: 'Mさん', en: 'M.' }, lastBooking: '2026-02-27', reviewed: true },
      { name: { ja: 'Hさん', en: 'H.' }, lastBooking: '2026-02-22', reviewed: false },
      { name: { ja: 'Tさん', en: 'T.' }, lastBooking: '2026-02-18', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 144000, fee: 12960, referral: 0, net: 131040 },
      { month: '2026-01', revenue: 126000, fee: 11340, referral: 0, net: 114660 },
    ],
    referralStats: { totalReferred: 0, totalEarnings: 0 },
  },
  3: {
    bookingsCount: 31,
    averageRating: 4.9,
    monthlyEarnings: 128000,
    sessionRevenue: 135000,
    platformFee: 12150,
    referralIncome: 5200,
    netEarnings: 128050,
    clients: [
      { name: { ja: 'Aさん', en: 'A.' }, lastBooking: '2026-02-28', reviewed: true },
      { name: { ja: 'Yさん', en: 'Y.' }, lastBooking: '2026-02-26', reviewed: true },
      { name: { ja: '匿名ユーザー', en: 'Anonymous' }, lastBooking: '2026-02-25', reviewed: false },
      { name: { ja: 'Rさん', en: 'R.' }, lastBooking: '2026-02-20', reviewed: false },
      { name: { ja: 'Wさん', en: 'W.' }, lastBooking: '2026-02-14', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 135000, fee: 12150, referral: 5200, net: 128050 },
      { month: '2026-01', revenue: 115000, fee: 10350, referral: 4800, net: 109450 },
      { month: '2025-12', revenue: 98000, fee: 8820, referral: 3600, net: 92780 },
    ],
    referralStats: { totalReferred: 1, totalEarnings: 13600 },
  },
  4: {
    bookingsCount: 3,
    averageRating: 5.0,
    monthlyEarnings: 26000,
    sessionRevenue: 26000,
    platformFee: 0,
    referralIncome: 0,
    netEarnings: 26000,
    clients: [
      { name: { ja: '匿名ユーザー', en: 'Anonymous' }, lastBooking: '2026-02-18', reviewed: false },
      { name: { ja: 'Tさん', en: 'T.' }, lastBooking: '2026-01-30', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 26000, fee: 0, referral: 0, net: 26000 },
      { month: '2026-01', revenue: 16000, fee: 0, referral: 0, net: 16000 },
    ],
    referralStats: { totalReferred: 0, totalEarnings: 0 },
  },
};

// ===== Mock User Reviews (from therapists about clients) =====
const mockUserReviews = [
  {
    therapistId: 1,
    therapistName: { ja: '山田 花子', en: 'Hanako Yamada' },
    rating: 5,
    text: { ja: 'とても真摯にセッションに取り組まれていました。また是非お会いしたいです。', en: 'Very sincere during the session. I would love to meet again.' },
    date: '2026-02-16'
  },
  {
    therapistId: 3,
    therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' },
    rating: 5,
    text: { ja: 'オープンな気持ちで参加してくださり、素晴らしいセッションになりました。', en: 'Participated with an open mind, making it a wonderful session.' },
    date: '2026-02-11'
  },
];

// ===== Helper Functions =====
function getTherapist(id) {
  return therapists.find(t => t.id === parseInt(id));
}

function getTherapistByReferralCode(code) {
  return therapists.find(t => t.referralCode === code);
}

function searchTherapists(filters) {
  let results = therapists.filter(therapist => {
    if (filters.category && !therapist.categories.includes(filters.category)) return false;
    if (filters.delivery && !therapist.delivery.includes(filters.delivery)) return false;
    if (filters.maxPrice) {
      const minPrice = Math.min(...therapist.sessions.map(s => s.price));
      if (minPrice > filters.maxPrice) return false;
    }
    return true;
  });
  // Premium therapists first
  results.sort((a, b) => {
    const tierOrder = { premium: 0, standard: 1, free: 2 };
    return (tierOrder[a.tier] || 2) - (tierOrder[b.tier] || 2);
  });
  return results;
}

function getLocalizedText(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[getLang()] || obj['ja'] || '';
}

function getChatMessages(therapistId) {
  return mockChats[therapistId] || [];
}

function getDashboardData(therapistId) {
  return mockDashboardData[therapistId] || mockDashboardData[1];
}
