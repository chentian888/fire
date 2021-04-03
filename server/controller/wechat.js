import config from '../config'
import api from '../api'
export async function redirect(ctx, next) {
  const target = config.SITE_ROOT_URL + '/auth'
  const scope = 'snsapi_userinfo'
  const { visit = '', id = '' } = ctx.query
  const params = id ? `${visit}_${id}` : visit
  const url = api.wechat.getAuthorizeURL(scope, target, params)
  ctx.redirect(url)
}
export async function oauth(ctx, next) {
  const { code, state } = ctx.query
  const user = await api.wechat.getUserByCode(code)
  ctx.session.user = user
  ctx.body = {
    success: true,
    data: user
  }
}

export async function signature(ctx, next) {
  let url = ctx.query
  if (!url) ctx.throw(404)
  url = decodeURIComponent(url)
  const params = await api.wechat.getSignatureAsync(url)
  ctx.body = {
    success: true,
    params: params
  }
}
