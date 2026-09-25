export type EngageToolKey =
  | 'growth-simulator'
  | 'report-audit'
  | 'sellf-surface'
  | 'sellf-marketfit'
  | 'sellf-route'

type ToolRun = {
  tool: EngageToolKey
  language: 'tr' | 'en'
  input: Record<string, unknown>
  result: Record<string, unknown>
}

export function recordToolRun(run: ToolRun) {
  if (typeof window === 'undefined') return

  const body = JSON.stringify({
    clientRunId: crypto.randomUUID(),
    tool: run.tool,
    language: run.language,
    input: run.input,
    result: run.result,
    sourcePath: window.location.pathname,
    schemaVersion: 1,
  })

  if (body.length > 120_000) return

  void fetch('/api/engage/tool-runs', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body,
    cache: 'no-store',
    keepalive: true,
  }).catch(() => undefined)
}
