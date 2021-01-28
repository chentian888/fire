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
  @get('/material')
  async wechatMaterial(ctx, next) {
    const client = getWeChatClient()
    // const res = await client.handle('fetchMaterial', 'tPFhANpf-W-UpiU8ZNG3LQkwIYPL1oi5UwcN75BTovLX-e4u8o_cD7U-P10GiK1_')
    const res = await client.handle('countMaterial')
    ctx.body = res
  }
}
