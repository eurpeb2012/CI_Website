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
    feelingAnxious: '不安・心配がある',
    feelingLonely: '孤独を感じる',
    feelingOverwhelmed: '疲れが取れない',
    feelingLowEnergy: '元気が出ない',
    feelingChangeMyself: '自分を変えたい',
    feelingFuture: '未来を良くしたい',
    feelingPartner: 'パートナーが欲しい',
    feelingDreamJob: '理想の仕事を見つけたい',
    feelingCurious: '新しい体験をしたい',

    // Feeling Flow - Step 2
    categoryTitle: 'どんな癒しを求めますか？',
    categoryPhysical: '身体の癒し',
    categoryPhysicalDesc: 'マッサージ、ヨガ、整体など',
    categoryMental: '心の癒し',
    categoryMentalDesc: '瞑想、ヒーリング、アロマなど',
    categoryPlayful: '楽しい体験',
    categoryPlayfulDesc: '楽しい体験（占い・リトリートを含む）',
    categoryFortuneTelling: '占い',
    categoryFortuneTellingDesc: 'タロット、オラクルカード、占星術など',
    categoryRetreat: 'リトリート',
    categoryRetreatDesc: '自然の中でのリフレッシュ体験',
    categoryRetreatInPersonDesc: '対面のみ・自然の中でのリフレッシュ体験',

    // Feeling Flow - Step 3
    deliveryTitle: 'ご希望の方法は？',
    deliveryInPerson: '対面',
    deliveryInPersonDesc: '直接お会いして',
    deliveryVideo: 'オンライン',
    deliveryVideoDesc: 'ビデオ通話で',
    deliveryTelephone: '電話',
    deliveryTelephoneDesc: '電話で相談',
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
    bookingSelectDate: '日付を選択',
    bookingSelectTime: '時間を選択',
    bookingNoSlots: 'この日は空きがありません',
    bookingTimeConflict: 'この時間は既に予約済みです',
    bookingPrevMonth: '前月',
    bookingNextMonth: '翌月',
    bookingLoading: '予約中...',
    bookingError: '予約に失敗しました。もう一度お試しください。',
    bookingSuccess: '予約が完了しました！',
    bookingSuccessMsg: '確認メールをお送りしました。',
    paymentProcessing: 'お支払い処理中...',
    paymentError: '決済に失敗しました。もう一度お試しください。',
    paymentConfirmed: 'お支払いが確認されました',
    giftCardEmailRequired: 'メールアドレスを入力してください',
    bookingBackHome: 'ホームに戻る',

    // File Upload
    uploadTooLarge: 'ファイルサイズは2MB以下にしてください',
    uploadInvalidType: 'JPEG、PNG、WebP画像のみ対応しています',
    uploadFailed: 'アップロードに失敗しました',
    uploadSuccess: '写真を更新しました',

    // Apply
    applyTitle: 'セラピスト申し込み',
    applyPhoto: 'プロフィール写真',
    applyUpload: '写真をアップロード',
    applyName: '表示名',
    applyNamePlaceholder: 'ニックネームまたは本名',
    applyIntro: '自己紹介',
    applyIntroPlaceholder: 'あなたの経験や専門分野について...',
    applyEmail: 'メールアドレス',
    applyEmailPlaceholder: 'email@example.com',
    applyAddress: '住所',
    applyAddressPlaceholder: '例：東京都渋谷区1-2-3',
    applyBirthday: '生年月日',
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
    signupPhone: '電話番号',
    signupPhonePlaceholder: '090-1234-5678',
    signupAddress: '住所',
    signupAddressPlaceholder: '例：東京都渋谷区1-2-3',
    signupSubmit: '登録する',
    signupNotice: '登録は無料です。閲覧はログインなしでもできます。',
    signupRequired: 'この操作にはアカウント登録が必要です',
    signupSocialHint: 'お持ちのアカウントで簡単ログイン',
    signInGoogle: 'Googleでログイン',
    signInApple: 'Appleでログイン',
    or: 'または',
    authError: 'ログインに失敗しました。もう一度お試しください。',

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

    // Messages
    messagesTitle: 'メッセージ',
    messagesEmpty: 'メッセージはまだありません',
    messagesNoMessages: 'まだメッセージはありません',
    messagesLoginRequired: 'メッセージを見るにはログインしてください',
    messagesNewChat: '新しいメッセージ',
    messagesStartConversation: 'セラピストを探す',

    // Chat
    chatTitle: 'チャット',
    chatViewProfile: 'プロフィール',
    chatBookSession: '予約する',
    chatEmptyPrompt: 'メッセージを送って会話を始めましょう！',
    chatInfoWindow: 'メッセージは3日間有効です',
    chatPlaceholder: 'メッセージを入力...',
    chatStartVideo: 'ビデオ通話を開始',
    chatToday: '今日',
    chatJustNow: 'たった今',
    chatLoadingMessages: 'メッセージを読み込み中...',
    chatSendFailed: '送信失敗（ローカルに保存）',

    // Video Call
    videoTitle: 'ビデオ通話',
    videoConnecting: '接続中...',
    videoConnected: '接続済み',
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

    // Client Referral
    clientReferralTitle: 'お友達紹介プログラム',
    clientReferralDesc: 'お友達を紹介すると、次回のセッションで使えるキャッシュバックを受け取れます。',
    clientReferralCode: 'あなたの紹介コード',
    clientReferralReward: '紹介特典：¥500 キャッシュバック',

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

    // Search
    generalSearchPlaceholder: 'セラピスト、セッション、キーワードで検索...',
    generalSearchButton: '検索',

    // Misc
    back: '戻る',
    next: '次へ',
    language: 'EN',

    // Verified & Credentials
    verifiedBadge: '認証済み',
    unverifiedBadge: '未認証',
    credentials: '資格・認証',

    // Tags & Specialties
    tags: 'タグ',

    // Response Time
    responseTime: '平均応答時間',
    responseTimeMinutes: '分以内',
    responseTimeHours: '時間以内',
    responseTimeDay: '日以内',

    // Structured Ratings
    ratingCommunication: 'コミュニケーション',
    ratingEffectiveness: '効果',
    ratingAtmosphere: '雰囲気',
    ratingValue: 'コスパ',
    ratingOverall: '総合評価',

    // Favorites
    favorites: 'お気に入り',
    addFavorite: 'お気に入りに追加',
    removeFavorite: 'お気に入りから削除',
    favoritesEmpty: 'お気に入りはまだありません',
    navFavorites: 'お気に入り',

    // Points / Loyalty
    points: 'ポイント',
    pointsBalance: '保有ポイント',
    pointsHistory: 'ポイント履歴',
    pointsEarned: '獲得',
    pointsUsed: '使用',
    pointsPerYen: '¥100につき1ポイント',
    pointsRedeemable: 'ポイントは次回予約時に使用できます',

    // Sort
    sortBy: '並び替え',
    sortRecommended: 'おすすめ順',
    sortPriceLow: '価格が安い順',
    sortPriceHigh: '価格が高い順',
    sortRating: '評価が高い順',
    sortReviews: 'レビュー数順',
    sortNewest: '新着順',

    // Share
    shareTherapist: 'このセラピストを共有',
    shareCopied: 'リンクをコピーしました！',

    // Trending / Popular
    trendingTitle: '今週の人気',
    trendingTherapists: '人気のセラピスト',
    trendingSessions: '人気のセッション',

    // Gallery
    galleryTitle: 'ギャラリー',

    // Sliding Scale
    slidingScale: '収入に応じた料金調整あり',
    slidingScaleDesc: '経済的な事情に応じて料金の相談が可能です',

    // Gift Cards
    giftCardTitle: 'ギフトカード',
    giftCardDesc: '大切な人に癒しの時間を贈りましょう',
    giftCardAmount: '金額を選択',
    giftCardRecipient: '受取人のメールアドレス',
    giftCardMessage: 'メッセージ（任意）',
    giftCardMessagePlaceholder: 'お祝いのメッセージを添えて...',
    giftCardSend: 'ギフトカードを送る',
    giftCardSuccess: 'ギフトカードを送信しました！',
    giftCardRedeemTitle: 'ギフトカードを使う',
    giftCardRedeemDesc: 'お持ちのギフトコードを入力してください',
    giftCardRedeem: 'コードを適用',
    giftCardRedeemed: 'ギフトカード適用済み',
    giftCardInvalidCode: '無効なコードです。ご確認ください',
    giftCardExpired: 'このギフトカードは有効期限切れです',

    // Waitlist
    waitlistJoin: 'キャンセル待ちに登録',
    waitlistJoined: 'キャンセル待ち登録済み',
    waitlistDesc: '空きが出た場合にお知らせします',

    // Blog / Articles
    blogTitle: '癒しのコラム',
    blogReadMore: '続きを読む',
    blogByTherapist: '著者',
    blogEmpty: 'まだ記事はありません',

    // Digital Products
    digitalProductsTitle: 'デジタルコンテンツ',
    digitalProductsDesc: 'いつでも使えるセルフケア教材',
    digitalProductBuy: '購入する',
    digitalProductPdf: 'PDF',
    digitalProductVideo: '動画',
    digitalProductAudio: '音声',

    // Journal / Mood Tracking
    journalTitle: 'セッション日記',
    journalNew: '新しい記録',
    journalMood: '今の気分',
    journalMoodGreat: 'とても良い',
    journalMoodGood: '良い',
    journalMoodOkay: 'まあまあ',
    journalMoodLow: '低い',
    journalMoodBad: '悪い',
    journalNotes: '振り返りメモ',
    journalNotesPlaceholder: 'セッションで感じたこと、気づき...',
    journalSave: '保存する',
    journalSaved: '保存しました',
    journalEmpty: 'まだ記録はありません',
    journalHistory: '過去の記録',

    // Insurance
    insuranceAccepted: '保険適用可能',
    corporateWellness: '法人プログラム対応',

    // Form Validation
    validationRequired: '必須項目です',
    validationEmail: '有効なメールアドレスを入力してください',
    validationPhone: '有効な電話番号を入力してください',

    // Reminders
    reminderTitle: '予約リマインダー',
    reminder24h: '24時間前にお知らせ',
    reminder1h: '1時間前にお知らせ',
    reminderEnabled: 'リマインダーON',

    // Notifications
    notificationTitle: 'お知らせ',
    notificationEmpty: '新しいお知らせはありません',

    // Retreat Section
    retreatSectionTitle: 'リトリート',
    retreatSectionDesc: '世界中のウェルネスリトリートを見つけよう',
    retreatLocation: '場所',
    retreatDuration: '期間',
    retreatDays: '日間',
    retreatProvider: '提供者',
    retreatBookNow: '予約する',
    retreatIncludes: '含まれるもの',
    retreatNote: '※航空券・交通費は含まれません',
    retreatViewAll: 'すべてのリトリートを見る',

    // Forum / Message Board
    forumTitle: '掲示板',
    forumDesc: 'コミュニティで話し合いましょう',
    forumNewThread: '新しいトピック',
    forumThreadTitle: 'タイトル',
    forumThreadTitlePlaceholder: 'トピックのタイトルを入力...',
    forumThreadBody: '内容',
    forumThreadBodyPlaceholder: 'あなたの質問やアイデアを共有...',
    forumPost: '投稿する',
    forumReply: '返信する',
    forumReplyPlaceholder: '返信を入力...',
    forumReplies: '件の返信',
    forumPostedBy: '投稿者',
    forumEmpty: 'まだトピックはありません',
    forumLoginRequired: 'トピックの投稿にはログインが必要です',
    forumRules: 'コミュニティガイドライン：敬意を持って交流しましょう。',

    // Admin
    adminTitle: '管理パネル',
    adminBackToSite: 'サイトに戻る',
    adminNavDashboard: 'ダッシュボード',
    adminNavTherapists: 'セラピスト管理',
    adminNavUsers: 'ユーザー管理',
    adminNavBookings: '予約一覧',
    adminNavRevenue: '収益・分析',
    adminNavModeration: 'コンテンツ管理',
    adminNavReferrals: '紹介トラッキング',
    adminNavCalendar: 'カレンダー設定',
    adminNavAuditLog: '操作ログ',
    adminNavSystemHealth: 'システム状況',
    adminHealthOnline: 'オンライン',
    adminHealthOffline: 'オフライン',
    adminHealthDB: 'データベース',
    adminHealthDBLatency: 'DB応答時間',
    adminHealthStripe: '決済システム',
    adminHealthCDN: 'CDN / ホスティング',
    adminHealthEnvironment: '環境情報',
    adminHealthTableStats: 'テーブル統計',
    adminHealthActions: 'アクション',
    adminRefresh: '更新',
    adminFilterAll: 'すべて',
    adminStatTherapists: '登録セラピスト',
    adminStatUsers: '登録ユーザー',
    adminStatActiveBookings: 'アクティブ予約',
    adminStatMonthlyRevenue: '月間売上',
    adminStatPlatformFees: 'プラットフォーム手数料',
    adminQuickLinks: 'クイックリンク',
    adminRecentActivity: '最近のアクティビティ',
    adminActivity_signup: '登録',
    adminActivity_booking: '予約',
    adminActivity_review: 'レビュー',
    adminActivity_moderation: '管理',
    adminFilterAllTiers: 'すべてのプラン',
    adminFilterAllStatus: 'すべてのステータス',
    adminFilterAll: 'すべて',
    adminStatus_active: 'アクティブ',
    adminStatus_pending: '保留中',
    adminStatus_suspended: '停止中',
    adminStatus_completed: '完了',
    adminStatus_upcoming: '予定',
    adminStatus_cancelled: 'キャンセル',
    adminStatus_resolved: '解決済み',
    adminStatus_dismissed: '却下',
    adminStatus_removed: '削除済み',
    adminColName: '名前',
    adminColTier: 'プラン',
    adminColStatus: 'ステータス',
    adminColFounding: '創立',
    adminColActions: '操作',
    adminColEmail: 'メール',
    adminColJoinDate: '登録日',
    adminColBookings: '予約数',
    adminColClient: 'クライアント',
    adminActionView: '詳細',
    adminSearchUsers: 'ユーザーを検索...',
    adminUserProfile: 'ユーザープロフィール',
    adminChangeStatus: 'ステータス変更',
    adminThProfile: 'プロフィール',
    adminThTierMgmt: 'プラン管理',
    adminThStats: '統計情報',
    adminSaved: '保存しました',
    adminTotal: '合計',
    adminBookingsCount: '件',
    adminCalBookingWindow: '予約受付期間',
    adminCalBookingWindowDesc: 'このセラピストが何日先まで予約を受け付けるか設定します。',
    adminCalMaxDays: '最大日数',
    adminCalDays: '日',
    adminCalTierDefault: 'プランのデフォルト',
    adminCalGlobal: 'グローバル設定',
    adminCalGlobalMax: 'デフォルト最大日数',
    adminCalTierDefaults: 'プラン別デフォルト',
    adminCalOverrides: 'セラピスト個別設定',
    adminCalCurrentWindow: '現在の設定',
    adminCalUseDefault: 'デフォルト使用',
    adminCalBlackout: 'ブラックアウト日',
    adminCalAddBlackout: '追加',
    adminRevGross: '総売上',
    adminRevPlatformFees: 'プラットフォーム手数料',
    adminRevReferralPayouts: '紹介報酬',
    adminRevNet: 'プラットフォーム純収益',
    adminRevMonthlyChart: '月次推移',
    adminRevPerTherapist: 'セラピスト別収益',
    adminRevFeeStructure: '手数料体系',
    adminRevFeeTransaction: '取引手数料',
    adminRevFeeReferral: '紹介コミッション',
    adminRevFeeFree: 'フリープラン手数料',
    adminModPending: '未処理',
    adminModResolved: '処理済み',
    adminModNoPending: '未処理の項目はありません',
    adminModType_review: 'レビュー',
    adminModType_report: '通報',
    adminModReporter: '報告者',
    adminModTarget: '対象',
    adminModReason: '理由',
    adminModApprove: '承認',
    adminModRemove: '削除',
    adminModDismiss: '却下',
    adminRefTotalReferred: '総紹介数',
    adminRefTotalCommission: '総コミッション',
    adminRefAllCodes: '紹介コード一覧',
    adminRefCommission: 'コミッション',
    adminRefDisable: '無効化',
    adminRefEnable: '有効化',
    adminRefChain: '紹介チェーン',
    adminLoading: 'データを読み込み中...',
    adminStatPendingModeration: '未処理モデレーション',
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
    feelingAnxious: 'Anxious or worried',
    feelingLonely: 'Lonely',
    feelingOverwhelmed: 'Exhausted',
    feelingLowEnergy: 'Low energy',
    feelingChangeMyself: 'I want to change myself',
    feelingFuture: 'I want a better future',
    feelingPartner: 'I want a partner',
    feelingDreamJob: 'I want my dream job',
    feelingCurious: 'Looking for something new',

    // Feeling Flow - Step 2
    categoryTitle: 'What kind of healing are you looking for?',
    categoryPhysical: 'Physical Relief',
    categoryPhysicalDesc: 'Massage, yoga, bodywork, etc.',
    categoryMental: 'Mental Relief',
    categoryMentalDesc: 'Meditation, healing, aromatherapy, etc.',
    categoryPlayful: 'Playful Interaction',
    categoryPlayfulDesc: 'Fortune telling, retreats, art, workshops, etc.',
    categoryFortuneTelling: 'Fortune Telling',
    categoryFortuneTellingDesc: 'Tarot, oracle cards, astrology, etc.',
    categoryRetreat: 'Retreat',
    categoryRetreatDesc: 'Refresh in nature',
    categoryRetreatInPersonDesc: 'In-person only — refresh in nature',

    // Feeling Flow - Step 3
    deliveryTitle: 'How would you like your session?',
    deliveryInPerson: 'In Person',
    deliveryInPersonDesc: 'Meet face to face',
    deliveryVideo: 'Video Call',
    deliveryVideoDesc: 'Online video session',
    deliveryTelephone: 'Telephone',
    deliveryTelephoneDesc: 'Consultation by phone',
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
    bookingSelectDate: 'Select a date',
    bookingSelectTime: 'Select a time',
    bookingNoSlots: 'No availability on this day',
    bookingTimeConflict: 'This time is already booked',
    bookingPrevMonth: 'Previous',
    bookingNextMonth: 'Next',
    bookingLoading: 'Booking...',
    bookingError: 'Booking failed. Please try again.',
    bookingSuccess: 'Booking Confirmed!',
    bookingSuccessMsg: 'A confirmation email has been sent.',
    paymentProcessing: 'Processing payment...',
    paymentError: 'Payment failed. Please try again.',
    paymentConfirmed: 'Payment confirmed',
    giftCardEmailRequired: 'Please enter an email address',
    bookingBackHome: 'Back to Home',

    // File Upload
    uploadTooLarge: 'File must be under 2MB',
    uploadInvalidType: 'Only JPEG, PNG, and WebP images are supported',
    uploadFailed: 'Upload failed',
    uploadSuccess: 'Photo updated',

    // Apply
    applyTitle: 'Therapist Application',
    applyPhoto: 'Profile Photo',
    applyUpload: 'Upload Photo',
    applyName: 'Display Name',
    applyNamePlaceholder: 'Nickname or real name',
    applyIntro: 'Introduction',
    applyIntroPlaceholder: 'Tell us about your experience and specialties...',
    applyEmail: 'Email',
    applyEmailPlaceholder: 'email@example.com',
    applyAddress: 'Address',
    applyAddressPlaceholder: 'e.g., 1-2-3 Shibuya, Tokyo',
    applyBirthday: 'Date of Birth',
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
    signupPhone: 'Phone Number',
    signupPhonePlaceholder: '090-1234-5678',
    signupAddress: 'Address',
    signupAddressPlaceholder: 'e.g., 1-2-3 Shibuya, Tokyo',
    signupSubmit: 'Sign Up',
    signupNotice: 'Registration is free. You can browse without logging in.',
    signupRequired: 'This action requires an account',
    signupSocialHint: 'Sign in with your existing account',
    signInGoogle: 'Sign in with Google',
    signInApple: 'Sign in with Apple',
    or: 'or',
    authError: 'Login failed. Please try again.',

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

    // Messages
    messagesTitle: 'Messages',
    messagesEmpty: 'No messages yet',
    messagesNoMessages: 'No messages yet',
    messagesLoginRequired: 'Please log in to view messages',
    messagesNewChat: 'New Message',
    messagesStartConversation: 'Find a Therapist',

    // Chat
    chatTitle: 'Chat',
    chatViewProfile: 'Profile',
    chatBookSession: 'Book',
    chatEmptyPrompt: 'Send a message to start the conversation!',
    chatInfoWindow: 'Messages are available for 3 days',
    chatPlaceholder: 'Type a message...',
    chatStartVideo: 'Start Video Call',
    chatToday: 'Today',
    chatJustNow: 'Just now',
    chatLoadingMessages: 'Loading messages...',
    chatSendFailed: 'Send failed (saved locally)',

    // Video Call
    videoTitle: 'Video Call',
    videoConnecting: 'Connecting...',
    videoConnected: 'Connected',
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

    // Client Referral
    clientReferralTitle: 'Refer a Friend',
    clientReferralDesc: 'Refer a friend and get cashback on your next session.',
    clientReferralCode: 'Your Referral Code',
    clientReferralReward: 'Referral reward: ¥500 cashback',

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

    // Search
    generalSearchPlaceholder: 'Search therapists, sessions, keywords...',
    generalSearchButton: 'Search',

    // Misc
    back: 'Back',
    next: 'Next',
    language: 'JP',

    // Verified & Credentials
    verifiedBadge: 'Verified',
    unverifiedBadge: 'Unverified',
    credentials: 'Credentials',

    // Tags & Specialties
    tags: 'Tags',

    // Response Time
    responseTime: 'Avg. Response',
    responseTimeMinutes: 'min',
    responseTimeHours: 'hr',
    responseTimeDay: 'day',

    // Structured Ratings
    ratingCommunication: 'Communication',
    ratingEffectiveness: 'Effectiveness',
    ratingAtmosphere: 'Atmosphere',
    ratingValue: 'Value',
    ratingOverall: 'Overall',

    // Favorites
    favorites: 'Favorites',
    addFavorite: 'Add to Favorites',
    removeFavorite: 'Remove from Favorites',
    favoritesEmpty: 'No favorites yet',
    navFavorites: 'Favorites',

    // Points / Loyalty
    points: 'Points',
    pointsBalance: 'Point Balance',
    pointsHistory: 'Points History',
    pointsEarned: 'Earned',
    pointsUsed: 'Used',
    pointsPerYen: '1 point per ¥100',
    pointsRedeemable: 'Points can be redeemed on your next booking',

    // Sort
    sortBy: 'Sort by',
    sortRecommended: 'Recommended',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    sortRating: 'Highest Rated',
    sortReviews: 'Most Reviews',
    sortNewest: 'Newest',

    // Share
    shareTherapist: 'Share this therapist',
    shareCopied: 'Link copied!',

    // Trending / Popular
    trendingTitle: 'Popular This Week',
    trendingTherapists: 'Popular Therapists',
    trendingSessions: 'Popular Sessions',

    // Gallery
    galleryTitle: 'Gallery',

    // Sliding Scale
    slidingScale: 'Sliding scale pricing available',
    slidingScaleDesc: 'Fees may be adjusted based on financial circumstances',

    // Gift Cards
    giftCardTitle: 'Gift Cards',
    giftCardDesc: 'Give the gift of healing to someone special',
    giftCardAmount: 'Select Amount',
    giftCardRecipient: 'Recipient Email',
    giftCardMessage: 'Message (optional)',
    giftCardMessagePlaceholder: 'Add a personal message...',
    giftCardSend: 'Send Gift Card',
    giftCardSuccess: 'Gift card sent!',
    giftCardRedeemTitle: 'Redeem Gift Card',
    giftCardRedeemDesc: 'Enter your gift card code below',
    giftCardRedeem: 'Apply Code',
    giftCardRedeemed: 'Gift card applied',
    giftCardInvalidCode: 'Invalid code. Please check and try again',
    giftCardExpired: 'This gift card has expired',

    // Waitlist
    waitlistJoin: 'Join Waitlist',
    waitlistJoined: 'On Waitlist',
    waitlistDesc: 'We\'ll notify you when a spot opens up',

    // Blog / Articles
    blogTitle: 'Wellness Articles',
    blogReadMore: 'Read More',
    blogByTherapist: 'By',
    blogEmpty: 'No articles yet',

    // Digital Products
    digitalProductsTitle: 'Digital Content',
    digitalProductsDesc: 'Self-care resources available anytime',
    digitalProductBuy: 'Purchase',
    digitalProductPdf: 'PDF',
    digitalProductVideo: 'Video',
    digitalProductAudio: 'Audio',

    // Journal / Mood Tracking
    journalTitle: 'Session Journal',
    journalNew: 'New Entry',
    journalMood: 'Current Mood',
    journalMoodGreat: 'Great',
    journalMoodGood: 'Good',
    journalMoodOkay: 'Okay',
    journalMoodLow: 'Low',
    journalMoodBad: 'Bad',
    journalNotes: 'Reflection Notes',
    journalNotesPlaceholder: 'What you felt during the session, insights...',
    journalSave: 'Save',
    journalSaved: 'Saved',
    journalEmpty: 'No entries yet',
    journalHistory: 'Past Entries',

    // Insurance
    insuranceAccepted: 'Insurance accepted',
    corporateWellness: 'Corporate wellness eligible',

    // Form Validation
    validationRequired: 'This field is required',
    validationEmail: 'Please enter a valid email',
    validationPhone: 'Please enter a valid phone number',

    // Reminders
    reminderTitle: 'Booking Reminders',
    reminder24h: 'Notify 24 hours before',
    reminder1h: 'Notify 1 hour before',
    reminderEnabled: 'Reminders ON',

    // Notifications
    notificationTitle: 'Notifications',
    notificationEmpty: 'No new notifications',

    // Retreat Section
    retreatSectionTitle: 'Retreats',
    retreatSectionDesc: 'Discover wellness retreats around the world',
    retreatLocation: 'Location',
    retreatDuration: 'Duration',
    retreatDays: 'days',
    retreatProvider: 'Provider',
    retreatBookNow: 'Book Now',
    retreatIncludes: 'Includes',
    retreatNote: '* Airfare / transportation not included',
    retreatViewAll: 'View All Retreats',

    // Forum / Message Board
    forumTitle: 'Message Board',
    forumDesc: 'Discuss with the community',
    forumNewThread: 'New Topic',
    forumThreadTitle: 'Title',
    forumThreadTitlePlaceholder: 'Enter topic title...',
    forumThreadBody: 'Content',
    forumThreadBodyPlaceholder: 'Share your question or idea...',
    forumPost: 'Post',
    forumReply: 'Reply',
    forumReplyPlaceholder: 'Write a reply...',
    forumReplies: 'replies',
    forumPostedBy: 'Posted by',
    forumEmpty: 'No topics yet',
    forumLoginRequired: 'Login required to post topics',
    forumRules: 'Community guidelines: Be respectful in all interactions.',

    // Admin
    adminTitle: 'Admin Panel',
    adminBackToSite: 'Back to Site',
    adminNavDashboard: 'Dashboard',
    adminNavTherapists: 'Therapists',
    adminNavUsers: 'Users',
    adminNavBookings: 'Bookings',
    adminNavRevenue: 'Revenue',
    adminNavModeration: 'Moderation',
    adminNavReferrals: 'Referrals',
    adminNavCalendar: 'Calendar Settings',
    adminNavAuditLog: 'Audit Log',
    adminNavSystemHealth: 'System Health',
    adminHealthOnline: 'Online',
    adminHealthOffline: 'Offline',
    adminHealthDB: 'Database',
    adminHealthDBLatency: 'DB Latency',
    adminHealthStripe: 'Payment System',
    adminHealthCDN: 'CDN / Hosting',
    adminHealthEnvironment: 'Environment',
    adminHealthTableStats: 'Table Statistics',
    adminHealthActions: 'Actions',
    adminRefresh: 'Refresh',
    adminFilterAll: 'All',
    adminStatTherapists: 'Therapists',
    adminStatUsers: 'Users',
    adminStatActiveBookings: 'Active Bookings',
    adminStatMonthlyRevenue: 'Monthly Revenue',
    adminStatPlatformFees: 'Platform Fees',
    adminQuickLinks: 'Quick Links',
    adminRecentActivity: 'Recent Activity',
    adminActivity_signup: 'Signup',
    adminActivity_booking: 'Booking',
    adminActivity_review: 'Review',
    adminActivity_moderation: 'Moderation',
    adminFilterAllTiers: 'All Tiers',
    adminFilterAllStatus: 'All Statuses',
    adminFilterAll: 'All',
    adminStatus_active: 'Active',
    adminStatus_pending: 'Pending',
    adminStatus_suspended: 'Suspended',
    adminStatus_completed: 'Completed',
    adminStatus_upcoming: 'Upcoming',
    adminStatus_cancelled: 'Cancelled',
    adminStatus_resolved: 'Resolved',
    adminStatus_dismissed: 'Dismissed',
    adminStatus_removed: 'Removed',
    adminColName: 'Name',
    adminColTier: 'Tier',
    adminColStatus: 'Status',
    adminColFounding: 'Founding',
    adminColActions: 'Actions',
    adminColEmail: 'Email',
    adminColJoinDate: 'Joined',
    adminColBookings: 'Bookings',
    adminColClient: 'Client',
    adminActionView: 'View',
    adminSearchUsers: 'Search users...',
    adminUserProfile: 'User Profile',
    adminChangeStatus: 'Change Status',
    adminThProfile: 'Profile',
    adminThTierMgmt: 'Tier Management',
    adminThStats: 'Statistics',
    adminSaved: 'Saved',
    adminTotal: 'Total',
    adminBookingsCount: 'bookings',
    adminCalBookingWindow: 'Booking Window',
    adminCalBookingWindowDesc: 'Set how far out this therapist can accept bookings.',
    adminCalMaxDays: 'Max Days',
    adminCalDays: 'days',
    adminCalTierDefault: 'Tier Default',
    adminCalGlobal: 'Global Settings',
    adminCalGlobalMax: 'Default Max Days',
    adminCalTierDefaults: 'Per-Tier Defaults',
    adminCalOverrides: 'Per-Therapist Overrides',
    adminCalCurrentWindow: 'Current Window',
    adminCalUseDefault: 'Use Default',
    adminCalBlackout: 'Blackout Dates',
    adminCalAddBlackout: 'Add',
    adminRevGross: 'Gross Revenue',
    adminRevPlatformFees: 'Platform Fees',
    adminRevReferralPayouts: 'Referral Payouts',
    adminRevNet: 'Net Platform Income',
    adminRevMonthlyChart: 'Monthly Trend',
    adminRevPerTherapist: 'Per-Therapist Revenue',
    adminRevFeeStructure: 'Fee Structure',
    adminRevFeeTransaction: 'Transaction Fee',
    adminRevFeeReferral: 'Referral Commission',
    adminRevFeeFree: 'Free Tier Fee',
    adminModPending: 'Pending',
    adminModResolved: 'Resolved',
    adminModNoPending: 'No pending items',
    adminModType_review: 'Review',
    adminModType_report: 'Report',
    adminModReporter: 'Reporter',
    adminModTarget: 'Target',
    adminModReason: 'Reason',
    adminModApprove: 'Approve',
    adminModRemove: 'Remove',
    adminModDismiss: 'Dismiss',
    adminRefTotalReferred: 'Total Referred',
    adminRefTotalCommission: 'Total Commission',
    adminRefAllCodes: 'All Referral Codes',
    adminRefCommission: 'Commission',
    adminRefDisable: 'Disable',
    adminRefEnable: 'Enable',
    adminRefChain: 'Referral Chain',
    adminLoading: 'Loading data...',
    adminStatPendingModeration: 'Pending Moderation',
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
