<template>
  <div class="container">
    <router-link class="link" :class="{active:footer==1}" :to="'/index?headMsg='+headMsg">
      <span class="iconfont icon-Shop"></span>
      <span>商城</span>
    </router-link>
    <router-link class="link" :class="{active:footer==2}" to="/search">
      <span class="iconfont icon-custom-search"></span>
      <span>搜索</span>
    </router-link>
    <router-link class="link" :class="{active:footer==3}" to="/order">
      <span class="iconfont icon-ordersearch"></span>
      <span>订单</span>
    </router-link>
    <router-link class="link" :class="{active:footer==4}" to="/user">
      <span class="iconfont icon-user-msg"></span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';

export default {
  props: ['msg', 'left', 'right', 'footer'],
  data () {
    return {
      
    }
  }, 
  computed: mapState(['headMsg']),
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import '../../static/style/variable';
  .container{
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.2rem;
    font-size: 10px;
    display: flex;
    line-height: 1.2rem;
    background-color: white;
    color: #333;
    justify-content: space-around;
    box-shadow: 0 0 3px #ccc;
    &>.link{
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &>span{
        line-height: 14px;
      }
      &:hover, &:active, &.active{
        color: $mainBgColor*1.1;
      }
    }
  }
</style>