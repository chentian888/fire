import fetch from 'node-fetch'
import _ from 'lodash'
const weChatBaseUrl = 'https://api.weixin.qq.com/cgi-bin/'

const weChatApi = {
  accessToken: weChatBaseUrl + 'token'
}

export default class WeChatLib {
  constructor(config) {
    this.appId = config.appId
    this.appSecret = config.appSecret
    this.token = config.token
    this.getAccessToken = config.getAccessToken
    this.saveAccessToken = config.saveAccessToken
  }

  request(method, url, opts) {
    const options = Object.assign(
      {
        method: method.toUpperCase() || 'GET',
        headers: { 'Content-Type': 'application/json' }
      },
      opts
    )
    return fetch(url, options)
      .then(res => res.json())
      .then(json => {
        return json
      })
  }
  async httpGet(url, data = {}, opts) {
    if (!_.isObject(data)) {
      new Error('data must be Object')
      return false
    }
    const query = []
    for (let [key, val] of Object.entries(data)) {
      query.push(`${key}=${val}`)
    }
    url += '?' + query.join('&')
    return await this.request('get', url, data, opts)
  }
  async httpPost(url, data = {}, opts) {
    if (!_.isObject(data)) {
      new Error('data must be Object')
      return false
    }
    return await this.request('post', url, { body: JSON.stringify(data), ...opts })
  }
  async handle(operation) {
    return this[operation]()
  }
  async fetchAccessToken() {
    await this.updateAccessToken()
  }
  async updateAccessToken() {
    const res = await this.httpGet(weChatApi.accessToken, {
      grant_type: 'client_credential',
      appid: this.appId,
      secret: this.appSecret
    })
    console.log(res)
  }
  isValidToken(data, token) {
    if (!data || !data[token] || data[expires_in]) {
      return false
    }
    const now = Date.now()
    const expiresIn = data.expires_in
    if (expiresIn - now > 10 * 60 * 1000) {
      return true
    }
    return false
  }
}
