<template>
  <a-button @click="handleClick"> 历史记录 </a-button>
  <a-drawer v-model:visible="visible" palcement="left" :mask="false" :closable="false" hide-cancel>
    <template #header>
      <a-space fill :style="{ padding: '5px', justifyContent: 'space-between' }">
        <a-typography-title>MatPlotAgent</a-typography-title>
        <a-button @click="visible = false">关闭</a-button>
      </a-space>
    </template>
    <template #title>
      <a-button type="secondary" shape="round" long @click="addNewChat"></a-button>
    </template>
    <a-list :data="historyList" :bordered="false" :split="false" hoverable>
      <template #item="{ item }">
        <a-list-item :key="item.id">
          <a-list-item-meta>
            <template #title>
              <a-typography-title :heading="5" ellipsis>{{ item.input_text }}</a-typography-title>
            </template>
            <template #description>
              <a-space>
                <span v-if="item.status === 'success'" class="dot green"></span>
                <span v-if="item.status === 'failed'" class="dot red"></span>
                <span v-if="item.status === 'partial'" class="dot grey"></span>
                <a-typography-text type="secondary">{{ item.created_at }}</a-typography-text>
              </a-space>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <template #footer>
      <a-dropdown position="top">
        <a-button type="text">{{ userInfo.username }}</a-button>
        <template #content>
          <a-doption @click="handleUserInfo">退出登录</a-doption>
          <a-doption @click="handleUserRegister">修改密码</a-doption>
        </template>
      </a-dropdown>
    </template>
  </a-drawer>
</template>

<script lang="js" setup>
import { ref } from 'vue'
import {getHistory} from '@/api/index.js'

const visible = ref(true)

function handleClick() {
  visible.value = true
}

const historyList=

const addNewChat=()=>{

}
</script>

<style>
.status {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.green {
  background-color: #52c41a;
}
.red {
  background-color: #f5222d;
}
.grey {
  background-color: #d9d9d9;
}

.bubble {
  border-radius: 20px; /* 这个属性控制圆角大小 */
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
