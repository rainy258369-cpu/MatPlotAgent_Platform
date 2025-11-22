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
      :style="{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center' }"
      :header-style="{ textAlign: 'center', color: 'rgb(var(--arcoblue-6))' }"
    >
      <a-form :model="userInfo" @submit="handleLogin">
        <a-form-item field="email">
          <a-input placeholder="请输入邮箱" v-model="userInfo.email"></a-input>
        </a-form-item>
        <a-form-item field="password">
          <a-input placeholder="请输入密码" v-model="userInfo.password"></a-input>
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
