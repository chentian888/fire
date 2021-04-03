import { getOAuth, getWeChatClient } from '../wechat'
import User from '../schema/user'

const wechatApi = getWeChatClient()

export function getAuthorizeURL(...args) {
  const oauth = getOAuth()
  return oauth.getAuthorizeURL(...args)
}
export async function getUserByCode(code) {
  const oauth = getOAuth()
  const { access_token, openid } = await oauth.fetchAccessToken(code)
  const userInfo = await oauth.getUserInfo(access_token, openid)
  const user = await User.findOne({ openid: userInfo.openid }).exec()
  if (!user) {
    const newUser = new User({
      openid: [userInfo.openid],
      nickname: userInfo.nickname,
      sex: userInfo.sex,
      language: userInfo.language,
      city: userInfo.city,
      province: userInfo.province,
      country: userInfo.country,
      headimgurl: userInfo.headimgurl
    })
    await newUser.save()
  }
  return userInfo
}

export async function getSignatureAsync(url) {
  const { access_token = '' } = wechatApi.fetchAccessToken()
  const { ticket = '' } = wechatApi.fetchTicket(access_token)
  const params = wechatApi.sign(ticket, url)
  params.appId = wechatApi.appId
  return params
}
