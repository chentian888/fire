<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  head() {
    return ''
  },
  created() {},
  methods: {
    ...mapActions(['getWechatOAuth']),
    getOauth() {
      const url = window.location.href
      this.getWechatOAuth(url)
    }
  }
}
</script>
