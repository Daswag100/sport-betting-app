/*
  # Initial Schema Setup for Sports Betting App

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `balance` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `bets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text)
      - `stake` (numeric)
      - `potential_win` (numeric)
      - `status` (text)
      - `created_at` (timestamp)
      - `settled_at` (timestamp)
    
    - `bet_selections`
      - `id` (uuid, primary key)
      - `bet_id` (uuid, references bets)
      - `match_id` (text)
      - `selection` (text)
      - `odds` (numeric)
      - `result` (text)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text)
      - `amount` (numeric)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read and update their own profile
      - Read and create their own bets
      - Read their own bet selections
      - Read and create their own transactions
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text,
  balance numeric DEFAULT 0 CHECK (balance >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bets table
CREATE TABLE IF NOT EXISTS bets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('Single', 'Parlay')),
  stake numeric NOT NULL CHECK (stake > 0),
  potential_win numeric NOT NULL CHECK (potential_win > 0),
  status text NOT NULL CHECK (status IN ('Active', 'Won', 'Lost')) DEFAULT 'Active',
  created_at timestamptz DEFAULT now(),
  settled_at timestamptz,
  CONSTRAINT valid_settlement CHECK (
    (status IN ('Won', 'Lost') AND settled_at IS NOT NULL) OR
    (status = 'Active' AND settled_at IS NULL)
  )
);

-- Create bet selections table
CREATE TABLE IF NOT EXISTS bet_selections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bet_id uuid REFERENCES bets ON DELETE CASCADE NOT NULL,
  match_id text NOT NULL,
  selection text NOT NULL,
  odds numeric NOT NULL CHECK (odds > 1),
  result text CHECK (result IN ('Won', 'Lost', NULL))
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bet', 'win')),
  amount numeric NOT NULL CHECK (amount > 0),
  status text NOT NULL CHECK (status IN ('completed', 'pending', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE bet_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Bets policies
CREATE POLICY "Users can read own bets"
  ON bets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create bets"
  ON bets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Bet selections policies
CREATE POLICY "Users can read own bet selections"
  ON bet_selections
  FOR SELECT
  TO authenticated
  USING (
    bet_id IN (
      SELECT id FROM bets
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bet selections"
  ON bet_selections
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bet_id IN (
      SELECT id FROM bets
      WHERE user_id = auth.uid()
    )
  );

-- Transactions policies
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create function to update profile balance
CREATE OR REPLACE FUNCTION update_profile_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'deposit' AND NEW.status = 'completed' THEN
    UPDATE profiles 
    SET balance = balance + NEW.amount,
        updated_at = now()
    WHERE id = NEW.user_id;
  ELSIF NEW.type = 'withdrawal' AND NEW.status = 'completed' THEN
    UPDATE profiles 
    SET balance = balance - NEW.amount,
        updated_at = now()
    WHERE id = NEW.user_id;
  ELSIF NEW.type = 'bet' AND NEW.status = 'completed' THEN
    UPDATE profiles 
    SET balance = balance - NEW.amount,
        updated_at = now()
    WHERE id = NEW.user_id;
  ELSIF NEW.type = 'win' AND NEW.status = 'completed' THEN
    UPDATE profiles 
    SET balance = balance + NEW.amount,
        updated_at = now()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for balance updates
CREATE TRIGGER on_transaction_update
  AFTER INSERT OR UPDATE
  ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_balance();

-- Create function to validate bet selection results
CREATE OR REPLACE FUNCTION validate_bet_selection_result()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.result IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM bets 
      WHERE id = NEW.bet_id 
      AND status != 'Active'
    ) THEN
      RAISE EXCEPTION 'Cannot set result for selection of an active bet';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bet selection validation
CREATE TRIGGER before_bet_selection_update
  BEFORE UPDATE
  ON bet_selections
  FOR EACH ROW
  EXECUTE FUNCTION validate_bet_selection_result();