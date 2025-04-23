/*
  # Add Profile Insert Policy

  1. Security Changes
    - Add policy to allow authenticated users to create their own profile
    - This policy ensures users can only create a profile with their own user ID
*/

CREATE POLICY "Enable insert for authenticated users only"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);