import fetch from 'node-fetch'
import _ from 'lodash'
const weChatBaseUrl = 'https://api.weixin.qq.com/cgi-bin'

const weChatApi = {
  accessToken: weChatBaseUrl + '/token',
  user: {},
  tag: {},
  menu: {
    create: weChatBaseUrl + '/menu/create',
    get: weChatBaseUrl + '/menu/get',
    del: weChatBaseUrl + '/menu/delete'
  },
  material: {}
}

export default class WeChatLib {
  constructor(config) {
    this.appId = config.appId
    this.appSecret = config.appSecret
    this.token = config.token
    this.getAccessToken = config.getAccessToken
    this.saveAccessToken = config.saveAccessToken
    console.log('=========', 'constructor')
    this.fetchAccessToken()
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
    console.log('=========', 'fetchAccessToken')
    let data = await this.getAccessToken()
    console.log('从数据库获取token', data)
    if (!this.isValidToken(data, 'access_token')) {
      data = await this.updateAccessToken()
      await this.saveAccessToken(data)
    }
    return data
  }
  async updateAccessToken() {
    const res = await this.httpGet(weChatApi.accessToken, {
      grant_type: 'client_credential',
      appid: this.appId,
      secret: this.appSecret
    })
    const expiresIn = Date.now() + (res.expires_in - 5 * 60) * 1000
    res.expires_in = expiresIn
    console.log('获取新token', res)
    return res
  }
  isValidToken(data, name) {
    if (!data || !data[name] || !data.expires_in) {
      return false
    }
    const now = Date.now()
    const expiresIn = data.expires_in
    if (expiresIn - now > 0) {
      return true
    }
    return false
  }
  // 创建菜单
  async createMenu(menu) {
    const token = await this.fetchAccessToken()
    const url = weChatApi.menu.create + `?access_token=${token.token}`
    await this.httpPost(url, menu)
  }
  // 删除菜单
  async delMenu() {
    const token = await this.fetchAccessToken()
    await this.httpGet(weChatApi.menu.del, {
      access_token: token.token
    })
  }
  // 获取菜单
  async getMenu() {
    const token = await this.fetchAccessToken()
    const res = await this.httpGet(weChatApi.menu.get, {
      access_token: token.token
    })
    console.log(JSON.stringify(res))
  }
  // 素材管理
  // 用户管理
}
