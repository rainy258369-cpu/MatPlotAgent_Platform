const BASE_URL = 'http://127.0.0.1:8000'

/**
 * 设置请求头
 */
function getHeaders(includeAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (includeAuth) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

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
 * 注册用户
 */
export async function register(userData) {
  try {
    console.log('发送注册请求，数据:', userData)
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    })
    console.log('响应状态:', response.status)
    if (!response.ok) {
      await handleResponseError(response)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('注册失败:', error)
    throw error
  }
}

/**
 * 用户登录
 */
export async function login(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    const data = await response.json()

    // 保存令牌
    localStorage.setItem('accessToken', data.access_token)
    return data
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    const user = await response.json()
    return user
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

/**
 * 认证工具函数
 */

/**
 * 检查用户是否已登录
 */
function isLoggedIn() {
  return !!localStorage.getItem('accessToken')
}

/**
 * 注销登录
 */
export function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('currentUser')
  // 在Vue中使用路由跳转，这里先保留基础功能
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

/**
 * 验证用户登录状态，如果未登录则跳转
 */
export async function requireAuth() {
  if (!isLoggedIn()) {
    return false
  }

  try {
    // 验证令牌有效性
    const user = await getCurrentUser()
    localStorage.setItem('currentUser', JSON.stringify(user))
    return true
  } catch (error) {
    this.logout()
    return false
  }
}
