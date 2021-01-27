export default {
  button: [
    {
      name: '菜单1',
      sub_button: [
        {
          type: 'scancode_waitmsg',
          name: '扫码带提示',
          key: 'rselfmenu_0_0'
        },
        {
          type: 'scancode_push',
          name: '扫码推事件',
          key: 'rselfmenu_0_1'
        }
      ]
    },
    {
      name: '菜单2',
      sub_button: [
        {
          type: 'pic_sysphoto',
          name: '系统拍照发图',
          key: 'pic_sysphoto'
        },
        {
          type: 'pic_photo_or_album',
          name: '拍照或者相册发图',
          key: 'pic_photo_or_album'
        },
        {
          type: 'pic_weixin',
          name: '微信相册发图',
          key: 'pic_weixin'
        }
        // {
        //   type: 'media_id',
        //   name: '素材库图片',
        //   media_id: 'MEDIA_ID1',
        //   key: 'media_id'
        // }
      ]
    },
    {
      name: '菜单3',
      sub_button: [
        {
          type: 'view',
          name: '搜索',
          url: 'http://www.soso.com/',
          key: 'view'
        },
        {
          name: '发送位置',
          type: 'location_select',
          key: 'location_select'
        },
        // {
        //   type: 'miniprogram',
        //   name: 'wxa',
        //   url: 'http://mp.weixin.qq.com',
        //   appid: 'wx40f7cefe7260b34a',
        //   pagepath: 'pages/index/index'
        // },
        {
          type: 'click',
          name: '赞一下我们',
          key: 'V1001_GOOD'
        }
        // {
        //   type: 'view_limited',
        //   name: '图文消息',
        //   media_id: 'MEDIA_ID2',
        //   key: 'view_limited'
        // }
      ]
    }
  ]
}
