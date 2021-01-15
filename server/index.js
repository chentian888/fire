import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
// const { Nuxt, Builder } = require('nuxt')
import nuxtConfig from '../nuxt.config'
// const nuxtConfig = require('../nuxt.config')

const HOST = process.env.HOST || 'localhost'
const PORT = 3000
const MIDDLEWARES = []
class Server {
  constructor() {
    this.app = new Koa()
    this.dev = !(process.env.NODE_ENV === 'production')
  }

  async start() {
    // 配置nuxt
    // 使用koa middleware
    console.log(process.env.NODE_ENV)
    const nuxt = new Nuxt(nuxtConfig)
    this.app.use(async (ctx, next) => {
      await next()
      const rt = ctx.response.get('X-Response-Time')
      console.log(`${ctx.method} ${ctx.url} - ${rt}`)
      ctx.body = '<h1>hello wordl!!</h1>'
    })
    if (this.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }
    this.app.use(async (ctx, next) => {
      await next()
      console.log('我最先被打印出来')
    })
    this.app.listen(PORT, HOST, () => {
      console.log(`server is running at http://${HOST}:${PORT}`)
    })
  }
}

const app = new Server()
app.start()
