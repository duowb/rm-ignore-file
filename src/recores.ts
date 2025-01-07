import chalk from 'chalk'

export class Recores {
  private total = 0
  private skipped = 0
  private failed = 0
  private success = 0

  constructor() {}
  reset(): void {
    this.total = 0
    this.skipped = 0
    this.failed = 0
    this.success = 0
  }

  setTotal(total: number): void {
    this.total = total
  }
  addSkipped(): void {
    this.skipped++
  }
  addFailed(): void {
    this.failed++
  }
  addSuccess(): void {
    this.success++
  }

  getTotal(): string {
    return chalk.magenta(`Total: ${this.total}`)
  }
  getSkipped(): string {
    return chalk.blue(`Skipped: ${this.skipped}`)
  }
  getFailed(): string {
    return chalk.red(`Failed: ${this.failed}`)
  }
  getSuccess(): string {
    return chalk.green(`Success: ${this.success}`)
  }
}
