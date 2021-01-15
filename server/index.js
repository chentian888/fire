import Koa from 'koa'

const HOST = process.env.HOST || 'localhost'
const PORT = 3000
const MIDDLEWARES = []
class Server {
  constructor() {
    this.app = new Koa()
  }

  start() {
      
    // 配置nuxt
    // 使用koa middleware
    console.log(process.env)
    this.app.listen(PORT, () => {
      console.log(`server is running at http://${HOST}:${PORT}`)
    })
  }
}

const app = new Server()
app.start()
