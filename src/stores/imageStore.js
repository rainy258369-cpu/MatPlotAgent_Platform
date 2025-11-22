// stores/imageStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useImageStore = defineStore('image', () => {
  // 当前显示的结果（可能是新生成的，也可能是历史记录）
  const currentResult = ref(null)

  // 历史记录列表
  const historyList = ref([])

  // 加载状态
  const isLoading = ref(false)

  // 计算属性
  const hasCurrentResult = computed(() => !!currentResult.value)

  /**
   * 设置当前结果（用于新生成的结果）
   */
  const setCurrentResult = (resultData) => {
    currentResult.value = {
      id: resultData.id || resultData.job_id,
      input_text: resultData.description || resultData.input_text,
      result_image_url: resultData.result_image_url || resultData.imageUrl,
      created_at: resultData.created_at || resultData.createdAt || new Date().toISOString(),
      status: resultData.status || 'success',
      answer_text: resultData.answer_text || resultData.answerText,
      csv_filename: resultData.csv_filename || resultData.fileName,
      // 保存原始数据
      rawData: resultData,
    }

    // 自动添加到历史记录（如果不在历史记录中）
    addToHistory(currentResult.value)
  }

  /**
   * 从历史记录中设置当前结果
   */
  const setCurrentResultFromHistory = (historyItem) => {
    currentResult.value = {
      id: historyItem.id,
      input_text: historyItem.input_text,
      result_image_url: historyItem.result_image_url,
      created_at: historyItem.created_at,
      status: historyItem.status,
      answer_text: historyItem.answer_text,
      csv_filename: historyItem.csv_filename,
      isFromHistory: true, // 标记来自历史记录
    }
  }

  /**
   * 添加到历史记录
   */
  const addToHistory = (result) => {
    // 检查是否已存在
    const existingIndex = historyList.value.findIndex((item) => item.id === result.id)

    if (existingIndex >= 0) {
      // 更新已存在的记录
      historyList.value[existingIndex] = { ...result }
    } else {
      // 添加到历史记录开头
      historyList.value.unshift({ ...result })
    }

    // 限制历史记录数量
    if (historyList.value.length > 50) {
      historyList.value = historyList.value.slice(0, 50)
    }
  }

  /**
   * 设置历史记录列表
   */
  const setHistoryList = (historyData) => {
    historyList.value = historyData.map((item) => ({
      id: item.id,
      input_text: item.input_text,
      result_image_url: item.result_image_url,
      created_at: item.created_at,
      status: item.status,
      answer_text: item.answer_text,
      csv_filename: item.csv_filename,
    }))
  }

  /**
   * 根据ID获取历史记录项
   */
  const getHistoryItemById = (id) => {
    return historyList.value.find((item) => item.id == id) || null
  }

  /**
   * 清除当前结果
   */
  const clearCurrentResult = () => {
    currentResult.value = null
  }

  return {
    // 状态
    currentResult,
    historyList,
    isLoading,

    // 计算属性
    hasCurrentResult,

    // 方法
    setCurrentResult,
    setCurrentResultFromHistory,
    setHistoryList,
    getHistoryItemById,
    clearCurrentResult,
    setLoading: (loading) => {
      isLoading.value = loading
    },
  }
})
