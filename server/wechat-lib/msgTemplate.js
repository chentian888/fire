import pug from 'pug'
// const pug = require('pug')
const text = `
xml
    ToUserName <![CDATA[#{toUser}]]>
    FromUserName <![CDATA[#{fromUser}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Content <![CDATA[你好]]>
`
const image = `
xml
    ToUserName <![CDATA[#{toUser}]]>
    FromUserName <![CDATA[#{fromUser}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Image
        MediaId <![CDATA[#{mediaId}]]>
`

const voice = `
xml
    ToUserName <![CDATA[#{toUser}]]>
    FromUserName <![CDATA[#{fromUser}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Voice
        MediaId <![CDATA[#{mediaId}]]>
`

const video = `
xml
    ToUserName <![CDATA[#{toUser}]]>
    FromUserName <![CDATA[#{fromUser}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Video
        MediaId <![CDATA[#{mediaId}]]>
        Title <![CDATA[#{title}]]>
        Description <![CDATA[#{description}]]>
`
const music = `
xml
    ToUserName <![CDATA[#{toUser}]]>
    FromUserName <![CDATA[#{fromUser}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    Music
        Title <![CDATA[#{title}]]>
        Description <![CDATA[#{description}]]>
        MusicUrl <![CDATA[#{musicUrl}]]>
        HQMusicUrl <![CDATA[#{hqMusicUrl}]]>
        ThumbMediaId <![CDATA[#{mediaId}]]>
`
const news = `
xml
    ToUserName <![CDATA[#{toUser}]]>
    FromUserName <![CDATA[#{fromUser}]]>
    CreateTime #{createTime}
    MsgType <![CDATA[#{msgType}]]>
    ArticleCount #{articleCount}
    Articles
        - for (var x = 0; x < 3; x++)
            item
                Title <![CDATA[#{x}]]>
                Description <![CDATA[#{x}]]>
                PicUrl <![CDATA[#{x}]]>
                Url <![CDATA[#{x}]]>
`
// const compileXml = pug.compile(tpl, { doctype: 'xml' })
export default compileTpl = data => {
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
  compileXml(data)
}

// compileTpl({
//   msgType: 'news',
//   toUser: 'a',
//   fromUser: 'b',
//   createTime: Date.now()
// })
