<template>
  <div id="app">
    <v-header></v-header>
    <div id="container">
      <v-aside></v-aside>
      <nuxt></nuxt>
    </div>
  </div>
</template>
<script>
import vHeader from '~/components/Header.vue'
import vAside from '~/components/Aside.vue'
export default {
  components: {
    vHeader,
    vAside
  },
  data: () => {
    return {
      active: 0
    }
  }
}
</script>
<style lang="scss">
#container {
  display: flex;
}
</style>
