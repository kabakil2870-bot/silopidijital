-- Run this AFTER creating the Auth user in Supabase Dashboard.
-- This grants admin access only to the specified email; no password is stored here.

do $$
declare
  admin_user_id uuid;
begin
  select id
    into admin_user_id
    from auth.users
   where lower(email) = lower('434343djejejrjr@gmail.com')
   limit 1;

  if admin_user_id is null then
    raise exception 'Auth user not found. First create this user in Supabase Dashboard > Authentication > Users.';
  end if;

  insert into public.site_admins (user_id)
  values (admin_user_id)
  on conflict (user_id) do nothing;
end $$;

-- Verification: returns the admin email if authorization succeeded.
select u.email, a.user_id, a.created_at
from public.site_admins a
join auth.users u on u.id = a.user_id
where lower(u.email) = lower('434343djejejr@gmail.com');
