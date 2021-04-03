import xml2js from 'xml2js'
import _ from 'lodash'
import sha1 from 'sha1'
import compileTpl from './msgTemplate'
export function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true }, (err, content) => {
      if (err) reject(err)
      resolve(content)
    })
  })
}
export function formatMessage(content) {
  let message = {}
  if (_.isObject(content)) {
    const keysArr = Object.keys(content)
    for (let i = 0; i < keysArr.length; i++) {
      const currentKey = keysArr[i]
      const currentVal = content[keysArr[i]]
      if (_.isArray(currentVal) && currentVal.length === 1) {
        const val = currentVal[0]
        if (_.isObject(val)) {
          message[currentKey] = formatMessage(val)
        } else {
          message[currentKey] = (val || '').trim()
        }
      } else if (_.isArray(currentVal) && currentVal.length > 1) {
        message[currentKey] = []
        currentVal.forEach(ele => {
          message[currentKey].push(ele)
        })
      }
    }
  }
  return message
}

export function tpl(content, msg) {
  let msgType = 'text'
  if (!content) {
    content = 'Empty News'
  }
  if (content && content.type) {
    msgType = content.type
  }
  if (_.isArray(content)) {
    msgType = 'news'
  }
  const info = Object.assign(
    {},
    {
      content,
      toUserName: msg.FromUserName,
      fromUserName: msg.ToUserName,
      createTime: Date.now(),
      msgType
    }
  )
  return compileTpl(info)
}
function createNonce() {
  return Math.random()
    .toString(36)
    .slice(2, 15)
}
function createTimestamp() {
  return Date.now() + ''
}
export function sign(ticket, url) {
  const signData = {
    noncestr: createNonce(),
    jsapi_ticket: ticket,
    timestamp: createTimestamp(),
    url: url
  }
  const signKeys = Object.keys(signData)
  const signStr = signKeys
    .sort()
    .map(ele => `${ele}=${signData[ele]}`)
    .join('&')

  signData.sign = sha1(signStr)
  return signData
}
