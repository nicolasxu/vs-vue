<template>
  <div class="register">

    <form class="uk-form uk-form-stacked uk-width-medium-2-3 ">
      <legend class="uk-legend">Register</legend>

      <div class="uk-form-row">
        <label class="uk-form-label" for="form-email">Email</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-email" 
          type="text" placeholder="your@email.com" 
          v-model="email"
          name="email"
          v-validate="{required: true, email: true}">
        </div>        
      </div>

      <div class="uk-form-row">
        <label class="uk-form-label" for="form-email">Your Company Name</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-company-name" 
          type="text" placeholder="Company Name" 
          v-model="companyName"
          name="companyName"
          v-validate="{required: true}">
        </div>        
      </div>
      
      <div class="uk-form-row">
        <label class="uk-form-label" for="form-password">Password</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-password" type="password" 
          placeholder="password" 
          v-model="password"
          name="password"
          v-validate="{required: true, min: 8}">
        </div>
      </div>

      <div class="uk-form-row">
        <label class="uk-form-label" for="form-password">Password Repeat</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-password-repeat" 
          type="password" placeholder="password" 
          v-model="passwordRepeat"
          name="passwordRepeat"
          v-validate="{required: true, is: password }">
        </div>
      </div>
      

      <div class="uk-form-row">
        <div class="uk-form-controls">
          <button class="uk-button uk-button-primary" 
          @click.prevent="register"
          :disabled="!isFormValid ||loading? true: false"
          >
            <span v-show="!loading">Register</span>
            <span v-show="loading">Loading...</span>
          </button>
          <router-link class="login-link" :to="{ name: 'Login', params: { userId: 123 }}">Login</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/util/api'
import store from './store.js'
import processResErrorMixin  from '../util/processResError.js'

export default {
  name: 'login',
  mixins: [processResErrorMixin],
  data () {
    return {
      email: '',
      companyName: '',
      password: '',
      passwordRepeat: '',
      loading: false
    }
  },
  computed: {
    isFormValid() {
      return !Object.keys(this.fields).some(key=> !this.fields[key].valid)
    }
  },
  methods: {
    register: async function (e) {
      this.loading = true
      
      let res 
      try {
        res = await api.user.register({
          email: this.email, 
          password: this.password, 
          companyName: this.companyName
        })
      } catch (e) {
        console.log('register error')
        return 
      }

      let isSuccess = this.processResError(res, 'register')
      if (!isSuccess) {
        return
      }

      store.user = res.data.register.user
      console.log("store.user: ", store.user)
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped lang="sass">
  @import '../scss/reusable.scss';
  .register {

    @extend %login-register-position;
    input {
      width: 100%;
    }
    .login-link {
      float: right;
      line-height: 2em;
    }
  }
</style>