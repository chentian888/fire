// import config from '../config'
import { openidAndSessionKey, WXBizDataCrypt } from '../wechat/mina'
import api from '../api'
export async function getUserAsync(ctx, next) {
  const { code, userInfo } = ctx.query
  const res = await openidAndSessionKey(code)
  const user = await api.user.getUser(res.openid)
  if (!user) {
    var wxBizDataCrypt = new WXBizDataCrypt(res.sessionKey)
    var decryptData = wxBizDataCrypt.decryptData(userInfo.encryptedData, userInfo.iv)
  }
}

export async function userLogin(ctx, next) {
  const { code, avatarUrl, nickName } = ctx.query
  try {
    const { openid } = openidAndSessionKey(code)
    let user = await api.user.getUser(openid)
    if (!user) {
      user = await api.user.saveUser({
        openid,
        avatarUrl,
        nickname: nickName
      })
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
