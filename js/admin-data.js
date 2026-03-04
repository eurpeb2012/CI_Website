// ===== Admin Data =====
// Mock data for the admin panel. Reuses therapists[] and mockDashboardData from data.js.

const adminStats = {
  totalTherapists: 8,
  totalUsers: 47,
  activeBookings: 12,
  monthlyRevenue: 843500,
  platformFees: 72630,
  referralPayouts: 12600,
  netPlatformIncome: 60030,
};

const adminUsers = [
  { id: 'U001', name: { ja: '匿名ユーザー', en: 'Anonymous' }, email: 'anon@healinggarden.jp', joinDate: '2025-11-10', bookingsCount: 5, status: 'active' },
  { id: 'U002', name: { ja: 'Kさん', en: 'K.' }, email: 'k.user@example.com', joinDate: '2025-12-01', bookingsCount: 3, status: 'active' },
  { id: 'U003', name: { ja: 'Mさん', en: 'M.' }, email: 'm.user@example.com', joinDate: '2025-12-15', bookingsCount: 4, status: 'active' },
  { id: 'U004', name: { ja: 'Aさん', en: 'A.' }, email: 'a.user@example.com', joinDate: '2026-01-05', bookingsCount: 6, status: 'active' },
  { id: 'U005', name: { ja: 'Yさん', en: 'Y.' }, email: 'y.user@example.com', joinDate: '2026-01-10', bookingsCount: 2, status: 'active' },
  { id: 'U006', name: { ja: 'Eさん', en: 'E.' }, email: 'e.user@example.com', joinDate: '2026-01-12', bookingsCount: 3, status: 'active' },
  { id: 'U007', name: { ja: 'Oさん', en: 'O.' }, email: 'o.user@example.com', joinDate: '2026-01-20', bookingsCount: 2, status: 'active' },
  { id: 'U008', name: { ja: 'Pさん', en: 'P.' }, email: 'p.user@example.com', joinDate: '2026-01-22', bookingsCount: 4, status: 'active' },
  { id: 'U009', name: { ja: 'Uさん', en: 'U.' }, email: 'u.user@example.com', joinDate: '2026-01-25', bookingsCount: 2, status: 'active' },
  { id: 'U010', name: { ja: 'テストユーザー', en: 'Test User' }, email: 'test@healinggarden.jp', joinDate: '2026-02-01', bookingsCount: 5, status: 'active' },
  { id: 'U011', name: { ja: 'Sさん', en: 'S.' }, email: 's.user@example.com', joinDate: '2026-02-05', bookingsCount: 1, status: 'active' },
  { id: 'U012', name: { ja: 'Nさん', en: 'N.' }, email: 'n.user@example.com', joinDate: '2026-02-08', bookingsCount: 1, status: 'active' },
  { id: 'U013', name: { ja: 'Tさん', en: 'T.' }, email: 't.user@example.com', joinDate: '2025-12-20', bookingsCount: 3, status: 'active' },
  { id: 'U014', name: { ja: 'Cさん', en: 'C.' }, email: 'c.user@example.com', joinDate: '2026-01-28', bookingsCount: 1, status: 'active' },
  { id: 'U015', name: { ja: 'Dさん', en: 'D.' }, email: 'd.user@example.com', joinDate: '2026-02-10', bookingsCount: 2, status: 'active' },
  { id: 'U016', name: { ja: 'Fさん', en: 'F.' }, email: 'f.user@example.com', joinDate: '2026-02-12', bookingsCount: 2, status: 'active' },
  { id: 'U017', name: { ja: 'Rさん', en: 'R.' }, email: 'r.user@example.com', joinDate: '2026-02-14', bookingsCount: 1, status: 'active' },
  { id: 'U018', name: { ja: 'Wさん', en: 'W.' }, email: 'w.user@example.com', joinDate: '2026-02-15', bookingsCount: 1, status: 'active' },
  { id: 'U019', name: { ja: 'Hさん', en: 'H.' }, email: 'h.user@example.com', joinDate: '2026-01-18', bookingsCount: 2, status: 'active' },
  { id: 'U020', name: { ja: 'Jさん', en: 'J.' }, email: 'j.user@example.com', joinDate: '2026-02-03', bookingsCount: 1, status: 'suspended' },
];

