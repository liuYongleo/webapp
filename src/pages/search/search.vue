<template>
  <div class="container">
    <div>
      <p class="input-container">
        <input id="search" type="text" v-model="search" placeholder="输入学校、商务、地址">
        <span v-if="clear" @click="clearSearch">X</span>
      </p>
      <button @click="submit">提交</button>
    </div>
    <h3 v-show="beforeSearch">搜索历史</h3>
    <ul v-if="beforeSearch">
      <li v-for="(item,key) in recordList" :key="'r-'+key" @click="goAddress(item)">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
      <p v-if="searchList.length" @click="clearRecord">清空所有</p>
      <p v-else>暂无记录</p>
    </ul>
    <ul v-else>
      <li v-for="(item,key) in searchList" :key="key" @click="selectAddress(item)">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
      <p v-if="!searchList.length">抱歉！无搜索结果</p>
    </ul>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

  export default {
    data() {
      return {
        search: '',
        clear: false,
        searchList: [],
        recordList: [],
        beforeSearch: true
      }
    },
    methods: {
      ...mapMutations(['setHeadMsg']),
      clearSearch() {
        this.search = '';
        document.getElementById('search').focus();
      },
      clearRecord() {
        let arr = this.recordList;
        arr.splice(0, arr.length);
        localStorage.clear();
      },
      submit() {
        this.beforeSearch = false;
  
        this.searchList = [{
          name: this.search + '1',
          address: '深圳北站西广场1157号喜乐乐快餐店'
        }, {
          name: this.search + '2',
          address: '深圳北站西广场1158号喜乐乐快餐店'
        }, {
          name: this.search + '3',
          address: '深圳北站西广场1159号喜乐乐快餐店'
        }, {
          name: this.search + '4',
          address: '深圳北站西广场1160号喜乐乐快餐店'
        }]
      },
      selectAddress(item) {
        let str = localStorage.getItem('address'),
          arr = str ? JSON.parse(str) : [];
        arr.push(item);
        localStorage.setItem('address', JSON.stringify(arr));
        this.goAddress(item);
      },
      goAddress(item) {
        this.setHeadMsg(item.name);
        this.$router.push({
          path: '/index',
          query: {
            headMsg: item.name
          }
        });
      }
    },
    watch: {
      search(newVal, oldVal) {
        if (newVal.length) {
          this.clear = true;
        } else {
          this.clear = false;
        }
      }
    },
    created() {
      let str = localStorage.getItem('address');
      this.recordList = str ? JSON.parse(str) : [];
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../static/style/variable';
  .container {
    div {
      padding: 10px 18px;
      .input-container {
        position: relative;
        span {
          position: absolute;
          right: 10px;
          top: 6px;
          line-height: 36px;
          color: $mainBgColor;
        }
      }
    }
    div,
    ul {
      background: white;
      &>p {
        line-height: 40px;
        color: #666;
      }
      li {
        padding: 8px 18px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        h4 {
          font-size: 16px;
          line-height: 30px;
        }
        p {
          font-size: 12px;
          line-height: 20px;
          color: #999;
        }
      }
    }
    h3 {
      text-align: left;
      line-height: 40px;
      padding-top: 6px;
      padding-left: 18px;
    }
    div {
      margin-top: 12px;
      border-top: 1px solid #ddd;
      box-shadow: 0 1px 2px #ddd;
      input,
      button {
        box-sizing: border-box;
        width: 100%;
        line-height: 36px;
        font-size: 14px;
        outline: none;
        margin: 6px 0;
        border-radius: 4px;
      }
      input {
        padding-left: 10px;
        border: 1px solid #ccc;
      }
      button {
        border: none;
        color: $mainColor;
        background: $mainBgColor;
        &:active {
          background: $mainBgColor*1.1;
        }
      }
    }
  }
</style>