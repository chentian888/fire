import { resolve } from 'path'
import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import R from 'ramda'
import nuxtConfig from '../nuxt.config'
import { from } from 'core-js/fn/array'

const r = path => resolve(__dirname, path)
const HOST = process.env.HOST || 'localhost'
const PORT = 3000
const MIDDLEWARES = ['database','common','router']
class Server {
  constructor() {
    this.app = new Koa()
    this.useMiddleware(this.app)(MIDDLEWARES)
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
      try {
        const builder = new Builder(nuxt)
        await builder.build()
      } catch (e) {
        console.error(e)
        process.exit(1)
      }
    } else {
      await nuxt.ready()
    }
    this.app.use(async (ctx, next) => {
      await next()
      ctx.status = 200
      ctx.req.session = ctx.session
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          promise.then(resolve).catch(reject)
        })
      })
    })
    this.app.listen(PORT, HOST, () => {
      console.log(`server is running at http://${HOST}:${PORT}`)
    })
  }

  useMiddleware(app) {
    return R.map(
      R.compose(
        R.map(i => i(app)),
        (i)=>{
          console.log(i)
          return require(i)
        },
        i => {
          console.log(i)
          return `${r('./middleware')}/${i}`
        }
      )
    )
  }
}

const app = new Server()
app.start()
