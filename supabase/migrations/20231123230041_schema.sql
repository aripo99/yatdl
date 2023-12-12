create table user_coins (
    id bigint generated always as identity primary key,
    uuid uuid not null unique default gen_random_uuid(),
    user_id uuid references auth.users on delete cascade,
    quantity integer not null default 0,
    created_at timestamptz not null default now()
);

alter table user_coins enable row level security;

create policy "Users can read and update only the coins belonging to them" on
user_coins
  for all
    using (auth.uid () = user_coins.user_id)
    with check (auth.uid () = user_coins.user_id);

create function public.handle_new_user_coins()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_coins (user_id, quantity)
  values (new.id, 0);
  return new;
end;
$$;
 
-- trigger the function every time a user is created
create trigger on_auth_user_coins_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user_coins();

alter table users enable row level security;