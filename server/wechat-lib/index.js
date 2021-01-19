const weChatBase = 'https://api.weixin.qq.com/cgi-bin/'

const weChatApi = {}

export default class WeChatLib {
  constructor(config) {
    this.appId = config.appId
    this.appSecret = config.appSecret
    this.token = config.token
  }

  async request(method, url, data, opts) {
    //   TODO 待优化
    const options = Object.assign(
      {},
      {
        method: method.toUpperCase() || 'GET',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        ...opts
      },
      opts
    )
    return await fetch(url, options)
  }
  async handle(operation) {
    return this[operation]()
  }
}
