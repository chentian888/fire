<template>
  <div class="container">
    <div class="shop-goods">
      <div class="goods-list">
        <GoodsItem v-for="(item, index) in list" :key="index"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '~/components/GoodsItem'
export default {
  components: { GoodsItem },
  data() {
    return {
      list: [1, 2, 3, 4]
    }
  }
}
</script>
<style lang="scss">
.goods-list {
  padding: 10px;
}
</style>
