create table user_coins (
    id bigint generated always as identity primary key,
    uuid uuid not null unique default gen_random_uuid(),
    user_id uuid not null references public.users on delete cascade,
    quantity integer not null default 0,
    created_at timestamptz not null default now()
);

alter table user_coins enable row level security;

create policy "Users can read and update only the coins belonging to them" on
user_coins
  for all
    using (auth.uid () = user_coins.user_id)
    with check (auth.uid () = user_coins.user_id);
