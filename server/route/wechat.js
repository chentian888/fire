import { api, get, post } from '../decorator/router'
import { tip } from '../wechat/reply'
import weChatMiddleWare from '../wechat-lib/middleware'
import config from '../config'

@api('')
export default class WeChat {
  @get('/wechat-hear')
  async wechatHearGet(ctx, next) {
    const middle = weChatMiddleWare(config.weChat, tip)
    await middle(ctx, next)
    ctx.body = '<h1>路由装饰器已经成功开启</h1>'
    console.log(ctx)
  }

  @post('/wechat-hear')
  wechatHearPost(ctx, next) {
    ctx.body = '<h1>路由装饰器已经成功开启</h1>'
    console.log(ctx)
  }
}
