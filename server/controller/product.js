import xss from 'xss'
import R from 'ramda'
import api from '../api'
import { weChatPay } from '../wechat'
export async function savePorductAsync(ctx, next) {
  const { title = '', intro = '', price = '', images = [], parameters = [] } = ctx.request.body
  console.log(ctx.request.body)
  if (!title || !intro || !price) {
    ctx.body = {
      err: '缺少参数',
      success: true
    }
    return
  }
  const product = {
    title: xss(title),
    intro: xss(intro),
    price: xss(price),
    images: R.map(xss)(images),
    parameters: R.map(item => ({ key: xss(item.key), value: xss(item.value) }))(parameters)
  }
  try {
    const data = await api.product.saveProduct(product)
    ctx.body = {
      data,
      success: true
    }
  } catch (e) {
    ctx.body = {
      err: e,
      success: true
    }
  }
}
export async function putPorductAsync(ctx, next) {
  const { id = '', iamges = [], title = '', intro = '', price = '', parameters = [] } = ctx.request.body
  if (!id) {
    ctx.body = {
      err: 'id is required',
      success: true
    }
    return
  }
  const product = await api.product.getProduct(id)
  if (!product) {
    ctx.body = {
      succes: false,
      err: 'product not exist'
    }
    return
  }
  console.log(parameters)
  product.iamges = xss(iamges)
  product.title = xss(title)
  product.intro = xss(intro)
  product.price = xss(price)
  product.parameters = R.map(item => ({ key: xss(item.key), value: xss(item.value) }))(parameters)
  try {
    const data = await api.product.putProduct(product)
    ctx.body = {
      data,
      success: true
    }
  } catch (e) {
    ctx.body = {
      err: e,
      success: true
    }
  }
}
export async function delPorductAsync(ctx, next) {
  const { query } = ctx
  const { id } = query
  if (!id) return (ctx.body = { success: false, err: 'id is required' })
  const product = await api.product.getProduct(id)
  if (!product) {
    ctx.body = {
      succes: false,
      err: 'product not exist'
    }
    return
  }
  const data = await api.product.delProduct(product)
  ctx.body = {
    data,
    success: true
  }
}
export async function createOrderAsync(ctx, next) {
  const ip = ctx.ip.replace('::ffff:', '')
  const { productId, name, phoneNumber, address } = ctx.request.body
  const session = ctx.session
  if (!productId) {
    ctx.body = {
      success: false,
      err: 'productId 参数丢失'
    }
    return
  }
  const product = await api.product.getProduct(productId)
  if (!product) {
    ctx.body = {
      success: false,
      err: '商品不存在'
    }
    return
  }
  try {
    let user = await api.user.getUser(session.user.openid)
    if (!user) {
      user = await api.user.saveUser({
        openid: [session.openid],
        nicname: session.nicname,
        sex: session.sex,
        email: session.email,
        headimgurl: session.headimgurl,
        avatarUrl: session.avatarUrl,
        address: session.address,
        province: session.province,
        country: session.country,
        city: session.city
      })
    }
    const _order = {
      openid: session.openid,
      body: product.title,
      attach: '公众号周边支付',
      out_trade_no: 'product' + Date.now(),
      total_fee: 10 * product.totalFee,
      spbill_create_ip: ip,
      trade_type: 'JSAPI'
    }
    // const payClient = await weChatPay()
    // const order = await payClient.getParamsAsync(_order)
    // 模拟真实支付返回参数
    const order = {
      appId: '',
      nonceStr: '',
      signType: 'MD5',
      package: '',
      paySign: '',
      timestamp: ''
    }
    const payment = await api.payment.createOrder({
      user: user._id,
      product: product._id,
      order: order,
      name,
      address,
      phoneNumber,
      success: 0,
      payType: '0',
      totalFee: product.totalFee
    })
    ctx.body = {
      user: user,
      order: order,
      product: product,
      payment: payment
    }
  } catch (e) {
    console.log(e)
    ctx.throw(501, e)
  }
}
