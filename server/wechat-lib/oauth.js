import request from 'request-promise'
const api = {
  wechatAuth: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  accessToken: 'https://api.weixin.qq.com/sns/oauth2/access_token',
  userInfo: 'https://api.weixin.qq.com/sns/userinfo'
}

export default class WechatOAuth {
  constructor(config) {
    this.appId = config.appId
    this.appSecret = config.appSecret
    this.token = config.token
  }
  async request(options) {
    options = Object.assign({}, options, { json: true })
    try {
      const response = await request(options)
      return response
    } catch (error) {
      console.error(error)
    }
  }
  getAuthorizeURL(scope, target, params) {
    const encodeUrl = encodeURIComponent(target)
    const url = `${api.wechatAuth}?appid=${this.appId}&redirect_uri=${encodeUrl}&response_type=code&scope=${scope}&state=${params}#wechat_redirect`
    return url
  }

  async fetchAccessToken(code) {
    const url = api.accessToken + `?appid=${this.appId}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`
    const data = await this.request({ url })
    return data
  }
  async getUserInfo(accessToken, openid) {
    const url = api.userInfo + `?access_token=${accessToken}&openid=${openid}&lang=zh_CN`
    const data = await this.request({ url })
    return data
  }
}
