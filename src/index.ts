import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { rimrafSync } from 'rimraf'
import { args } from './command'

const suffix = 'Would remove '

const execAsync = promisify(exec)
export async function execCommand(): Promise<void> {
  try {
    const { stdout, stderr } = await execAsync('git clean -ndX')
    if (stderr) {
      console.error('stderr', stderr)
      return
    }
    stdout.split('\n').forEach((line) => {
      if (line.startsWith(suffix)) {
        remove(line.split(suffix)[1])
      }
    })
  } catch (error) {
    console.error('error', error)
  }
}

function shouldExclude(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const regex = new RegExp(`^${pattern.replaceAll('*', '.*')}/?.*$`)
    return regex.test(path.trim())
  })
}

function remove(path: string) {
  const { dry, _ } = args()
  if (dry) {
    console.log(`Dry run: Removing ${path}`)
    return
  }
  if (shouldExclude(path, _)) {
    return
  }
  console.log(`Removing ${path}`)
  rimrafSync(path)
}
