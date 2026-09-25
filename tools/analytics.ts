export type EngageToolKey =
  | 'growth-simulator'
  | 'report-audit'
  | 'sellf-surface'
  | 'sellf-marketfit'
  | 'sellf-route'

export type ToolRun = {
  tool: EngageToolKey
  language: 'tr' | 'en'
  input: Record<string, unknown>
  result: Record<string, unknown>
}

export async function persistToolRun(run: ToolRun, clientRunId = crypto.randomUUID()) {
  if (typeof window === 'undefined') throw new Error('client_only')

  const body = JSON.stringify({
    clientRunId,
    tool: run.tool,
    language: run.language,
    input: run.input,
    result: run.result,
    sourcePath: window.location.pathname,
    schemaVersion: 1,
  })

  if (body.length > 120_000) throw new Error('payload_too_large')

  const response = await fetch('/api/engage/tool-runs', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body,
    cache: 'no-store',
    keepalive: true,
  })

  if (!response.ok && response.status !== 409) throw new Error('run_persistence_failed')
  return clientRunId
}

export function recordToolRun(run: ToolRun) {
  if (typeof window === 'undefined') return
  void persistToolRun(run).catch(() => undefined)
}
