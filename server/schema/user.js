import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const UserSchema = new Schema(
  {
    role: { type: String, default: 'user' },
    openid: [String],
    unionid: String,
    nicname: String,
    sex: String,
    email: String,
    headimgurl: String,
    avatarUrl: String,
    address: String,
    province: String,
    country: String,
    city: String,
    password: String,
    hashed_password: String,
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: Number,
    meta: {
      createdAt: { type: Date, default: Date.now() },
      updatedAt: { type: Date, default: Date.now() }
    }
  },
  { strict: true, strictQuery: true }
)
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})
UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, function(err, password) {
      if (err) return next(err)
      this.password = password
      next()
    })
  })
  next()
})

UserSchema.statics.comparePassword = function(newPassword, oldPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(newPassword, oldPassword, function(err, isMatch) {
      if (!err) resolve(isMatch)
      else reject(err)
    })
  })
}
UserSchema.statics.incLoginAttempts = function() {
  return new Promise(function(resolve, reject) {
    if (this.lockUntil && this.lockUntil < Date.now()) {
      this.update({ $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } }, function(err) {
        if (!err) resolve()
        else reject(err)
      })
    } else {
      const update = {
        $inc: { loginAttempts: 1 }
      }
      if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.lockUntil) {
        update.$set = { lockUntil: Date.now() + LOCK_TIME }
      }
      this.update(update, function(err) {
        if (!err) resolve()
        else reject(err)
      })
    }
  })
}

const User = mongoose.model('User', UserSchema)

export default User
