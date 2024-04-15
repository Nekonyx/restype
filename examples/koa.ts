import { KoaDriver, Restype } from '../src'

import Router from '@koa/router'
import Koa from 'koa'

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
