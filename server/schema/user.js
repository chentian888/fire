import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    nicname: String,
    sex: String,
    password: String,
    email: String,
    headimgurl: String,
    avatarUrl: String,
    address: String,
    province: String,
    country: String,
    city: String,
    meta: {
      createdAt: { type: Date, default: Date.now() },
      updatedAt: { type: Date, default: Date.now() }
    }
  },
  { strict: true, strictQuery: true }
)

const User = mongoose.model('User', UserSchema)

export default User
