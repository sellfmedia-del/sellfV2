import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const engageBranch = 'codex/engage-foundation'

if (process.env.VERCEL !== '1' || process.env.VERCEL_GIT_COMMIT_REF !== engageBranch) {
  console.log('Skipping Engage Studio deploy outside its preview branch.')
  process.exit(0)
}

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error('SANITY_AUTH_TOKEN is required for the one-time Engage Studio deploy.')
  process.exit(1)
}

const result = spawnSync(
  process.execPath,
  [path.join(root, 'scripts', 'run-engage-studio.mjs'), 'deploy', '--schema-required'],
  {cwd: root, env: process.env, stdio: 'inherit'},
)

process.exit(result.status ?? 1)
