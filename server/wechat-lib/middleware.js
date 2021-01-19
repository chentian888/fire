import sha1 from 'sha1'
import getRawBody from 'raw-body'
import { parseXML, formatMessage, tpl } from './util'

export default function(opts, reply) {
  return async function wechatMiddle(ctx, next) {
    const { signature, timestamp, nonce, echostr } = ctx.query
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
      console.log(sha, signature)
      if (sha !== signature) {
        ctx.body = 'Failed'
        return false
      }
      const data = await getRawBody(ctx.req, {
        length: ctx.request.header['content-length'],
        limit: '1mb'
      })

      const content = await parseXML(data)
      console.log(content)
      const msg = formatMessage(content.xml)
      console.log(ctx.body)
      const getReplyInfo = reply.call(this, [msg])
      const xml = tpl(getReplyInfo, msg)
      // console.log(await parseXML(data))
      // console.log('post===', opts, reply)
      ctx.status = 200
      ctx.set('Content-type', 'application/xml')
      ctx.body = xml
    }
  }
}
