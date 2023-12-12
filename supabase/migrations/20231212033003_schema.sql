create table labels (
    id bigint generated always as identity primary key,
    uuid uuid not null unique default gen_random_uuid(),
    user_id uuid not null references auth.users on delete cascade,
    todo_id bigint references todos,
    name text,
    created_at timestamptz not null default now(),
    unique (name, user_id)
);

alter table labels enable row level security;

create policy "Users can read and update only the labels belonging to them" on
labels
  for all
    using (auth.uid () = labels.user_id)
    with check (auth.uid () = labels.user_id);

CREATE OR REPLACE FUNCTION public.insert_todo(
  title TEXT,
  user_id_arg UUID,
  category TEXT,
  labels TEXT[]
)
RETURNS SETOF public.todos
LANGUAGE plpgsql
AS $$
DECLARE
  new_todo_id BIGINT;
  label TEXT;
BEGIN
  -- Insert into todos table
  INSERT INTO todos (title, category, user_id) 
  VALUES (title, category, user_id_arg) 
  RETURNING id INTO new_todo_id;

  -- Iterate over each label and insert into labels table, if not exists
  FOREACH label IN ARRAY labels
  LOOP
    INSERT INTO labels (name, user_id, todo_id)
    VALUES (label, user_id_arg, new_todo_id)
    ON CONFLICT (name, user_id) DO NOTHING;
  END LOOP;

  -- Return the new todo
  RETURN QUERY SELECT * FROM todos WHERE id = new_todo_id;
END;
$$;