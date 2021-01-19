export const tip = '我的卡丽熙，欢迎来到河间地\n' + '点击 <a href="http://coding.imooc.com">一起搞事情吧</a>'

export default async function(content) {
  const result = {}
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
    result = { type: 'text', mediaId: message.MediaId }
  } else if (content.MsgType === 'image') {
    result = { type: 'image', mediaId: message.MediaId }
  } else if (content.MsgType === 'voice') {
    result = { type: 'voice', mediaId: message.MediaId }
  } else if (content.MsgType === 'video') {
    const { MediaId, Title, Description } = content
    result = { type: 'video', mediaId: MediaId, title: Title, description: Description }
  } else if (content.MsgType === 'location') {
    const { Location_X, Location_Y, Label } = content
    result = Location_X + ':' + Location_Y + ':' + Label
  } else if (content.MsgType === 'link') {
    const { Title, Description, Url } = content
    result = {
      type: 'text',
      title: Title,
      description: Description,
      picUrl:
        'http://mmbiz.qpic.cn/mmbiz_jpg/aVQq6icrk8ibbumCTY3xV6Yiarq9yojibMbibkP3yBZ4IYGfVSEwJZlnkEnZmxG29g2guHxrJfuT2KG7siabnP8U0pOA/0',
      url: Url
    }
  }

  return result
}
