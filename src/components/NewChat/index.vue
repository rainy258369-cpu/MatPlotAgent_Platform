<template>
  <div class="chat">
    <a-typography-title :heading="1" :style="{ alignItems: 'center' }"
      >你好，我是MatPlotAgent</a-typography-title
    >
    <a-card :bordered="false">
      <a-space direction="vertical">
        <a-textarea
          v-model="description"
          placeholder="请输入图像描述，例如生成销售趋势图"
          allow-clear
          :style="{ width: '600px', height: '100px' }"
        >
        </a-textarea>
        <a-space fill :style="{ justifyContent: 'space-between' }">
          <a-upload
            v-model:file-list="files"
            accept=".csv"
            :custom-request="customUpload"
            :show-remove-button="true"
            :limit="1"
          ></a-upload>
          <a-button type="primary" @click="generate">生成图像</a-button>
        </a-space>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { generateImage } from '@/api/image.js'

const router = useRouter()
const description = ref('')
const files = ref([])

const customUpload = (option: any) => {
  const { fileItem } = option
  files.value = fileItem
}
const generate = async () => {
  if (!description.value) {
    Message.error('请输入图像描述')
    return
  }

  try {
    let file = null
    if (files.value.length > 0) {
      file = files.value[0].originFileObj
    }

    const result = await generateImage(description.value, file)
    // 存储到状态管理
    const resultWithDescription = {
      ...result,
      description: description.value,
      fileName: files.value.length > 0 ? files.value[0].name : '',
    }

    Message.success('图像生成请求已提交')
    console.log('生成结果:', result)
  } catch (e) {
    console.log(e)
  } finally {
    router.push({ name: 'Result' })
  }
}
</script>

<script lang="ts">
export default {
  name: 'NewChat',
}
</script>

<style>
.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
