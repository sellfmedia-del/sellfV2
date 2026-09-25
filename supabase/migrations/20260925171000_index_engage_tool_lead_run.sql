create index if not exists engage_tool_leads_run_tool_idx
  on public.engage_tool_leads (client_run_id, tool_key);
