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
import vHeader from '~/components/header.vue'
import vAside from '~/components/aside.vue'
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
