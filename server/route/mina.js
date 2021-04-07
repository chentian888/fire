import { controller, get, post, validate } from '../decorator/router'
import { openidAndSessionKey } from '../wechat/mina'
import { getUserAsync, userLogin } from '../controller/user'
// import User from '../schema/user'
@controller('/mina')
export default class MinaController {
  @get('/codeAndSessionKey')
  @validate({ query: ['code'] })
  async getCodeAndSessionKey(ctx, next) {
    const { code } = ctx.query
    const res = await openidAndSessionKey(code)
    return res
  }

  @get('/user')
  @validate({ query: ['code', 'userInfo'] })
  async getUser(ctx, next) {
    // TODO
    await getUserAsync(ctx, next)
  }

  @post('/login')
  @validate({ body: ['code', 'avatarUrl', 'nickName'] })
  async login(ctx, next) {
    await userLogin(ctx, next)
  }
}
