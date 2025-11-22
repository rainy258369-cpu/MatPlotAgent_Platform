<template>
  <a-layout :style="{ height: '100%', width: '100%' }">
    <a-layout-sider
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="onCollapse"
      :collapsed-width="20"
    >
      <a-typography-title :heading="5">MatPlotAgent</a-typography-title>
      <a-button type="secondary" shape="round" long @click="addNewChat">新对话</a-button>
      <a-menu @menu-item-click="handleClick">
        <a-menu-item v-for="item in historyList" :key="item.id">
          <a-space>
            <span v-if="item.status === 'success'" class="dot green"></span>
            <span v-if="item.status === 'failed'" class="dot red"></span>
            <span v-if="item.status === 'partial'" class="dot grey"></span>
            <a-typography-title :heading="5" ellipsis>{{ item.input_text }}</a-typography-title>
          </a-space>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, requireAuth } from '@/api/auth.js'
import { getHistory } from '@/api/image.js'

const router = useRouter()
const historyList = ref()
const user = ref()
const init = async () => {
  try {
    if (await requireAuth()) {
      historyList.value = await getHistory()
      user.value = await getCurrentUser()
    }
  } catch (e) {
    console.log(e)
    router.push({ name: 'Login' })
  }
}

init()
//以下为侧边栏逻辑
const collapsed = ref(false)
const onCollapse = () => {
  collapsed.value = !collapsed.value
}
const handleClick = () => {}
const addNewChat = () => {
  router.push({ name: 'NewChat' })
}
</script>

<style>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 100px;
}
</style>
