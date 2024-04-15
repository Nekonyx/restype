import { exec } from 'child_process'
import { Arguments, CommandModule } from 'yargs'

export class VersionCommand implements CommandModule {
  public readonly command = 'version'
  public readonly describe = 'Show version information'

  public async handler(args: Arguments) {
    const localOutput = await this.execute('npm list --depth=0')
    const globalOutput = await this.execute('npm list -g --depth=0')

    const local = this.filterPackages(localOutput)
    const global = this.filterPackages(globalOutput)

    console.log('Locally installed:')
    if (local.length === 0) {
      console.log('  No packages installed')
    } else {
      local.forEach((pkg) => console.log(`  ${pkg}`))
    }

    console.log('Globally installed:')
    if (global.length === 0) {
      console.log('  No packages installed')
    } else {
      global.forEach((pkg) => console.log(`  ${pkg}`))
    }
  }

  private async execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error)
        }

        resolve(stdout || stderr)
      })
    })
  }

  private filterPackages(input: string): string[] {
    const matches = input.match(/\@restype\/(.*)\@([0-9\.]+)/g)

    if (!matches) {
      return []
    }

    return matches.map((match) => match.trim())
  }
}
