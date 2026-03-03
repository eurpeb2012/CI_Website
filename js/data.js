const therapists = [
  {
    id: 1,
    name: { ja: '山田 花子', en: 'Hanako Yamada' },
    username: '@hanako_healing',
    avatar: null,
    avatarColor: '#a8d5ba',
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
        date: '2026-02-15'
      },
      {
        author: { ja: 'Kさん', en: 'K.' },
        rating: 4,
        text: { ja: 'オンライン瞑想がとても良かったです。続けたいと思います。', en: 'The online meditation was great. I want to continue.' },
        date: '2026-01-28'
      }
    ]
  },
  {
    id: 2,
    name: { ja: '鈴木 太郎', en: 'Taro Suzuki' },
    username: '@taro_bodywork',
    avatar: null,
    avatarColor: '#7ec8a0',
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
        date: '2026-02-20'
      }
    ]
  },
  {
    id: 3,
    name: { ja: '佐藤 美月', en: 'Mitsuki Sato' },
    username: '@mitsuki_tarot',
    avatar: null,
    avatarColor: '#c4a8d5',
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
        date: '2026-02-10'
      },
      {
        author: { ja: 'Yさん', en: 'Y.' },
        rating: 5,
        text: { ja: 'メール鑑定がとても丁寧で、心が軽くなりました。', en: 'The email reading was very thorough and my heart feels lighter.' },
        date: '2026-01-15'
      },
      {
        author: { ja: '匿名ユーザー', en: 'Anonymous' },
        rating: 4,
        text: { ja: 'オラクルカード体験、初めてでしたが楽しかったです！', en: 'It was my first oracle card experience and it was fun!' },
        date: '2026-02-25'
      }
    ]
  },
  {
    id: 4,
    name: { ja: '田中 誠', en: 'Makoto Tanaka' },
    username: '@makoto_counselor',
    avatar: null,
    avatarColor: '#8bc4c1',
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
        date: '2026-02-18'
      },
      {
        author: { ja: 'Tさん', en: 'T.' },
        rating: 5,
        text: { ja: 'メール相談でも十分な支援を感じました。文章で整理できるのが自分に合っています。', en: 'I felt well supported even through email. Organizing my thoughts in writing suits me.' },
        date: '2026-01-30'
      }
    ]
  }
];

function getTherapist(id) {
  return therapists.find(t => t.id === parseInt(id));
}

function searchTherapists(filters) {
  return therapists.filter(therapist => {
    if (filters.category && !therapist.categories.includes(filters.category)) return false;
    if (filters.delivery && !therapist.delivery.includes(filters.delivery)) return false;
    if (filters.maxPrice) {
      const minPrice = Math.min(...therapist.sessions.map(s => s.price));
      if (minPrice > filters.maxPrice) return false;
    }
    return true;
  });
}

function getLocalizedText(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[getLang()] || obj['ja'] || '';
}
