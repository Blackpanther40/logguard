-- LogGuard Supabase schema
-- Run in Supabase SQL Editor after creating a project.

create table if not exists public.servers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  hostname text not null,
  ip_address text,
  environment text not null default 'production'
    check (environment in ('production', 'staging', 'development')),
  status text not null default 'online'
    check (status in ('online', 'degraded', 'offline')),
  health_score integer not null default 100
    check (health_score >= 0 and health_score <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists servers_user_id_idx on public.servers (user_id);

alter table public.servers enable row level security;

create policy "Users can view own servers"
  on public.servers for select
  using (auth.uid() = user_id);

create policy "Users can insert own servers"
  on public.servers for insert
  with check (auth.uid() = user_id);

create policy "Users can update own servers"
  on public.servers for update
  using (auth.uid() = user_id);

create policy "Users can delete own servers"
  on public.servers for delete
  using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists servers_updated_at on public.servers;
create trigger servers_updated_at
  before update on public.servers
  for each row execute function public.set_updated_at();
