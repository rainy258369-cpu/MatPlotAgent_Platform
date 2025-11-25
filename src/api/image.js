export const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * 处理响应错误
 */
async function handleResponseError(response) {
  let errorMessage = '操作失败'

  try {
    const data = await response.json()
    if (data.detail) {
      errorMessage = data.detail
    } else if (data.message) {
      errorMessage = data.message
    }
  } catch (e) {
    // 无法解析JSON时使用状态文本
    errorMessage = `服务器错误: ${response.statusText}`
  }

  throw new Error(errorMessage)
}

/**
 * 生成图像
 */
export async function generateImage(description, file) {
  try {
    const formData = new FormData()
    formData.append('input_text', description)

    if (file) {
      formData.append('file', file)
    }

    const response = await fetch(`${BASE_URL}/images/generate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('生成图像失败:', error)
    throw error
  }
}

/**
 * 获取历史记录
 */
export async function getHistory(skip = 0, limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/images/history?skip=${skip}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    const history = await response.json()
    return history
  } catch (error) {
    console.error('获取历史记录失败:', error)
    throw error
  }
}
