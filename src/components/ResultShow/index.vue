<template>
  <div class="result">
    <div class="bubble">{{ input_text }}</div>
    <a-image :src="result_image_url" alt="暂无图片"></a-image>
    <a-typography-text type="secondary">创建时间：{{ created_at }}</a-typography-text>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const result_image_url = ref('')
const input_text = ref('')
const created_at = ref('')
</script>

<style>
.result {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.bubble {
  position: absolute;
  top: 80px;
  right: 0;
  padding: 5px 5px;
  border-radius: 20px; /* 这个属性控制圆角大小 */
  width: 460px;
  min-height: 50px;
  max-height: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
