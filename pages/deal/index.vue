<template>
  <div class="container">
    <div class="focus-goods-body">
      <div class="focus-goods-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="" alt="" /></div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
      <div class="focus-goods-content">
        <div class="goods-bar">
          <div class="focus-goods-name">2323</div>
          <div class="focus-goods-price">
            <span class="focus-goods-price_main">2323</span>
            <span class="ocus-goods-price_others">2323</span>
          </div>
        </div>

        <div class="focus-goods-intro">2323</div>
        <div class="focus-goods-info">
          <cell>232323</cell>
        </div>
        <div class="focus-goods-attentions">
          <div class="title">购买提示</div>
          <ol>
            <li>223</li>
          </ol>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
      </van-goods-action>
      <!-- <transition name="slide-top">
        <div class="focus-goods-pay">
          <div class="focus-goods-pay_header">
            <span>购买周边</span>
            <span>取消</span>
          </div>
          <div class="focus-goods-pay_body">
            <div class="focus-goods-pay_item">
              <img src="" alt="" />
              <div>
                <p>2323</p>
                <p>2323</p>
              </div>
            </div>
            <div class="focus-goods-pay_item">
              <span>收件人</span>
              <input type="text" />
            </div>
            <div class="focus-goods-pay_item">
              <span>你的电话</span>
              <input type="text" />
            </div>
            <div class="focus-goods-pay_item">
              <span>你的电话</span>
              <input type="text" />
            </div>
          </div>
          <div class="focus-goods-pay_footer">地址</div>
        </div>
      </transition>
      <transition name="fade">
        <span class="modal" v-if="modal.visible">33434</span>
      </transition> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Cell from '~/components/Cell'
export default {
  middleware: ['wechat-auth'],
  layout: 'noNav',
  components: { Cell },
  computed: {
    ...mapState(['focusProduct'])
  },
  methods: {
    ...mapActions(['fetchFocusProduct']),
    onClickButton() {
      this.$router.push({ path: 'deal/buy', query: { id: this.$route.query.id } })
    }
  },
  created() {
    const { id } = this.$route.query
    this.fetchFocusProduct(id)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/deal.scss';
</style>
