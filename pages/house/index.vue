<template>
  <div class="container">
    <div class="house-media">
      <img src="" />
      <div class="desc">
        <div class="words">Winter is Coming</div>
        <div class="name">House Stark of Winterfell</div>
      </div>
    </div>
    <div class="house-body">
      <div class="title">史塔克家族</div>
      <div class="body">
        临冬城的史塔克家族（House Stark of
        Winterfell），是七大王国中势力最强大的“守护家族”之一，也是北境最重要的家族，手下封臣众多。家族族堡为临冬城。其族徽是白色雪原上银灰色的一只冰原奔狼。家族箴言为“凛冬将至”。书中数个重要视点人物都来自于这个家族。,史塔克家族有多支分支，比较着名的有卡史塔克家族和灰史塔克家族，另外在白港及荒冢屯还有一些史塔克家的分支。长脸，身材修长，黑褐发及灰眸是许多史塔克家族成员的外貌特徵，有时候“奔狼之血”这个词语会被用来形容一些史塔克家族成员的奔放狂野的性格。
      </div>
      <div class="title">主要角色</div>
      <div class="body">
        <div class="members">
          <img src="" alt="" />
          <div class="desc">
            <div class="cname">凯特琳·徒利</div>
            <div class="intro">他的妻子。死于红色婚礼。</div>
          </div>
        </div>
      </div>
      <div class="house-history">
        <div class="title">征服战争前</div>
        <div class="content">
          史塔克是个古老的家族，其历史可追溯到数千年前英雄纪元的传奇人物——“筑城者”布兰登，他是临冬城的筑造者与奠基人，据说他是“青手”加尔斯之子Brandon
          of the Bloody
          Blade的后代。史塔克家族的血脉直接传承自先民，依旧遵循古老的传统，信奉森林里的旧神。自“筑城者”布兰登始，史塔克家族一直是冬境之王（直至近代才改称为“北境之王”）。在数千年间他们慢慢发展起来，打败及兼并了周围的小王，不少古老的血脉和贵族都被他们灭绝或驱逐。自从传说中的筑城者布兰登建造了长城以来，史塔克家族一直是守夜人的坚定盟友，并且协助守护了长城数千年。有时候史塔克家族要应付野心勃勃的守夜人背誓者。当第十三任守夜人总司令——夜王（在诸多猜想中，有一种说法认为他是一个史塔克）将长城据为己有时，史塔克家族和塞外之王乔曼一起联合推翻。但大多是时候史塔克们和塞外之王是敌对关系。在历史上，他们和自己的封臣安柏家族一起击败过著名的塞外之王詹德尔和戈尼，也曾经衍生过塞外之王贝尔从临冬城偷走女儿的浪漫传说。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
