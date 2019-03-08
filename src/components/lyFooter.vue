<template>
  <div class="container">
    <router-link class="link" :to="'/index?headMsg='+headMsg">
      <span>icon</span>
      <span>index</span>
    </router-link>
    <router-link class="link" to="/search">
      <span>icon1</span>
      <span>search</span>
    </router-link>
    <router-link class="link" to="/order">
      <span>icon2</span>
      <span>order</span>
    </router-link>
    <router-link class="link" to="/user">
      <span>icon3</span>
      <span>user</span>
    </router-link>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex';

export default {
  props: ['msg', 'left', 'right'],
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
      &:hover, &:active{
        color: $mainBgColor*1.1;
      }
    }
  }
</style>