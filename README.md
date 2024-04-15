## Restype

### Usage

#### Basic usage

1. Define controller

```ts
// controllers/user.controller.ts
import { Controller, Tags, Get } from 'restype'

@Controller('users')
class UserController {
  @Get('/')
  public async getList(): Promise<User[]> {
    return []
  }
}
```

2. Prepare Restype

```ts
// restype.ts
import { Restype, KoaDriver } from 'restype'
import { UserController } from './controllers/user.controller'

export const restype = new Restype({
  driver: KoaDriver,
  controllers: [UserController],
  // or glob
  controllers: [__dirname + './controllers/**/*.controller.{js,ts}']
})
```

3. Prepare your app

```ts
// app.ts
import * as Koa from 'koa'
import * as koaBody from 'koa-body'

import { restype } from './restype'

const app = new Koa()

app.use(koaBody())
app.use(...restype.getHandlers())

app.listen(3000)
```

### Drivers

#### Using Koa driver

```ts
import { Restype, KoaDriver } from 'restype'

const restype = new Restype({
  driver: KoaDriver
})
```

#### Using Express driver

```ts
import { Restype, ExpressDriver } from 'restype'

const restype = new Restype({
  driver: ExpressDriver
})
```

#### Using Custom driver

```ts
import { Restype, IDriver } from 'restype'

class CustomDriver implements IDriver {
  //
}

const restype = new Restype({
  driver: CustomDriver,
  // or
  driverFactory(restype) {
    return new CustomDriver(restype)
  }
})
```

### DI

#### Using TypeDI

```ts
import { useContainer } from 'restype'
import { Container } from 'typedi'

useContainer(Container)
```

#### Using other IoC providers

```ts
import { useContainer, IIocAdapter } from 'restype'

class CustomIocAdapter implements IIocAdapter {
  get(target) {
    // some logic that returns instance of `target`
  }
}

const iocAdapter = new CustomIocAdapter()
useContainer(iocAdapter)
```
