<template>
  <div class="container">
    <div class="house">
      <div class="items" v-for="(item, index) in houses" :key="index" @click="$router.push({ name: 'house', query: { id: item._id } })">
        <div class="desc">
          <div class="words">{{ item.word }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="cname">{{ item.cname }}</div>
        </div>
        <div class="house-flag"><img src="" alt="" /></div>
      </div>
    </div>
    <div class="character">
      <div class="title">主要人物</div>
      <div class="section">
        <div class="items" v-for="(item, index) in characters" :key="index" @click="$router.push({ name: 'character', query: { id: item._id } })">
          <img class="thumb" src="" />
          <div class="desc">
            <div class="name">{{ item.name }}</div>
            <div class="cname">{{ item.cname }}</div>
            <div class="playedBy">{{ item.playedBy }}</div>
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
      <div class="items" v-for="(item, index) in cities" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="body">{{ item.body }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      list: [1, 2, 3, 4],
      cities: [
        {
          title: '北境',
          body: '北境是颈泽以北的地带，临冬城的史塔克家族作为北境之王和伊耿征服后的北境守护已统治了数千年之久。'
        },
        {
          title: '铁群岛',
          body: '铁群岛是位于大陆西海岸铁民湾中的一组群岛，它们分别是派克岛，大威克岛，老威克岛，哈尔洛岛，盐崖岛，黑潮岛和奥克蒙岛。'
        },
        {
          title: '河间地',
          body:
            '河间地是位于三叉戟河流域的肥沃地带。他们的统治者是奔流城的徒利家族。在远古的河流王灭绝后，河间地进入一个动荡的历史时期，其他的南方王国纷纷入侵，河间地多次易主。'
        },
        {
          title: '艾林谷',
          body:
            '谷地是一处几乎被明月山脉完全环绕的区域，他们的统治者是艾林家族，是最古老的安达尔人贵族之一，在伊耿征服之前是山岭和谷地之王。'
        },
        { title: '西境', body: '西境位于河间地以西和河湾以北，由凯岩城的兰尼斯特家族统治，他们是从前的岩地之王。' },
        {
          title: '河湾',
          body: '河湾是由高庭的提利尔家族所统治的肥沃土地。提利尔家族原本是园丁家族的总管，园丁家族是伊耿征服之前的河湾王。'
        },
        {
          title: '风暴之地',
          body: '风暴之地位于君临和多恩海之间，在东边则是被破船湾和多恩海与南方分隔开来。'
        },
        {
          title: '多恩',
          body: '多恩是维斯特洛最南部的土地，从多恩边境地的高山一直延伸到大陆的南海岸。这里是维斯特洛最炎热的国度，拥有大陆上仅有的沙漠。'
        },
        {
          title: '王领',
          body: '王领是铁王座之王的直属领地。这块区域包括君临以及周围地带的罗斯比城和暮谷城。'
        },
        {
          title: '龙石岛',
          body: '龙石岛是位于狭海中的岛屿要塞，同时管理着狭海中的一些其他岛屿如潮头岛和蟹岛，以及位于大陆上的尖角要塞。'
        }
      ]
    }
  },
  computed: {
    ...mapState(['houses', 'characters'])
  },
  created() {
    console.log(this)
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
  },
  methods: {
    ...mapActions(['fetchHouses', 'fetchCharacters'])
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
