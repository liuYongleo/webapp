<template>
  <div id="app">
    <transition name="none">
      <ly-header 
      v-show="headShow" 
      :msg='headMsg' 
      :left='headLeft' 
      :right='headRight'
      :rtitle='rTitle'
      >
      </ly-header>
    </transition>
    
    <transition name="fade" mode="out-in">
      <router-view id="container" :class="{headPadding:headShow,footPadding:footShow}"/>
    </transition>
  
    <transition name="none">
      <ly-footer v-show="footShow" :footer="footerKey">
      </ly-footer>
    </transition>
  </div>
</template>

<script>
  const hfCfg = require('../static/cfg.json');
  
  import lyHeader from '@/components/lyHeader'
  import lyFooter from '@/components/lyFooter'
  import './assets/font/iconfont.css'

  export default {
    name: 'App',
    data: function() {
      return {
        
      }
    },
    components: {
      lyHeader,
      lyFooter
    },
    mounted: function() {

    },
    methods: {
      
    },
    computed: {
      headShow (){
        return hfCfg.head[this.$route.path] ? true : false;
      },
      headMsg (){
        let title = this.$route.query.title,
            headMsg = this.$route.query.headMsg,
            path = hfCfg.head[this.$route.path];
        return title ? title : headMsg ? headMsg : path ? path['msg'] : '';     
      },
      headLeft (){
        if(hfCfg.head[this.$route.path]){
          return hfCfg.head[this.$route.path]['left'];
        }else{
          return false;
        } 
      },
      headRight (){
        if(hfCfg.head[this.$route.path]){
          return hfCfg.head[this.$route.path]['right'];
        }else{
          return false;
        } 
      },
      rTitle (){
        if(this.$route.query.rTitle){
          return '切换城市';
        }else{
          return false;
        } 
      },
      footShow (){
        return hfCfg.foot[this.$route.path] ? true : false;
      },
      footerKey (){
        return hfCfg.foot[this.$route.path];
      },
    }
  }
</script>

<style lang="scss">
  @import '../static/style/comm';
  @import '../static/style/test';
  html,body,#app{
    height: 100%;
    overflow: hidden;
  }
  #app {
    display: flex;
    flex-flow: column;
    #container{
      flex-grow: 1;
      overflow-y: scroll;
    }
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    .headPadding{
      padding-top: 1.2rem;
    }
    .footPadding{
      padding-bottom: 1.2rem;
    }
    // .flex {
    //   display: flex;
    //   & span {
    //     flex-grow: 1;
    //     line-height: 30px;
    //     background: #ccc;
    //   }
    // }
    .fade-enter-active, .fade-leave-active{
      transition: opacity .2s;
    }
    .fade-enter, .fade-leave-active{
      opacity: 0;
    }
    .slide-enter-active,
    .slide-leave-active {
      transition: all .3s linear;
    }
    .slide-enter,
    .slide-leave-active {
      transform: translate(30%, 0);
      opacity: 0;
    }
  }
</style>
