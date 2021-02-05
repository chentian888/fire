<template>
  <div class="goods-item">
    <div class="goods-thumb"></div>
    <div class="goods-desc">
      <div class="goods-top">
        <div class="title">商品标题</div>
        <div class="price">12.3434</div>
      </div>
      <div class="content">商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容</div>
    </div>
  </div>
</template>

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
