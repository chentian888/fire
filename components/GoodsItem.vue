<template>
  <div class="goods-item" @click="goDetail">
    <div class="goods-thumb"></div>
    <div class="goods-desc">
      <div class="goods-top">
        <div class="title">{{ content.title }}</div>
        <div class="price">¥{{ content.price }}</div>
      </div>
      <div class="content">{{ content.intro }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: { type: Object, default: () => {} }
  },
  data() {
    return {}
  },
  methods: {
    goDetail() {
      this.$router.push({ name: 'deal', query: { id: this.content._id } })
    }
  }
}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
  height: 100px;
  .goods-thumb {
    width: 100px;
    height: 100px;
    background: #eee;

    margin-right: 10px;
  }
  .goods-desc {
    height: 100%;
    flex: 1;
    padding: 0 0 5px 0;
    .goods-top {
      font-size: 16px;
      padding-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        font-size: 12px;
        background: #333;
        color: #fff;
        padding: 2px 7px;
      }
    }
    .content {
      font-size: 12px;
    }
    .price {
    }
  }
}
</style>
