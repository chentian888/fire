import request from 'request-promise'
import crypto from 'crypto'
import config from '../config'

export async function openidAndSessionKey(code) {
  const optinos = {
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      appid: config.mina.appId,
      secret: config.mina.appId,
      js_code: code
    },
    json: true
  }
  const res = await request(optinos)
  return res
}

export class WXBizDataCrypt {
  constructor(sessionKey) {
    this.appId = config.mina.appId
    this.sessionKey = sessionKey
  }
  decryptData(encryptedData, iv) {
    // base64 decode
    var sessionKey = Buffer.from(this.sessionKey, 'base64')
    encryptedData = Buffer.from(encryptedData, 'base64')
    iv = Buffer.from(iv, 'base64')

    try {
      // 解密
      var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      var decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')

      decoded = JSON.parse(decoded)
    } catch (err) {
      throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer')
    }

    return decoded
  }
}
