<template>
  <div class="container">
    <div class="character-header">
      <img src="" alt="" />
      <div class="media">
        <img src="" alt="" />
        <div class="desc">
          <div class="names">
            <div class="cname">提利昂·兰尼斯特</div>
            <div class="name">Tyrion Lannister</div>
          </div>
        </div>
      </div>
    </div>
    <div class="character-body">
      <div class="intro">
        <p>
          提利昂·兰尼斯特（Tyrion
          Lannister）是泰温公爵和乔安娜夫人的第三个也是最小的孩子。因为是个侏儒，他有时候被戏称为小恶魔和半人。他利用自己的智慧屡次化险为夷，帮助兰尼斯特家族赢得了五王之战，但命运的不公使得他成为了一个弑亲者和通缉犯，踏上了流亡之路。
        </p>
        <p>提利昂是书中一个非常重要的POV人物。在电视剧中，由皮特·丁拉基扮演。</p>
      </div>
      <div class="stills">
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div class="items">
        <div class="title">性格和外貌</div>
        <div class="body">
          提利昂作为劳勃国王王家队伍的一员来到了北境的临冬城。在布兰·史塔克从城墙跌落之后，提利昂要乔佛里向布兰的父母表示关切，为了让乔佛里顺从这一命令，提利昂狠狠地扇了他好几巴掌。由于一直怀疑这场事故的原因，提利昂注意到他的哥哥和姐姐对于布兰有可能生还的消息表现得不太自然。
        </div>
      </div>
      <div class="items">
        <div class="title">历史</div>
        <div class="body">
          提利昂作为劳勃国王王家队伍的一员来到了北境的临冬城。在布兰·史塔克从城墙跌落之后，提利昂要乔佛里向布兰的父母表示关切，为了让乔佛里顺从这一命令，提利昂狠狠地扇了他好几巴掌。由于一直怀疑这场事故的原因，提利昂注意到他的哥哥和姐姐对于布兰有可能生还的消息表现得不太自然。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
