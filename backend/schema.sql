create table if not exists users(
  id serial primary key,
  email text unique not null,
  password_hash text not null,
  role text not null check(role in ('user','admin')),
  created_at timestamptz default now()
);
create table if not exists tasks(
  id serial primary key,
  title text not null,
  description text,
  status text not null,
  user_id integer not null references users(id) on delete cascade,
  created_at timestamptz default now()
);
