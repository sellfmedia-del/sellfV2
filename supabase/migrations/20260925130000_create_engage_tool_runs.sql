create table if not exists public.engage_tool_runs (
  id uuid primary key default gen_random_uuid(),
  client_run_id uuid not null,
  tool_key text not null check (tool_key in (
    'growth-simulator',
    'report-audit',
    'sellf-surface',
    'sellf-marketfit',
    'sellf-route'
  )),
  language text not null default 'tr' check (language in ('tr', 'en')),
  schema_version smallint not null default 1 check (schema_version between 1 and 100),
  input_data jsonb not null default '{}'::jsonb check (
    jsonb_typeof(input_data) = 'object'
    and octet_length(input_data::text) <= 65536
  ),
  result_data jsonb not null default '{}'::jsonb check (
    jsonb_typeof(result_data) = 'object'
    and octet_length(result_data::text) <= 65536
  ),
  source_path text not null check (
    char_length(source_path) between 1 and 240
    and source_path ~ '^/(tr|en)/engage/tools/'
  ),
  created_at timestamptz not null default now(),
  constraint engage_tool_runs_client_run_id_key unique (client_run_id)
);

create index if not exists engage_tool_runs_tool_created_at_idx
  on public.engage_tool_runs (tool_key, created_at desc);

alter table public.engage_tool_runs enable row level security;

revoke all on table public.engage_tool_runs from public, anon, authenticated;
grant insert on table public.engage_tool_runs to anon, authenticated;

drop policy if exists "engage tool runs are insert only" on public.engage_tool_runs;
create policy "engage tool runs are insert only"
  on public.engage_tool_runs
  for insert
  to anon, authenticated
  with check (
    tool_key in (
      'growth-simulator',
      'report-audit',
      'sellf-surface',
      'sellf-marketfit',
      'sellf-route'
    )
    and language in ('tr', 'en')
    and schema_version = 1
    and jsonb_typeof(input_data) = 'object'
    and jsonb_typeof(result_data) = 'object'
    and octet_length(input_data::text) <= 65536
    and octet_length(result_data::text) <= 65536
    and source_path ~ '^/(tr|en)/engage/tools/'
  );
