const TOKEN_KEY = 'vs-ss-id'
export default {
  saveToken(token) {
    if (!token) {
      return
    }

    localStorage.setItem(TOKEN_KEY, token)
  },
  retrieveToken() {
    let token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      this.token = token
    }
  },
  removeToken() {
    this.token = ''
    localStorage.removeItem(TOKEN_KEY)
  }

}