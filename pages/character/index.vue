<template>
  <div class="container">
    <div class="character-header">
      <img :src="character.profile" alt="" />
      <div class="media">
        <img src="" alt="" />
        <div class="desc">
          <div class="names">
            <div class="cname">{{ character.cname }}</div>
            <div class="name">{{ character.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="character-body">
      <div class="intro">
        <p v-for="(item, index) in character.intro" :key="index">
          {{ item }}
        </p>
      </div>
      <div class="stills">
        <img v-for="(img, index) in character.images" :key="index" :src="img" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div class="items" v-for="(section, index) in character.sections" :key="index">
        <div class="title">{{ section.title }}</div>
        <div class="body">
          <p v-for="(item, index) in section.content" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['character'])
  },
  methods: {
    ...mapActions(['fetchCharacter'])
  },
  beforeCreate() {
    const { id } = this.$route.query
    this.$store.dispatch('fetchCharacter', { id })
  }
}
</script>
<style lang="scss">
.character-header {
  background: #eee;
  padding-top: 60px;
  .media {
    height: 200px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    > img {
      width: 120px;
      height: 180px;
      margin-right: 10px;
    }
    .cname {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.character-body {
  color: #757575;
  font-size: 14px;
  padding: 10px;
  .items {
    margin-top: 20px;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 1px solid #bdbdbd;
    }
  }
}
.stills {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  padding: 10px 0;
  overflow-x: auto;
  > img {
    width: 150px;
    height: 150px;
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
