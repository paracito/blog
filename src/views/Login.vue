<template>
  <div class="login">
    <div class="input">
        <label for="" class="block">账户</label>
        <input type="text" class="block" v-model="state.user">
        <label for="" class="block">密码</label>
        <input type="text" class="block" v-model="state.password">
    </div>
    <button class="btn" @click="btn">登录</button>
    <button @click="remove">清除登录数据</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Login',
  setup () {
    const state = reactive({
      user: '',
      password: ''
    })
    function btn () {
      localStorage.setItem('user', state.user)
      console.log(localStorage.getItem('user'))
    }
    function remove () {
      localStorage.removeItem('user')
    }
    return { state, btn, remove }
  }
})
</script>

<style lang="scss" scoped>
.login {
    width: 20%;
    border: 1px solid #ccc;
    height: 200px;
    margin: 150px auto;
    .input {
        width: 80%;
        margin: 40px auto 20px;
        .block {
            width: 100%;
            display: block;
            margin-top: 6px;
        }
    }
    .btn {
        display: block;
        margin: 10px auto;
    }
}

</style>
