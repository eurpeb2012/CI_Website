-- ============================================================
-- Healing Garden - Seed Data
-- Inserts all mock data from data.js into Supabase tables
-- Re-runnable: uses ON CONFLICT DO NOTHING
-- ============================================================

BEGIN;

-- Disable RLS for seeding
SET session_replication_role = 'replica';

-- ============================================================
-- UUID SCHEME (deterministic, based on original integer IDs)
-- Users:              00000000-0000-0000-0000-0000000000XX
-- Therapists:         10000000-0000-0000-0000-00000000000X
-- Sessions:           20000000-0000-0000-0000-000000000XXX
-- Bookings:           30000000-0000-0000-0000-00000000000X
-- Reviews:            40000000-0000-0000-0000-00000000XXXX
-- Retreats:           50000000-0000-0000-0000-00000000000X
-- Blog articles:      60000000-0000-0000-0000-00000000000X
-- Digital products:   70000000-0000-0000-0000-00000000000X
-- Forum threads:      80000000-0000-0000-0000-00000000000X
-- Forum replies:      90000000-0000-0000-0000-0000000000XX
-- Availability:       A0000000-0000-0000-0000-0000000000XX
-- Therapist referrals:B0000000-0000-0000-0000-00000000000X
-- ============================================================


-- ============================================================
-- USERS
-- ============================================================

