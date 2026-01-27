-- Enable Row Level Security (RLS) on the table
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone (including anonymous users) to read data
-- This is necessary because we are fetching data from the client-side using the anon key.
CREATE POLICY "Enable read access for all users"
ON dashboard_stats
FOR SELECT
USING (true);

-- Verify the policy has been created
SELECT * FROM pg_policies WHERE tablename = 'dashboard_stats';
