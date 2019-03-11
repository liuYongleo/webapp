<template>
  <div class="container">
    <h3>page home</h3> 
    <router-link to="/home/ha">to a</router-link>
    <router-link to="/home/hb">to b</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .container{
    color: green;
    font-size: 20px;
  }
</style>