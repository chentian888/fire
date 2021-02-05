<template>
  <div id="app">
    <div id="main">
      <Nuxt />
      <van-tabbar :fixed="false" route>
        <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="gem" to="/shopping">商城</van-tabbar-item>
        <van-tabbar-item icon="manager" to="/user">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      active: 0
    }
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
}
#main {
  padding-bottom: 50px;
  position: relative;
  height: 100%;
  .van-tabbar {
    position: absolute;
    bottom: 0;
  }
  .container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>