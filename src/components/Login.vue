<template>
  <div class="login">
  
    <form class="uk-form uk-width-medium-2-3">
      <legend class="uk-legend">Login</legend>

      <div class="uk-form-row">
        <label class="uk-form-label" for="form-email">Email</label>
        <div class="uk-form-controls">
            <input class="uk-input email-input" id="form-email" type="text" placeholder="your@email.com" v-model="email">
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="form-password">Password</label>
        <div class="uk-form-controls">
            <input class="uk-input pwd-input" id="form-password" type="password" placeholder="password" v-model="password">
        </div>
      </div>
      <div class="uk-margin">
        <div class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p v-if="errorCode==4002">Email is invalid</p>
            <p v-if="errorCode==3001">Wrong password</p>
        </div>        
      </div>      

      <div class="uk-form-row">
        <div class="uk-form-controls">
          <button class="uk-button uk-button-primary" @click.prevent="login">Login</button>
          <router-link class="reset-link" :to="{ name: 'ResetPasswordRequest', params: { userId: 123 }}">
            Reset Password
          </router-link>
        </div>
      </div>
    </form>    

  </div>
</template>

<script>
import api from '../util/api'
import store from './store.js'

export default {
  name: 'login',
  data () {
    return {
      msg: 'this is login',
      email: '',
      password: '',
      errorCode: ''
    }
  },
  methods: {
    async login() {

      let tokenRes

      try {
        tokenRes = await api.user.createToken({email: this.email, password: this.password})
      } catch (e) {
        console.log('Create token error', e)
        return
      }
      if (tokenRes.code !== 2000) {
       
        // login failed, probably pasword does not match
        // TODO: handle password wrong here
        return
      }

      store.token = tokenRes.data.token
      store.saveToken(store.token)
      store.user = tokenRes.data.user

      this.$router.push({name: 'Dash.Received'})

    }
  }
}
</script>

<style scoped lang="sass">
@import '../scss/reusable.scss';
.login {
  @extend %login-register-container;
  .email-input, .pwd-input {
    width: 100%;
  }
  .reset-link {
    // margin-left: 6%;
    float: right;
  }
  .uk-alert-danger {
    p {
      margin: 0;
      padding: 1em;
    }
  }
}
  
</style>