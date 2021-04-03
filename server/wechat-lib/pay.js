import { resolve } from 'path'
import fs from 'fs'
import wechatPay from 'wechat-pay'
const cert = resolve(__dirname, '../', 'config/cert/apiclient_cert.p12')

export default class Pay {
  constructor(config) {
    const intiConfig = {}
    this.appId = config.appId
    this.partnerKey = config.key
    this.notifyUrl = config.notifyUrl
    this.pfx = fs.readFileSync(cert) || ''
    this.payment = new wechatPay.Payment(intiConfig)
  }

  getParamsAsync(order) {
    return new Promise((resolve, reject) => {
      this.payment.getBrandWCPayRequestParams(order, (err, payargs) => {
        if (!err) {
          console.log(err)
          reject(err)
        }
        resolve(payargs)
      })
    })
  }
}
