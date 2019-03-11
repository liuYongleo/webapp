<template>
  <div class="container">
    <h3>log in</h3>
    <p>{{headMsg}}</p>
    <button @click="setHeadMsg('txt')">set</button>
  </div>
</template>

<script>
import {
  mapState, 
  mapMutations
} from 'vuex';

export default {
  computed: {
    ...mapState(['headMsg'])
  },
  methods: {
    ...mapMutations(['setHeadMsg'])
  }
}
</script>

<style lang="scss" scoped>
  .container{
    color: green;
    font-size: 20px;
  }
</style>