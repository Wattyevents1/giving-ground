
CREATE OR REPLACE FUNCTION public.get_project_donation_totals()
RETURNS TABLE(project_id uuid, total_amount numeric, donors_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    d.project_id,
    COALESCE(SUM(d.amount), 0) as total_amount,
    COUNT(DISTINCT d.id) as donors_count
  FROM public.donations d
  WHERE d.project_id IS NOT NULL
    AND d.status = 'completed'
  GROUP BY d.project_id
$$;
