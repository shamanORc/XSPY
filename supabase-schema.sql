-- X Spy History — Supabase Schema
-- Run this in Supabase SQL Editor if you want cloud persistence (optional)

create table if not exists xspy_history (
  id         uuid default gen_random_uuid() primary key,
  module     text not null,
  module_label text not null,
  title      text not null,
  niche      text not null default 'SaaS/Tech',
  output     text not null,
  created_at timestamptz default now()
);

-- Index for fast filtering
create index if not exists idx_xspy_history_module on xspy_history(module);
create index if not exists idx_xspy_history_created on xspy_history(created_at desc);

-- RLS (optional — disable for personal use)
alter table xspy_history enable row level security;
create policy "Allow all" on xspy_history for all using (true);
