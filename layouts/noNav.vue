<template>
  <div id="app">
    <div id="main">
      <van-nav-bar title="标题" left-text="返回" left-arrow />
      <Nuxt />
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
