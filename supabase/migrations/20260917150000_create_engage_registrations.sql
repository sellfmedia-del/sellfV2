create table if not exists public.engage_registrations (
  id uuid primary key default gen_random_uuid(),
  content_id text not null,
  content_type text not null check (content_type in ('webinar', 'event')),
  content_slug text not null,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  language text not null default 'tr' check (language in ('tr', 'en')),
  consent boolean not null check (consent is true),
  status text not null default 'registered' check (status in ('registered', 'cancelled')),
  registered_at timestamptz not null default now()
);

create unique index if not exists engage_registrations_content_email_key on public.engage_registrations (content_id, lower(email));
create index if not exists engage_registrations_registered_at_idx on public.engage_registrations (registered_at desc);
alter table public.engage_registrations enable row level security;
revoke all on table public.engage_registrations from anon, authenticated;

create or replace function public.register_engage_attendee(
  p_content_id text, p_content_type text, p_content_slug text, p_full_name text,
  p_email text, p_language text, p_consent boolean, p_capacity integer default null
)
returns text
language plpgsql
security invoker
set search_path = pg_catalog, public
as $function$
declare registration_count integer;
begin
  if p_content_type not in ('webinar', 'event') or p_language not in ('tr', 'en') or p_consent is not true
    or char_length(trim(p_full_name)) not between 2 and 120 or char_length(trim(p_email)) not between 5 and 254
    or trim(p_email) !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then return 'invalid'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(p_content_id));
  if exists (select 1 from public.engage_registrations where content_id = p_content_id and lower(email) = lower(trim(p_email))) then return 'duplicate'; end if;
  if p_capacity is not null and p_capacity > 0 then
    select count(*) into registration_count from public.engage_registrations where content_id = p_content_id and status = 'registered';
    if registration_count >= p_capacity then return 'full'; end if;
  end if;
  insert into public.engage_registrations (content_id, content_type, content_slug, full_name, email, language, consent)
  values (p_content_id, p_content_type, p_content_slug, trim(p_full_name), lower(trim(p_email)), p_language, true);
  return 'registered';
end;
$function$;

revoke all on function public.register_engage_attendee(text, text, text, text, text, text, boolean, integer) from public, anon, authenticated;
grant execute on function public.register_engage_attendee(text, text, text, text, text, text, boolean, integer) to service_role;