const adminBookings = [
  { id: 'BK-001', date: '2026-02-28', clientName: { ja: '匿名ユーザー', en: 'Anonymous' }, therapistName: { ja: '山田 花子', en: 'Hanako Yamada' }, therapistId: 1, session: { ja: 'アロマリラクゼーション', en: 'Aroma Relaxation' }, amount: 8000, status: 'completed' },
  { id: 'BK-002', date: '2026-02-27', clientName: { ja: 'Mさん', en: 'M.' }, therapistName: { ja: '鈴木 太郎', en: 'Taro Suzuki' }, therapistId: 2, session: { ja: '全身整体コース', en: 'Full Body Adjustment' }, amount: 7000, status: 'completed' },
  { id: 'BK-003', date: '2026-02-26', clientName: { ja: 'Dさん', en: 'D.' }, therapistName: { ja: '小林 あかり', en: 'Akari Kobayashi' }, therapistId: 8, session: { ja: 'シンギングボウルセッション', en: 'Singing Bowl Session' }, amount: 8500, status: 'completed' },
  { id: 'BK-004', date: '2026-02-25', clientName: { ja: 'Kさん', en: 'K.' }, therapistName: { ja: '山田 花子', en: 'Hanako Yamada' }, therapistId: 1, session: { ja: 'オンライン瞑想ガイド', en: 'Online Meditation Guide' }, amount: 4000, status: 'completed' },
  { id: 'BK-005', date: '2026-02-25', clientName: { ja: '匿名ユーザー', en: 'Anonymous' }, therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' }, therapistId: 3, session: { ja: 'オラクルカード体験', en: 'Oracle Card Experience' }, amount: 2500, status: 'completed' },
  { id: 'BK-006', date: '2026-02-24', clientName: { ja: 'Pさん', en: 'P.' }, therapistName: { ja: '伊藤 ケン', en: 'Ken Ito' }, therapistId: 7, session: { ja: 'アートセラピー体験', en: 'Art Therapy Experience' }, amount: 7500, status: 'completed' },
  { id: 'BK-007', date: '2026-02-22', clientName: { ja: 'Eさん', en: 'E.' }, therapistName: { ja: '中村 さくら', en: 'Sakura Nakamura' }, therapistId: 5, session: { ja: 'ハタヨガ（対面）', en: 'Hatha Yoga (In Person)' }, amount: 5500, status: 'completed' },
  { id: 'BK-008', date: '2026-02-20', clientName: { ja: 'テストユーザー', en: 'Test User' }, therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' }, therapistId: 3, session: { ja: 'タロットリーディング', en: 'Tarot Reading' }, amount: 5000, status: 'completed' },
  { id: 'BK-009', date: '2026-02-18', clientName: { ja: '匿名ユーザー', en: 'Anonymous' }, therapistName: { ja: '田中 誠', en: 'Makoto Tanaka' }, therapistId: 4, session: { ja: 'オンラインカウンセリング', en: 'Online Counseling' }, amount: 10000, status: 'completed' },
  { id: 'BK-010', date: '2026-02-15', clientName: { ja: 'テストユーザー', en: 'Test User' }, therapistName: { ja: '伊藤 ケン', en: 'Ken Ito' }, therapistId: 7, session: { ja: 'アートセラピー体験', en: 'Art Therapy Experience' }, amount: 7500, status: 'completed' },
  { id: 'BK-011', date: '2026-03-07', clientName: { ja: 'テストユーザー', en: 'Test User' }, therapistName: { ja: '中村 さくら', en: 'Sakura Nakamura' }, therapistId: 5, session: { ja: 'オンラインリストラティブヨガ', en: 'Online Restorative Yoga' }, amount: 3500, status: 'upcoming' },
  { id: 'BK-012', date: '2026-03-12', clientName: { ja: 'テストユーザー', en: 'Test User' }, therapistName: { ja: '小林 あかり', en: 'Akari Kobayashi' }, therapistId: 8, session: { ja: 'シンギングボウルセッション', en: 'Singing Bowl Session' }, amount: 8500, status: 'upcoming' },
  { id: 'BK-013', date: '2026-03-10', clientName: { ja: 'Aさん', en: 'A.' }, therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' }, therapistId: 3, session: { ja: 'タロットリーディング', en: 'Tarot Reading' }, amount: 5000, status: 'upcoming' },
  { id: 'BK-014', date: '2026-03-08', clientName: { ja: 'Mさん', en: 'M.' }, therapistName: { ja: '鈴木 太郎', en: 'Taro Suzuki' }, therapistId: 2, session: { ja: 'スポーツ整体', en: 'Sports Bodywork' }, amount: 9000, status: 'upcoming' },
  { id: 'BK-015', date: '2026-03-05', clientName: { ja: 'Kさん', en: 'K.' }, therapistName: { ja: '山田 花子', en: 'Hanako Yamada' }, therapistId: 1, session: { ja: 'アロマリラクゼーション', en: 'Aroma Relaxation' }, amount: 8000, status: 'upcoming' },
  { id: 'BK-016', date: '2026-02-20', clientName: { ja: 'Sさん', en: 'S.' }, therapistName: { ja: '山田 花子', en: 'Hanako Yamada' }, therapistId: 1, session: { ja: 'アロマリラクゼーション', en: 'Aroma Relaxation' }, amount: 8000, status: 'cancelled' },
  { id: 'BK-017', date: '2026-02-14', clientName: { ja: 'Fさん', en: 'F.' }, therapistName: { ja: '小林 あかり', en: 'Akari Kobayashi' }, therapistId: 8, session: { ja: 'オンライン音浴', en: 'Online Sound Bath' }, amount: 4000, status: 'completed' },
  { id: 'BK-018', date: '2026-02-05', clientName: { ja: 'Cさん', en: 'C.' }, therapistName: { ja: '高橋 レイ', en: 'Rei Takahashi' }, therapistId: 6, session: { ja: 'レイキヒーリング', en: 'Reiki Healing' }, amount: 6000, status: 'completed' },
];

const moderationQueue = [
  { id: 'MOD-001', type: 'review', content: { ja: '効果がなかった。二度と行かない。', en: 'No effect. Never going back.' }, reporter: { ja: '匿名ユーザー', en: 'Anonymous' }, targetTherapist: { ja: '高橋 レイ', en: 'Rei Takahashi' }, reason: { ja: '不適切な表現の疑い', en: 'Potentially inappropriate language' }, date: '2026-02-28', status: 'pending' },
  { id: 'MOD-002', type: 'review', content: { ja: '最悪のセラピスト。お金の無駄。', en: 'Worst therapist. Waste of money.' }, reporter: { ja: 'Hさん', en: 'H.' }, targetTherapist: { ja: '田中 誠', en: 'Makoto Tanaka' }, reason: { ja: '誹謗中傷', en: 'Defamation' }, date: '2026-02-26', status: 'pending' },
  { id: 'MOD-003', type: 'report', content: { ja: 'セッション中に不適切な発言がありました。', en: 'Inappropriate remarks during session.' }, reporter: { ja: 'Rさん', en: 'R.' }, targetTherapist: { ja: '佐藤 美月', en: 'Mitsuki Sato' }, reason: { ja: 'セッション中の不適切な行為', en: 'Inappropriate behavior during session' }, date: '2026-02-24', status: 'pending' },
  { id: 'MOD-004', type: 'review', content: { ja: '普通のセッションでした。特に問題なし。', en: 'Normal session. No issues.' }, reporter: { ja: 'system', en: 'system' }, targetTherapist: { ja: '鈴木 太郎', en: 'Taro Suzuki' }, reason: { ja: '自動フラグ：低評価レビュー', en: 'Auto-flag: low-rating review' }, date: '2026-02-20', status: 'resolved' },
  { id: 'MOD-005', type: 'report', content: { ja: 'プロフィール写真が不適切です。', en: 'Profile photo is inappropriate.' }, reporter: { ja: 'Wさん', en: 'W.' }, targetTherapist: { ja: '伊藤 ケン', en: 'Ken Ito' }, reason: { ja: 'プロフィール画像の問題', en: 'Profile image issue' }, date: '2026-02-18', status: 'dismissed' },
];

const adminReferrals = [
  { therapistId: 1, therapistName: { ja: '山田 花子', en: 'Hanako Yamada' }, code: 'HANAKO2026', totalReferred: 2, referredIds: [2, 8], totalCommission: 8400, status: 'active' },
  { therapistId: 3, therapistName: { ja: '佐藤 美月', en: 'Mitsuki Sato' }, code: 'MITSUKI2026', totalReferred: 2, referredIds: [4, 7], totalCommission: 13600, status: 'active' },
  { therapistId: 5, therapistName: { ja: '中村 さくら', en: 'Sakura Nakamura' }, code: 'SAKURA2026', totalReferred: 1, referredIds: [6], totalCommission: 3000, status: 'active' },
  { therapistId: 7, therapistName: { ja: '伊藤 ケン', en: 'Ken Ito' }, code: 'KEN2026', totalReferred: 1, referredIds: [5], totalCommission: 6000, status: 'active' },
  { therapistId: 2, therapistName: { ja: '鈴木 太郎', en: 'Taro Suzuki' }, code: 'TARO2026', totalReferred: 0, referredIds: [], totalCommission: 0, status: 'active' },
  { therapistId: 4, therapistName: { ja: '田中 誠', en: 'Makoto Tanaka' }, code: 'MAKOTO2026', totalReferred: 0, referredIds: [], totalCommission: 0, status: 'active' },
  { therapistId: 6, therapistName: { ja: '高橋 レイ', en: 'Rei Takahashi' }, code: 'REI2026', totalReferred: 0, referredIds: [], totalCommission: 0, status: 'active' },
  { therapistId: 8, therapistName: { ja: '小林 あかり', en: 'Akari Kobayashi' }, code: 'AKARI2026', totalReferred: 0, referredIds: [], totalCommission: 0, status: 'active' },
];

const calendarSettings = {
  globalMaxDays: 30,
  tierDefaults: {
    free: 14,
    standard: 30,
    premium: 60,
  },
  overrides: {},
  blackoutDates: ['2026-05-03', '2026-05-04', '2026-05-05', '2026-12-31', '2027-01-01', '2027-01-02', '2027-01-03'],
};

const monthlyRevenueData = [
  { month: '2025-10', gross: 312000, platformFees: 24960, referralPayouts: 3200, net: 21760 },
  { month: '2025-11', gross: 456000, platformFees: 38880, referralPayouts: 5600, net: 33280 },
  { month: '2025-12', gross: 578000, platformFees: 48540, referralPayouts: 7600, net: 40940 },
  { month: '2026-01', gross: 692000, platformFees: 58320, referralPayouts: 8800, net: 49520 },
  { month: '2026-02', gross: 843500, platformFees: 72630, referralPayouts: 12600, net: 60030 },
];

const recentActivity = [
  { type: 'signup', text: { ja: '新規ユーザー登録: Jさん', en: 'New user signup: J.' }, date: '2026-02-28 15:30' },
  { type: 'booking', text: { ja: '新規予約: 匿名ユーザー → 山田 花子', en: 'New booking: Anonymous → Hanako Yamada' }, date: '2026-02-28 14:00' },
  { type: 'review', text: { ja: '新規レビュー: Dさん → 小林 あかり (★5)', en: 'New review: D. → Akari Kobayashi (★5)' }, date: '2026-02-26 18:00' },
  { type: 'booking', text: { ja: '新規予約: Pさん → 伊藤 ケン', en: 'New booking: P. → Ken Ito' }, date: '2026-02-24 10:00' },
  { type: 'moderation', text: { ja: 'レビューフラグ: 不適切な表現の疑い', en: 'Review flagged: Potentially inappropriate language' }, date: '2026-02-28 16:00' },
];
