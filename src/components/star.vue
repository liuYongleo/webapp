<template>
  <div class="star">
    <span v-for="(i,k) in starScore" :key="'ss-'+k" :class="i" class="star-icon"></span>
    <span v-if="!show"> {{num}}</span>
  </div>
</template>

<script>  
  export default {
    props:['num', 'show'],
    methods: {
    },
    computed: {
      starScore() {
        let num = this.num*10,
            intNum = parseInt(num/10),
            modNum = num%10,
            arr = [];
        while(intNum){
          arr.push('full');
          intNum--;
        }
        if(modNum > 2 && modNum < 8){
          arr.push('half');
        }else if(modNum >= 8){
          arr.push('full');
        }
        let length = arr.length;
        while(length < 5){
          arr.push('empty');
          length++;
        }
        return arr; 
      }
    }
  }
</script>

<style lang="scss">
  .star{
    display: inline-block;
    margin-right: 4px;
    color: #ff6000;
    .star-icon{
      display: inline-block;
      width: 12px;
      height: 12px;
      background-size: 100% 100%;
      &.full{
        background-image: url(../assets/full-star.png);
      }
      &.empty{
        background-image: url(../assets/empty-star.png);
      }
      &.half{
        background-image: url(../assets/half-star.png);
      }
    }
  }
</style>
