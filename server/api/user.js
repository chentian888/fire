import User from '../schema/user'
export async function getUser(openid) {
  const data = await User.findOne({ openid }).exec()
  return data
}
export async function saveUser(data) {
  const user = await new User({ ...data })
  return user
}
