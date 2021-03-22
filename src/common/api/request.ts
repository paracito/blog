import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:5000/'
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8'
// 超时时间
axios.defaults.timeout = 10000
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    alert('网络请求失败，请刷新重试')
    console.log(error)
  }
)

function request (method: any, url: string, params: object) {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params
    })
      .then((res) => {
        // console.log('res.data:', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        console.log('ERROR:', err)
        reject(err)
      })
  })
}

export default request
