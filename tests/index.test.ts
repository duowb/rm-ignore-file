import process from 'node:process'
import { beforeEach, describe, test } from 'vitest'
import { execCommand } from '../src'

const originalArgv = [...process.argv]
describe('test', () => {
  beforeEach(() => {
    process.argv = [...originalArgv]
  })

  test('dry run', async () => {
    process.argv.push('--d')
    await execCommand()
  })

  test('ignore node_modules and *.log', async () => {
    process.argv.push('node_modules', '*.log')
    await execCommand()
  })

  test('ignore node_modules', async () => {
    process.argv.push('node_modules')
    await execCommand()
  })
})
