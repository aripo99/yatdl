create table labels (
    id bigint generated always as identity primary key,
    uuid uuid not null unique default gen_random_uuid(),
    user_id uuid not null references auth.users on delete cascade,
    name text,
    created_at timestamptz not null default now()
);

alter table labels enable row level security;

create policy "Users can read and update only the labels belonging to them" on
labels
  for all
    using (auth.uid () = labels.user_id)
    with check (auth.uid () = labels.user_id);

create table todo_labels (
    user_id uuid not null references auth.users on delete cascade,
    todo_id bigint not null references public.todos,
    label_id bigint not null references public.labels on delete cascade, 
    primary key (todo_id, label_id)
);

create policy "Users can read and update only the todo labels belonging to them" on
todo_labels
  for all
    using (auth.uid () = todo_labels.user_id)
    with check (auth.uid () = todo_labels.user_id);

alter table todo_labels enable row level security;
