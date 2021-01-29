import fs from 'fs'
import request from 'request-promise'
// import FormData from 'form-data'
import _ from 'lodash'
const weChatBaseUrl = 'https://api.weixin.qq.com/cgi-bin'

const weChatApi = {
  accessToken: '/token',
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
  tag: {
    create: '/tags/create',
    get: '/tags/get',
    update: '/tags/update',
    del: '/tags/delete',
    batchInTag: '/tags/members/batchtagging',
    batchOutTag: '/tags/members/batchuntagging',
    memberTag: '/tags/getidlist'
  },
  user: {
    member: '/user/tag/get',
    remark: '/user/info/updateremark',
    baseInfo: '/user/info',
    list: '/user/get',
    blackList: '/tags/members/getblacklist',
    batchBlack: '/tags/members/batchblacklist',
    batchUnBlack: '/tags/members/batchunblacklist'
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
    let res = await request({ method: 'GET', url })
    try {
      res = JSON.parse(res)
    } catch (e) {
      throw new Error(e)
    }
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
  // 菜单-创建
  createMenu(token, menu = {}) {
    const url = weChatApi.menu.create + `?access_token=${token}`
    return { method: 'POST', url, body: menu, json: true }
  }
  // 菜单-删除
  delMenu(token) {
    const url = weChatApi.menu.del + `?access_token=${token}`
    return { method: 'GET', url }
  }
  // 菜单-获取
  getMenu(token) {
    const url = weChatApi.menu.get + `?access_token=${token}`
    return { method: 'GET', url }
  }
  // 素材-上传
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
  // 素材-获取
  fetchMaterial(token, mediaId, permanent) {
    let url = weChatApi.temporary.fetch + `?access_token=${token}&media_id=${mediaId}`
    let option = { method: 'GET', url }
    if (permanent) {
      url = weChatApi.permanent.fetch + `?access_token=${token}`
      option = { method: 'POST', url, body: { media_id: mediaId }, json: true }
    }
    return option
  }
  // 素材-删除
  deleteMaterial(token, mediaId) {
    const url = weChatApi.permanent.del + `?access_token=${token}`
    return { method: 'POST', url, body: { media_id: mediaId }, json: true }
  }
  // 素材-更新
  updateMaterial(token) {
    const url = weChatApi.permanent.update + `?access_token=${token}`
    return { method: 'POST', url, body: { media_id: mediaId }, json: true }
  }
  // 素材-统计
  countMaterial(token) {
    const url = weChatApi.permanent.count + `?access_token=${token}`
    return { method: 'GET', url }
  }
  // 素材-批量获取列表
  batchMaterial(token) {
    const url = weChatApi.permanent.batch + `?access_token=${token}`
    const data = {
      type: 'image',
      offset: 0,
      count: 20
    }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-新建
  createTag(token, name) {
    const url = weChatApi.tag.create + `?access_token=${token}`
    const data = { access_token: token, tag: { name } }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-获取
  getTag(token) {
    const url = weChatApi.tag.get + `?access_token=${token}`
    return { method: 'GET', url }
  }
  // 标签-删除
  deletedTag(token, tagId) {
    const url = weChatApi.tag.del + `?access_token=${token}`
    const data = { tag: { id: tagId } }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-更新
  updaetTag(token, id, name) {
    const url = weChatApi.tag.update + `?access_token=${token}`
    const data = { tag: { id: id, name: name } }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-批量打标签
  batchInTag(token, tagId, openId) {
    const url = weChatApi.tag.batchInTag + `?access_token=${token}`
    const data = { openid_list: _.isArray(openId) ? openId : [openId], tagid: tagId }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-批量取消标签
  batchOutTag(token, tagId, openId) {
    const url = weChatApi.tag.batchOutTag + `?access_token=${token}`
    const data = { openid_list: openId, tagid: tagId }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-用户下的标签
  memberTag(token, openId) {
    const url = weChatApi.tag.memberTag + `?access_token=${token}`
    const data = { openid: openId }
    return { method: 'POST', url, body: data, json: true }
  }
  // 标签-此标签下的用户
  getMember(token, tagId) {
    const url = weChatApi.user.baseInfo + `?access_token=${token}`
    const data = { tagid: tagId, next_openid: '' }
    return { method: 'POST', url, body: data, json: true }
  }
  // 用户-备注
  remarkUser(token, openId, content) {
    const url = weChatApi.user.remark + `?access_token=${token}`
    const data = { openid: openId, remark: content }
    return { method: 'POST', url, body: data, json: true }
  }
  // 用户-信息
  getUserInfo(token, openId) {
    const url = weChatApi.user.baseInfo + `?access_token=${token}&openid=${openId}&lang=zh_CN`
    return { method: 'GET', url }
  }
  // 用户-已关注列表
  fetchUserList(token, startOpenId = '') {
    const url = weChatApi.user.list + `?access_token=${token}&next_openid=${startOpenId}`
    return { method: 'GET', url }
  }
  // 用户-黑名单列表
  getblacklist(token, startOpenId = '') {
    const url = weChatApi.user.blackList + `?access_token=${token}`
    const data = { begin_openid: startOpenId }
    return { method: 'POST', url, body: data, json: true }
  }
  // 用户-拉入黑名单
  batchBlack(token, openId) {
    const url = weChatApi.user.blackList + `?access_token=${token}`
    const data = { openid_list: _.isArray(openId) ? openId : [openId] }
    return { method: 'POST', url, body: data, json: true }
  }
  // 用户-移出黑名单
  batchUnBlack(token, openId) {
    const url = weChatApi.user.blackList + `?access_token=${token}`
    const data = { openid_list: _.isArray(openId) ? openId : [openId] }
    return { method: 'POST', url, body: data, json: true }
  }
}
