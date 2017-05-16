// this is api.js
import request from './request.js'

const baseUrl = 'http://localhost:3000/'

export default {
  register: {
    register (user) {
      let url = baseUrl + 'user'
      return request.post(url, user)
    }
  },
  user: {
    register (userData) {},
    login (user) {
      // http://localhost:3000/credential
      // {"email":"xu.shenxin@gmail.com","password":"123456"}
      let url = baseUrl + 'credential'
      return request.post(url, user)
    }
  }
}

