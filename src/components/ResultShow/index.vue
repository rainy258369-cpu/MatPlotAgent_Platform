<template>
  <div class="result">
    <div class="bubble">{{ input_text }}</div>

    <div v-if="result_image_url" class="image-container">
      {{ image_url }}
      <a-image :src="image_url" alt="生成图像" :preview="true" :width="500" :height="500" />
    </div>
    <div v-else class="no-image">
      <a-result status="info" title="暂无图像" subtitle="生成失败"></a-result>
    </div>

    <a-typography-text type="secondary">创建时间：{{ formattedTime }}</a-typography-text>

    <div v-if="answer_text" class="answer-text">
      <a-typography-title :heading="6">分析结果：</a-typography-title>
      <a-typography-text>{{ answer_text }}</a-typography-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useImageStore } from '@/stores/imageStore'
import { storeToRefs } from 'pinia'
import { Message } from '@arco-design/web-vue'

const imageStore = useImageStore()
const { currentResult } = storeToRefs(imageStore)

// 计算属性，方便模板使用
const input_text = computed(() => currentResult.value?.input_text || '')
const result_image_url = computed(() => currentResult.value?.result_image_url || '')
const created_at = computed(() => currentResult.value?.created_at || '')
const answer_text = computed(() => currentResult.value?.answer_text || '')
const image_url = computed(() => import.meta.env.VITE_API_BASE_URL + result_image_url.value)

// 格式化时间显示
const formattedTime = computed(() => {
  if (!created_at.value) return ''
  return new Date(created_at.value).toLocaleString('zh-CN')
})

onMounted(() => {
  // 检查是否有当前结果数据
  if (!imageStore.hasCurrentResult) {
    Message.warning('没有找到结果数据')
    // 可以跳转到生成页或首页
    // router.push({ name: 'NewChat' })
  }
})

// 监听当前结果变化，确保数据更新
watch(currentResult, (newVal) => {
  console.log('当前结果更新:', newVal)
})
</script>

<style>
.result {
  position: relative;
  width: 600px;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
}

.bubble {
  background: #f2f3f5;
  width: fit-content;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 20px;
  border: 1px solid #e5e6eb;
  position: relative;
  margin-left: auto; /* 靠右显示 */
  justify-self: end; /* Grid 中的右对齐 */

  /* 文字样式 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  /* 确保气泡高度自适应 */
  min-height: 40px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.content-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px; /* 确保有最小高度 */
}

.image-container {
  margin: 20px 0;
  text-align: center;
}

.image-container :deep(.arco-image) {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.no-image {
  margin: 40px 0;
}

.create-time {
  margin-top: 10px;
}

.answer-text {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3491fa;
  width: 100%;
  max-width: 500px;
}
</style>
