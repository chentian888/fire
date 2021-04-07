import { controller, get, post, put, del, validate } from '../decorator/router'
import { savePorductAsync, putPorductAsync, delPorductAsync, createOrderAsync } from '../controller/product'
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
    await savePorductAsync(ctx, next)
  }

  @put('/products')
  async putPorduct(ctx, next) {
    await putPorductAsync(ctx, next)
  }

  @del('/products')
  async delPorduct(ctx, next) {
    await delPorductAsync(ctx, next)
  }

  @post('/createOrder')
  @validate({ body: ['productId', 'name', 'phoneNumber', 'address'] })
  async createOrder(ctx, next) {
    await createOrderAsync(ctx, next)
  }

  @get('/payment')
  async getPayment(ctx, next) {
    const data = await api.payment.paymentList()
    ctx.body = {
      success: true,
      data
    }
  }
}
