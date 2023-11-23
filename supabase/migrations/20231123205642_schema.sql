create table goals (
    id bigint generated always as identity primary key,
    uuid uuid not null unique default gen_random_uuid(),
    user_id uuid not null references public.users on delete cascade,
    title text,
    description text,
    created_at timestamptz not null default now()
);

alter table goals enable row level security;

create policy "Users can read and update only the goals belonging to them" on
goals
  for all
    using (auth.uid () = goals.user_id)
    with check (auth.uid () = goals.user_id);
