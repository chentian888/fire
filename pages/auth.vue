<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  head() {
    return ''
  },
  created() {
    this.getOauth()
  },
  methods: {
    ...mapActions(['getWechatOAuth']),
    async getOauth() {
      const { code, state } = this.$route.query
      console.log(code, state)
      //   const url = window.location.href
      await this.getWechatOAuth({ code, state })
      const arr = state.split('_')
      console.log(arr)
      if (arr.length > 1) {
        this.$router.push({ path: arr[0], query: { id: arr[1] } })
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
