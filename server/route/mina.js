import { controller, get, post, validate } from '../decorator/router'
import { openidAndSessionKey, WXBizDataCrypt } from '../wechat/mina'
import User from '../schema/user'
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
    const { code, userInfo } = ctx.query
    const res = await openidAndSessionKey(code)
    const user = User.findOne({ openid: { $in: [res.openid] } })
    if (!user) {
      var wxBizDataCrypt = new WXBizDataCrypt(res.sessionKey)
      var decryptData = wxBizDataCrypt.decryptData(userInfo.encryptedData, userInfo.iv)
    }
  }

  @post('/login')
  @validate({ body: ['code', 'avatarUrl', 'nickName'] })
  async login(ctx, next) {
    const { code, avatarUrl, nickName } = ctx.query
    try {
      const { openid } = openidAndSessionKey(code)
      let user = await User.findOne({ openid }).exec()
      if (!user) {
        const newUser = new User({
          openid,
          avatarUrl,
          nickname: nickName
        })
        user = await newUser.save()
      } else {
        user.avatarUrl = avatarUrl
        user.nickname = nickName
        user = await user.save()
      }
      ctx.body = {
        success: true,
        data: user
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }
}
