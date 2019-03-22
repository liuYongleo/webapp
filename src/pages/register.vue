<template>
  <div class="login">
    <div class="input">
      <label for="username">账号</label>
      <input type="text" id="username" name="username">
    </div>
    <div class="input">
      <label for="oldpwd">旧密码</label>
      <input type="oldpwd" id="oldpwd" name="password">
    </div>
    <div class="input">
      <label for="newpwd">新密码</label>
      <input type="newpwd" id="newpwd" name="password">
    </div>
    <div class="input">
      <label for="surepwd">确认密码</label>
      <input type="surepwd" id="surepwd" name="password">
    </div>
    <div class="input">
      <label for="code">验证码</label>
      <input type="text" id="code" name="code">
    </div>
    <div class="bottom-div">
      <button @click="goBack" class="button-full">确认</button>
    </div>

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
      ...mapMutations(['setHeadMsg']),
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../static/style/variable';
  .login {
    text-align: left;
    div.input {
      &:nth-of-type(1){
        margin-top: 14px;
      }
      display: flex;
      background: white;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      line-height: 1.2rem;
      font-size: 14px;
      label {
        width: 80px;
        text-indent: 1em;
      }
      input {
        flex-grow: 1;
        border: none;
        outline: none;
        padding-left: 10px;
        &:focus{
          box-shadow: 0 0 2px inset $mainBgColor; 
        }
      }
    }
    .bottom-div{
      padding: .8rem .4rem;
    }
  }
</style>