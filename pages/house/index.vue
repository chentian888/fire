<template>
  <div class="container">
    <div class="house-media">
      <img src="" />
      <div class="desc">
        <div class="words">{{ house.words }}</div>
        <div class="name">{{ house.name }}</div>
      </div>
    </div>
    <div class="house-body">
      <div class="title">{{ house.cname }}</div>
      <div class="body">
        {{ house.intro }}
      </div>
      <div class="title">主要角色</div>
      <div class="body">
        <div class="members" v-for="item in house.swornMembers" :key="item._id">
          <img :src="item.character.profile" alt="" />
          <div class="desc">
            <div class="cname">{{ item.character.cname }}</div>
            <div class="intro">{{ item.text }}</div>
          </div>
        </div>
      </div>
      <div class="house-history" v-for="(item, index) in house.sections" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="content">
          <p v-for="(item, index) in item.content" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  middleware: ['wechat-auth'],
  computed: {
    ...mapState(['house'])
  },
  methods: {
    ...mapActions(['fetchHouse'])
  },
  beforeCreate() {
    const { id } = this.$route.query
    this.$store.dispatch('fetchHouse', { id })
  }
}
</script>
<style lang="scss">
.house-media {
  > img {
    height: 100px;
  }
  .desc {
    font-size: 16px;
    padding: 0 10px;
    .words {
      font-size: 14px;
    }
    .name {
    }
  }
}
.house-body {
  padding: 10px;
  .title {
    font-size: 18px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #616161;
  }
  .members {
    display: flex;
    justify-content: flex-start;
    > img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
    .desc {
      .cname {
        font-size: 20px;
        font-weight: bold;
        color: #000;
        padding-bottom: 5px;
      }
    }
  }
  .body {
    color: #757575;
    font-size: 14px;
    padding: 5px 0;
  }
  .house-history {
    .content {
      padding: 5px 0;
      font-size: 14px;
    }
  }
}
</style>
