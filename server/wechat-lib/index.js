import fs from 'fs'
import fetch from 'node-fetch'
import request from 'request-promise'
// import FormData from 'form-data'
import _ from 'lodash'
const weChatBaseUrl = 'https://api.weixin.qq.com/cgi-bin'

const weChatApi = {
  accessToken: '/token',
  user: {},
  tag: {},
  menu: {
    create: '/menu/create',
    get: '/menu/get',
    del: '/menu/delete'
  },
  temporary: {
    upload: '/media/upload',
    fetch: '/media/get'
  },
  permanent: {
    upload: '/material/add_material',
    uploadNews: '/material/add_news',
    uploadNewsPic: '/media/uploadimg',
    fetch: '/material/get_material',
    del: '/material/del_material',
    update: '/material/update_news',
    count: '/material/get_materialcount',
    batch: '/material/batchget_material'
  }
}

export default class WeChatLib {
  constructor(config) {
    this.appId = config.appId
    this.appSecret = config.appSecret
    this.token = config.token
    this.getAccessToken = config.getAccessToken
    this.saveAccessToken = config.saveAccessToken
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
    return fetch(weChatBaseUrl + url, options)
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
    console.log(url, data, opts)
    if (!_.isObject(data)) {
      new Error('data must be Object')
      return false
    }
    return await this.request('post', url, { body: JSON.stringify(data), ...opts })
  }
  async handle(operation, ...args) {
    const token = await this.fetchAccessToken()
    return this[operation](token.token, ...args)
  }
  async fetchAccessToken() {
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
  async createMenu(token, menu = {}) {
    const url = weChatApi.menu.create + `?access_token=${token}`
    await this.httpPost(url, menu)
  }
  // 删除菜单
  async delMenu(token) {
    await this.httpGet(weChatApi.menu.del, {
      access_token: token
    })
  }
  // 获取菜单
  async getMenu(token) {
    const res = await this.httpGet(weChatApi.menu.get, {
      access_token: token
    })
    console.log(JSON.stringify(res))
  }
  // 素材管理
  async uploadMaterial(token, type, uploadMaterial, permanent) {
    console.log(token, type, uploadMaterial, permanent)
    // 默认临时
    const suffix1 = `?access_token=${token}`
    const suffix2 = `?access_token=${token}&type=${type}`
    let url = weChatApi.temporary.upload + suffix2
    let options = {}
    if (permanent) {
      // 永久
      url = weChatApi.permanent.upload + suffix2
      if (type === 'news') {
        url = weChatApi.permanent.uploadNews + suffix1
        options = { body: uploadMaterial }
      } else if (type === 'pic') {
        url = weChatApi.permanent.uploadNewsPic + suffix1
      }
    }
    if (type === 'pic' || type === 'image' || type === 'video' || type === 'voice' || type === 'thumb') {
      options = {
        formData: { media: fs.createReadStream(uploadMaterial) }
      }
    }

    const res = await request({
      method: 'POST',
      uri: weChatBaseUrl + url,
      ...options
    })
    console.log(res)
  }
  async fetchMaterial(token, mediaId) {
    const url = weChatApi.temporary.fetch + `?access_token=${token}&media_id=${mediaId}`
    const res = await request({
      method: 'GET',
      uri: weChatBaseUrl + url
    })
    return res
  }
  deleteMaterial() {}
  updateMaterial() {}
  async countMaterial(token) {
    const url = weChatApi.permanent.count + `?access_token=${token}`
    const res = await request({
      method: 'GET',
      uri: weChatBaseUrl + url,
      body: {
        voice_count: 20,
        video_count: 20,
        image_count: 20,
        news_count: 20
      },
      json: true
    })
    return res
  }
  async batchMaterial(token) {
    const url = weChatApi.permanent.batch + `?access_token=${token}`
    const res = await request({
      method: 'POST',
      uri: weChatBaseUrl + url,
      body: {
        type: 'image',
        offset: 0,
        count: 20
      },
      json: true
    })
    return res
  }
  // 用户管理
}
