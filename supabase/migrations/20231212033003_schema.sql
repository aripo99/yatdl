create table labels (
    id bigint generated always as identity primary key,
    uuid uuid not null unique default gen_random_uuid(),
    user_id uuid not null references auth.users on delete cascade,
    name text,
    created_at timestamptz not null default now(),
    unique (name, user_id)
);

alter table labels add constraint unique_label_name_per_user unique (name, user_id);

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

create function public.handle_new_todo()
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
declare
  label_name text;
  label_id bigint;
begin
  -- Iterate over each label in the labels array
  foreach label_name in array new.labels
  loop
    -- Insert label if it doesn't exist and get its ID
    insert into labels (name, user_id)
    values (label_name, new.user_id)
    on conflict (name, user_id) do nothing;

    select id into label_id from labels where name = label_name and user_id = new.user_id;

    -- Link the label to the todo
    insert into todo_labels (todo_id, label_id, user_id)
    values (new.id, label_id, new.user_id);
  end loop;

  return new;
end;
$$;

create trigger on_todo_created
  after insert on public.todos
  for each row execute function public.handle_new_todo();
