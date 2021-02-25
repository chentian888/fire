<template>
  <div class="container">
    <div class="house">
      <div class="items" v-for="(item, index) in list" :key="index">
        <div class="desc">
          <div class="words">Winter is Coming</div>
          <div class="name">House Stark of Winterfell</div>
          <div class="cname">史塔克家族</div>
        </div>
        <div class="house-flag"><img src="" alt="" /></div>
      </div>
    </div>
    <div class="character">
      <div class="title">主要人物</div>
      <div class="section">
        <div class="items" v-for="(item, index) in list" :key="index">
          <img class="thumb" src="" />
          <div class="desc">
            <div class="name">Tyrion Lannister</div>
            <div class="cname">提利昂·兰尼斯特</div>
            <div class="playedBy">Peter Dinklage</div>
          </div>
        </div>
      </div>
    </div>
    <div class="city">
      <div class="city-title">维斯特洛</div>
      <div class="intro">
        坐落于已知世界的最西端，狭长的维斯特洛大陆由北部的极地冰盖起向南延绵约 3,000 英里。绝境长城是一座巍峨挺立的不可逾越之物，横跨 300
        英里，将最北的塞外地区与七大王国相互分离。一个统一的政治实体领导着南方的广阔土地，并形成九块相互联系又相互割据的区域。
      </div>
      <div class="items">
        <div class="title">北境</div>
        <div class="body">北境是颈泽以北的地带，临冬城的史塔克家族作为北境之王和伊耿征服后的北境守护已统治了数千年之久。</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: [1, 2, 3, 4]
    }
  },
  computed: {
    ...mapState(['houses'])
  },
  created() {
    console.log(this)
    // this.$store.dispatch('fetchHouses')
    // this.$store.dispatch('fetchCharacters')
  }
}
</script>

<style lang="scss">
.house {
  margin-left: 10px;
  padding-bottom: 15px;
  overflow-x: scroll;
  white-space: nowrap;
  .items {
    width: 90%;
    margin-left: 5px;
    display: inline-block;
    .desc {
      color: #616161;
      padding: 10px 0;
      .words {
        font-size: 14px;
      }
      .name {
        color: #000;
        font-size: 18px;
      }
      .cname {
        font-size: 16px;
      }
    }
    .house-flag {
      height: 200px;
      background: #eee;
    }
  }
}
.character {
  padding: 0 10px;
  margin: 20px 0;
  .title {
    border-top: 1px solid #bdbdbd;
    font-size: 18px;
    padding: 10px 0;
  }
  .section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .items {
      width: 50%;
      > img {
        max-width: 100%;
        height: 200px;
      }
      .desc {
        font-size: 14px;
        color: #757575;
        .name {
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
        .cname {
        }
        .playedBy {
        }
      }
    }
  }
}
.city {
  padding: 0 10px;
  .city-title {
    border-top: 1px solid #bdbdbd;
    font-size: 18px;
    padding: 10px 0;
  }
  .intro {
    font-size: 14px;
    color: #424242;
  }
  .items {
    color: #616161;
    font-size: 14px;
    margin-top: 15px;
  }
}
</style>
