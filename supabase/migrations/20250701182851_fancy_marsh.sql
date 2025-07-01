/*
  # Seed Initial Data for THRIVECHAOS

  1. Sample Data
    - Crisis metrics
    - Sample missions
    - Community content
    - Marketplace items

  2. Configuration
    - System settings
    - Default values
*/

-- Insert initial crisis data
INSERT INTO crisis_data (metric_name, metric_value, metric_unit, category) VALUES
  ('active_crises', 47, 'count', 'global'),
  ('rebels_active', 12847, 'count', 'community'),
  ('countries_active', 89, 'count', 'global'),
  ('system_stability', 67, 'percentage', 'global'),
  ('population_growth', 0.94, 'percentage', 'demographics'),
  ('resource_depletion', 73, 'percentage', 'environment'),
  ('climate_risk', 82, 'percentage', 'environment'),
  ('social_stability', 34, 'percentage', 'society')
ON CONFLICT DO NOTHING;

-- Insert sample missions
INSERT INTO missions (title, description, category, difficulty, priority, reward_tokens, duration_minutes, location, max_participants) VALUES
  (
    'Community Health Assessment',
    'Document local medical resources and blood donation opportunities in your area',
    'health',
    'beginner',
    'high',
    250,
    120,
    'Local Area',
    50
  ),
  (
    'Emergency Supply Mapping',
    'Identify and map emergency supply sources in your region for crisis preparedness',
    'preparedness',
    'intermediate',
    'medium',
    150,
    90,
    'Regional',
    25
  ),
  (
    'Crisis Communication Network',
    'Establish backup communication channels for your community using encrypted tools',
    'communication',
    'advanced',
    'critical',
    500,
    180,
    'Global Network',
    100
  ),
  (
    'Urban Survival Training',
    'Complete basic urban survival skills training and share knowledge with community',
    'survival',
    'intermediate',
    'high',
    200,
    150,
    'Urban Areas',
    30
  ),
  (
    'Blood Donation Drive Organization',
    'Organize a local blood donation drive and coordinate with medical facilities',
    'health',
    'advanced',
    'critical',
    400,
    240,
    'Local Area',
    15
  )
ON CONFLICT DO NOTHING;

-- Insert sample community posts
INSERT INTO community_posts (user_id, title, content, post_type, category) VALUES
  (
    (SELECT id FROM users LIMIT 1),
    'Welcome to THRIVECHAOS Community',
    'This is the beginning of our resistance movement. Together we build resilient communities and prepare for the challenges ahead. Share your skills, connect with fellow agents, and help build a better future.',
    'text',
    'announcement'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Crisis Preparedness Checklist',
    'Essential items every agent should have: 1) Emergency water supply (3 days minimum), 2) Non-perishable food, 3) First aid kit, 4) Flashlight and batteries, 5) Emergency radio, 6) Important documents in waterproof container. What would you add to this list?',
    'text',
    'preparedness'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Blood Donation Success Story',
    'Just completed my 5th blood donation this year! Remember, every donation can save up to 3 lives and earns you Agent17 tokens. Find your local donation center and make a difference.',
    'text',
    'health'
  )
ON CONFLICT DO NOTHING;

-- Insert sample marketplace items
INSERT INTO marketplace_items (seller_id, title, description, category, price_chaos_points, condition, location) VALUES
  (
    (SELECT id FROM users LIMIT 1),
    'Emergency Solar Power Bank',
    'High-capacity solar power bank perfect for emergency situations. Can charge phones, tablets, and small devices. Waterproof and durable construction.',
    'Tech & Electronics',
    150,
    'new',
    'San Francisco, CA'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Heirloom Tomato Seeds Collection',
    'Organic heirloom tomato seeds - 10 varieties including Cherokee Purple, Brandywine, and Green Zebra. Perfect for starting your survival garden.',
    'Bio Seeds & Plants',
    75,
    'new',
    'Austin, TX'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Military-Grade First Aid Kit',
    'Comprehensive first aid kit with trauma supplies, medications, and emergency tools. Used but in excellent condition.',
    'Medical Supplies',
    200,
    'like_new',
    'Denver, CO'
  ),
  (
    (SELECT id FROM users LIMIT 1),
    'Survival Knife Set',
    'Professional survival knife set including fixed blade, folding knife, and multi-tool. Essential for any survival kit.',
    'Survival Gear',
    125,
    'good',
    'Portland, OR'
  )
ON CONFLICT DO NOTHING;