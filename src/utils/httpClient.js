import axios from 'axios'
import { ROOT_CONFIG } from '@/utils/config'
import { Message } from 'element-ui'
import router from '@/router'
import { getALivableRedirectPatch } from '@/router/helpers'
class HttpRepository {
    client = null
    constructor (defaultHeaders = {}) {
      this.client = axios.create({
        baseURL: ROOT_CONFIG.api_url_v2,
        timeout: 155000,
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders
        }
      })

      this.client.interceptors.request.use(
        (config) => {
          // if (getToken()) {
          //   config.headers.Authorization = getToken()
          // }
          // config.paramsSerializer = p => {
          //   console.log(qs.stringify(p, { arrayFormat: 'repeat' }))
          //   return qs.stringify(p, { arrayFormat: 'repeat' })
          // }
          return config
        },
        (error) => Promise.reject(error)
      )

      this.client.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.message.includes('403')) {
            Message.closeAll()
            Message({
              message: 'Доступ запрещен',
              type: 'error',
              duration: 5 * 1000
            })
          }

          if (error.message.includes('401')) {
            const getRedirect = getALivableRedirectPatch()
            console.log({ getRedirect })
            if (getRedirect === 'Login' || !getRedirect) {
              Message({
                message: 'Почта или пароль введены не верно',
                type: 'error',
                duration: 5 * 1000
              })
            }
            router.push({ name: getRedirect })
          }
          return Promise.reject(error)
        }
      )
    }

    async get (url, params) {
      const response = await this.client.get(url, params)
      return response.data
    }

    async post (url, data, config) {
      const response = await this.client.post(url, data, config)
      return response.data
    }

    async put (url, data, config) {
      const response = await this.client.put(url, data, config)
      return response.data
    }

    async delete (url, params) {
      const response = await this.client.delete(url, params)
      return response.data
    }

    async patch (url, data, config) {
      const response = await this.client.patch(url, data, config)
      return response.data
    }
}

export default HttpRepository
