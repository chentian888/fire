// import config from '../config'
import api from '../api'
export async function adminLogin(ctx, next) {
  const { email = '', password = '' } = ctx.request.body
  const data = await api.admin.login(email, password)
  const { match, user } = data
  if (match) {
    if (user.role !== 'admin') {
      return (ctx.body = {
        err: '暂无权限登录',
        success: false
      })
    }

    ctx.session.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl
    }

    return (ctx.body = {
      data: {
        email: user.email,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl
      },
      success: true
    })
  }
  return (ctx.body = {
    err: '账号或密码错误',
    success: false
  })
}
