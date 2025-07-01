/*
  # THRIVECHAOS Core Database Schema

  1. New Tables
    - `users` - Core user profiles with Agent17 data
    - `status_checks` - System status monitoring
    - `blood_donations` - Blood donation tracking
    - `missions` - Agent missions and tasks
    - `matches` - Tinder of Doers connections
    - `community_posts` - Community interactions
    - `marketplace_items` - P2P marketplace
    - `live_streams` - Streaming content
    - `user_tokens` - Agent17 token transactions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access patterns

  3. Features
    - UUID primary keys
    - Timestamps for all records
    - Proper foreign key relationships
    - Indexes for performance
*/

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id text UNIQUE NOT NULL DEFAULT ('agent_' || substr(gen_random_uuid()::text, 1, 8)),
  name text NOT NULL DEFAULT 'Rebel Agent',
  email text,
  blood_type text CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  vaccination_status text DEFAULT 'Unknown',
  location text,
  chaos_points integer DEFAULT 0,
  agent17_tokens integer DEFAULT 250,
  trust_score integer DEFAULT 50 CHECK (trust_score >= 0 AND trust_score <= 100),
  missions_completed integer DEFAULT 0,
  level text DEFAULT 'Recruit',
  skills text[] DEFAULT '{}',
  bio text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Status checks table
CREATE TABLE IF NOT EXISTS status_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  status text DEFAULT 'active',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Blood donations table
CREATE TABLE IF NOT EXISTS blood_donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  donation_date timestamptz NOT NULL,
  location text NOT NULL,
  blood_type text NOT NULL,
  volume_ml integer DEFAULT 450,
  tokens_earned integer DEFAULT 50,
  verified boolean DEFAULT false,
  recipient_info text,
  impact_description text,
  created_at timestamptz DEFAULT now()
);

-- Missions table
CREATE TABLE IF NOT EXISTS missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  priority text CHECK (priority IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  reward_tokens integer DEFAULT 100,
  duration_minutes integer,
  location text DEFAULT 'Global',
  max_participants integer,
  current_participants integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- User mission assignments
CREATE TABLE IF NOT EXISTS user_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  mission_id uuid REFERENCES missions(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('assigned', 'in_progress', 'completed', 'failed')) DEFAULT 'assigned',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  tokens_earned integer DEFAULT 0,
  notes text,
  UNIQUE(user_id, mission_id)
);

-- Tinder of Doers matches
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  match_type text CHECK (match_type IN ('romantic', 'project', 'cause', 'friendship')) DEFAULT 'project',
  compatibility_score integer CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  status text CHECK (status IN ('pending', 'matched', 'rejected', 'blocked')) DEFAULT 'pending',
  matched_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user1_id, user2_id)
);

-- Community posts
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text,
  content text NOT NULL,
  post_type text CHECK (post_type IN ('text', 'image', 'video', 'link', 'mission')) DEFAULT 'text',
  category text DEFAULT 'general',
  media_url text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  is_pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post likes
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Post comments
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  parent_comment_id uuid REFERENCES post_comments(id),
  created_at timestamptz DEFAULT now()
);

-- Marketplace items
CREATE TABLE IF NOT EXISTS marketplace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price_chaos_points integer NOT NULL CHECK (price_chaos_points > 0),
  price_agent17_tokens integer DEFAULT 0,
  condition text CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')) DEFAULT 'good',
  location text,
  images text[] DEFAULT '{}',
  is_available boolean DEFAULT true,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Live streams
CREATE TABLE IF NOT EXISTS live_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text DEFAULT 'general',
  stream_url text,
  thumbnail_url text,
  viewer_count integer DEFAULT 0,
  is_live boolean DEFAULT false,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Token transactions
