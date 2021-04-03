import { resolve } from 'path'
import { controller, get, post } from '../decorator/router'
import reply from '../wechat/reply'
import weChatMiddleWare from '../wechat-lib/middleware'
import config from '../config'
import { getWeChatClient } from '../wechat'
import { redirect, oauth, signature } from '../controller/wechat'
@controller('')
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
  @get('/tag')
  async wechatTag(ctx, next) {
    const client = getWeChatClient()
    // const { name } = ctx.query
    const { id = '', name = '' } = ctx.query
    // const res = await client.handle('createTag', name)
    // const res = await client.handle('getTag')
    // const res = await client.handle('deletedTag', id)
    // const res = await client.handle('updaetTag', id, name)
    // const res = await client.handle('getMember', id)
    // const res = await client.handle('batchInTag', id, 'ojYkj6in1O6JxQMZ4UWUQ39gHwU4')
    // const res = await client.handle('batchOutTag', id, 'ojYkj6in1O6JxQMZ4UWUQ39gHwU4')
    // const res = await client.handle('memberTag', 'ojYkj6in1O6JxQMZ4UWUQ39gHwU4')
    const res = await client.handle('getUserInfo', 'ojYkj6in1O6JxQMZ4UWUQ39gHwU4')
    // const res = await client.handle('fetchUserList')
    // const res = await client.handle('getblacklist')
    // const res = await client.handle('remarkUser', 'ojYkj6in1O6JxQMZ4UWUQ39gHwU4', '我就是公众号拥有者')

    ctx.body = res
  }

  @get('/wechat-redirect')
  async wechatRedirect(ctx, next) {
    await redirect(ctx, next)
  }

  @get('/wechat-oauth')
  async wechatOauth(ctx, next) {
    await oauth(ctx, next)
  }

  @get('/wechat-signature')
  async wechatSignature(ctx, next) {
    await signature(ctx, next)
  }
}
