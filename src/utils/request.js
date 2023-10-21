import { ROOT_CONFIG } from '@/utils/config'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: ROOT_CONFIG.api_url_v2,
  timeout: 155000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  config => {
    // if (getToken()) {
    //   config.headers.Authorization = getToken()
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // if (response.status === 401) {
    //   Message({
    //     message: 'Истёк срок сессии, авторизуйтесь',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   store.dispatch('user/logout')
    //   router.push('/login')
    //   return Promise.reject('Ошибка авторизации')
    // }
    return response.data
  },
  (error) => {
    let message
    if (error.message.includes('403')) {
      Message.closeAll()
      message = 'Доступ запрещен'
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    if (error.message.includes('401')) {
      Message({
        message: 'Почта или пароль введены не верно',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
