import wechatPay from 'wechat-pay'
import path, { resolve } from 'path'
const cert = path.resolve(__dirname, '../', 'config/cert/apiclient_cert.p12')

export default class Pay {
  constructor(config) {
    const intiConfig = {}
    this.appId = config.shop.appId
    this.partnerKey = config.shop.key
    this.notifyUrl = config.shop.notifyUrl
    this.pfx = fs.readFileSync(cert)
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
