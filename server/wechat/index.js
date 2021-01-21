import weChatLib from '../wechat-lib'
import config from '../config'
const wechatConfig = {
  wechat: {
    appId: config.weChat.appId,
    appSecret: config.weChat.appSecret,
    token: config.weChat.token,
    getAccessToken: () => {},
    saveAccessToken: () => {},
    getTicket: () => {},
    saveTicket: () => {}
  }
}

export const getWeChatClient = () => {
  const wechatClient = new weChatLib(wechatConfig.wechat)
  return wechatClient
}
