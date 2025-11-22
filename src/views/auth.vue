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
      :style="{
        width: '350px',
        height: '250px',
      }"
      :header-style="{ textAlign: 'center', color: 'rgb(var(--arcoblue-6))' }"
      :body-style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }"
    >
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="username" label="用户名">
          <a-input placeholder="请输入用户名" v-model="form.username"> </a-input>
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input placeholder="请输入邮箱" v-model="form.email"></a-input>
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input placeholder="请输入密码，长度为8~16位" v-model="form.password"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary">注册</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { register } from '@/api/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  email: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    await register(form.value)
    router.push({ name: 'Login' })
  } catch (e) {
    console.log(e)
  }
}
</script>
