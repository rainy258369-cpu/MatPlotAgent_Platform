<template>
  <div class="chat">
    <a-typography-title :heading="1">你好，我是MatPlotAgent</a-typography-title>
    <a-card :bordered="false">
      <a-space direction="vertical">
        <a-textarea
          v-model="description"
          placeholder="请输入图像描述，例如生成销售趋势图"
          allow-clear
          :style="{ width: '600px', height: '100px' }"
        />
        <a-space fill :style="{ justifyContent: 'space-between' }">
          <a-upload
            v-model:file-list="files"
            accept=".csv"
            :custom-request="customUpload"
            :show-remove-button="true"
            :limit="1"
          >
            <template #upload-button>
              <div class="arco-upload-trigger">
                <a-button>选择CSV文件(可选)</a-button>
              </div>
            </template>
          </a-upload>
          <a-button type="primary" @click="generate" :loading="imageStore.isLoading">
            生成图像
          </a-button>
        </a-space>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useImageStore } from '@/stores/imageStore'
import { generateImage } from '@/api/image.js'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const imageStore = useImageStore()

const description = ref('')
const files = ref([])

const customUpload = (option: any) => {
  const { fileItem } = option
  files.value = [fileItem]
}

const generate = async () => {
  if (!description.value) {
    Message.error('请输入图像描述')
    return
  }

  try {
    imageStore.setLoading(true)

    const file = files.value.length > 0 ? files.value[0].originFileObj : null
    const result = await generateImage(description.value, file)

    // 存储到状态管理
    const resultWithDescription = {
      ...result,
      description: description.value,
      input_text: description.value, // 兼容历史记录字段
      fileName: files.value.length > 0 ? files.value[0].name : '',
    }
    imageStore.setCurrentResult(resultWithDescription)

    // 自动跳转到结果页
    router.push({ name: 'Result' })

    Message.success('图像生成成功！')
  } catch (error) {
    console.error('生成失败:', error)
    Message.error('生成失败: ' + (error.message || '未知错误'))
  } finally {
    imageStore.setLoading(false)
  }
}
</script>

<style scoped>
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
