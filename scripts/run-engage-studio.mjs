import {spawnSync} from 'node:child_process'
import {existsSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const studioRoot = path.join(root, 'engage-studio')
const studioCommand = path.join(
  studioRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'sanity.cmd' : 'sanity',
)
const rootCommand = path.join(
  root,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'sanity.cmd' : 'sanity',
)
const command = existsSync(studioCommand) ? studioCommand : rootCommand
const args = process.argv.slice(2)

const result = spawnSync(command, args, {
  cwd: studioRoot,
  env: process.env,
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
