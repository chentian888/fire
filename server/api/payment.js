import Payment from '../schema/payment'
export async function createOrder(data) {
  const order = new Payment({ ...data })
  await order.save()
  return order
}

export async function paymentList() {
  const list = await Payment.find({})
    .populate('user')
    .populate('product')
    .exec()
  return list
}
