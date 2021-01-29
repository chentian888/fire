import { resolve } from 'path'
import { api, get, post } from '../decorator/router'
import reply from '../wechat/reply'
import weChatMiddleWare from '../wechat-lib/middleware'
import config from '../config'
import { getWeChatClient } from '../wechat'
@api('')
export default class WeChat {
  @get('/wechat-hear')
  async wechatHearGet(ctx, next) {
    const middle = weChatMiddleWare(config.weChat, reply)
    await middle(ctx, next)
    // ctx.body = '<h1>路由装饰器已经成功开启</h1>'
    console.log(ctx)
  }

  @post('/wechat-hear')
  async wechatHearPost(ctx, next) {
    const middle = weChatMiddleWare(config.weChat, reply)
    await middle(ctx, next)
    // ctx.body = 'success'
  }
  @get('/upload')
  async wechatUpload(ctx, next) {
    const client = getWeChatClient()
    // const res = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../wechat-lib/ice.jpeg'), true)
    const { id } = ctx.query
    const res = await client.handle('deleteMaterial', id)
    ctx.body = res
  }
  @get('/material')
  async wechatMaterial(ctx, next) {
    const client = getWeChatClient()
    // const res = await client.handle('fetchMaterial', '9OPkD5EN37kirVUL6ggaaCVYuhN9g9IoQjKxzoZjFTU')
    // const res = await client.handle('fetchTemporaryMaterial', '9OPkD5EN37kirVUL6ggaaCVYuhN9g9IoQjKxzoZjFTU')
    // const res = await client.handle('countMaterial')
    const res = await client.handle('batchMaterial')
    // ctx.set('Content-Type', 'image/jpeg')
    ctx.body = res
  }
}
