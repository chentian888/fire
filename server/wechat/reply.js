import { resolve } from 'path'
import menu from './menu'
import { getWeChatClient } from '../wechat'
export default async function(message) {
  let result = {}
  const client = getWeChatClient()
  // await client.fetchAccessToken()

  if (message.MsgType === 'event') {
    //   推送事件
    if (message.Event === 'subscribe') {
      result = '订阅成功'
    } else if (message.Event === 'unsubscribe') {
      result = '取消订阅'
    } else if (message.Event === 'CLICK') {
      // 菜单点击
      result = '点赞成功'
    } else if (message.Event === 'scancode_push') {
      // 菜单扫码
      result = message.EventKey
    } else if (message.Event === 'scancode_waitmsg') {
      result = message.EventKey
    } else if (message.Event === 'view_miniprogram') {
      // 菜单跳转小程序
    }
  } else if (message.MsgType === 'text') {
    if (message.Content === '1111') {
      await client.handle('createMenu', menu)
      await client.handle('getMenu')
    } else if (message.Content === '2222') {
      await client.handle('uploadMaterial', 'image', resolve(__dirname, '../wechat-lib/ice.jpeg'))
      // await client.handle('fetchMaterial', 'jpqAb3JmKMSWHPpL3fr2yDM9oK1JrsLv2BokouzGJNqVt5oWBqmdBmONpwpb4HDY')
    }
    result = message.Content
  } else if (message.MsgType === 'image') {
    result = { type: 'image', mediaId: message.MediaId }
  } else if (message.MsgType === 'voice') {
    result = { type: 'voice', mediaId: message.MediaId }
  } else if (message.MsgType === 'video') {
    const { MediaId, Title, Description } = message
    result = { type: 'video', mediaId: MediaId, title: Title, description: Description }
  } else if (message.MsgType === 'location') {
    const { Location_X, Location_Y, Label } = message
    result = Location_X + ':' + Location_Y + ':' + Label
  } else if (message.MsgType === 'link') {
    const { Title, Description, Url } = message
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
