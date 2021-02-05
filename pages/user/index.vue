<template>
  <div class="container">
    <div class="user-box">
      <div class="user-header">
        <div class="avatar"></div>
        <div class="base-info">
          <div class="name">232323</div>
        </div>
      </div>
      <div class="user-body">
        <van-cell-group>
          <van-cell title="手机号" value="18827032021" />
          <van-cell title="地址" value="收货地址" />
        </van-cell-group>
        <div class="shop-car">
          <div class="car-title">我的订单</div>
          <div class="goods-list">
            <GoodsItem v-for="(item, index) in list" :key="index"></GoodsItem>
          </div>
        </div>
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
.user-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #eee;
    margin-right: 10px;
  }
  .base-info {
    .name {
      font-size: 16px;
    }
  }
}
.shop-car {
  .car-title {
    padding: 0 10px;
    font-size: 14px;
  }
  .goods-list{
    padding: 0 5px;
  }
}
</style>
