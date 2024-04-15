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

2. Prepare your app

```ts
// app.ts
import Koa from 'koa'
import Router from '@koa/router'
import { KoaDriver, Restype } from 'restype'

const app = new Koa()
const router = new Router()

const restype = new Restype<KoaDriver>({
  driverFactory(opts) {
    return new KoaDriver({
      router,
      ...opts
    })
  }
})

for (const handler of restype.getHandlers()) {
  app.use(handler)
}

restype.setup().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
})
```

### Drivers

#### Using Koa driver

```ts
import Router from '@koa/router'
import { Restype, KoaDriver } from 'restype'

const router = new Router()

const restype = new Restype<KoaDriver>({
  driverFactory(opts) {
    return new KoaDriver({
      router,
      ...opts
    })
  }
})
```

#### Using Express driver

```ts
import { Restype, ExpressDriver } from 'restype'

const restype = new Restype<ExpressDriver>({
  driverFactory(opts) {
    return new ExpressDriver(opts)
  }
})
```

#### Using Custom driver

```ts
import { Restype, IDriver } from 'restype'

class CustomDriver implements IDriver {
  public async setup(): Promise<void> {
    // when Restype.setup() is called
  }

  public async getHandlers(): any[] {
    //
  }
}

const restype = new Restype<CustomDriver>({
  driver: new CustomDriver(),
  // or
  driverFactory(opts) {
    // opts.restype has Restype instance, so you can pass it if it's required in your custom driver
    return new CustomDriver()
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
