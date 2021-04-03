import weChatLib from '../wechat-lib'
import weChatOauth from '../wechat-lib/oauth'
import pay from '../wechat-lib/pay'
import config from '../config'
import Token from '../schema/token'
import Ticket from '../schema/ticket'
const wechatConfig = {
  wechat: {
    appId: config.weChat.appId,
    appSecret: config.weChat.appSecret,
    token: config.weChat.token,
    getAccessToken: async () => await Token.getAccessToken(),
    saveAccessToken: async data => await Token.saveAccessToken(data),
    getTicket: async () => await Ticket.getTicket(),
    saveTicket: async data => await Ticket.saveTicket(data)
  }
}

export const getWeChatClient = () => {
  const wechatClient = new weChatLib(wechatConfig.wechat)
  return wechatClient
}

export const getOAuth = () => {
  const wechatOAuth = new weChatOauth(wechatConfig.wechat)
  return wechatOAuth
}

export const weChatPay = () => {
  const weChatPay = new pay(config.shop)
  return weChatPay
}
