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
  },
  user: {
    tag: '/tags/create',
    remark: '/user/info/updateremark',
    baseInfo: '/user/info',
    list: '/user/get',
    blackList: '/tags/members/getblacklist'
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
  async handle(operation, ...args) {
    const token = await this.fetchAccessToken()
    const options = this[operation](token.token, ...args)
    console.log(options)
    const res = await request({ uri: weChatBaseUrl + options.url, ...options })
    return res
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
    const url = weChatBaseUrl + weChatApi.accessToken + `?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`
    const res = await request({ method: 'GET', url })
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
  createMenu(token, menu = {}) {
    const url = weChatApi.menu.create + `?access_token=${token}`
    return { method: 'POST', url, body: menu, json: true }
  }
  // 删除菜单
  delMenu(token) {
    const url = weChatApi.menu.del + `?access_token=${token}`
    return { method: 'GET', url }
  }
  // 获取菜单
  getMenu(token) {
    const url = weChatApi.menu.get + `?access_token=${token}`
    return { method: 'GET', url }
  }
  // 素材管理
  uploadMaterial(token, type, uploadMaterial, permanent) {
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
    return { method: 'POST', url, ...options }
  }
  fetchTemporaryMaterial(token, mediaId) {
    const url = weChatApi.temporary.fetch + `?access_token=${token}&media_id=${mediaId}`
    return { method: 'GET', url }
  }
  fetchMaterial(token, mediaId, permanent) {
    let url = weChatApi.temporary.fetch + `?access_token=${token}&media_id=${mediaId}`
    let option = { method: 'GET', url }
    if (permanent) {
      url = weChatApi.permanent.fetch + `?access_token=${token}`
      option = { method: 'POST', url, body: { media_id: mediaId }, json: true }
    }
    return option
  }
  deleteMaterial(token, mediaId) {
    const url = weChatApi.permanent.del + `?access_token=${token}`
    return { method: 'POST', url, body: { media_id: mediaId }, json: true }
  }
  updateMaterial(token) {
    const url = weChatApi.permanent.update + `?access_token=${token}`
    return { method: 'POST', url, body: { media_id: mediaId }, json: true }
  }
  countMaterial(token) {
    const url = weChatApi.permanent.count + `?access_token=${token}`
    return { method: 'GET', url }
  }
  batchMaterial(token) {
    const url = weChatApi.permanent.batch + `?access_token=${token}`
    const data = {
      type: 'image',
      offset: 0,
      count: 20
    }
    return { method: 'POST', url, body: data, json: true }
  }
  // 用户管理
}
