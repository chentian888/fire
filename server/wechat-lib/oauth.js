const api = {
  wechatAuth: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  accessToken: 'https://api.weixin.qq.com/sns/oauth2/access_token'
}

export default class WechatOAuth {
  constructor(config) {
    this.appId = config.appId
    this.appSecret = config.appSecret
    this.token = config.token
  }

  getAuthorizeURL(scope, target, params) {
    console.log(scope, encodeURIComponent(target), params)
    const encodeUrl = encodeURIComponent(target)
    const url = `${api.wechatAuth}?appid=${this.appId}&redirect_uri=${encodeUrl}&response_type=code&scope=${scope}&state=${params}#wechat_redirect`
    return url
  }
}
