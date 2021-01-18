import sha1 from 'sha1'
import getRawBody from 'raw-body'
import { parseXML, formatMessage, tpl } from './util'
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
      const data = await getRawBody(ctx.req, {
        length: ctx.request.header['content-length'],
        limit: '1mb'
      })
      const content = await parseXML(data)
      const msg = formatMessage(content.xml)
      console.log(ctx.body)
      const xml = tpl(ctx.body, msg)
      // console.log(await parseXML(data))
      // console.log('post===', opts, reply)
      ctx.set('Content-type', 'application/xml')
      ctx.body = xml
    }
  }
}
