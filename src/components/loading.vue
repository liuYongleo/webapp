<template>
<transition name="loading-fade">
  <div class="loading">
    <div>
      <div ref="icon" class="icon"></div>
      <div class="circle"></div>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    data() {
      return {
        positionY: 0
      }
    },
    mounted() {
      let icon = this.$refs['icon'],
          i = 1;
      this.interval = setInterval(() => {
        // this.positionY = this.positionY-100;
        icon.style.backgroundPosition = '0 ' + (-100*i) + 'px';
        i++;
      }, 1000)
    },
    destroyed() {
      clearInterval(this.inverval);
      this.inverval = null;
    },
  }
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    z-index: 90;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .6);
    &>div {
      position: relative;
      width: 100px;
      height: 300px;
      // background-color: #eee;
      div {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        opacity: .6;
      }
      .icon {
        top: 80px;
        width: 100px;
        height: 100px;
        background-image: url('icon_loading.png');
        background-position: 0 0;
        animation: iconAm 1s linear infinite;
      }
      .circle {
        top: 170px;
        width: 60px;
        height: 18px;
        border-radius: 50%;
        background-color: #bbb;
        box-shadow: 0 0 2px #999;
        animation: circleAm 1s linear infinite;
      }
    }
  }
  
  @keyframes iconAm {
    0% {
      top: 60px;
    }
    50% {
      top: 0px;
    }
    100% {
      top: 60px;
      opacity: .3;
    }
  }
  
  @keyframes circleAm {
    0% {
      transform: translate(-50%, 0) scale(1);
    }
    50% {
      transform: translate(-50%, 0) scale(1.6);
    }
    100% {
      transform: translate(-50%, 0) scale(1);
      opacity: .5;
    }
  }
  .loading-fade-leave-active{
    transition: opacity .4s linear;
    opacity: 0;
  }
</style>
