<template>
  <div class="container">
    <loading v-if="loading"></loading>
    <ul>
      <li class="need-padding">
        <span class="fl">当前定位城市：</span>
        <span class="fr light-color">定位不准时，请在城市列表中选择</span>
      </li>
      <li class="need-padding">
        <span @click="goCity" class="main-color fl">{{cityGuess.name}}</span>
        <span class="fr">&gt;</span>
      </li>
    </ul>
    <ul class="hot">
      <li class="need-padding">热门城市</li>
      <li>
        <router-link v-for="(item,key) in cityHot" :key="'hot-'+key" :to="'/city?rTitle=1&title='+item.name">
          {{item.name}}
        </router-link>
      </li>
    </ul>
    <ul>
      <li v-for="(item,key) in cityGroupArr" :key="'g-'+key">
        <div class="need-padding">
          {{key|char}}
          <span v-if="key == 0" class="light-color">(按字母排序)</span>
        </div>
        <div>
          <router-link v-for="(i,k) in item" :key="'gc'+k" :to="'/city?rTitle=1&title='+i.name">
            {{i.name}}
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const cityGroup = require('../../../static/server/city.group.json');
const cityHot = require('../../../static/server/city.hot.json');
const cityGuess = require('../../../static/server/city.guess.json');
let cityGroupArr = [],
    AASCII = 'A'.charCodeAt();
for(let i in cityGroup){
  let ascii = i.charCodeAt();
  cityGroupArr[ascii - AASCII] = cityGroup[i]; 
}

import loading from '../../components/loading';
export default {
  components: {
    loading
  },
  data (){
    return {
      cityGroupArr,
      cityHot,
      cityGuess,
      loading: true
    }
  },
  filters: {
    char (val){
      return String.fromCharCode(Number(val)+AASCII);
    }
  },
  methods: {
    goCity (){
      let city = JSON.stringify(cityGuess);
      this.$router.push({
        path: '/city',
        query: { city }
      })
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.loading = false;
      clearTimeout(this.timeout);
      this.timeout = null;
    },800)
  },
}
</script>

<style lang="scss" scoped>
  @import '../../../static/style/variable';

  $borderColor:#ddd;
  .container{
    color: #333;
    font-size: 14px;
    .main-color{
      color: $mainBgColor;
    }
    .light-color{
      color: #999;
      font-size: 12px;
    }
    ul{
      background-color: white;
      box-shadow: 0 0px 2px $borderColor;
      margin-bottom: 14px;
    }
    .need-padding{
      padding: 0 14px;
    }
    li, li>div{
      overflow: hidden;
      text-align: left;
      border-bottom: 1px solid $borderColor;
      line-height: 40px;
    }
    .fr{
      float: right;
    }
    a{
      box-sizing: border-box;
      display: inline-block;
      float: left;
      width: 25%;
      line-height: 36px;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #333;
      margin-bottom: -1px;
      &:nth-of-type(4n){
        border-right: none;
      }
    }
    .hot a{
      color: $mainBgColor;
    }
  }
</style>