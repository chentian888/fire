import xml2js from 'xml2js'
import _ from 'lodash'
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
}
