import { ExpressDriver, Restype } from '../src'

import express from 'express'

const app = express()

const restype = new Restype<ExpressDriver>({
  driverFactory(opts) {
    return new ExpressDriver({
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
