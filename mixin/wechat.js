import wx from 'weixin-js-sdk'
export default {
  method: {
    wechatConfig(shareOpts, url) {
      const res = this.$store.dispatch('getWechatSignature', url)
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.sign, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'previewImage', 'chooseWXPay'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function() {
        this.wechatSetMenu()
        this.wechatShare(shareOpts)
      })
    },
    wechatSetMenu() {
      wx.hideAllNonBaseMenuItem() // 隐藏所有非基础按钮
      wx.showMenuItems({
        // 要显示的菜单项
        menuList: ['menuItem:favorite', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:profile']
      })
    },
    wechatShare(shareOpts) {
      const { title = '', desc = '', link = '', imgUrl = '', success = '' } = shareOpts
      wx.updateAppMessageShareData({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: success || (() => {})
      })
      wx.updateTimelineShareData({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: success || (() => {})
      })
    }
  }
}
