export default async function(content) {
  let result = {}
  const { getWeChatClient } = require('../wechat')
  const client = getWeChatClient()
  // await client.fetchAccessToken()

  if (content.MsgType === 'event') {
    //   推送事件
    if (content.event === 'subscribe') {
    } else if (content.event === 'unsubscribe') {
    } else if (content.event === 'SCAN') {
    } else if (content.event === 'LOCATION') {
    } else if (content.event === 'CLICK') {
    } else if (content.event === 'VIEW') {
    }
  } else if (content.MsgType === 'text') {
    result = content.Content
  } else if (content.MsgType === 'image') {
    result = { type: 'image', mediaId: content.MediaId }
  } else if (content.MsgType === 'voice') {
    result = { type: 'voice', mediaId: content.MediaId }
  } else if (content.MsgType === 'video') {
    const { MediaId, Title, Description } = content
    result = { type: 'video', mediaId: MediaId, title: Title, description: Description }
  } else if (content.MsgType === 'location') {
    const { Location_X, Location_Y, Label } = content
    result = Location_X + ':' + Location_Y + ':' + Label
  } else if (content.MsgType === 'link') {
    const { Title, Description, Url } = content
    result = [
      {
        title: Title,
        description: Description,
        picUrl:
          'http://mmbiz.qpic.cn/mmbiz_jpg/aVQq6icrk8ibbumCTY3xV6Yiarq9yojibMbibkP3yBZ4IYGfVSEwJZlnkEnZmxG29g2guHxrJfuT2KG7siabnP8U0pOA/0',
        url: Url
      }
    ]
  }

  return result
}
