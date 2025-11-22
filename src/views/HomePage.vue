<template>
  <a-layout :style="{ height: '100%', width: '100%' }">
    <a-button v-if="collapsed" type="text" @click="unCollapsed">
      <icon-menu-unfold />
    </a-button>
    <a-layout-sider
      breakpoint="lg"
      :width="300"
      collapsible
      :collapsed="collapsed"
      :hide-trigger="true"
      :collapsed-width="0"
    >
      <a-space fill :style="{ justifyContent: 'space-between', padding: '3px' }">
        <a-typography-title :heading="5">MatPlotAgent</a-typography-title>
        <a-button type="text" @click="onCollapsed">
          <icon-menu-fold />
        </a-button>
      </a-space>
      <a-button type="secondary" shape="round" long @click="addNewChat">新对话</a-button>
      <a-menu @menu-item-click="handleHistoryClick">
        <a-menu-item v-for="item in imageStore.historyList" :key="item.id">
          <a-space>
            <span v-if="item.status === 'success'" class="dot green"></span>
            <span v-if="item.status === 'failed'" class="dot red"></span>
            <span v-if="item.status === 'partial'" class="dot grey"></span>
            <a-typography-text :style="{ maxWidth: '150px', margin: '0', fontSize: '16px' }">
              {{ getFirst15Chars(item.input_text) }}
            </a-typography-text>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/imageStore'
import { getCurrentUser, requireAuth } from '@/api/auth.js'
import { getHistory } from '@/api/image.js'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'

const router = useRouter()
const imageStore = useImageStore()
const user = ref()

const init = async () => {
  try {
    if (await requireAuth()) {
      // 获取历史记录并存储到状态管理
      const historyData = await getHistory()
      imageStore.setHistoryList(historyData)
      user.value = await getCurrentUser()
    }
  } catch (e) {
    console.log(e)
    router.push({ name: 'Login' })
  }
}

onMounted(() => {
  init()
})

// 侧边栏逻辑
const collapsed = ref(false)
const onCollapsed = () => {
  collapsed.value = true
}
const unCollapsed = () => {
  collapsed.value = false
}

// 点击历史记录项
const handleHistoryClick = async (historyId: string) => {
  const historyItem = imageStore.getHistoryItemById(historyId)
  if (historyItem) {
    // 设置当前结果为选中的历史记录
    imageStore.setCurrentResultFromHistory(historyItem)
    // 跳转到结果页
    router.push({ name: 'Result' })
  }
}

// 固定显示前15个字符
const getFirst15Chars = (text: string) => {
  if (!text) return '无描述'
  return text.length > 15 ? text.substring(0, 15) + '...' : text
}

const addNewChat = () => {
  // 清除当前结果，开始新的生成
  imageStore.clearCurrentResult()
  router.push({ name: 'NewChat' })
}
</script>

<style scoped>
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.green {
  background-color: #00b42a;
}
.red {
  background-color: #f53f3f;
}
.grey {
  background-color: #86909c;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 100px;
}
</style>
