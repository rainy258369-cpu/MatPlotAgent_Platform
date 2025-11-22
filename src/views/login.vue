<template>
  <div
    :style="{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
  >
    <a-card
      title="MatPlotAgent"
      :style="{ width: '350px', height: '250px' }"
      :header-style="{ textAlign: 'center', color: 'rgb(var(--arcoblue-6))' }"
      :body-style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }"
    >
      <a-form :model="userInfo" @submit="handleLogin">
        <a-form-item field="email" label="邮箱">
          <a-input placeholder="请输入邮箱" v-model="userInfo.email"></a-input>
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input placeholder="请输入密码，长度为8~16位" v-model="userInfo.password"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary">登录</a-button>
        </a-form-item>
      </a-form>
      <a-button type="text" :style="{}" @click="toAuth">未注册，请先注册</a-button>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth.js'

const router = useRouter()

const userInfo = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  try {
    await login(userInfo.value)
    router.push({ name: 'Home' })
  } catch (e) {
    console.log(e)
  }
}
const toAuth = () => {
  router.push({ name: 'Auth' })
}
</script>
