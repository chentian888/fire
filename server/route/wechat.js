import { api, get, post } from '../decorator/router'

@api('')
export default class WeChat {
  @get('/wechat-hear')
  wechatHear(ctx, next) {
    ctx.body = '<h1>路由装饰器已经成功开启</h1>'
    console.log(ctx)
  }
}
