import weChatLib from '../wechat-lib'
import config from '../config'
const wechatConfig = {
  wechat: {
    appId: config.appId,
    appSecret: config.appSecret,
    token: config.token,
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