-- Demo / test user (from testUser in data.js)
INSERT INTO users (id, email, name, language, theme, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@healinggarden.jp',
  'テストユーザー',
  'ja',
  'spring',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Admin user
INSERT INTO users (id, email, name, language, theme, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000099',
  'admin@healinggarden.jp',
  '管理者',
  'ja',
  'spring',
  'admin',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Anonymous reviewer users (for reviews that come from anonymous / named reviewers)
-- Reviewer: Anonymous / 匿名ユーザー
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000010',
  'anon_reviewer_1@healinggarden.jp',
  '匿名ユーザー',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: K.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000011',
  'reviewer_k@healinggarden.jp',
  'Kさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: M.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000012',
  'reviewer_m@healinggarden.jp',
  'Mさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: A.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000013',
  'reviewer_a@healinggarden.jp',
  'Aさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: Y.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000014',
  'reviewer_y@healinggarden.jp',
  'Yさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: T.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000015',
  'reviewer_t@healinggarden.jp',
  'Tさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: E.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000016',
  'reviewer_e@healinggarden.jp',
  'Eさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: O.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000017',
  'reviewer_o@healinggarden.jp',
  'Oさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: C.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000018',
  'reviewer_c@healinggarden.jp',
  'Cさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: P.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000019',
  'reviewer_p@healinggarden.jp',
  'Pさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: U.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000020',
  'reviewer_u@healinggarden.jp',
  'Uさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: D.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000021',
  'reviewer_d@healinggarden.jp',
  'Dさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Reviewer: F.
INSERT INTO users (id, email, name, language, role, status)
VALUES (
  '00000000-0000-0000-0000-000000000022',
  'reviewer_f@healinggarden.jp',
  'Fさん',
  'ja',
  'user',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Therapist-linked user accounts (role = 'therapist')
INSERT INTO users (id, email, name, language, role, status)
VALUES
  ('00000000-0000-0000-0000-000000000031', 'hanako@healinggarden.jp', '山田 花子', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000032', 'taro@healinggarden.jp', '鈴木 太郎', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000033', 'mitsuki@healinggarden.jp', '佐藤 美月', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000034', 'makoto@healinggarden.jp', '田中 誠', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000035', 'sakura@healinggarden.jp', '中村 さくら', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000036', 'rei@healinggarden.jp', '高橋 レイ', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000037', 'ken@healinggarden.jp', '伊藤 ケン', 'ja', 'therapist', 'active'),
  ('00000000-0000-0000-0000-000000000038', 'akari@healinggarden.jp', '小林 あかり', 'ja', 'therapist', 'active')
ON CONFLICT (id) DO NOTHING;

-- Forum author users
INSERT INTO users (id, email, name, language, role, status)
VALUES
  ('00000000-0000-0000-0000-000000000041', 'misaki.tanaka@healinggarden.jp', '田中 美咲', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000042', 'kenta.suzuki@healinggarden.jp', '鈴木 健太', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000043', 'yumi.sato@healinggarden.jp', '佐藤 由美', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000044', 'rina.takahashi@healinggarden.jp', '高橋 リナ', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000045', 'daisuke.nakamura@healinggarden.jp', '中村 大輔', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000046', 'mari.ito@healinggarden.jp', '伊藤 真理', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000047', 'yu.kobayashi@healinggarden.jp', '小林 優', 'ja', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000048', 'sakura.watanabe@healinggarden.jp', '渡辺 さくら', 'ja', 'user', 'active')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- THERAPISTS
-- ============================================================

-- Therapist 1: Hanako Yamada
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000031',
  '山田 花子',
  'Hanako Yamada',
  '10年以上のアロマセラピー経験を持ち、心と身体のバランスを大切にしたセッションを提供しています。お一人おひとりに寄り添った癒しの時間をお約束します。',
  'With over 10 years of aromatherapy experience, I offer sessions focused on balancing mind and body. I promise a healing experience tailored to each individual.',
  '東京都渋谷区',
  'Shibuya, Tokyo',
  NULL,
  '#a8d5ba',
  'premium',
  TRUE,
  TRUE,
  '[{"name_ja": "AEAJ認定アロマセラピスト", "name_en": "AEAJ Certified Aromatherapist", "year": 2016}, {"name_ja": "NARD JAPANアロマアドバイザー", "name_en": "NARD JAPAN Aroma Advisor", "year": 2018}]'::jsonb,
  ARRAY['stress', 'relaxation', 'aromatherapy', 'meditation', 'self-care'],
  ARRAY['mental', 'physical'],
  ARRAY['in-person', 'video'],
  '1h',
  FALSE,
  92,
  'HANAKO2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 2: Taro Suzuki
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000032',
  '鈴木 太郎',
  'Taro Suzuki',
  '整体師として15年の実績。スポーツ整体から日常の疲れまで、幅広く対応します。身体の声に耳を傾け、根本からの改善を目指します。',
  '15 years as a bodywork practitioner. From sports injuries to daily fatigue, I address a wide range of needs. I listen to your body and aim for fundamental improvement.',
  '大阪府大阪市',
  'Osaka City, Osaka',
  NULL,
  '#7ec8a0',
  'standard',
  FALSE,
  TRUE,
  '[{"name_ja": "柔道整復師国家資格", "name_en": "National Judo Therapist License", "year": 2011}, {"name_ja": "スポーツ整体認定資格", "name_en": "Certified Sports Bodywork Practitioner", "year": 2014}]'::jsonb,
  ARRAY['back-pain', 'sports', 'posture', 'injury-recovery', 'physical'],
  ARRAY['physical'],
  ARRAY['in-person'],
  '2h',
  FALSE,
  78,
  'TARO2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 3: Mitsuki Sato
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000033',
  '佐藤 美月',
  'Mitsuki Sato',
  'タロットリーディング歴8年。あなたの心の奥にある答えを一緒に見つけましょう。対面・オンライン・メールすべてに対応しています。',
  '8 years of tarot reading experience. Let''s find the answers hidden in your heart. Available in person, online, and via email.',
  '京都府京都市',
  'Kyoto City, Kyoto',
  NULL,
  '#c4a8d5',
  'premium',
  TRUE,
  TRUE,
  '[{"name_ja": "日本タロット協会認定リーダー", "name_en": "Japan Tarot Association Certified Reader", "year": 2019}, {"name_ja": "オラクルカードリーディング修了", "name_en": "Oracle Card Reading Certificate", "year": 2020}]'::jsonb,
  ARRAY['tarot', 'oracle', 'fortune-telling', 'love', 'career', 'beginners'],
  ARRAY['fortune-telling', 'playful'],
  ARRAY['in-person', 'video', 'email'],
  '30m',
  FALSE,
  88,
  'MITSUKI2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 4: Makoto Tanaka
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000034',
  '田中 誠',
  'Makoto Tanaka',
  '臨床心理士・公認心理師。大学病院での10年の臨床経験を経て、オンラインカウンセリングを中心に活動しています。うつ・不安・人間関係のお悩みに寄り添います。',
  'Licensed clinical psychologist. After 10 years at a university hospital, I now focus on online counseling. I support those dealing with depression, anxiety, and relationship issues.',
  '東京都（オンライン中心）',
  'Tokyo (primarily online)',
  NULL,
  '#8bc4c1',
  'free',
  FALSE,
  FALSE,
  '[{"name_ja": "臨床心理士", "name_en": "Clinical Psychologist", "year": 2015}, {"name_ja": "公認心理師", "name_en": "Licensed Public Psychologist", "year": 2019}]'::jsonb,
  ARRAY['anxiety', 'depression', 'relationships', 'cbt', 'mental-health'],
  ARRAY['mental'],
  ARRAY['video', 'telephone', 'email'],
  '4h',
  TRUE,
  45,
  'MAKOTO2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 5: Sakura Nakamura
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000035',
  '中村 さくら',
  'Sakura Nakamura',
  'ヨガインストラクター歴12年。ハタヨガとリストラティブヨガを中心に、心身のリセットをサポートします。初心者の方も大歓迎です。',
  '12 years as a yoga instructor. Specializing in Hatha and Restorative Yoga, I help reset your mind and body. Beginners are very welcome.',
  '神奈川県横浜市',
  'Yokohama, Kanagawa',
  NULL,
  '#d4a0c4',
  'standard',
  FALSE,
  TRUE,
  '[{"name_ja": "全米ヨガアライアンスRYT200", "name_en": "Yoga Alliance RYT200", "year": 2014}, {"name_ja": "リストラティブヨガ指導者資格", "name_en": "Restorative Yoga Teacher Certification", "year": 2017}]'::jsonb,
  ARRAY['yoga', 'flexibility', 'sleep', 'beginners', 'stress-relief'],
  ARRAY['physical', 'mental'],
  ARRAY['in-person', 'video'],
  '1h',
  FALSE,
  74,
  'SAKURA2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 6: Rei Takahashi
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000036',
  '高橋 レイ',
  'Rei Takahashi',
  'レイキヒーラーとしてエネルギーワークを提供しています。目に見えない心のバランスを整え、本来の自分を取り戻すお手伝いをします。',
  'I offer energy work as a Reiki healer. I help restore invisible emotional balance and reconnect you with your true self.',
  '福岡県福岡市',
  'Fukuoka City, Fukuoka',
  NULL,
  '#c4b078',
  'free',
  FALSE,
  FALSE,
  '[{"name_ja": "レイキマスター認定", "name_en": "Reiki Master Certification", "year": 2020}, {"name_ja": "エネルギーヒーリング実践者資格", "name_en": "Energy Healing Practitioner Certificate", "year": 2021}]'::jsonb,
  ARRAY['reiki', 'energy', 'chakra', 'spiritual', 'distance-healing'],
  ARRAY['mental'],
  ARRAY['in-person', 'video'],
  '1d',
  TRUE,
  32,
  'REI2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 7: Ken Ito
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000037',
  '伊藤 ケン',
  'Ken Ito',
  'アートセラピスト。絵を描くことを通して自分の気持ちを表現し、心の整理をお手伝いします。言葉にならない感情も、色と形で伝えられます。',
  'Art therapist. Through drawing, I help you express your feelings and organize your emotions. Even feelings you can''t put into words can be conveyed through color and shape.',
  '東京都世田谷区',
  'Setagaya, Tokyo',
  NULL,
  '#d49a7a',
  'premium',
  TRUE,
  TRUE,
  '[{"name_ja": "日本芸術療法学会認定アートセラピスト", "name_en": "Japan Art Therapy Association Certified Art Therapist", "year": 2017}, {"name_ja": "臨床美術士5級", "name_en": "Clinical Art Practitioner Grade 5", "year": 2019}]'::jsonb,
  ARRAY['art', 'creativity', 'children', 'family', 'expression', 'color-therapy'],
  ARRAY['playful', 'mental'],
  ARRAY['in-person', 'video'],
  '2h',
  FALSE,
  85,
  'KEN2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;

-- Therapist 8: Akari Kobayashi
INSERT INTO therapists (id, user_id, name_ja, name_en, intro_ja, intro_en, location_ja, location_en, avatar_url, avatar_color, tier, is_founding_member, verified, credentials, tags, categories, delivery_methods, response_time, sliding_scale, popularity_score, referral_code, status)
VALUES (
  '10000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000038',
  '小林 あかり',
  'Akari Kobayashi',
  'サウンドヒーリングの専門家。シンギングボウルや音叉を使い、音の波動で心身を整えます。深いリラクゼーションと瞑想状態へ導きます。',
  'Sound healing specialist. Using singing bowls and tuning forks, I harmonize mind and body through sound vibrations. I guide you to deep relaxation and meditative states.',
  '千葉県千葉市',
  'Chiba City, Chiba',
  NULL,
  '#7ab0d4',
  'standard',
  FALSE,
  TRUE,
  '[{"name_ja": "サウンドヒーリング協会認定プラクティショナー", "name_en": "Sound Healing Association Certified Practitioner", "year": 2018}, {"name_ja": "チベタンシンギングボウル奏者認定", "name_en": "Tibetan Singing Bowl Player Certification", "year": 2019}]'::jsonb,
  ARRAY['sound', 'singing-bowl', 'meditation', 'relaxation', 'vibration'],
  ARRAY['mental', 'physical'],
  ARRAY['in-person', 'video', 'email'],
  '3h',
  FALSE,
  71,
  'AKARI2026',
  'approved'
) ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- SESSIONS
-- ============================================================

-- Therapist 1 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000101',
  '10000000-0000-0000-0000-000000000001',
  'アロマリラクゼーション',
  'Aroma Relaxation',
  '厳選されたエッセンシャルオイルを使用した全身リラクゼーション。ストレス解消と深いリラックスを促します。',
  'Full-body relaxation using carefully selected essential oils. Promotes stress relief and deep relaxation.',
  8000, 60, ARRAY['in-person'], TRUE
),
(
  '20000000-0000-0000-0000-000000000102',
  '10000000-0000-0000-0000-000000000001',
  'オンライン瞑想ガイド',
  'Online Meditation Guide',
  'ビデオ通話での瞑想セッション。呼吸法と瞑想のテクニックを丁寧にガイドします。',
  'Meditation session via video call. Gentle guidance through breathing and meditation techniques.',
  4000, 45, ARRAY['video'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 2 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000201',
  '10000000-0000-0000-0000-000000000002',
  '全身整体コース',
  'Full Body Adjustment',
  '全身の歪みを整え、血流を改善する本格整体。肩こり・腰痛にお悩みの方に。',
  'Professional bodywork to correct alignment and improve circulation. For those with shoulder and back pain.',
  7000, 60, ARRAY['in-person'], TRUE
),
(
  '20000000-0000-0000-0000-000000000202',
  '10000000-0000-0000-0000-000000000002',
  'スポーツ整体',
  'Sports Bodywork',
  'スポーツ後のケアや怪我の予防に特化した整体コース。',
  'Bodywork specialized for post-sport care and injury prevention.',
  9000, 75, ARRAY['in-person'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 3 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000301',
  '10000000-0000-0000-0000-000000000003',
  'タロットリーディング',
  'Tarot Reading',
  '78枚のタロットカードを使った本格リーディング。恋愛・仕事・人生の悩みに。',
  'Full reading with 78 tarot cards. For love, career, and life questions.',
  5000, 45, ARRAY['in-person', 'video'], TRUE
),
(
  '20000000-0000-0000-0000-000000000302',
  '10000000-0000-0000-0000-000000000003',
  'メールタロット鑑定',
  'Email Tarot Reading',
  'お悩みをメールでお送りいただき、カードの結果を詳しくレポートでお返しします。',
  'Send your question via email and receive a detailed card reading report.',
  3000, 0, ARRAY['email'], TRUE
),
(
  '20000000-0000-0000-0000-000000000303',
  '10000000-0000-0000-0000-000000000003',
  'オラクルカード体験',
  'Oracle Card Experience',
  '初心者向けのやさしいカードリーディング体験。気軽にお試しください。',
  'A gentle card reading experience for beginners. Feel free to try!',
  2500, 30, ARRAY['in-person', 'video'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 4 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000401',
  '10000000-0000-0000-0000-000000000004',
  'オンラインカウンセリング',
  'Online Counseling',
  'ビデオ通話による個別カウンセリング。初回はお悩みの整理と方向性の相談を行います。',
  'Individual counseling via video call. First session includes organizing concerns and discussing direction.',
  10000, 50, ARRAY['video'], TRUE
),
(
  '20000000-0000-0000-0000-000000000402',
  '10000000-0000-0000-0000-000000000004',
  'メール相談',
  'Email Consultation',
  'メールでのやり取りによる相談。じっくり考えて返信したい方に。週2回のやり取りを基本とします。',
  'Consultation via email exchange. For those who prefer to think carefully. Based on 2 exchanges per week.',
  6000, 0, ARRAY['email'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 5 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000501',
  '10000000-0000-0000-0000-000000000005',
  'ハタヨガ（対面）',
  'Hatha Yoga (In Person)',
  '呼吸と動きを合わせた伝統的なヨガ。柔軟性と筋力を同時に高めます。',
  'Traditional yoga combining breath and movement. Improves flexibility and strength simultaneously.',
  5500, 60, ARRAY['in-person'], TRUE
),
(
  '20000000-0000-0000-0000-000000000502',
  '10000000-0000-0000-0000-000000000005',
  'オンラインリストラティブヨガ',
  'Online Restorative Yoga',
  '道具を使ったやさしいポーズで深いリラクゼーションを。ストレスや不眠に悩む方におすすめ。',
  'Gentle poses with props for deep relaxation. Recommended for stress and insomnia.',
  3500, 45, ARRAY['video'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 6 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000601',
  '10000000-0000-0000-0000-000000000006',
  'レイキヒーリング',
  'Reiki Healing',
  '手をかざすエネルギーワーク。チャクラのバランスを整え、自然治癒力を高めます。',
  'Energy work through hand placement. Balances chakras and boosts natural healing.',
  6000, 50, ARRAY['in-person'], TRUE
),
(
  '20000000-0000-0000-0000-000000000602',
  '10000000-0000-0000-0000-000000000006',
  '遠隔レイキ',
  'Distance Reiki',
  'オンラインでのレイキセッション。場所を問わずエネルギーの調整が可能です。',
  'Online Reiki session. Energy adjustments regardless of location.',
  4500, 40, ARRAY['video'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 7 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000701',
  '10000000-0000-0000-0000-000000000007',
  'アートセラピー体験',
  'Art Therapy Experience',
  '絵の具やクレヨンを使った表現ワーク。絵の上手さは関係ありません。心の声を色で表しましょう。',
  'Expressive work with paint and crayons. Skill doesn''t matter. Let''s express your inner voice through color.',
  7500, 70, ARRAY['in-person'], TRUE
),
(
  '20000000-0000-0000-0000-000000000702',
  '10000000-0000-0000-0000-000000000007',
  'オンラインスケッチセラピー',
  'Online Sketch Therapy',
  'オンラインで一緒にスケッチしながら気持ちを探るセッション。紙とペンがあればOK。',
  'A session exploring feelings while sketching together online. All you need is paper and a pen.',
  4000, 45, ARRAY['video'], TRUE
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 8 sessions
INSERT INTO sessions (id, therapist_id, name_ja, name_en, description_ja, description_en, price, duration, delivery, is_active) VALUES
(
  '20000000-0000-0000-0000-000000000801',
  '10000000-0000-0000-0000-000000000008',
  'シンギングボウルセッション',
  'Singing Bowl Session',
  'チベタンシンギングボウルの音色に包まれる60分。深い瞑想状態で心身をリセット。',
  '60 minutes enveloped in Tibetan singing bowl sounds. Reset mind and body through deep meditation.',
  8500, 60, ARRAY['in-person'], TRUE
),
(
  '20000000-0000-0000-0000-000000000802',
  '10000000-0000-0000-0000-000000000008',
  'オンライン音浴',
  'Online Sound Bath',
  'ビデオ通話でのサウンドバス体験。ヘッドホン推奨。自宅で音の癒しを。',
  'Sound bath experience via video call. Headphones recommended. Healing sounds from home.',
  4000, 40, ARRAY['video'], TRUE
),
(
  '20000000-0000-0000-0000-000000000803',
  '10000000-0000-0000-0000-000000000008',
  'パーソナル音声ガイド',
  'Personal Audio Guide',
  'あなた専用の瞑想音声ガイドをメールで送付。毎日の瞑想習慣のお供に。',
  'Personalized meditation audio guide delivered via email. A companion for your daily practice.',
  2000, 0, ARRAY['email'], TRUE
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- AVAILABILITY
-- ============================================================

-- Therapist 1: Mon(1) 10/14/16, Wed(3) 10/13, Fri(5) 11/15
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 1, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 1, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 3, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 3, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 5, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000001', 5, '15:00', '16:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 2: Sun(0) 10/13/15, Tue(2) 11/14, Thu(4) 10/13/16, Sat(6) 10/12
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 0, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000002', 0, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000002', 0, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000002', 2, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000002', 2, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000002', 4, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000002', 4, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000002', 4, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000002', 6, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000002', 6, '12:00', '13:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 3: Mon(1) 13/15/17, Tue(2) 13/15, Thu(4) 10/13/15/17, Fri(5) 13/15
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000018', '10000000-0000-0000-0000-000000000003', 1, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000003', 1, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000003', 1, '17:00', '18:00'),
  ('a0000000-0000-0000-0000-000000000021', '10000000-0000-0000-0000-000000000003', 2, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000022', '10000000-0000-0000-0000-000000000003', 2, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000023', '10000000-0000-0000-0000-000000000003', 4, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000024', '10000000-0000-0000-0000-000000000003', 4, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000025', '10000000-0000-0000-0000-000000000003', 4, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000026', '10000000-0000-0000-0000-000000000003', 4, '17:00', '18:00'),
  ('a0000000-0000-0000-0000-000000000027', '10000000-0000-0000-0000-000000000003', 5, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000028', '10000000-0000-0000-0000-000000000003', 5, '15:00', '16:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 4: Mon(1) 10/11/14/15/16, Tue(2) 10/11/14/15, Wed(3) 10/11/14/15/16, Thu(4) 10/11/14
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000029', '10000000-0000-0000-0000-000000000004', 1, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000030', '10000000-0000-0000-0000-000000000004', 1, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000031', '10000000-0000-0000-0000-000000000004', 1, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000032', '10000000-0000-0000-0000-000000000004', 1, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000033', '10000000-0000-0000-0000-000000000004', 1, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000034', '10000000-0000-0000-0000-000000000004', 2, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000035', '10000000-0000-0000-0000-000000000004', 2, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000036', '10000000-0000-0000-0000-000000000004', 2, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000037', '10000000-0000-0000-0000-000000000004', 2, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000038', '10000000-0000-0000-0000-000000000004', 3, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000039', '10000000-0000-0000-0000-000000000004', 3, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000040', '10000000-0000-0000-0000-000000000004', 3, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000041', '10000000-0000-0000-0000-000000000004', 3, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000042', '10000000-0000-0000-0000-000000000004', 3, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000043', '10000000-0000-0000-0000-000000000004', 4, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000044', '10000000-0000-0000-0000-000000000004', 4, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000045', '10000000-0000-0000-0000-000000000004', 4, '14:00', '15:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 5: Sun(0) 9/10, Tue(2) 10/14/16, Thu(4) 10/14, Sat(6) 9/10/11
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000046', '10000000-0000-0000-0000-000000000005', 0, '09:00', '10:00'),
  ('a0000000-0000-0000-0000-000000000047', '10000000-0000-0000-0000-000000000005', 0, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000048', '10000000-0000-0000-0000-000000000005', 2, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000049', '10000000-0000-0000-0000-000000000005', 2, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000050', '10000000-0000-0000-0000-000000000005', 2, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000051', '10000000-0000-0000-0000-000000000005', 4, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000052', '10000000-0000-0000-0000-000000000005', 4, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000053', '10000000-0000-0000-0000-000000000005', 6, '09:00', '10:00'),
  ('a0000000-0000-0000-0000-000000000054', '10000000-0000-0000-0000-000000000005', 6, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000055', '10000000-0000-0000-0000-000000000005', 6, '11:00', '12:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 6: Mon(1) 11/14, Wed(3) 11/14/16, Fri(5) 11/14
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000056', '10000000-0000-0000-0000-000000000006', 1, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000057', '10000000-0000-0000-0000-000000000006', 1, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000058', '10000000-0000-0000-0000-000000000006', 3, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000059', '10000000-0000-0000-0000-000000000006', 3, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000060', '10000000-0000-0000-0000-000000000006', 3, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000061', '10000000-0000-0000-0000-000000000006', 5, '11:00', '12:00'),
  ('a0000000-0000-0000-0000-000000000062', '10000000-0000-0000-0000-000000000006', 5, '14:00', '15:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 7: Sun(0) 10/14, Tue(2) 10/14/16, Wed(3) 10/14, Fri(5) 10/14/16
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000063', '10000000-0000-0000-0000-000000000007', 0, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000064', '10000000-0000-0000-0000-000000000007', 0, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000065', '10000000-0000-0000-0000-000000000007', 2, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000066', '10000000-0000-0000-0000-000000000007', 2, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000067', '10000000-0000-0000-0000-000000000007', 2, '16:00', '17:00'),
  ('a0000000-0000-0000-0000-000000000068', '10000000-0000-0000-0000-000000000007', 3, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000069', '10000000-0000-0000-0000-000000000007', 3, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000070', '10000000-0000-0000-0000-000000000007', 5, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000071', '10000000-0000-0000-0000-000000000007', 5, '14:00', '15:00'),
  ('a0000000-0000-0000-0000-000000000072', '10000000-0000-0000-0000-000000000007', 5, '16:00', '17:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;

-- Therapist 8: Mon(1) 10/13/15, Wed(3) 10/13, Fri(5) 10/13/15, Sat(6) 10/11
INSERT INTO availability (id, therapist_id, day_of_week, start_time, end_time) VALUES
  ('a0000000-0000-0000-0000-000000000073', '10000000-0000-0000-0000-000000000008', 1, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000074', '10000000-0000-0000-0000-000000000008', 1, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000075', '10000000-0000-0000-0000-000000000008', 1, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000076', '10000000-0000-0000-0000-000000000008', 3, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000077', '10000000-0000-0000-0000-000000000008', 3, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000078', '10000000-0000-0000-0000-000000000008', 5, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000079', '10000000-0000-0000-0000-000000000008', 5, '13:00', '14:00'),
  ('a0000000-0000-0000-0000-000000000080', '10000000-0000-0000-0000-000000000008', 5, '15:00', '16:00'),
  ('a0000000-0000-0000-0000-000000000081', '10000000-0000-0000-0000-000000000008', 6, '10:00', '11:00'),
  ('a0000000-0000-0000-0000-000000000082', '10000000-0000-0000-0000-000000000008', 6, '11:00', '12:00')
ON CONFLICT (therapist_id, day_of_week, start_time) DO NOTHING;


-- ============================================================
-- BOOKINGS (from mockBookingHistory - test user's bookings)
-- ============================================================

INSERT INTO bookings (id, user_id, therapist_id, session_id, booking_date, booking_time, price, platform_fee, status) VALUES
(
  '30000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000101',
  '2026-02-28', '14:00', 8000, 720, 'completed'
),
(
  '30000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000301',
  '2026-02-20', '15:00', 5000, 450, 'completed'
),
(
  '30000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000701',
  '2026-02-15', '10:00', 7500, 675, 'completed'
),
(
  '30000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000502',
  '2026-03-07', '10:00', 3500, 315, 'upcoming'
),
(
  '30000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000801',
  '2026-03-12', '13:00', 8500, 765, 'upcoming'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- REVIEWS
-- ============================================================

-- Therapist 1 reviews
-- Review 1: Anonymous -> Therapist 1 (rating 5)
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
(
  '40000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000001',
  'client-to-therapist', 5, 5, 5, 5, 4,
  'とても癒されました。アロマの香りが素晴らしく、リラックスできました。',
  'Very healing. The aroma was wonderful and I felt so relaxed.',
  'approved', '2026-02-15'
),
-- Review 2: K. -> Therapist 1 (rating 4)
(
  '40000000-0000-0000-0000-000000000102',
  '00000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000001',
  'client-to-therapist', 4, 4, 4, 5, 4,
  'オンライン瞑想がとても良かったです。続けたいと思います。',
  'The online meditation was great. I want to continue.',
  'approved', '2026-01-28'
),
-- Review 3: Therapist 1 -> Anonymous (therapist-to-client)
(
  '40000000-0000-0000-0000-000000000103',
  '00000000-0000-0000-0000-000000000031',
  '10000000-0000-0000-0000-000000000001',
  'therapist-to-client', 5, NULL, NULL, NULL, NULL,
  'とても真摯にセッションに取り組まれていました。また是非お会いしたいです。',
  'Very sincere during the session. I would love to meet again.',
  'approved', '2026-02-16'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 2 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: M. -> Therapist 2 (rating 5)
(
  '40000000-0000-0000-0000-000000000201',
  '00000000-0000-0000-0000-000000000012',
  '10000000-0000-0000-0000-000000000002',
  'client-to-therapist', 5, 5, 5, 4, 5,
  '長年の腰痛が改善しました！通い続けたいです。',
  'My chronic back pain improved! I want to keep coming.',
  'approved', '2026-02-20'
),
-- Review: Therapist 2 -> M. (therapist-to-client)
(
  '40000000-0000-0000-0000-000000000202',
  '00000000-0000-0000-0000-000000000032',
  '10000000-0000-0000-0000-000000000002',
  'therapist-to-client', 5, NULL, NULL, NULL, NULL,
  '回復への意欲が高く、しっかりとホームケアにも取り組んでいただけました。',
  'Very motivated for recovery and diligently followed home care instructions.',
  'approved', '2026-02-21'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 3 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: A. -> Therapist 3 (rating 5)
(
  '40000000-0000-0000-0000-000000000301',
  '00000000-0000-0000-0000-000000000013',
  '10000000-0000-0000-0000-000000000003',
  'client-to-therapist', 5, 5, 5, 5, 5,
  '的確なリーディングで驚きました。とても参考になりました。',
  'I was amazed by the accurate reading. Very helpful.',
  'approved', '2026-02-10'
),
-- Review: Y. -> Therapist 3 (rating 5)
(
  '40000000-0000-0000-0000-000000000302',
  '00000000-0000-0000-0000-000000000014',
  '10000000-0000-0000-0000-000000000003',
  'client-to-therapist', 5, 5, 4, 5, 5,
  'メール鑑定がとても丁寧で、心が軽くなりました。',
  'The email reading was very thorough and my heart feels lighter.',
  'approved', '2026-01-15'
),
-- Review: Anonymous -> Therapist 3 (rating 4)
(
  '40000000-0000-0000-0000-000000000303',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'client-to-therapist', 4, 4, 4, 4, 4,
  'オラクルカード体験、初めてでしたが楽しかったです！',
  'It was my first oracle card experience and it was fun!',
  'approved', '2026-02-25'
),
-- Review: Therapist 3 -> A. (therapist-to-client)
(
  '40000000-0000-0000-0000-000000000304',
  '00000000-0000-0000-0000-000000000033',
  '10000000-0000-0000-0000-000000000003',
  'therapist-to-client', 5, NULL, NULL, NULL, NULL,
  'とてもオープンな気持ちでセッションに臨んでいただき、素晴らしい時間でした。',
  'Approached the session with such an open mind. It was a wonderful time.',
  'approved', '2026-02-11'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 4 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: Anonymous -> Therapist 4 (rating 5)
(
  '40000000-0000-0000-0000-000000000401',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000004',
  'client-to-therapist', 5, 5, 5, 4, 4,
  '丁寧に話を聞いていただき、気持ちが楽になりました。継続してお世話になっています。',
  'They listened carefully and I felt much better. I continue to see them regularly.',
  'approved', '2026-02-18'
),
-- Review: T. -> Therapist 4 (rating 5)
(
  '40000000-0000-0000-0000-000000000402',
  '00000000-0000-0000-0000-000000000015',
  '10000000-0000-0000-0000-000000000004',
  'client-to-therapist', 5, 5, 4, 5, 5,
  'メール相談でも十分な支援を感じました。文章で整理できるのが自分に合っています。',
  'I felt well supported even through email. Organizing my thoughts in writing suits me.',
  'approved', '2026-01-30'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 5 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: E. -> Therapist 5 (rating 5)
(
  '40000000-0000-0000-0000-000000000501',
  '00000000-0000-0000-0000-000000000016',
  '10000000-0000-0000-0000-000000000005',
  'client-to-therapist', 5, 5, 5, 5, 4,
  '初めてのヨガでしたが、丁寧に教えてもらえてとても楽しかったです。身体がすっきりしました！',
  'It was my first yoga class but she taught me so patiently. My body feels refreshed!',
  'approved', '2026-02-22'
),
-- Review: O. -> Therapist 5 (rating 4)
(
  '40000000-0000-0000-0000-000000000502',
  '00000000-0000-0000-0000-000000000017',
  '10000000-0000-0000-0000-000000000005',
  'client-to-therapist', 4, 4, 4, 3, 4,
  'オンラインでもしっかり指導してもらえました。夜寝る前のヨガが習慣になりそうです。',
  'Got good instruction even online. Yoga before bed might become a habit.',
  'approved', '2026-02-10'
),
-- Review: Therapist 5 -> E. (therapist-to-client)
(
  '40000000-0000-0000-0000-000000000503',
  '00000000-0000-0000-0000-000000000035',
  '10000000-0000-0000-0000-000000000005',
  'therapist-to-client', 5, NULL, NULL, NULL, NULL,
  'とても熱心に取り組まれていて素晴らしかったです。ポーズの上達が早いですね。',
  'Very dedicated and wonderful to work with. Your poses improved quickly.',
  'approved', '2026-02-23'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 6 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: C. -> Therapist 6 (rating 4)
(
  '40000000-0000-0000-0000-000000000601',
  '00000000-0000-0000-0000-000000000018',
  '10000000-0000-0000-0000-000000000006',
  'client-to-therapist', 4, 4, 4, 5, 3,
  '不思議な体験でしたが、終わった後とても軽くなりました。',
  'It was a mysterious experience, but I felt so light afterward.',
  'approved', '2026-02-05'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 7 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: P. -> Therapist 7 (rating 5)
(
  '40000000-0000-0000-0000-000000000701',
  '00000000-0000-0000-0000-000000000019',
  '10000000-0000-0000-0000-000000000007',
  'client-to-therapist', 5, 5, 5, 5, 5,
  '絵が苦手でしたが全く問題なく、自分でも驚くくらいリラックスできました。',
  'I''m not good at drawing but it didn''t matter at all. I relaxed more than I expected.',
  'approved', '2026-02-24'
),
-- Review: U. -> Therapist 7 (rating 5)
(
  '40000000-0000-0000-0000-000000000702',
  '00000000-0000-0000-0000-000000000020',
  '10000000-0000-0000-0000-000000000007',
  'client-to-therapist', 5, 5, 4, 5, 5,
  '子どもと一緒に参加しました。親子で楽しめる素敵な時間でした。',
  'Attended with my child. A wonderful time we could enjoy together.',
  'approved', '2026-02-17'
),
-- Review: Therapist 7 -> P. (therapist-to-client)
(
  '40000000-0000-0000-0000-000000000703',
  '00000000-0000-0000-0000-000000000037',
  '10000000-0000-0000-0000-000000000007',
  'therapist-to-client', 5, NULL, NULL, NULL, NULL,
  'とても自由な発想で色を使われていて、素敵な作品ができました。',
  'Used colors with such creative freedom. A wonderful piece was created.',
  'approved', '2026-02-25'
)
ON CONFLICT (id) DO NOTHING;

-- Therapist 8 reviews
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Review: D. -> Therapist 8 (rating 5)
(
  '40000000-0000-0000-0000-000000000801',
  '00000000-0000-0000-0000-000000000021',
  '10000000-0000-0000-0000-000000000008',
  'client-to-therapist', 5, 4, 5, 5, 5,
  'シンギングボウルの音が身体中に響いて、今まで経験したことのない深いリラックスでした。',
  'The singing bowl resonated through my whole body. The deepest relaxation I''ve ever experienced.',
  'approved', '2026-02-26'
),
-- Review: F. -> Therapist 8 (rating 4)
(
  '40000000-0000-0000-0000-000000000802',
  '00000000-0000-0000-0000-000000000022',
  '10000000-0000-0000-0000-000000000008',
  'client-to-therapist', 4, 4, 4, 4, 4,
  'オンラインでも十分に音の癒しを感じられました。パーソナル音声ガイドもとても良かったです。',
  'Could feel the sound healing even online. The personal audio guide was excellent too.',
  'approved', '2026-02-14'
),
-- Review: Anonymous -> Therapist 8 (rating 5)
(
  '40000000-0000-0000-0000-000000000803',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000008',
  'client-to-therapist', 5, 5, 5, 5, 4,
  '寝落ちするくらいリラックスできました。終わった後の爽快感がすごいです。',
  'I relaxed so much I almost fell asleep. The refreshed feeling afterward was amazing.',
  'approved', '2026-02-02'
)
ON CONFLICT (id) DO NOTHING;

-- Test user's written reviews (mockUserWrittenReviews)
INSERT INTO reviews (id, reviewer_id, therapist_id, review_type, rating, rating_communication, rating_effectiveness, rating_atmosphere, rating_value, text_ja, text_en, moderation_status, created_at) VALUES
-- Test user -> Therapist 1
(
  '40000000-0000-0000-0000-000000000901',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'client-to-therapist', 5, 5, 5, 5, 5,
  'アロマの香りが本当に素晴らしかったです。心も身体も癒されました。',
  'The aroma was truly wonderful. Both my mind and body were healed.',
  'approved', '2026-03-01'
),
-- Test user -> Therapist 3
(
  '40000000-0000-0000-0000-000000000902',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000003',
  'client-to-therapist', 5, 5, 5, 5, 5,
  '的確なリーディングに驚きました。迷っていたことがスッキリしました。',
  'I was amazed by the accurate reading. It cleared up what I was unsure about.',
  'approved', '2026-02-22'
),
-- Test user -> Therapist 7
(
  '40000000-0000-0000-0000-000000000903',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000007',
  'client-to-therapist', 4, 4, 4, 5, 4,
  '絵が下手でも楽しめました！色を選ぶだけで気持ちが軽くなる不思議な体験。',
  'Enjoyed it even though I can''t draw! A wonderful experience where just choosing colors lifts your mood.',
  'approved', '2026-02-17'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- RETREATS
-- ============================================================

INSERT INTO retreats (id, title_ja, title_en, description_ja, description_en, location_ja, location_en, provider_ja, provider_en, duration, price, includes_ja, includes_en, tags, image_url, is_active) VALUES
(
  '50000000-0000-0000-0000-000000000001',
  'バリ島ヨガリトリート',
  'Bali Yoga Retreat',
  '熱帯の楽園でヨガと瞑想を通じて心身をリフレッシュ。地元のヒーラーによるスパトリートメント付き。',
  'Refresh your mind and body through yoga and meditation in a tropical paradise. Includes spa treatments by local healers.',
  'バリ島、インドネシア',
  'Bali, Indonesia',
  'バリ・ウェルネス・センター',
  'Bali Wellness Center',
  5, 180000,
  ARRAY['宿泊5泊', 'ヨガセッション（毎日）', 'スパトリートメント2回', '食事（オーガニック）'],
  ARRAY['5-night accommodation', 'Daily yoga sessions', '2 spa treatments', 'Organic meals'],
  ARRAY['yoga', 'meditation', 'spa'],
  NULL, TRUE
),
(
  '50000000-0000-0000-0000-000000000002',
  'ハワイ マインドフルネスリトリート',
  'Hawaii Mindfulness Retreat',
  '海と山に囲まれた環境でマインドフルネスを実践。ネイチャーウォーク、瞑想、地元の伝統的なヒーリング体験。',
  'Practice mindfulness surrounded by ocean and mountains. Nature walks, meditation, and traditional Hawaiian healing experiences.',
  'マウイ島、ハワイ',
  'Maui, Hawaii',
  'アロハ・ヒーリング・スペース',
  'Aloha Healing Space',
  4, 250000,
  ARRAY['宿泊4泊', 'マインドフルネスセッション', 'ネイチャーウォーク', 'ハワイアンヒーリング体験'],
  ARRAY['4-night accommodation', 'Mindfulness sessions', 'Nature walks', 'Hawaiian healing experience'],
  ARRAY['mindfulness', 'nature', 'healing'],
  NULL, TRUE
),
(
  '50000000-0000-0000-0000-000000000003',
  'インド アーユルヴェーダリトリート',
  'India Ayurveda Retreat',
  'アーユルヴェーダの本場ケーララで本格的なデトックスプログラム。個別カウンセリングと体質に合わせたトリートメント。',
  'Authentic detox program in the birthplace of Ayurveda. Personalized consultation and treatments tailored to your constitution.',
  'ケーララ州、インド',
  'Kerala, India',
  'ケーララ・アーユルヴェーダ・リゾート',
  'Kerala Ayurveda Resort',
  7, 150000,
  ARRAY['宿泊7泊', 'アーユルヴェーダ診断', '毎日のトリートメント', 'ベジタリアン食事'],
  ARRAY['7-night accommodation', 'Ayurveda diagnosis', 'Daily treatments', 'Vegetarian meals'],
  ARRAY['ayurveda', 'detox', 'traditional'],
  NULL, TRUE
),
(
  '50000000-0000-0000-0000-000000000004',
  '箱根 温泉リトリート',
  'Hakone Hot Spring Retreat',
  '日本の伝統的な温泉文化を楽しむ週末リトリート。露天風呂、森林浴、茶道体験。',
  'Weekend retreat enjoying traditional Japanese hot spring culture. Open-air baths, forest bathing, and tea ceremony.',
  '箱根、神奈川県',
  'Hakone, Kanagawa',
  '箱根ヒーリングリゾート',
  'Hakone Healing Resort',
  2, 65000,
  ARRAY['宿泊2泊', '温泉入浴', '森林浴ガイド', '茶道体験', '懐石料理'],
  ARRAY['2-night accommodation', 'Hot spring bathing', 'Forest bathing guide', 'Tea ceremony', 'Kaiseki cuisine'],
  ARRAY['onsen', 'nature', 'japanese'],
  NULL, TRUE
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- BLOG ARTICLES
-- ============================================================

INSERT INTO blog_articles (id, therapist_id, title_ja, title_en, excerpt_ja, excerpt_en, body_ja, body_en, tags, published_at) VALUES
(
  '60000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'アロマセラピーで心を整える5つの方法',
  '5 Ways to Balance Your Mind with Aromatherapy',
  'エッセンシャルオイルを使った日常のセルフケア方法をご紹介します。',
  'Discover daily self-care methods using essential oils.',
  NULL, NULL,
  ARRAY['aromatherapy', 'selfcare'],
  '2026-02-20'
),
(
  '60000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  'タロットカードの基本：初心者ガイド',
  'Tarot Basics: A Beginner''s Guide',
  'タロットに興味があるけど何から始めればいい？基本を解説します。',
  'Interested in tarot but don''t know where to start? Learn the basics.',
  NULL, NULL,
  ARRAY['tarot', 'beginners'],
  '2026-02-15'
),
(
  '60000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000005',
  '寝る前の10分ヨガで睡眠の質を上げる',
  '10-Minute Bedtime Yoga for Better Sleep',
  '簡単なポーズで深い睡眠を。毎日続けられるルーティンをご紹介。',
  'Simple poses for deep sleep. A routine you can keep up every day.',
  NULL, NULL,
  ARRAY['yoga', 'sleep', 'selfcare'],
  '2026-02-10'
),
(
  '60000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000007',
  '色が心に与える影響：カラーセラピー入門',
  'How Colors Affect Your Mind: Intro to Color Therapy',
  '色にはそれぞれ心理的な効果があります。日常に取り入れる方法とは。',
  'Each color has psychological effects. Learn how to use them daily.',
  NULL, NULL,
  ARRAY['art', 'selfcare', 'beginners'],
  '2026-02-05'
),
(
  '60000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000004',
  '不安との付き合い方：認知行動療法の視点から',
  'Living with Anxiety: A CBT Perspective',
  '不安を感じた時に試せる認知行動療法のテクニックを解説。',
  'CBT techniques you can try when anxiety strikes.',
  NULL, NULL,
  ARRAY['anxiety', 'mental-health', 'cbt'],
  '2026-01-28'
),
(
  '60000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000008',
  'サウンドヒーリングの科学：なぜ音で癒されるのか',
  'The Science of Sound Healing: Why Sound Heals',
  '周波数と脳波の関係から、音の癒し効果のメカニズムを探ります。',
  'Exploring the healing mechanism of sound through frequency and brainwave relationships.',
  NULL, NULL,
  ARRAY['sound', 'science', 'healing'],
  '2026-01-20'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- DIGITAL PRODUCTS
-- ============================================================

INSERT INTO digital_products (id, therapist_id, name_ja, name_en, description_ja, description_en, price, product_type, file_url) VALUES
(
  '70000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'リラクゼーション・アロマガイド (PDF)',
  'Relaxation Aroma Guide (PDF)',
  '自宅で使える10種のエッセンシャルオイル活用法',
  '10 essential oil recipes for home relaxation',
  1500, 'pdf', NULL
),
(
  '70000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000005',
  '朝ヨガ15分ルーティン (動画)',
  'Morning Yoga 15-min Routine (Video)',
  '毎朝続けられる簡単ヨガプログラム',
  'Easy daily morning yoga program',
  2000, 'video', NULL
),
(
  '70000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000008',
  '瞑想用サウンドトラック (音声)',
  'Meditation Soundtrack (Audio)',
  'シンギングボウルの音で深い瞑想へ導く30分音声',
  '30-minute singing bowl audio for deep meditation',
  1000, 'audio', NULL
),
(
  '70000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000004',
  '不安対処ワークシート (PDF)',
  'Anxiety Coping Worksheet (PDF)',
  'CBTベースの自己記録シート5種セット',
  '5 CBT-based self-recording sheets',
  800, 'pdf', NULL
),
(
  '70000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000007',
  'カラーセラピー・ジャーナル (PDF)',
  'Color Therapy Journal (PDF)',
  '30日分の色を使った気分記録ジャーナル',
  '30-day mood journal using colors',
  1200, 'pdf', NULL
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- THERAPIST REFERRALS
-- (From data.js referrals arrays: T1->[2,8], T3->[4,7], T5->[6], T7->[5])
-- ============================================================

INSERT INTO therapist_referrals (id, referrer_id, referred_id, commission_rate, status) VALUES
  ('b0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 0.02, 'active'),
  ('b0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000008', 0.02, 'active'),
  ('b0000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', 0.02, 'active'),
  ('b0000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000007', 0.02, 'active'),
  ('b0000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000006', 0.02, 'active'),
  ('b0000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000005', 0.02, 'active')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- FORUM THREADS
-- ============================================================

-- Thread 1: Southeast Asia retreats
INSERT INTO forum_threads (id, author_id, title_ja, title_en, body_ja, body_en, tags, is_pinned, moderation_status, created_at) VALUES
(
  '80000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000041',
  '東南アジアでのリトリートおすすめ教えてください！',
  'Recommendations for retreats in Southeast Asia?',
  '来年の春に東南アジアでリトリートに参加したいと考えています。バリ島やタイなど、おすすめの場所や体験があれば教えてください。',
  'I''m thinking of joining a retreat in Southeast Asia next spring. Any recommendations for places or experiences in Bali, Thailand, etc.?',
  ARRAY['retreat', 'travel'],
  FALSE, 'approved', '2026-03-05'
),
-- Thread 2: Aromatherapy beginner
(
  '80000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000043',
  'アロマセラピー初心者です。おすすめの精油は？',
  'Aromatherapy beginner - recommended essential oils?',
  'アロマセラピーに興味があります。初心者におすすめの精油や使い方を教えていただけませんか？',
  'I''m interested in aromatherapy. Could you recommend essential oils and usage tips for beginners?',
  ARRAY['aromatherapy', 'beginner'],
  FALSE, 'approved', '2026-03-04'
),
-- Thread 3: Meditation habit
(
  '80000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000045',
  '瞑想の習慣化のコツ',
  'Tips for making meditation a habit',
  '瞑想を始めたいのですが、なかなか続きません。習慣化するコツがあれば教えてください。',
  'I want to start meditating but can''t seem to stick with it. Any tips for making it a habit?',
  ARRAY['meditation', 'wellness'],
  FALSE, 'approved', '2026-03-03'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- FORUM REPLIES
-- ============================================================

-- Thread 1 replies
INSERT INTO forum_replies (id, thread_id, author_id, body_ja, body_en, moderation_status, created_at) VALUES
(
  '90000000-0000-0000-0000-000000000001',
  '80000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000042',
  'バリ島のウブドがおすすめです！ヨガリトリートがたくさんあります。',
  'I recommend Ubud in Bali! There are lots of yoga retreats there.',
  'approved', '2026-03-05'
),
(
  '90000000-0000-0000-0000-000000000002',
  '80000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000031',
  'タイのチェンマイも良いですよ。瞑想リトリートが充実しています。',
  'Chiang Mai in Thailand is also great. They have wonderful meditation retreats.',
  'approved', '2026-03-06'
)
ON CONFLICT (id) DO NOTHING;

-- Thread 2 replies
INSERT INTO forum_replies (id, thread_id, author_id, body_ja, body_en, moderation_status, created_at) VALUES
(
  '90000000-0000-0000-0000-000000000003',
  '80000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000044',
  'ラベンダーとティーツリーから始めるのがおすすめです。リラックス効果が高いですよ。',
  'I recommend starting with lavender and tea tree. They have great relaxation effects.',
  'approved', '2026-03-04'
)
ON CONFLICT (id) DO NOTHING;

-- Thread 3 replies
INSERT INTO forum_replies (id, thread_id, author_id, body_ja, body_en, moderation_status, created_at) VALUES
(
  '90000000-0000-0000-0000-000000000004',
  '80000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000046',
  '最初は5分から始めて、毎日同じ時間にやるのがポイントです。',
  'Start with just 5 minutes and do it at the same time every day.',
  'approved', '2026-03-03'
),
(
  '90000000-0000-0000-0000-000000000005',
  '80000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000047',
  'アプリを使うと続けやすいですよ。タイマー機能が便利です。',
  'Using an app makes it easier to continue. The timer feature is really convenient.',
  'approved', '2026-03-04'
),
(
  '90000000-0000-0000-0000-000000000006',
  '80000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000048',
  '朝起きてすぐがおすすめです。頭がクリアな状態で始められます。',
  'I recommend right after waking up. You can start with a clear mind.',
  'approved', '2026-03-05'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- Re-enable RLS
-- ============================================================

SET session_replication_role = 'origin';

COMMIT;
