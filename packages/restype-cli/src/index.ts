import 'reflect-metadata'

import yargs from 'yargs'

import { GenerateSwaggerCommand } from './command/generate-swagger'
import { VersionCommand } from './command/version'

// prettier-ignore
yargs
  .usage('Usage: $0 <command> [options]')
  .command(new GenerateSwaggerCommand())
  .command(new VersionCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .help('h')
  .alias('v', 'version')
  .alias('h', 'help')
  .argv
