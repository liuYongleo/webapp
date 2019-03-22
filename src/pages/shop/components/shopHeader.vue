<template>
    <header>
      <span @click="hide" class="active left">&lt; 返回</span>
      <h1>{{title}}</h1>
    </header>
</template>

<script>
export default {
  props: ['title'],
  methods: {    
      hide() {
        this.$router.go(-1);
      }, 
  },
}
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
    header {
      position: absolute;
      z-index: 4;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.2rem;
      line-height: 1.2rem;
      background-color: $mainBgColor;
      color: $mainColor;
      span {
        position: absolute;
        top: 0;
        padding: 0 12px;
        font-size: 14px;
        font-weight: bold;
        transition: all .5s linear;
        &.left {
          left: 0;
        }
      }
      h1 {
        text-align: center;
        flex-grow: 1;
        font-size: 22px;
      }
    }
</style>
