<template>
  <div class="admin">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="card-inner">登录</div>
        </div>
        <div class="card-body">
          <div class="form">
            <input type="text" class="form-control" v-model="user.email" />
            <input type="password" class="form-control" v-model="user.password" />
            <button class="btn login-btn" @click="handleLogin">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'admin',
  head() {
    return {
      title: '登录'
    }
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions(['adminLogin']),
    async handleLogin() {
      const { data = {} } = await this.adminLogin(this.user)
      if (data.success) {
        this.$router.replace('/admin/product')
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/color.scss';
@import '~/assets/scss/mixin.scss';
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.admin .form-control {
  width: calc(100% - 2 * #{$gutter});
  height: 36px;
  padding: 0 $gutter;
  line-height: 36px;
  font-size: $supplement;
  margin-bottom: 0.6 * $gutter;

  color: rgba(0, 0, 0, 0.54);
  border-color: rgba(0, 0, 0, 0.12);
  border-width: 1px;
  border-radius: 2px;
  padding: 0 5px;

  &:focus,
  &:active {
    border-color: rgba(0, 0, 0, 0.22);
    outline: 0;
    box-shadow: none;
  }
}
.admin .card {
  width: 440px !important;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid$grey-300;
  box-shadow: $shadow-1db;

  .card-header {
    width: 100%;
    border-bottom: 1px solid$grey-300;

    .card-inner {
      margin: 12px 16px;
      font-size: 20px;
      line-height: 28px;
    }
  }

  .card-body {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 3 * $gutter;

    .login-icon {
      margin-bottom: 2 * $gutter;
    }

    .form {
      width: calc(100% - 4 * #{$gutter});

      .login-btn {
        background-color: $teal-300;
        color: $white;
      }
    }
  }
}
</style>
