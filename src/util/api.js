// this is api.js
import request from './request.js'

export default {
  register: {
    register (url) {
      return request.get(url)
    }
  }
}

