import User from '../schema/user'

export async function login(email, password) {
  const user = await User.findOne({ email }).exec()
  let match = false
  if (user) {
    match = await User.comparePassword(password, user.password)
  }
  return {
    match,
    user,
    success: true
  }
}

export async function logout(email, password) {
  const data = User.findOne({ email }).exec()
  return data
}
