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
    referrals: [2, 8],
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
    verified: true,
    credentials: [
      { name: { ja: 'AEAJ認定アロマセラピスト', en: 'AEAJ Certified Aromatherapist' }, year: 2016 },
      { name: { ja: 'NARD JAPANアロマアドバイザー', en: 'NARD JAPAN Aroma Advisor' }, year: 2018 }
    ],
    tags: ['stress', 'relaxation', 'aromatherapy', 'meditation', 'self-care'],
    responseTime: '1h',
    gallery: [
      { desc: { ja: 'エッセンシャルオイルが並ぶ落ち着いたセラピールーム', en: 'Calm therapy room lined with essential oils' } },
      { desc: { ja: 'セッションで使用するオーガニックアロマブレンド', en: 'Organic aroma blends used in sessions' } },
      { desc: { ja: '瞑想スペースとキャンドルライト', en: 'Meditation space with candlelight' } }
    ],
    slidingScale: false,
    popularityScore: 92,
    reviews: [
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 5, value: 4 },
        text: { ja: 'とても癒されました。アロマの香りが素晴らしく、リラックスできました。', en: 'Very healing. The aroma was wonderful and I felt so relaxed.' },
        date: '2026-02-15',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Kさん', en: 'K.' },
        rating: 4,
        ratings: { communication: 4, effectiveness: 4, atmosphere: 5, value: 4 },
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
    verified: true,
    credentials: [
      { name: { ja: '柔道整復師国家資格', en: 'National Judo Therapist License' }, year: 2011 },
      { name: { ja: 'スポーツ整体認定資格', en: 'Certified Sports Bodywork Practitioner' }, year: 2014 }
    ],
    tags: ['back-pain', 'sports', 'posture', 'injury-recovery', 'physical'],
    responseTime: '2h',
    gallery: [
      { desc: { ja: '広々とした施術ベッドのある整体院', en: 'Spacious bodywork clinic with treatment beds' } },
      { desc: { ja: 'スポーツ整体に使用する専門器具', en: 'Specialized tools for sports bodywork' } }
    ],
    slidingScale: false,
    popularityScore: 78,
    reviews: [
      {
        author: { ja: 'Mさん', en: 'M.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 4, value: 5 },
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
    referrals: [4, 7],
    intro: {
      ja: 'タロットリーディング歴8年。あなたの心の奥にある答えを一緒に見つけましょう。対面・オンライン・メールすべてに対応しています。',
      en: '8 years of tarot reading experience. Let\'s find the answers hidden in your heart. Available in person, online, and via email.'
    },
    location: { ja: '京都府京都市', en: 'Kyoto City, Kyoto' },
    categories: ['fortune-telling', 'playful'],
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
    verified: true,
    credentials: [
      { name: { ja: '日本タロット協会認定リーダー', en: 'Japan Tarot Association Certified Reader' }, year: 2019 },
      { name: { ja: 'オラクルカードリーディング修了', en: 'Oracle Card Reading Certificate' }, year: 2020 }
    ],
    tags: ['tarot', 'oracle', 'fortune-telling', 'love', 'career', 'beginners'],
    responseTime: '30m',
    gallery: [
      { desc: { ja: '京都の町家を改装した鑑定ルーム', en: 'Reading room in a renovated Kyoto townhouse' } },
      { desc: { ja: 'セッションで使用するタロットカードコレクション', en: 'Tarot card collection used in sessions' } },
      { desc: { ja: 'キャンドルとクリスタルで彩られたテーブル', en: 'Table adorned with candles and crystals' } }
    ],
    slidingScale: false,
    popularityScore: 88,
    reviews: [
      {
        author: { ja: 'Aさん', en: 'A.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 5, value: 5 },
        text: { ja: '的確なリーディングで驚きました。とても参考になりました。', en: 'I was amazed by the accurate reading. Very helpful.' },
        date: '2026-02-10',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Yさん', en: 'Y.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 4, atmosphere: 5, value: 5 },
        text: { ja: 'メール鑑定がとても丁寧で、心が軽くなりました。', en: 'The email reading was very thorough and my heart feels lighter.' },
        date: '2026-01-15',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 4,
        ratings: { communication: 4, effectiveness: 4, atmosphere: 4, value: 4 },
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
    categories: ['mental'],
    delivery: ['video', 'telephone', 'email'],
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
    verified: false,
    credentials: [
      { name: { ja: '臨床心理士', en: 'Clinical Psychologist' }, year: 2015 },
      { name: { ja: '公認心理師', en: 'Licensed Public Psychologist' }, year: 2019 }
    ],
    tags: ['anxiety', 'depression', 'relationships', 'cbt', 'mental-health'],
    responseTime: '4h',
    gallery: [
      { desc: { ja: '安心感のあるオンラインカウンセリング環境', en: 'Comfortable online counseling environment' } },
      { desc: { ja: '心理学関連の書籍が並ぶ書斎', en: 'Study lined with psychology books' } }
    ],
    slidingScale: true,
    popularityScore: 45,
    reviews: [
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 4, value: 4 },
        text: { ja: '丁寧に話を聞いていただき、気持ちが楽になりました。継続してお世話になっています。', en: 'They listened carefully and I felt much better. I continue to see them regularly.' },
        date: '2026-02-18',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Tさん', en: 'T.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 4, atmosphere: 5, value: 5 },
        text: { ja: 'メール相談でも十分な支援を感じました。文章で整理できるのが自分に合っています。', en: 'I felt well supported even through email. Organizing my thoughts in writing suits me.' },
        date: '2026-01-30',
        type: 'client-to-therapist'
      }
    ]
  },
  {
    id: 5,
    name: { ja: '中村 さくら', en: 'Sakura Nakamura' },
    username: '@sakura_yoga',
    avatar: null,
    avatarColor: '#d4a0c4',
    tier: 'standard',
    isFoundingMember: false,
    referralCode: 'SAKURA2026',
    referrals: [6],
    intro: {
      ja: 'ヨガインストラクター歴12年。ハタヨガとリストラティブヨガを中心に、心身のリセットをサポートします。初心者の方も大歓迎です。',
      en: '12 years as a yoga instructor. Specializing in Hatha and Restorative Yoga, I help reset your mind and body. Beginners are very welcome.'
    },
    location: { ja: '神奈川県横浜市', en: 'Yokohama, Kanagawa' },
    categories: ['physical', 'mental'],
    delivery: ['in-person', 'video'],
    sessions: [
      {
        id: 501,
        name: { ja: 'ハタヨガ（対面）', en: 'Hatha Yoga (In Person)' },
        description: {
          ja: '呼吸と動きを合わせた伝統的なヨガ。柔軟性と筋力を同時に高めます。',
          en: 'Traditional yoga combining breath and movement. Improves flexibility and strength simultaneously.'
        },
        price: 5500,
        duration: 60,
        delivery: ['in-person']
      },
      {
        id: 502,
        name: { ja: 'オンラインリストラティブヨガ', en: 'Online Restorative Yoga' },
        description: {
          ja: '道具を使ったやさしいポーズで深いリラクゼーションを。ストレスや不眠に悩む方におすすめ。',
          en: 'Gentle poses with props for deep relaxation. Recommended for stress and insomnia.'
        },
        price: 3500,
        duration: 45,
        delivery: ['video']
      }
    ],
    availability: [
      { day: 0, slots: ['9:00', '10:00'] },
      { day: 2, slots: ['10:00', '14:00', '16:00'] },
      { day: 4, slots: ['10:00', '14:00'] },
      { day: 6, slots: ['9:00', '10:00', '11:00'] },
    ],
    verified: true,
    credentials: [
      { name: { ja: '全米ヨガアライアンスRYT200', en: 'Yoga Alliance RYT200' }, year: 2014 },
      { name: { ja: 'リストラティブヨガ指導者資格', en: 'Restorative Yoga Teacher Certification' }, year: 2017 }
    ],
    tags: ['yoga', 'flexibility', 'sleep', 'beginners', 'stress-relief'],
    responseTime: '1h',
    gallery: [
      { desc: { ja: '自然光が差し込む明るいヨガスタジオ', en: 'Bright yoga studio with natural light' } },
      { desc: { ja: 'リストラティブヨガで使用するボルスターとブランケット', en: 'Bolsters and blankets used in restorative yoga' } },
      { desc: { ja: '横浜の海が見えるスタジオからの眺め', en: 'Ocean view from the Yokohama studio' } }
    ],
    slidingScale: false,
    popularityScore: 74,
    reviews: [
      {
        author: { ja: 'Eさん', en: 'E.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 5, value: 4 },
        text: { ja: '初めてのヨガでしたが、丁寧に教えてもらえてとても楽しかったです。身体がすっきりしました！', en: 'It was my first yoga class but she taught me so patiently. My body feels refreshed!' },
        date: '2026-02-22',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Oさん', en: 'O.' },
        rating: 4,
        ratings: { communication: 4, effectiveness: 4, atmosphere: 3, value: 4 },
        text: { ja: 'オンラインでもしっかり指導してもらえました。夜寝る前のヨガが習慣になりそうです。', en: 'Got good instruction even online. Yoga before bed might become a habit.' },
        date: '2026-02-10',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '中村 さくら', en: 'Sakura Nakamura' },
        rating: 5,
        text: { ja: 'とても熱心に取り組まれていて素晴らしかったです。ポーズの上達が早いですね。', en: 'Very dedicated and wonderful to work with. Your poses improved quickly.' },
        date: '2026-02-23',
        type: 'therapist-to-client',
        clientName: { ja: 'Eさん', en: 'E.' }
      }
    ]
  },
  {
    id: 6,
    name: { ja: '高橋 レイ', en: 'Rei Takahashi' },
    username: '@rei_energy',
    avatar: null,
    avatarColor: '#c4b078',
    tier: 'free',
    isFoundingMember: false,
    referralCode: 'REI2026',
    referrals: [],
    intro: {
      ja: 'レイキヒーラーとしてエネルギーワークを提供しています。目に見えない心のバランスを整え、本来の自分を取り戻すお手伝いをします。',
      en: 'I offer energy work as a Reiki healer. I help restore invisible emotional balance and reconnect you with your true self.'
    },
    location: { ja: '福岡県福岡市', en: 'Fukuoka City, Fukuoka' },
    categories: ['mental'],
    delivery: ['in-person', 'video'],
    sessions: [
      {
        id: 601,
        name: { ja: 'レイキヒーリング', en: 'Reiki Healing' },
        description: {
          ja: '手をかざすエネルギーワーク。チャクラのバランスを整え、自然治癒力を高めます。',
          en: 'Energy work through hand placement. Balances chakras and boosts natural healing.'
        },
        price: 6000,
        duration: 50,
        delivery: ['in-person']
      },
      {
        id: 602,
        name: { ja: '遠隔レイキ', en: 'Distance Reiki' },
        description: {
          ja: 'オンラインでのレイキセッション。場所を問わずエネルギーの調整が可能です。',
          en: 'Online Reiki session. Energy adjustments regardless of location.'
        },
        price: 4500,
        duration: 40,
        delivery: ['video']
      }
    ],
    availability: [
      { day: 1, slots: ['11:00', '14:00'] },
      { day: 3, slots: ['11:00', '14:00', '16:00'] },
      { day: 5, slots: ['11:00', '14:00'] },
    ],
    verified: false,
    credentials: [
      { name: { ja: 'レイキマスター認定', en: 'Reiki Master Certification' }, year: 2020 },
      { name: { ja: 'エネルギーヒーリング実践者資格', en: 'Energy Healing Practitioner Certificate' }, year: 2021 }
    ],
    tags: ['reiki', 'energy', 'chakra', 'spiritual', 'distance-healing'],
    responseTime: '1d',
    gallery: [
      { desc: { ja: 'ヒーリングストーンが置かれた静かな施術室', en: 'Quiet treatment room with healing stones' } },
      { desc: { ja: 'チャクラカラーのクリスタルセット', en: 'Chakra-colored crystal set' } }
    ],
    slidingScale: true,
    popularityScore: 32,
    reviews: [
      {
        author: { ja: 'Cさん', en: 'C.' },
        rating: 4,
        ratings: { communication: 4, effectiveness: 4, atmosphere: 5, value: 3 },
        text: { ja: '不思議な体験でしたが、終わった後とても軽くなりました。', en: 'It was a mysterious experience, but I felt so light afterward.' },
        date: '2026-02-05',
        type: 'client-to-therapist'
      }
    ]
  },
  {
    id: 7,
    name: { ja: '伊藤 ケン', en: 'Ken Ito' },
    username: '@ken_arttherapy',
    avatar: null,
    avatarColor: '#d49a7a',
    tier: 'premium',
    isFoundingMember: true,
    referralCode: 'KEN2026',
    referrals: [5],
    intro: {
      ja: 'アートセラピスト。絵を描くことを通して自分の気持ちを表現し、心の整理をお手伝いします。言葉にならない感情も、色と形で伝えられます。',
      en: 'Art therapist. Through drawing, I help you express your feelings and organize your emotions. Even feelings you can\'t put into words can be conveyed through color and shape.'
    },
    location: { ja: '東京都世田谷区', en: 'Setagaya, Tokyo' },
    categories: ['playful', 'mental'],
    delivery: ['in-person', 'video'],
    sessions: [
      {
        id: 701,
        name: { ja: 'アートセラピー体験', en: 'Art Therapy Experience' },
        description: {
          ja: '絵の具やクレヨンを使った表現ワーク。絵の上手さは関係ありません。心の声を色で表しましょう。',
          en: 'Expressive work with paint and crayons. Skill doesn\'t matter. Let\'s express your inner voice through color.'
        },
        price: 7500,
        duration: 70,
        delivery: ['in-person']
      },
      {
        id: 702,
        name: { ja: 'オンラインスケッチセラピー', en: 'Online Sketch Therapy' },
        description: {
          ja: 'オンラインで一緒にスケッチしながら気持ちを探るセッション。紙とペンがあればOK。',
          en: 'A session exploring feelings while sketching together online. All you need is paper and a pen.'
        },
        price: 4000,
        duration: 45,
        delivery: ['video']
      }
    ],
    availability: [
      { day: 0, slots: ['10:00', '14:00'] },
      { day: 2, slots: ['10:00', '14:00', '16:00'] },
      { day: 3, slots: ['10:00', '14:00'] },
      { day: 5, slots: ['10:00', '14:00', '16:00'] },
    ],
    verified: true,
    credentials: [
      { name: { ja: '日本芸術療法学会認定アートセラピスト', en: 'Japan Art Therapy Association Certified Art Therapist' }, year: 2017 },
      { name: { ja: '臨床美術士5級', en: 'Clinical Art Practitioner Grade 5' }, year: 2019 }
    ],
    tags: ['art', 'creativity', 'children', 'family', 'expression', 'color-therapy'],
    responseTime: '2h',
    gallery: [
      { desc: { ja: '色とりどりの画材が揃ったアトリエ', en: 'Atelier stocked with colorful art supplies' } },
      { desc: { ja: 'クライアントが制作した作品のギャラリー壁', en: 'Gallery wall of works created by clients' } },
      { desc: { ja: '親子セッション用の広々としたワークスペース', en: 'Spacious workspace for parent-child sessions' } }
    ],
    slidingScale: false,
    popularityScore: 85,
    reviews: [
      {
        author: { ja: 'Pさん', en: 'P.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 5, value: 5 },
        text: { ja: '絵が苦手でしたが全く問題なく、自分でも驚くくらいリラックスできました。', en: 'I\'m not good at drawing but it didn\'t matter at all. I relaxed more than I expected.' },
        date: '2026-02-24',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Uさん', en: 'U.' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 4, atmosphere: 5, value: 5 },
        text: { ja: '子どもと一緒に参加しました。親子で楽しめる素敵な時間でした。', en: 'Attended with my child. A wonderful time we could enjoy together.' },
        date: '2026-02-17',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '伊藤 ケン', en: 'Ken Ito' },
        rating: 5,
        text: { ja: 'とても自由な発想で色を使われていて、素敵な作品ができました。', en: 'Used colors with such creative freedom. A wonderful piece was created.' },
        date: '2026-02-25',
        type: 'therapist-to-client',
        clientName: { ja: 'Pさん', en: 'P.' }
      }
    ]
  },
  {
    id: 8,
    name: { ja: '小林 あかり', en: 'Akari Kobayashi' },
    username: '@akari_sound',
    avatar: null,
    avatarColor: '#7ab0d4',
    tier: 'standard',
    isFoundingMember: false,
    referralCode: 'AKARI2026',
    referrals: [],
    intro: {
      ja: 'サウンドヒーリングの専門家。シンギングボウルや音叉を使い、音の波動で心身を整えます。深いリラクゼーションと瞑想状態へ導きます。',
      en: 'Sound healing specialist. Using singing bowls and tuning forks, I harmonize mind and body through sound vibrations. I guide you to deep relaxation and meditative states.'
    },
    location: { ja: '千葉県千葉市', en: 'Chiba City, Chiba' },
    categories: ['mental', 'physical'],
    delivery: ['in-person', 'video', 'email'],
    sessions: [
      {
        id: 801,
        name: { ja: 'シンギングボウルセッション', en: 'Singing Bowl Session' },
        description: {
          ja: 'チベタンシンギングボウルの音色に包まれる60分。深い瞑想状態で心身をリセット。',
          en: '60 minutes enveloped in Tibetan singing bowl sounds. Reset mind and body through deep meditation.'
        },
        price: 8500,
        duration: 60,
        delivery: ['in-person']
      },
      {
        id: 802,
        name: { ja: 'オンライン音浴', en: 'Online Sound Bath' },
        description: {
          ja: 'ビデオ通話でのサウンドバス体験。ヘッドホン推奨。自宅で音の癒しを。',
          en: 'Sound bath experience via video call. Headphones recommended. Healing sounds from home.'
        },
        price: 4000,
        duration: 40,
        delivery: ['video']
      },
      {
        id: 803,
        name: { ja: 'パーソナル音声ガイド', en: 'Personal Audio Guide' },
        description: {
          ja: 'あなた専用の瞑想音声ガイドをメールで送付。毎日の瞑想習慣のお供に。',
          en: 'Personalized meditation audio guide delivered via email. A companion for your daily practice.'
        },
        price: 2000,
        duration: 0,
        delivery: ['email']
      }
    ],
    availability: [
      { day: 1, slots: ['10:00', '13:00', '15:00'] },
      { day: 3, slots: ['10:00', '13:00'] },
      { day: 5, slots: ['10:00', '13:00', '15:00'] },
      { day: 6, slots: ['10:00', '11:00'] },
    ],
    verified: true,
    credentials: [
      { name: { ja: 'サウンドヒーリング協会認定プラクティショナー', en: 'Sound Healing Association Certified Practitioner' }, year: 2018 },
      { name: { ja: 'チベタンシンギングボウル奏者認定', en: 'Tibetan Singing Bowl Player Certification' }, year: 2019 }
    ],
    tags: ['sound', 'singing-bowl', 'meditation', 'relaxation', 'vibration'],
    responseTime: '3h',
    gallery: [
      { desc: { ja: '大小さまざまなシンギングボウルが並ぶヒーリングルーム', en: 'Healing room with singing bowls of various sizes' } },
      { desc: { ja: 'セッションで使用する音叉とチャイムバー', en: 'Tuning forks and chime bars used in sessions' } },
      { desc: { ja: 'クッションと柔らかい照明のリラクゼーションスペース', en: 'Relaxation space with cushions and soft lighting' } }
    ],
    slidingScale: false,
    popularityScore: 71,
    reviews: [
      {
        author: { ja: 'Dさん', en: 'D.' },
        rating: 5,
        ratings: { communication: 4, effectiveness: 5, atmosphere: 5, value: 5 },
        text: { ja: 'シンギングボウルの音が身体中に響いて、今まで経験したことのない深いリラックスでした。', en: 'The singing bowl resonated through my whole body. The deepest relaxation I\'ve ever experienced.' },
        date: '2026-02-26',
        type: 'client-to-therapist'
      },
      {
        author: { ja: 'Fさん', en: 'F.' },
        rating: 4,
        ratings: { communication: 4, effectiveness: 4, atmosphere: 4, value: 4 },
        text: { ja: 'オンラインでも十分に音の癒しを感じられました。パーソナル音声ガイドもとても良かったです。', en: 'Could feel the sound healing even online. The personal audio guide was excellent too.' },
        date: '2026-02-14',
        type: 'client-to-therapist'
      },
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 5,
        ratings: { communication: 5, effectiveness: 5, atmosphere: 5, value: 4 },
        text: { ja: '寝落ちするくらいリラックスできました。終わった後の爽快感がすごいです。', en: 'I relaxed so much I almost fell asleep. The refreshed feeling afterward was amazing.' },
        date: '2026-02-02',
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
  5: [
    { from: 'user', text: { ja: 'ヨガ初心者ですが、ハタヨガは大丈夫ですか？', en: 'I\'m a yoga beginner. Is Hatha Yoga okay for me?' }, time: '9:00' },
    { from: 'therapist', text: { ja: 'もちろん大丈夫ですよ！初心者の方に合わせてポーズを調整しますので、安心してご参加ください。', en: 'Of course! I adjust poses for beginners, so please feel comfortable joining.' }, time: '9:03' },
    { from: 'user', text: { ja: 'ヨガマットは必要ですか？', en: 'Do I need a yoga mat?' }, time: '9:05' },
    { from: 'therapist', text: { ja: '対面の場合はこちらでご用意がありますので手ぶらでOKです。オンラインの場合はバスタオルでも代用できますよ。', en: 'For in-person, we have mats available so just come as you are. For online, a bath towel works too.' }, time: '9:08' },
  ],
  6: [
    { from: 'user', text: { ja: 'レイキに興味がありますが、効果はどんな感じですか？', en: 'I\'m interested in Reiki. What does it feel like?' }, time: '11:00' },
    { from: 'therapist', text: { ja: '温かさを感じる方が多いです。身体がポカポカして、終わった後に心が軽くなったとおっしゃる方が多いですね。', en: 'Many people feel warmth. Most say their body feels warm and their mind feels lighter afterward.' }, time: '11:04' },
    { from: 'user', text: { ja: '遠隔でも同じ効果がありますか？', en: 'Does it work the same remotely?' }, time: '11:07' },
  ],
  7: [
    { from: 'user', text: { ja: '絵が全く描けないのですが、アートセラピーは大丈夫ですか？', en: 'I can\'t draw at all. Is art therapy still okay?' }, time: '14:00' },
    { from: 'therapist', text: { ja: '全く問題ありません！上手に描くことが目的ではないので、自由に色を使って気持ちを表現していただければ大丈夫です。', en: 'Absolutely fine! The goal isn\'t to draw well. Just express your feelings freely through color.' }, time: '14:03' },
    { from: 'user', text: { ja: 'それなら安心です。子どもと一緒に参加してもいいですか？', en: 'That\'s reassuring. Can I attend with my child?' }, time: '14:06' },
    { from: 'therapist', text: { ja: 'もちろんです！親子で参加される方もいらっしゃいますよ。一緒に楽しい時間を過ごしましょう。', en: 'Of course! Some parents attend with their children. Let\'s have a fun time together.' }, time: '14:09' },
  ],
  8: [
    { from: 'user', text: { ja: 'シンギングボウルの音って、オンラインでもちゃんと聞こえますか？', en: 'Can you hear the singing bowl properly through a video call?' }, time: '10:00' },
    { from: 'therapist', text: { ja: 'ヘッドホンを使っていただければ、かなりの臨場感を感じていただけますよ。低音の振動もしっかり伝わります。', en: 'With headphones, you can feel quite an immersive experience. The low-frequency vibrations come through well.' }, time: '10:04' },
    { from: 'user', text: { ja: 'パーソナル音声ガイドも気になります。どんな内容ですか？', en: 'I\'m also curious about the personal audio guide. What\'s included?' }, time: '10:07' },
    { from: 'therapist', text: { ja: 'お悩みやご希望に合わせて、10〜15分の瞑想音声をオリジナルで制作します。毎日聴けるように作りますので、日常の癒しにどうぞ。', en: 'I create a custom 10-15 minute meditation audio based on your needs. Designed for daily listening as part of your healing routine.' }, time: '10:11' },
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
  5: {
    bookingsCount: 15,
    averageRating: 4.7,
    monthlyEarnings: 78000,
    sessionRevenue: 82500,
    platformFee: 7425,
    referralIncome: 1800,
    netEarnings: 76875,
    clients: [
      { name: { ja: 'Eさん', en: 'E.' }, lastBooking: '2026-02-28', reviewed: true },
      { name: { ja: 'Oさん', en: 'O.' }, lastBooking: '2026-02-25', reviewed: true },
      { name: { ja: 'テストユーザー', en: 'Test User' }, lastBooking: '2026-03-07', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 82500, fee: 7425, referral: 1800, net: 76875 },
      { month: '2026-01', revenue: 66000, fee: 5940, referral: 1200, net: 61260 },
    ],
    referralStats: { totalReferred: 1, totalEarnings: 3000 },
  },
  6: {
    bookingsCount: 2,
    averageRating: 4.0,
    monthlyEarnings: 10500,
    sessionRevenue: 10500,
    platformFee: 0,
    referralIncome: 0,
    netEarnings: 10500,
    clients: [
      { name: { ja: 'Cさん', en: 'C.' }, lastBooking: '2026-02-05', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 10500, fee: 0, referral: 0, net: 10500 },
    ],
    referralStats: { totalReferred: 0, totalEarnings: 0 },
  },
  7: {
    bookingsCount: 22,
    averageRating: 4.9,
    monthlyEarnings: 152000,
    sessionRevenue: 157500,
    platformFee: 14175,
    referralIncome: 2400,
    netEarnings: 145725,
    clients: [
      { name: { ja: 'Pさん', en: 'P.' }, lastBooking: '2026-02-28', reviewed: true },
      { name: { ja: 'Uさん', en: 'U.' }, lastBooking: '2026-02-24', reviewed: true },
      { name: { ja: 'テストユーザー', en: 'Test User' }, lastBooking: '2026-02-15', reviewed: true },
      { name: { ja: 'Jさん', en: 'J.' }, lastBooking: '2026-02-10', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 157500, fee: 14175, referral: 2400, net: 145725 },
      { month: '2026-01', revenue: 135000, fee: 12150, referral: 2000, net: 124850 },
      { month: '2025-12', revenue: 112500, fee: 10125, referral: 1600, net: 103975 },
    ],
    referralStats: { totalReferred: 1, totalEarnings: 6000 },
  },
  8: {
    bookingsCount: 12,
    averageRating: 4.8,
    monthlyEarnings: 92000,
    sessionRevenue: 96000,
    platformFee: 8640,
    referralIncome: 0,
    netEarnings: 87360,
    clients: [
      { name: { ja: 'Dさん', en: 'D.' }, lastBooking: '2026-02-26', reviewed: true },
      { name: { ja: 'Fさん', en: 'F.' }, lastBooking: '2026-02-22', reviewed: true },
      { name: { ja: 'テストユーザー', en: 'Test User' }, lastBooking: '2026-03-12', reviewed: false },
    ],
    earningsHistory: [
      { month: '2026-02', revenue: 96000, fee: 8640, referral: 0, net: 87360 },
      { month: '2026-01', revenue: 80000, fee: 7200, referral: 0, net: 72800 },
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
  {
    therapistId: 7,
    therapistName: { ja: '伊藤 ケン', en: 'Ken Ito' },
    rating: 5,
    text: { ja: '色使いがとても自由で素敵でした。次回もお待ちしています。', en: 'Wonderful and free use of color. Looking forward to next time.' },
    date: '2026-02-25'
  },
];

// ===== Mock Booking History (for test user) =====
const mockBookingHistory = [
  {
    id: 'BK-001',
    therapistId: 1,
    therapistName: { ja: '山田 花子', en: 'Hanako Yamada' },
    sessionName: { ja: 'アロマリラクゼーション', en: 'Aroma Relaxation' },
    date: '2026-02-28',
    time: '14:00',
    price: 8000,
    status: 'completed'
  },
  {
    id: 'BK-002',
    therapistId: 3,
    therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' },
    sessionName: { ja: 'タロットリーディング', en: 'Tarot Reading' },
    date: '2026-02-20',
    time: '15:00',
    price: 5000,
    status: 'completed'
  },
  {
    id: 'BK-003',
    therapistId: 7,
    therapistName: { ja: '伊藤 ケン', en: 'Ken Ito' },
    sessionName: { ja: 'アートセラピー体験', en: 'Art Therapy Experience' },
    date: '2026-02-15',
    time: '10:00',
    price: 7500,
    status: 'completed'
  },
  {
    id: 'BK-004',
    therapistId: 5,
    therapistName: { ja: '中村 さくら', en: 'Sakura Nakamura' },
    sessionName: { ja: 'オンラインリストラティブヨガ', en: 'Online Restorative Yoga' },
    date: '2026-03-07',
    time: '10:00',
    price: 3500,
    status: 'upcoming'
  },
  {
    id: 'BK-005',
    therapistId: 8,
    therapistName: { ja: '小林 あかり', en: 'Akari Kobayashi' },
    sessionName: { ja: 'シンギングボウルセッション', en: 'Singing Bowl Session' },
    date: '2026-03-12',
    time: '13:00',
    price: 8500,
    status: 'upcoming'
  },
];

// ===== Mock User Reviews Written (by test user about therapists) =====
const mockUserWrittenReviews = [
  {
    therapistId: 1,
    therapistName: { ja: '山田 花子', en: 'Hanako Yamada' },
    rating: 5,
    text: { ja: 'アロマの香りが本当に素晴らしかったです。心も身体も癒されました。', en: 'The aroma was truly wonderful. Both my mind and body were healed.' },
    date: '2026-03-01'
  },
  {
    therapistId: 3,
    therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' },
    rating: 5,
    text: { ja: '的確なリーディングに驚きました。迷っていたことがスッキリしました。', en: 'I was amazed by the accurate reading. It cleared up what I was unsure about.' },
    date: '2026-02-22'
  },
  {
    therapistId: 7,
    therapistName: { ja: '伊藤 ケン', en: 'Ken Ito' },
    rating: 4,
    text: { ja: '絵が下手でも楽しめました！色を選ぶだけで気持ちが軽くなる不思議な体験。', en: 'Enjoyed it even though I can\'t draw! A wonderful experience where just choosing colors lifts your mood.' },
    date: '2026-02-17'
  },
];

// ===== Blog / Articles Data =====
const blogArticles = [
  {
    id: 'blog-1',
    therapistId: 1,
    title: { ja: 'アロマセラピーで心を整える5つの方法', en: '5 Ways to Balance Your Mind with Aromatherapy' },
    excerpt: { ja: 'エッセンシャルオイルを使った日常のセルフケア方法をご紹介します。', en: 'Discover daily self-care methods using essential oils.' },
    date: '2026-02-20',
    tags: ['aromatherapy', 'selfcare']
  },
  {
    id: 'blog-2',
    therapistId: 3,
    title: { ja: 'タロットカードの基本：初心者ガイド', en: 'Tarot Basics: A Beginner\'s Guide' },
    excerpt: { ja: 'タロットに興味があるけど何から始めればいい？基本を解説します。', en: 'Interested in tarot but don\'t know where to start? Learn the basics.' },
    date: '2026-02-15',
    tags: ['tarot', 'beginners']
  },
  {
    id: 'blog-3',
    therapistId: 5,
    title: { ja: '寝る前の10分ヨガで睡眠の質を上げる', en: '10-Minute Bedtime Yoga for Better Sleep' },
    excerpt: { ja: '簡単なポーズで深い睡眠を。毎日続けられるルーティンをご紹介。', en: 'Simple poses for deep sleep. A routine you can keep up every day.' },
    date: '2026-02-10',
    tags: ['yoga', 'sleep', 'selfcare']
  },
  {
    id: 'blog-4',
    therapistId: 7,
    title: { ja: '色が心に与える影響：カラーセラピー入門', en: 'How Colors Affect Your Mind: Intro to Color Therapy' },
    excerpt: { ja: '色にはそれぞれ心理的な効果があります。日常に取り入れる方法とは。', en: 'Each color has psychological effects. Learn how to use them daily.' },
    date: '2026-02-05',
    tags: ['art', 'selfcare', 'beginners']
  },
  {
    id: 'blog-5',
    therapistId: 4,
    title: { ja: '不安との付き合い方：認知行動療法の視点から', en: 'Living with Anxiety: A CBT Perspective' },
    excerpt: { ja: '不安を感じた時に試せる認知行動療法のテクニックを解説。', en: 'CBT techniques you can try when anxiety strikes.' },
    date: '2026-01-28',
    tags: ['anxiety', 'mental-health', 'cbt']
  },
  {
    id: 'blog-6',
    therapistId: 8,
    title: { ja: 'サウンドヒーリングの科学：なぜ音で癒されるのか', en: 'The Science of Sound Healing: Why Sound Heals' },
    excerpt: { ja: '周波数と脳波の関係から、音の癒し効果のメカニズムを探ります。', en: 'Exploring the healing mechanism of sound through frequency and brainwave relationships.' },
    date: '2026-01-20',
    tags: ['sound', 'science', 'healing']
  },
];

// ===== Digital Products Data =====
const digitalProducts = [
  {
    id: 'dp-1',
    therapistId: 1,
    name: { ja: 'リラクゼーション・アロマガイド (PDF)', en: 'Relaxation Aroma Guide (PDF)' },
    description: { ja: '自宅で使える10種のエッセンシャルオイル活用法', en: '10 essential oil recipes for home relaxation' },
    price: 1500,
    type: 'pdf'
  },
  {
    id: 'dp-2',
    therapistId: 5,
    name: { ja: '朝ヨガ15分ルーティン (動画)', en: 'Morning Yoga 15-min Routine (Video)' },
    description: { ja: '毎朝続けられる簡単ヨガプログラム', en: 'Easy daily morning yoga program' },
    price: 2000,
    type: 'video'
  },
  {
    id: 'dp-3',
    therapistId: 8,
    name: { ja: '瞑想用サウンドトラック (音声)', en: 'Meditation Soundtrack (Audio)' },
    description: { ja: 'シンギングボウルの音で深い瞑想へ導く30分音声', en: '30-minute singing bowl audio for deep meditation' },
    price: 1000,
    type: 'audio'
  },
  {
    id: 'dp-4',
    therapistId: 4,
    name: { ja: '不安対処ワークシート (PDF)', en: 'Anxiety Coping Worksheet (PDF)' },
    description: { ja: 'CBTベースの自己記録シート5種セット', en: '5 CBT-based self-recording sheets' },
    price: 800,
    type: 'pdf'
  },
  {
    id: 'dp-5',
    therapistId: 7,
    name: { ja: 'カラーセラピー・ジャーナル (PDF)', en: 'Color Therapy Journal (PDF)' },
    description: { ja: '30日分の色を使った気分記録ジャーナル', en: '30-day mood journal using colors' },
    price: 1200,
    type: 'pdf'
  },
];

// ===== Gift Card Data =====
const giftCardOptions = [
  { amount: 3000, label: { ja: '¥3,000', en: '¥3,000' } },
  { amount: 5000, label: { ja: '¥5,000', en: '¥5,000' } },
  { amount: 10000, label: { ja: '¥10,000', en: '¥10,000' } },
  { amount: 20000, label: { ja: '¥20,000', en: '¥20,000' } },
];

// ===== Test User for Demo =====
const testUser = {
  name: 'テストユーザー',
  email: 'test@healinggarden.jp',
};

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

function searchTherapistsByText(query) {
  const q = query.toLowerCase();
  return therapists.filter(th => {
    const name = (th.name.ja + ' ' + th.name.en).toLowerCase();
    const intro = (th.intro.ja + ' ' + th.intro.en).toLowerCase();
    const location = (th.location.ja + ' ' + th.location.en).toLowerCase();
    const sessions = th.sessions.map(s => (s.name.ja + ' ' + s.name.en + ' ' + s.description.ja + ' ' + s.description.en).toLowerCase()).join(' ');
    return name.includes(q) || intro.includes(q) || location.includes(q) || sessions.includes(q);
  });
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
