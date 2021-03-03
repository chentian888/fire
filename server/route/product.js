import xss from 'xss'
import R from 'ramda'
import { controller, get, post, put, del } from '../decorator/router'
import api from '../api'

@controller('/api')
export default class ProductController {
  @get('/products')
  async getProducts(ctx, next) {
    let { limit = 50 } = ctx.query
    const data = await api.product.getProducts(limit)
    console.log(data)
    ctx.body = {
      data,
      success: true
    }
  }

  @get('/products/:_id')
  async getPorduct(ctx, next) {
    const { params } = ctx
    const { _id } = params
    if (!_id) return (ctx.body = { success: false, err: '_id is required' })
    const data = await api.product.getProduct(_id)
    ctx.body = {
      data,
      success: true
    }
  }

  @post('/products')
  async savePorduct(ctx, next) {
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

  @put('/products')
  async putPorduct(ctx, next) {
    const { id = '', title = '', intro = '', price = '' } = ctx.request.body
    if (!id) {
      ctx.body = {
        err: '_id is required',
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
    product.title = xss(title)
    product.intro = xss(intro)
    product.price = xss(price)
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

  @del('/products')
  async delPorduct(ctx, next) {
    const { params } = ctx
    const { _id } = params
    if (!_id) return (ctx.body = { success: false, err: '_id is required' })
    const data = await api.product.delProduct(_id)
    ctx.body = {
      data,
      success: true
    }
  }
}
