<template>
  <div class="container">
    <span @click="goBack" v-if="left" class="active left">&lt; 返回</span>
    <h1 @click="goCity">{{msg}}</h1>
    <span class="right" v-if="right">
        <i @click="goLog">登录</i>|<i @click="goReg">注册</i>  
      </span>
  </div>
</template>

<script>
  export default {
    props: ['msg', 'left', 'right'],
    data() {
      return {
  
      }
    },
    methods: {
      goLog() {
        this.$router.push({
          path: '/login'
        });
      },
      goReg() {
        this.$router.push({
          path: '/register'
        });
      },
      goCity() {
        if (this.$route.query.headMsg) {
          this.$router.push({
            path: '/city'
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../static/style/variable';
  .container {
    position: fixed;
    z-index: 100;
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
      &.right {
        right: 0;
      }
      &.active:active {
        color: $mainBgColor*1.1;
      }
      i {
        padding: 0 4px;
      }
      & i:active {
        color: $mainBgColor*1.1;
      }
    }
    h1 {
      flex-grow: 1;
      font-size: 22px;
    }
  }
</style>