import 'reflect-metadata'

import yargs from 'yargs'

import { GenerateSwaggerCommand } from './command/generate-swagger'
import { VersionCommand } from './command/version'

yargs
  .usage('Usage: $0 <command> [options]')
  .command(new GenerateSwaggerCommand())
  .command(new VersionCommand())
  .recommendCommands()
  .strict()
  .help('h')
  .alias('v', 'version')
  .alias('h', 'help')
