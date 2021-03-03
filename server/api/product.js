import Porduct from '../schema/product'

// 商品列表
export async function getProducts(limit = 50) {
  const data = await Porduct.find({})
    .limit(Number(limit))
    .exec()
  return data
}

// 商品详情
export async function getProduct(id) {
  const data = await Porduct.findOne({ _id: id }).exec()
  return data
}

// 保存商品
export async function saveProduct(data) {
  const product = new Porduct(data)
  product.save()
  return product
}

// 更新商品
export async function putProduct(product) {
  const data = await product.save()
  return data
}

// 删除商品
export async function delProduct(porduct) {
  try {
    await porduct.remove()
  } catch (e) {}
  return true
}
