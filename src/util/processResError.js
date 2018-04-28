let processResErrorMixin = {
  created() {

  },
  methods: {
    processResError(res, name) {

      if (!res) {
        this.$notify({
          timeout: 3000,
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: ''            
        })
        return false
      }

      if (res.err_code === 4002) {
        this.$router.push({name: 'Login'})
        return false
      }

      if (res.errors && res.errors.length > 0) {
        this.$notify({
          timeout: 3000,
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: res.errors[0]
        })     
        return false
      }

      if (!res.data[name]) {
        this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: name + ' is empty'
          })   
        return false
      }

      if (res.data[name].err_code) {
        this.$notify({
          timeout: 3000,
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: res.data[name].err_msg
        })     
        return false  
      }

      return true
    }
  }
}

module.exports = processResErrorMixin


