import { Arguments, Argv, CommandModule } from 'yargs'

export class GenerateSwaggerCommand implements CommandModule {
  public readonly command = 'generate:swagger'

  public readonly describe = 'Generate OpenAPI 3.0 spec'

  public builder(args: Argv) {
    return args
  }

  public async handler(args: Arguments) {
    console.log('Not implemented')
  }
}
