<template>
  <div class="container">
    <div class="shop-goods">
      <div class="goods-list">
        <goods-item v-for="(item, index) in products" :key="index" :content="item"></goods-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GoodsItem from '~/components/GoodsItem'
export default {
  components: { GoodsItem },
  data() {
    return {
      list: [1, 2, 3, 4]
    }
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['fetchProducts']),
  },
  created() {
    this.fetchProducts()
  }
}
</script>
<style lang="scss">
.goods-list {
  padding: 10px;
}
</style>
