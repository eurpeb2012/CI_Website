const translations = {
  ja: {
    // App
    appName: '癒しの庭',
    appTagline: 'あなたにぴったりの癒しを見つけましょう',

    // Nav
    navHome: 'ホーム',
    navSearch: '探す',
    navProfile: 'マイページ',
    navDashboard: 'ダッシュボード',
    navSessions: 'セッション',

    // Landing
    landingTitle: '癒しの庭',
    landingSubtitle: 'Healing Garden',
    landingTagline: 'あなたにぴったりの癒しを見つけましょう',
    landingCTA: 'セッションを探す',
    landingSecondary: 'セラピストとして申し込む',

    // Search Entry
    searchTitle: 'どのように探しますか？',
    searchByCriteria: '条件で探す',
    searchByCriteriaDesc: '希望の条件がある方',
    searchByFeeling: '気持ちから探す',
    searchByFeelingDesc: '何が合うかわからない方',

    // Feeling Flow - Step 1
    feelingTitle: '今の気持ちは？',
    feelingStressed: 'ストレスを感じている',
    feelingLowEnergy: '元気が出ない',
    feelingAnxious: '不安・心配がある',
    feelingLonely: '孤独を感じる',
    feelingOverwhelmed: '疲れが取れない',
    feelingCurious: '新しい体験をしたい',

    // Feeling Flow - Step 2
    categoryTitle: 'どんな癒しを求めますか？',
    categoryPhysical: '身体の癒し',
    categoryPhysicalDesc: 'マッサージ、ヨガ、整体など',
    categoryMental: '心の癒し',
    categoryMentalDesc: '瞑想、ヒーリング、アロマなど',
    categoryPlayful: '楽しい体験',
    categoryPlayfulDesc: 'タロット、占い、アートなど',
    categoryPro: 'プロカウンセリング',
    categoryProDesc: '資格を持つ専門家による相談',

    // Feeling Flow - Step 3
    deliveryTitle: 'ご希望の方法は？',
    deliveryInPerson: '対面',
    deliveryInPersonDesc: '直接お会いして',
    deliveryVideo: 'オンライン',
    deliveryVideoDesc: 'ビデオ通話で',
    deliveryEmail: 'メール',
    deliveryEmailDesc: 'メッセージのやり取りで',

    // Results
    resultsTitle: 'おすすめのセラピスト',
    resultsEmpty: '条件に合うセラピストが見つかりませんでした',
    resultsFrom: '〜から',

    // Criteria Search
    criteriaTitle: '条件で探す',
    criteriaType: 'セラピーの種類',
    criteriaTypeAll: 'すべて',
    criteriaLocation: '場所・方法',
    criteriaLocationAll: 'すべて',
    criteriaPrice: '価格帯',
    criteriaPriceAll: 'すべて',
    criteriaSearch: '検索する',

    // Therapist Profile
    profileIntro: '自己紹介',
    profileLocation: '所在地',
    profileSessions: '提供セッション',
    profileAvailability: '空き状況',
    profileReviews: 'レビュー',
    profileBook: 'このセッションを予約',
    profilePerSession: '/ セッション',
    profileMinutes: '分',
    profileMessage: 'メッセージを送る',
    profileSuggested: 'おすすめのセラピスト',

    // Booking
    bookingTitle: '予約確認',
    bookingSession: 'セッション',
    bookingTherapist: 'セラピスト',
    bookingDate: '日時',
    bookingPrice: '料金',
    bookingCancelPolicy: 'キャンセルポリシー',
    bookingCancel2w: '2週間前まで：20%',
    bookingCancel1w: '1週間前まで：50%',
    bookingCancel3d: '3日前まで：80%',
    bookingCancelSame: '当日：100%',
    bookingAgree: '利用規約とキャンセルポリシーに同意します',
    bookingConfirm: '確認して支払う',
    bookingSuccess: '予約が完了しました！',
    bookingSuccessMsg: '確認メールをお送りしました。',
    bookingBackHome: 'ホームに戻る',

    // Apply
    applyTitle: 'セラピスト申し込み',
    applyPhoto: 'プロフィール写真',
    applyUpload: '写真をアップロード',
    applyName: '表示名',
    applyNamePlaceholder: 'ニックネームまたは本名',
    applyIntro: '自己紹介',
    applyIntroPlaceholder: 'あなたの経験や専門分野について...',
    applyLocation: '所在地',
    applyLocationPlaceholder: '例：東京都渋谷区',
    applySessions: '提供セッション',
    applySessionName: 'セッション名',
    applySessionDesc: '説明',
    applySessionPrice: '価格（円）',
    applySessionDuration: '時間（分）',
    applyAddSession: '+ セッションを追加',
    applyPlanTitle: 'プランを選択',
    applySubmit: '申し込む',
    applySuccess: '申し込みありがとうございます！',
    applySuccessMsg: '審査後、ご連絡いたします。',

    // Tier names
    tierFree: '🌱 フリー',
    tierFreeName: 'フリープラン',
    tierFreeDesc: '基本掲載・月3件まで予約受付',
    tierFreePrice: '無料',
    tierStandard: '🌿 スタンダード',
    tierStandardName: 'スタンダードプラン',
    tierStandardDesc: '無制限予約・スケジュール編集・9%手数料',
    tierStandardPrice: '¥1,980/月',
    tierPremium: '🌳 プレミアム',
    tierPremiumName: 'プレミアムプラン',
    tierPremiumDesc: '優先表示・分析機能・スケジュール編集・9%手数料',
    tierPremiumPrice: '¥4,980/月',
    tierPlatformFee: 'すべての有料プランには、1取引あたり9%のプラットフォーム手数料がかかります。',
    tierReentryNote: '※一度解約後の再加入には再登録手数料がかかる場合があります。',

    // Tier features
    tierFeatureBasicListing: '基本掲載',
    tierFeature3Bookings: '月3件まで予約受付',
    tierFeatureScheduleView: 'スケジュール表示',
    tierFeatureUnlimitedBookings: '無制限予約受付',
    tierFeatureScheduleEdit: 'スケジュール編集',
    tierFeature9Fee: '9%手数料',
    tierFeaturePriority: '優先表示',
    tierFeatureAnalytics: '分析機能',

    // User Profile
    userProfileTitle: 'マイページ',
    userProfileId: 'ユーザーID',
    userProfileAnon: '匿名ユーザー',
    userProfileHistory: '予約履歴',
    userProfileNoHistory: 'まだ予約はありません',
    userProfileReviews: 'あなたのレビュー',
    userProfileNoReviews: 'まだレビューはありません',
    userProfileSettings: '設定',
    userProfileLogout: 'ログアウト',
    userProfileReceivedReviews: 'セラピストからのレビュー',
    userProfileNoReceivedReviews: 'まだセラピストからのレビューはありません',
    userProfileSwitchTherapist: 'セラピストモードに切り替え',

    // Signup
    signupTitle: 'アカウント作成',
    signupName: '名前',
    signupNamePlaceholder: 'お名前を入力',
    signupEmail: 'メールアドレス',
    signupEmailPlaceholder: 'email@example.com',
    signupSubmit: '登録する',
    signupNotice: '登録は無料です。閲覧はログインなしでもできます。',
    signupRequired: 'この操作にはアカウント登録が必要です',

    // Settings
    settingsTitle: '設定',
    settingsTheme: 'テーマ',
    settingsThemeDesc: 'アプリの見た目を変更',
    themeSpring: '🌸 スプリング',
    themeSpringDesc: 'やさしい緑のパステルカラー',
    themeSummer: '🌻 サマー',
    themeSummerDesc: '暖かいアンバー・オレンジ',
    themeEvening: '🌙 イブニング',
    themeEveningDesc: '落ち着いたインディゴ・パープル',
    themeSuggested: '（おすすめ）',

    // Chat
    chatTitle: 'チャット',
    chatInfoWindow: 'メッセージは3日間有効です',
    chatPlaceholder: 'メッセージを入力...',
    chatStartVideo: 'ビデオ通話を開始',

    // Video Call
    videoTitle: 'ビデオ通話',
    videoConnecting: '接続中...',
    videoMute: 'ミュート',
    videoUnmute: 'ミュート解除',
    videoCamera: 'カメラ',
    videoCameraOff: 'カメラオフ',
    videoEnd: '終了',
    videoBlur: '背景ぼかし',
    videoSelfView: 'あなた',

    // Reviews
    reviewsFromClients: 'クライアントからのレビュー',
    reviewsFromTherapists: 'セラピストからのレビュー',
    reviewSubmitTitle: 'レビューを書く',
    reviewRating: '評価',
    reviewText: 'コメント',
    reviewTextPlaceholder: 'あなたの体験を教えてください...',
    reviewSubmit: 'レビューを投稿',
    reviewSuccess: 'レビューを投稿しました！',

    // Therapist Dashboard
    dashboardTitle: 'ダッシュボード',
    dashboardBookings: '予約数',
    dashboardRating: '評価',
    dashboardEarnings: '今月の収益',
    dashboardSchedule: 'スケジュール管理',
    dashboardSessions: 'セッション管理',
    dashboardClients: 'クライアント一覧',
    dashboardEarningsMenu: '収益管理',
    dashboardProfileEdit: 'プロフィール編集',
    dashboardReferrals: '紹介プログラム',

    // Schedule
    scheduleTitle: 'スケジュール管理',
    scheduleAvailable: '空き',
    scheduleUnavailable: '—',
    scheduleLocked: 'プランをアップグレードしてスケジュールを編集',
    scheduleUpgrade: 'アップグレード',

    // Sessions management
    sessionsManageTitle: 'セッション管理',
    sessionsAdd: '+ セッションを追加',
    sessionEditTitle: 'セッション編集',
    sessionSave: '保存',

    // Clients
    clientsTitle: 'クライアント一覧',
    clientLastBooking: '最終予約',
    clientReviewed: 'レビュー済み',
    clientPendingReview: '未レビュー',
    clientWriteReview: 'レビューを書く',

    // Earnings
    earningsTitle: '収益管理',
    earningsThisMonth: '今月の収益',
    earningsSessionRevenue: 'セッション収入',
    earningsPlatformFee: 'プラットフォーム手数料 (9%)',
    earningsReferralIncome: '紹介収入',
    earningsNet: '純収益',
    earningsHistory: '収益履歴',

    // Profile Edit
    profileEditTitle: 'プロフィール編集',
    profileEditSave: '保存する',

    // Referral Program
    referralTitle: '紹介プログラム',
    referralCode: 'あなたの紹介コード',
    referralCopy: 'コピー',
    referralCopied: 'コピーしました！',
    referralTotalReferred: '紹介人数',
    referralTotalEarnings: '紹介収入合計',
    referralCommission: '紹介手数料: 2%',
    referralDesc: 'あなたの紹介コードでセラピストが登録すると、そのセラピストの収益から2%のコミッションを受け取れます。',

    // Referral Landing
    referralLandingTitle: '紹介で登録',
    referralLandingDesc: 'さんからの紹介で特別にご招待されました！',
    referralLandingCTA: '今すぐ登録',

    // Founding Member
    foundingMember: '創立メンバー',

    // Booking History
    bookingStatusCompleted: '完了',
    bookingStatusUpcoming: '予定',
    demoLogin: 'デモログイン',
    demoLoginDesc: 'テストユーザーとしてログイン',

    // Calendar days
    calMon: '月',
    calTue: '火',
    calWed: '水',
    calThu: '木',
    calFri: '金',
    calSat: '土',
    calSun: '日',

    // Schedule days
    schedMon: '月',
    schedTue: '火',
    schedWed: '水',
    schedThu: '木',
    schedFri: '金',
    schedSat: '土',
    schedSun: '日',

    // Misc
    back: '戻る',
    next: '次へ',
    language: 'EN',
  },

  en: {
    // App
    appName: 'Healing Garden',
    appTagline: 'Find the perfect healing experience for you',

    // Nav
    navHome: 'Home',
    navSearch: 'Search',
    navProfile: 'Profile',
    navDashboard: 'Dashboard',
    navSessions: 'Sessions',

    // Landing
    landingTitle: '癒しの庭',
    landingSubtitle: 'Healing Garden',
    landingTagline: 'Find the perfect healing experience for you',
    landingCTA: 'Find a Session',
    landingSecondary: 'Apply as Therapist',

    // Search Entry
    searchTitle: 'How would you like to search?',
    searchByCriteria: 'Search by Criteria',
    searchByCriteriaDesc: 'I know what I\'m looking for',
    searchByFeeling: 'Search by Feeling',
    searchByFeelingDesc: 'Help me find what\'s right',

    // Feeling Flow - Step 1
    feelingTitle: 'How are you feeling?',
    feelingStressed: 'Stressed',
    feelingLowEnergy: 'Low energy',
    feelingAnxious: 'Anxious or worried',
    feelingLonely: 'Lonely',
    feelingOverwhelmed: 'Exhausted',
    feelingCurious: 'Looking for something new',

    // Feeling Flow - Step 2
    categoryTitle: 'What kind of healing are you looking for?',
    categoryPhysical: 'Physical Relief',
    categoryPhysicalDesc: 'Massage, yoga, bodywork, etc.',
    categoryMental: 'Mental Relief',
    categoryMentalDesc: 'Meditation, healing, aromatherapy, etc.',
    categoryPlayful: 'Playful Interaction',
    categoryPlayfulDesc: 'Tarot, fortune telling, art, etc.',
    categoryPro: 'Professional Counseling',
    categoryProDesc: 'Certified professional consultation',

    // Feeling Flow - Step 3
    deliveryTitle: 'How would you like your session?',
    deliveryInPerson: 'In Person',
    deliveryInPersonDesc: 'Meet face to face',
    deliveryVideo: 'Video Call',
    deliveryVideoDesc: 'Online video session',
    deliveryEmail: 'Email',
    deliveryEmailDesc: 'Text-based exchange',

    // Results
    resultsTitle: 'Recommended Therapists',
    resultsEmpty: 'No therapists found matching your criteria',
    resultsFrom: 'from',

    // Criteria Search
    criteriaTitle: 'Search by Criteria',
    criteriaType: 'Therapy Type',
    criteriaTypeAll: 'All',
    criteriaLocation: 'Location / Method',
    criteriaLocationAll: 'All',
    criteriaPrice: 'Price Range',
    criteriaPriceAll: 'All',
    criteriaSearch: 'Search',

    // Therapist Profile
    profileIntro: 'About Me',
    profileLocation: 'Location',
    profileSessions: 'Sessions Offered',
    profileAvailability: 'Availability',
    profileReviews: 'Reviews',
    profileBook: 'Book This Session',
    profilePerSession: '/ session',
    profileMinutes: 'min',
    profileMessage: 'Send Message',
    profileSuggested: 'Suggested Therapists',

    // Booking
    bookingTitle: 'Booking Confirmation',
    bookingSession: 'Session',
    bookingTherapist: 'Therapist',
    bookingDate: 'Date & Time',
    bookingPrice: 'Price',
    bookingCancelPolicy: 'Cancellation Policy',
    bookingCancel2w: '2 weeks before: 20%',
    bookingCancel1w: '1 week before: 50%',
    bookingCancel3d: '3 days before: 80%',
    bookingCancelSame: 'Same day: 100%',
    bookingAgree: 'I agree to the terms of service and cancellation policy',
    bookingConfirm: 'Confirm & Pay',
    bookingSuccess: 'Booking Confirmed!',
    bookingSuccessMsg: 'A confirmation email has been sent.',
    bookingBackHome: 'Back to Home',

    // Apply
    applyTitle: 'Therapist Application',
    applyPhoto: 'Profile Photo',
    applyUpload: 'Upload Photo',
    applyName: 'Display Name',
    applyNamePlaceholder: 'Nickname or real name',
    applyIntro: 'Introduction',
    applyIntroPlaceholder: 'Tell us about your experience and specialties...',
    applyLocation: 'Location',
    applyLocationPlaceholder: 'e.g., Shibuya, Tokyo',
    applySessions: 'Sessions Offered',
    applySessionName: 'Session Name',
    applySessionDesc: 'Description',
    applySessionPrice: 'Price (JPY)',
    applySessionDuration: 'Duration (min)',
    applyAddSession: '+ Add Session',
    applyPlanTitle: 'Choose a Plan',
    applySubmit: 'Submit Application',
    applySuccess: 'Thank you for applying!',
    applySuccessMsg: 'We\'ll contact you after review.',

    // Tier names
    tierFree: '🌱 Free',
    tierFreeName: 'Free Plan',
    tierFreeDesc: 'Basic listing, up to 3 bookings/month',
    tierFreePrice: 'Free',
    tierStandard: '🌿 Standard',
    tierStandardName: 'Standard Plan',
    tierStandardDesc: 'Unlimited bookings, schedule editing, 9% fee',
    tierStandardPrice: '¥1,980/mo',
    tierPremium: '🌳 Premium',
    tierPremiumName: 'Premium Plan',
    tierPremiumDesc: 'Priority ranking, analytics, schedule editing, 9% fee',
    tierPremiumPrice: '¥4,980/mo',
    tierPlatformFee: 'All paid plans include a 9% platform fee per transaction.',
    tierReentryNote: '* Re-entry after cancellation may incur a re-registration fee.',

    // Tier features
    tierFeatureBasicListing: 'Basic listing',
    tierFeature3Bookings: 'Up to 3 bookings/month',
    tierFeatureScheduleView: 'Schedule display',
    tierFeatureUnlimitedBookings: 'Unlimited bookings',
    tierFeatureScheduleEdit: 'Schedule editing',
    tierFeature9Fee: '9% platform fee',
    tierFeaturePriority: 'Priority ranking',
    tierFeatureAnalytics: 'Analytics dashboard',

    // User Profile
    userProfileTitle: 'My Profile',
    userProfileId: 'User ID',
    userProfileAnon: 'Anonymous User',
    userProfileHistory: 'Booking History',
    userProfileNoHistory: 'No bookings yet',
    userProfileReviews: 'Your Reviews',
    userProfileNoReviews: 'No reviews yet',
    userProfileSettings: 'Settings',
    userProfileLogout: 'Log Out',
    userProfileReceivedReviews: 'Reviews from Therapists',
    userProfileNoReceivedReviews: 'No reviews from therapists yet',
    userProfileSwitchTherapist: 'Switch to Therapist Mode',

    // Signup
    signupTitle: 'Create Account',
    signupName: 'Name',
    signupNamePlaceholder: 'Enter your name',
    signupEmail: 'Email',
    signupEmailPlaceholder: 'email@example.com',
    signupSubmit: 'Sign Up',
    signupNotice: 'Registration is free. You can browse without logging in.',
    signupRequired: 'This action requires an account',

    // Settings
    settingsTitle: 'Settings',
    settingsTheme: 'Theme',
    settingsThemeDesc: 'Change the app appearance',
    themeSpring: '🌸 Spring',
    themeSpringDesc: 'Soft pastel greens',
    themeSummer: '🌻 Summer',
    themeSummerDesc: 'Warm amber and orange',
    themeEvening: '🌙 Evening',
    themeEveningDesc: 'Cool indigo and purple',
    themeSuggested: '(suggested)',

    // Chat
    chatTitle: 'Chat',
    chatInfoWindow: 'Messages are available for 3 days',
    chatPlaceholder: 'Type a message...',
    chatStartVideo: 'Start Video Call',

    // Video Call
    videoTitle: 'Video Call',
    videoConnecting: 'Connecting...',
    videoMute: 'Mute',
    videoUnmute: 'Unmute',
    videoCamera: 'Camera',
    videoCameraOff: 'Cam Off',
    videoEnd: 'End',
    videoBlur: 'BG Blur',
    videoSelfView: 'You',

    // Reviews
    reviewsFromClients: 'Reviews from Clients',
    reviewsFromTherapists: 'Reviews from Therapists',
    reviewSubmitTitle: 'Write a Review',
    reviewRating: 'Rating',
    reviewText: 'Comment',
    reviewTextPlaceholder: 'Tell us about your experience...',
    reviewSubmit: 'Submit Review',
    reviewSuccess: 'Review submitted!',

    // Therapist Dashboard
    dashboardTitle: 'Dashboard',
    dashboardBookings: 'Bookings',
    dashboardRating: 'Rating',
    dashboardEarnings: 'This Month',
    dashboardSchedule: 'Schedule',
    dashboardSessions: 'Sessions',
    dashboardClients: 'Clients',
    dashboardEarningsMenu: 'Earnings',
    dashboardProfileEdit: 'Edit Profile',
    dashboardReferrals: 'Referral Program',

    // Schedule
    scheduleTitle: 'Schedule Management',
    scheduleAvailable: 'Open',
    scheduleUnavailable: '—',
    scheduleLocked: 'Upgrade your plan to edit schedule',
    scheduleUpgrade: 'Upgrade',

    // Sessions management
    sessionsManageTitle: 'Manage Sessions',
    sessionsAdd: '+ Add Session',
    sessionEditTitle: 'Edit Session',
    sessionSave: 'Save',

    // Clients
    clientsTitle: 'Client List',
    clientLastBooking: 'Last booking',
    clientReviewed: 'Reviewed',
    clientPendingReview: 'Pending',
    clientWriteReview: 'Write Review',

    // Earnings
    earningsTitle: 'Earnings',
    earningsThisMonth: 'This Month',
    earningsSessionRevenue: 'Session Revenue',
    earningsPlatformFee: 'Platform Fee (9%)',
    earningsReferralIncome: 'Referral Income',
    earningsNet: 'Net Earnings',
    earningsHistory: 'Earnings History',

    // Profile Edit
    profileEditTitle: 'Edit Profile',
    profileEditSave: 'Save Changes',

    // Referral Program
    referralTitle: 'Referral Program',
    referralCode: 'Your Referral Code',
    referralCopy: 'Copy',
    referralCopied: 'Copied!',
    referralTotalReferred: 'Total Referred',
    referralTotalEarnings: 'Referral Earnings',
    referralCommission: 'Referral commission: 2%',
    referralDesc: 'When a therapist signs up with your referral code, you earn a 2% commission on their revenue.',

    // Referral Landing
    referralLandingTitle: 'Join via Referral',
    referralLandingDesc: 'You\'ve been invited by ',
    referralLandingCTA: 'Sign Up Now',

    // Founding Member
    foundingMember: 'Founding Member',

    // Booking History
    bookingStatusCompleted: 'Completed',
    bookingStatusUpcoming: 'Upcoming',
    demoLogin: 'Demo Login',
    demoLoginDesc: 'Log in as test user',

    // Calendar days
    calMon: 'Mon',
    calTue: 'Tue',
    calWed: 'Wed',
    calThu: 'Thu',
    calFri: 'Fri',
    calSat: 'Sat',
    calSun: 'Sun',

    // Schedule days
    schedMon: 'Mon',
    schedTue: 'Tue',
    schedWed: 'Wed',
    schedThu: 'Thu',
    schedFri: 'Fri',
    schedSat: 'Sat',
    schedSun: 'Sun',

    // Misc
    back: 'Back',
    next: 'Next',
    language: 'JP',
  }
};

let currentLang = localStorage.getItem('iyashi-lang') || 'ja';

function t(key) {
  return translations[currentLang][key] || translations['ja'][key] || key;
}

function toggleLanguage() {
  currentLang = currentLang === 'ja' ? 'en' : 'ja';
  localStorage.setItem('iyashi-lang', currentLang);
  return currentLang;
}

function getLang() {
  return currentLang;
}
