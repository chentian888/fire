import sha1 from 'sha1'

export default function(opts, reply) {
  return async function wechatMiddle(ctx, next) {
    const { signature, timestamp, nonce, echostr } = ctx.request
    const token = opts.token
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    console.log(ctx.query)
    if (ctx.method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'Failed'
      }
      console.log('get===', opts, reply)
    } else if (ctx.method === 'POST') {
      console.log('post===', opts, reply)
    }
  }
}
