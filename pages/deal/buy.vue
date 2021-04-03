<template>
  <div class="container">
    <van-contact-card type="add" add-text="添加新地址" @click="onAdd" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      add-button-text="确认支付"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import wx from 'weixin-js-sdk'
import Cell from '~/components/Cell'
import wechat from '~/mixin/wechat'
export default {
  middleware: ['wechat-auth'],
  mixins: [wechat],
  layout: 'noNav',
  components: { Cell },
  computed: {
    ...mapState(['focusProduct'])
  },
  data() {
    return {
      productId: '',
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchFocusProduct', 'createOrder']),
    onAdd() {
      const info = this.list.find(ele => ele.id === this.chosenAddressId)
      const { name = '', address = '', tel = '' } = info
      if (!name || !address || !tel) {
        this.$toast('请选择地址')
        return
      }
      const res = this.createOrder({ productId: this.productId, name, address, phoneNumber: tel })
      if (res.order) throw new Error('error')
      console.log('唤起微信支付！参数:',res)
      // wx.chooseWXPay({
      //   timestamp: res.order.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //   nonceStr: res.order.nonceStr, // 支付签名随机串，不长于 32 位
      //   package: res.order.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //   signType: res.order.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //   paySign: res.order.paySign, // 支付签名
      //   success: function(res) {
      //     if (res.err_msg == 'get_brand_wcpay_request:ok') {
      //       this.$toast('支付成功')
      //     } else {
      //       this.$toast(res.err_msg)
      //     }
      //   }
      // })
    },
    onEdit(item, index) {}
  },
  created() {
    const { id } = this.$route.query
    this.productId = id
    this.fetchFocusProduct(id)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/deal.scss';
</style>
