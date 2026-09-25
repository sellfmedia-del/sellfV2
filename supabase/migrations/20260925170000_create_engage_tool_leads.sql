alter table public.engage_tool_runs
  add constraint engage_tool_runs_client_run_tool_key unique (client_run_id, tool_key);

create table if not exists public.engage_tool_leads (
  id uuid primary key default gen_random_uuid(),
  client_run_id uuid not null,
  tool_key text not null check (tool_key in (
    'growth-simulator', 'report-audit', 'sellf-surface', 'sellf-marketfit', 'sellf-route'
  )),
  language text not null check (language in ('tr', 'en')),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  company_name text not null check (char_length(btrim(company_name)) between 2 and 160),
  email text not null check (
    char_length(email) between 5 and 254
    and email = lower(email)
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'
  ),
  privacy_accepted boolean not null check (privacy_accepted),
  marketing_consent boolean not null default false,
  source_path text not null check (
    source_path ~ '^/(tr|en)/engage/tools/(growth-simulator|report-audit|sellf-surface|sellf-marketfit|sellf-route)$'
  ),
  created_at timestamptz not null default now(),
  constraint engage_tool_leads_run_fk foreign key (client_run_id, tool_key)
    references public.engage_tool_runs (client_run_id, tool_key) on delete cascade,
  constraint engage_tool_leads_run_unique unique (client_run_id)
);

create index if not exists engage_tool_leads_tool_created_at_idx
  on public.engage_tool_leads (tool_key, created_at desc);

alter table public.engage_tool_leads enable row level security;

revoke all on table public.engage_tool_leads from public, anon, authenticated;
grant insert on table public.engage_tool_leads to anon, authenticated;

drop policy if exists "engage tool leads are insert only" on public.engage_tool_leads;
create policy "engage tool leads are insert only"
  on public.engage_tool_leads
  for insert
  to anon, authenticated
  with check (
    privacy_accepted
    and tool_key in ('growth-simulator', 'report-audit', 'sellf-surface', 'sellf-marketfit', 'sellf-route')
    and language in ('tr', 'en')
    and source_path = '/' || language || '/engage/tools/' || tool_key
    and char_length(btrim(full_name)) between 2 and 120
    and char_length(btrim(company_name)) between 2 and 160
    and char_length(email) between 5 and 254
    and email = lower(email)
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'
  );
