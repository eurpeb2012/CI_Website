-- ============================================================
-- 005: Stripe Payment Integration Updates
-- ============================================================

-- Add 'pending_payment' to bookings status constraint
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending_payment', 'upcoming', 'completed', 'cancelled'));

-- Digital product purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES digital_products(id),
  price INTEGER NOT NULL,
  platform_fee INTEGER DEFAULT 0,
  payment_intent_id TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for purchases
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anon can read purchases" ON purchases FOR SELECT TO anon USING (true);
CREATE POLICY "Service role full access purchases" ON purchases FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
GRANT SELECT ON purchases TO anon;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_intent ON bookings(payment_intent_id);
