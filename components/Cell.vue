<template>
  <div class="cell">
    <span>{{ title }}</span>
    <span v-if="content && !iconName">{{ content }}</span>
    <i class="material-icon" v-else>{{ iconName }}</i>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
    iconName: String
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/color.scss';
@import '~/assets/scss/mixin.scss';

.cell {
  width: 100%;
  font-size: 0;

  > * {
    vertical-align: middle;
    display: inline-block;
  }

  span {
    width: 50%;
    text-align: left;
    @include font-dpr(15px);
  }

  .material-icon {
    width: 50%;
    text-align: right;
    @include font-dpr(33px);
    color: $grey-800;
  }
}
</style>
