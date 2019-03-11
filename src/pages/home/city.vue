<template>
  <div class="container">
    <div>
      <div class="input-container">
        <input type="text" v-model="search" placeholder="输入学校、商务、地址">
      </div>
      <button>提交</button>
    </div>
    <h3>搜索历史</h3>
    <ul>
      <li v-for="(item,key) in searchList" :key="key">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <p v-if="searchList.length">清空所有</p>
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
        clear: false
      }
    },
    computed: mapState(['headMsg']),
    watch: {
      search(newVal, oldVal) {
        if (newVal.length) {
  
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>