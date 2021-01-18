// import pug from 'pug'
const pug = require('pug');
let tpl = `
<xml>
    <ToUserName><![CDATA[#{toUser}]]></ToUserName>
    <FromUserName><![CDATA[#{fromUser}]]></FromUserName>
    <CreateTime>12345678</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    
    if msgType==='text'
    <Content><![CDATA[你好]]></Content>

    if msgType==='image'
    <Image>
        <MediaId><![CDATA[media_id]]></MediaId>
    </Image>

    if msgType==='voice'
    <Voice>
        <MediaId><![CDATA[media_id]]></MediaId>
    </Voice>

    if msgType==='video'
    <Video>
        <MediaId><![CDATA[media_id]]></MediaId>
        <Title><![CDATA[title]]></Title>
        <Description><![CDATA[description]]></Description>
    </Video>

    if msgType==='music'
    <Music>
        <Title><![CDATA[TITLE]]></Title>
        <Description><![CDATA[DESCRIPTION]]></Description>
        <MusicUrl><![CDATA[MUSIC_Url]]></MusicUrl>
        <HQMusicUrl><![CDATA[HQ_MUSIC_Url]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[media_id]]></ThumbMediaId>
    </Music>

    if msgType==='news'
    <ArticleCount>1</ArticleCount>
    <Articles>
        <item>
            <Title><![CDATA[title1]]></Title>
            <Description><![CDATA[description1]]></Description>
            <PicUrl><![CDATA[picurl]]></PicUrl>
            <Url><![CDATA[url]]></Url>
        </item>
    </Articles>
</xml>
`

// const compileXml = pug.compile(tpl, { doctype: 'xml' })

// export default compileXml
console.log(
  pug.compile(tpl, { doctype: 'xml' })({
    msgType: 'text',
    toUser: 'a',
    fromUser: 'b'
  })
)
