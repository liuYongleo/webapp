<template>
  <div class="login">
    <div class="input">
      <label for="username">账号</label>
      <input type="text" id="username" name="username">
    </div>
    <div class="input">
      <label for="password">密码</label>
      <input type="password" id="password" name="password">
    </div>
    <div class="input">
      <label for="code">验证码</label>
      <input type="text" id="code" name="code">
    </div>
    <div class="bottom-div">
      <p class="warn">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="warn">注册过的用户可凭账户密码登录</p>
      <button @click="setHeadMsg('txt')" class="button-full">登录</button>
      <p class="tr"><span @click="reset">重置密码？</span></p>      
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
      reset() {
        this.$router.push('/register');
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
      padding: 0 .4rem;
      p{
        line-height: .8rem;
        color: red;
        &.tr{
          text-align: right;
        }
        span{
          color: #0167C8;
        }
      }
    }
  }
</style>