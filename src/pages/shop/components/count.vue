<template>
  <div class="container">
    <i @click="minuse" :class="{hide:num<=0}" class="minuse">-</i>
    <i :class="{hide:num<=0}" class="count">{{num}}</i>
    <i @click="plus" class="plus">+</i>
  </div>
</template>

<script>
  export default {
    props: ['num'],
    methods: {
      minuse() {
        if (this.num <= 0) {
          return;
        } else {
          // this.num--;
          this.$emit('minuse');
          this.$emit('operateminuse');
        }
      },
      plus($event) {
        // this.num++;
        let pos = $event.target.getBoundingClientRect(),
          x = pos.x,
          y = pos.y;
        this.$emit('plus', {
          x,
          y
        });
        this.$emit('operateplus');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../static/style/variable';
  .container {
    display: inline;
    position: absolute;
    right: 10px;
    i {
      position: relative;
      display: inline-block;
      width: 18px;
      height: 18px;
      font-size: 16px;
      border-radius: 50%;
      text-align: center;
      &.count {
        transition: all .3s;
        width: auto;
        padding: 2px 6px 0 6px;
        &.hide {
          opacity: 0;
        }
      }
      &.minuse {
        font-weight: bold;
        transition: all .4s;
        border: 2px solid $mainBgColor;
        color: $mainBgColor;
        left: 0;
        &.hide {
          opacity: 0;
          left: 30px;
          transform: rotate(720deg);
        }
      }
      &.plus {
        font-weight: bold;
        border: 2px solid $mainBgColor;
        background: $mainBgColor;
        color: white;
        position: relative;
        transition: all .4s linear;
        // transition: all .4s cubic-bezier(.16,-0.31,.81,-0.2);
        left: 0;
        right: 0;
      }
    }
  }
</style>
