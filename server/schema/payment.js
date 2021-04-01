import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Mixed = Schema.Types.Mixed

const PaymentSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  product: { type: ObjectId, ref: 'Product' },
  success: { type: Number, default: 0 },
  payType: { type: String, default: '0' },
  name: String,
  phoneNumber: Number,
  address: String,
  totalFee: Number,
  description: String,
  order: Mixed,
  meta: {
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
  }
})

PaymentSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

const Payment = mongoose.model('Payment', PaymentSchema)

export default Payment
