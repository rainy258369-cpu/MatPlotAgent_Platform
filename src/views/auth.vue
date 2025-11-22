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
      :style="{ width: '300px', height: '300px' }"
      :header-style="{ textAlign: 'center', color: 'rgb(var(--arcoblue-6))' }"
    >
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="email">
          <a-input placeholder="请输入邮箱" v-model="form.email"></a-input>
        </a-form-item>
        <a-form-item field="password">
          <a-input placeholder="请输入密码" v-model="form.password"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="请输入用户名" v-model="form.username"> </a-input>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit">注册</a-button>
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
