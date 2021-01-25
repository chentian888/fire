import weChatLib from '../wechat-lib'
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