CREATE TABLE IF NOT EXISTS user_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  transaction_type text CHECK (transaction_type IN ('earned', 'spent', 'transferred', 'bonus')) NOT NULL,
  amount integer NOT NULL,
  token_type text CHECK (token_type IN ('chaos_points', 'agent17_tokens')) NOT NULL,
  source text NOT NULL, -- mission, donation, purchase, etc.
  source_id uuid, -- reference to mission, donation, etc.
  description text,
  created_at timestamptz DEFAULT now()
);

-- Global crisis data
CREATE TABLE IF NOT EXISTS crisis_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_unit text,
  category text DEFAULT 'general',
  updated_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_agent_id ON users(agent_id);
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_status_checks_user_id ON status_checks(user_id);
CREATE INDEX IF NOT EXISTS idx_blood_donations_user_id ON blood_donations(user_id);
CREATE INDEX IF NOT EXISTS idx_blood_donations_date ON blood_donations(donation_date);
CREATE INDEX IF NOT EXISTS idx_missions_category ON missions(category);
CREATE INDEX IF NOT EXISTS idx_missions_active ON missions(is_active);
CREATE INDEX IF NOT EXISTS idx_user_missions_user_id ON user_missions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_missions_status ON user_missions(status);
CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_seller ON marketplace_items(seller_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_category ON marketplace_items(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_available ON marketplace_items(is_available);
CREATE INDEX IF NOT EXISTS idx_live_streams_streamer ON live_streams(streamer_id);
CREATE INDEX IF NOT EXISTS idx_live_streams_live ON live_streams(is_live);
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tokens_type ON user_tokens(transaction_type);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can read public profiles"
  ON users
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Status checks policies
CREATE POLICY "Users can read own status checks"
  ON status_checks
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can create status checks"
  ON status_checks
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Blood donations policies
CREATE POLICY "Users can read own donations"
  ON blood_donations
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can create donations"
  ON blood_donations
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Missions policies
CREATE POLICY "Anyone can read active missions"
  ON missions
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can create missions"
  ON missions
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- User missions policies
CREATE POLICY "Users can read own mission assignments"
  ON user_missions
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can create own mission assignments"
  ON user_missions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update own mission assignments"
  ON user_missions
  FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Matches policies
CREATE POLICY "Users can read own matches"
  ON matches
  FOR SELECT
  TO authenticated
  USING (
    user1_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()) OR
    user2_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid())
  );

CREATE POLICY "Users can create matches"
  ON matches
  FOR INSERT
  TO authenticated
  WITH CHECK (user1_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Community posts policies
CREATE POLICY "Anyone can read community posts"
  ON community_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON community_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update own posts"
  ON community_posts
  FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Post likes policies
CREATE POLICY "Anyone can read post likes"
  ON post_likes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can like posts"
  ON post_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can unlike posts"
  ON post_likes
  FOR DELETE
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Post comments policies
CREATE POLICY "Anyone can read comments"
  ON post_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON post_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Marketplace policies
CREATE POLICY "Anyone can read available items"
  ON marketplace_items
  FOR SELECT
  TO authenticated
  USING (is_available = true);

CREATE POLICY "Users can create items"
  ON marketplace_items
  FOR INSERT
  TO authenticated
  WITH CHECK (seller_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update own items"
  ON marketplace_items
  FOR UPDATE
  TO authenticated
  USING (seller_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Live streams policies
CREATE POLICY "Anyone can read live streams"
  ON live_streams
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create streams"
  ON live_streams
  FOR INSERT
  TO authenticated
  WITH CHECK (streamer_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can update own streams"
  ON live_streams
  FOR UPDATE
  TO authenticated
  USING (streamer_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

-- Token transactions policies
CREATE POLICY "Users can read own transactions"
  ON user_tokens
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_user_id = auth.uid()));

CREATE POLICY "System can create transactions"
  ON user_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Crisis data policies
CREATE POLICY "Anyone can read crisis data"
  ON crisis_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authorized users can update crisis data"
  ON crisis_data
  FOR ALL
  TO authenticated
  USING (true);