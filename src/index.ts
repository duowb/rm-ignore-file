import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import chalk from 'chalk'
import DraftLog from 'draftlog'
import { rimrafSync } from 'rimraf'
import { args } from './command'
import { Recores } from './recores'

const suffix = 'Would remove '

const { dry, _ } = args()
DraftLog(console)
const records = new Recores()

const execAsync = promisify(exec)
export async function execCommand(): Promise<void> {
  records.reset()
  try {
    const { stdout, stderr } = await execAsync('git clean -ndX')
    if (stderr) {
      console.error('stderr', stderr)
      return
    }
    const paths = stdout
      .split('\n')
      .filter((line) => line.trim() && line.startsWith(suffix))
      .map((line) => line.split(suffix)[1])
    records.setTotal(paths.length)
    paths.forEach(remove)
    console.log(
      `${records.getTotal()}, ${records.getSkipped()}, ${records.getFailed()}, ${records.getSuccess()}`,
    )
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
  const text = `Removing ${path}`
  const update = console.draft(text)

  if (dry) {
    update(`${chalk.yellow('[Dry run]')} ${text}`)
    return
  }
  if (shouldExclude(path, _)) {
    records.addSkipped()
    update(`${chalk.blue('[Skipped]')} ${text}`)
    return
  }
  const rmRes = rimrafSync(path)
  if (!rmRes) {
    records.addFailed()
    return update(`${chalk.red('[Failed]')} ${text}`)
  }
  records.addSuccess()
  update(`${chalk.green('[Success]')} ${text}`)
}
