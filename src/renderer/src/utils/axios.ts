import Axios from 'axios'
import qs from 'qs'

const axios = Axios.create({
  timeout: 20000,
  paramsSerializer: (params: any) => {
    return qs.stringify(params)
  }
})

axios.interceptors.request.use(
  (request) => {
    if (request.url && (request.method === 'get' || request.method === 'GET')) {
      const lastIdx = request.url.lastIndexOf('/')
      if (lastIdx > 0) {
        request.url =
          request.url.substring(0, lastIdx + 1) +
          encodeURIComponent(request.url.substring(lastIdx + 1, request.url.length))
      }
    }
    return request
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
