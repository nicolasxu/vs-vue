<template>
  <div class="login">
  
    <form class="uk-form-stacked">
      <legend class="uk-legend">Login</legend>

      <div class="uk-margin">
        <label class="uk-form-label" for="form-email">Email</label>
        <div class="uk-form-controls">
            <input class="uk-input" id="form-email" type="text" placeholder="your@email.com" v-model="email">
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="form-password">Password</label>
        <div class="uk-form-controls">
            <input class="uk-input" id="form-password" type="password" placeholder="password" v-model="password">
        </div>
      </div>
      <div class="uk-margin">
        <div class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p v-if="errorCode==4002">Email is invalid</p>
            <p v-if="errorCode==4007">Wrong password</p>
        </div>        
      </div>      

      <div class="uk-margin">
        <div class="uk-form-controls">
          <button class="uk-button uk-button-primary" @click.prevent="login">Login</button>
          <router-link class="reset-link" :to="{ name: 'ResetPassword', params: { userId: 123 }}">
            Reset Password
          </router-link>
        </div>
      </div>
    </form>    

  </div>
</template>

<script>
import api from '../util/api.js'
import store from './Store.js'

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
    login() {
      // todo: a bit of data validation 
      let thisComponent = this
      api.user.login({email: this.email, password: this.password})
        .then((result) => {
          console.log(result)
          if (result.code === 2000) {
            // login success
            store.user = result.data.user
            store.company = result.data.company
            store.isLogin = true
            thisComponent.$router.push({name: 'Dash'})

          } else {
            thisComponent.errorCode = result.code
          }
        })
    }
  }
}
</script>

<style scoped lang="sass">
@import '../scss/reusable.scss';
.login {
  @extend %login-register-container;
  .reset-link {
    margin-left: 6%;
  }
  .uk-alert-danger {
    p {
      margin: 0;
      padding: 15px 29px 15px 15px;
    }
  }
}
  
</style>