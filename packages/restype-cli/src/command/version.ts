import { exec } from 'node:child_process'
import { CommandModule } from 'yargs'

function execute(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }

      resolve(stdout || stderr)
    })
  })
}

function filterPackages(input: string): string[] {
  const matches = input.match(/\@restype\/(.*)\@([0-9\.]+)/g)

  if (!matches) {
    return []
  }

  return matches.map((match) => match.trim())
}

export class VersionCommand implements CommandModule {
  public readonly command = 'version'
  public readonly describe = 'Show version information'

  public async handler() {
    const localOutput = await execute('npm list --depth=0')
    const globalOutput = await execute('npm list -g --depth=0')

    const local = filterPackages(localOutput)
    const global = filterPackages(globalOutput)

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
}
