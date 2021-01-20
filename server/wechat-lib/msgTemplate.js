import pug from 'pug'
// const pug = require('pug')
const text = `
xml
    ToUserName <![CDATA[#{toUserName}]]>
    FromUserName <![CDATA[#{fromUserName}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Content <![CDATA[#{content}]]>
`
const image = `
xml
    ToUserName <![CDATA[#{toUserName}]]>
    FromUserName <![CDATA[#{fromUserName}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Image
        MediaId <![CDATA[#{content.mediaId}]]>
`

const voice = `
xml
    ToUserName <![CDATA[#{toUserName}]]>
    FromUserName <![CDATA[#{fromUserName}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Voice
        MediaId <![CDATA[#{content.mediaId}]]>
`

const video = `
xml
    ToUserName <![CDATA[#{toUserName}]]>
    FromUserName <![CDATA[#{fromUserName}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Video
        MediaId <![CDATA[#{content.mediaId}]]>
        Title <![CDATA[回复视频标题]]>
        Description <![CDATA[回复视频描述]]>
`
const music = `
xml
    ToUserName <![CDATA[#{toUserName}]]>
    FromUserName <![CDATA[#{fromUserName}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Music
        Title <![CDATA[#{content.title}]]>
        Description <![CDATA[#{content.description}]]>
        MusicUrl <![CDATA[#{content.musicUrl}]]>
        HQMusicUrl <![CDATA[#{content.hqMusicUrl}]]>
        ThumbMediaId <![CDATA[#{content.thumbMediaId}]]>
`
const news = `
xml
    ToUserName <![CDATA[#{toUserName}]]>
    FromUserName <![CDATA[#{fromUserName}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    ArticleCount #{content.length}
    Articles
        each item in content
            item
                Title <![CDATA[#{item.title}]]>
                Description <![CDATA[#{item.description}]]>
                PicUrl <![CDATA[#{item.picUrl}]]>
                Url <![CDATA[#{item.url}]]>
`
// const compileXml = pug.compile(tpl, { doctype: 'xml' })
const compileTpl = data => {
  let tpl = ''
  if (data.msgType === 'text') {
    tpl = text
  } else if (data.msgType === 'image') {
    tpl = image
  } else if (data.msgType === 'voice') {
    tpl = voice
  } else if (data.msgType === 'video') {
    tpl = video
  } else if (data.msgType === 'music') {
    tpl = music
  } else if (data.msgType === 'news') {
    tpl = news
  }
  const compileXml = pug.compile(tpl, { doctype: 'xml' })
  //   compileXml = pug.compileFile(resolve(__dirname, './news.pug'), { doctype: 'xml' })
  return compileXml(data)
}
export default compileTpl
// compileTpl({
//   msgType: 'news',
//   toUser: 'a',
//   fromUser: 'b',
//   createTime: Date.now()
// })
