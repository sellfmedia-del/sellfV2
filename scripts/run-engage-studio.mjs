import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const command = process.platform === 'win32' ? 'sanity.cmd' : 'sanity'
const args = process.argv.slice(2)

const result = spawnSync(command, args, {
  cwd: path.join(root, 'engage-studio'),
  env: process.env,
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
