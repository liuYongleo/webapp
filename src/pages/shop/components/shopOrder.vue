<template>
  <transition name="slide">
    <div class="container">
      <header>
        <span @click="hide" class="active left">&lt; 返回</span>
        <h1>食品监督安全公示</h1>
      </header>
      <div>
        
      </div>
    </div>
  </transition>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  const shop = require('../../../../static/server/shop.json');
  
  export default {
    data() {
      return {
        shop
      }
    },
    methods: {
      hide() {
        this.$router.go(-1);
        // this.$emit('hide');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .container {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #eee;
    header {
      position: absolute;
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
        flex-grow: 1;
        font-size: 22px;
      }
    }
    &>div {
      box-sizing: border-box;
      height: 100%;
      overflow-y: scroll;
      div {
        background: white;
        h3 {
          padding-top: 10px;
          font-size: 18px;
          line-height: 40px;
          text-indent: 2em;
          text-align: left;
        }
        img{
          margin-bottom: 10px;
        }
      }
    }
    .activity {
      padding-top: 1.2rem;
    }
    ul {
      background: #eee;
      border-top: 10px solid #eee;
      text-align: left;
      li {
        background: #fafafa;
        padding-left: 12px;
        font-size: 12px;
        &:nth-of-type(1) {
          padding: 12px;
          font-size: 16px;
          border-bottom: 1px solid #eee;
        }
        p {
          padding-left: 8px;
          line-height: 30px;
        }
      }
    }
  }
</style>