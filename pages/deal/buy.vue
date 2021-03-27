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
import Cell from '~/components/Cell'
export default {
  // middleware: ['wechat-auth'],
  layout: 'noNav',
  components: { Cell },
  computed: {
    ...mapState(['focusProduct'])
  },
  data() {
    return {
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
    ...mapActions(['fetchFocusProduct']),
    onAdd() {},
    onEdit(item, index) {}
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
