import config from '../config'
import api from '../api'
export async function redirect(ctx, next) {
  const target = config.SITE_ROOT_URL + '/auth'
  const scope = 'snsapi_userinfo'
  const { visit = '', id = '' } = ctx.query
  const params = id ? `${visit}_${id}` : visit
  const url = api.wechat.getAuthorizeURL(scope, target, params)
  console.log(url)
  ctx.redirect(url)
}
export async function oauth(ctx, next) {
  console.log(ctx.query)
}
