import process from 'node:process'
import minimist from 'minimist'

type Args = {
  dry?: boolean
  noRemove?: string[]
} & minimist.ParsedArgs

export const args = (): Args =>
  minimist<Args>(process.argv.slice(2), {
    alias: {
      dry: 'd',
    },
    default: {
      dry: false,
    },
  })
