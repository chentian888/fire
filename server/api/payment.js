import Payment from '../schema/payment'
export async function createOrder(data) {
  const order = new Payment({ ...data })
  return order
}
