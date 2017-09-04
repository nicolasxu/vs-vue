<template>
  <div class="register">

    <form class="uk-form-stacked">
      <legend class="uk-legend">Register</legend>

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
          <label class="uk-form-label" for="form-password">Password Repeat</label>
          <div class="uk-form-controls">
              <input class="uk-input" id="form-password" type="password" placeholder="password" v-model="passwordRepeat">
          </div>
      </div>       
      <div class="uk-margin">
          <div class="uk-form-controls">
            <button class="uk-button uk-button-primary" @click.prevent="register">Register</button>
            <router-link class="reset-link" :to="{ name: 'Login', params: { userId: 123 }}">Login</router-link>
          </div>
      </div>
    </form>
  </div>
</template>

<script>
import {api} from '@/util/api'
import store from './store.js'

export default {
  name: 'login',
  data () {
    return {
      msg: 'this is Register component',
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  methods: {
    register: function (e) {
      if (this.password !== this.passwordRepeat) {
        console.log('password repeat is not the same')
        return
      }

      if(this.email === '') {
        console.log('email is empty')
        return
      }
      let thisComponent = this
      console.log('registering user...')
      api.user.register({email: this.email, password: this.password})
        .then((result) => {
          if (result.code === 2000) {
            // register succeed
            store.user = result.data.user
            console.log("store.user: ", store.user)
            thisComponent.$router.push({name: 'Dash.Received'})
          }
        })
    }
  }
}
</script>

<style scoped lang="sass">
  @import '../scss/reusable.scss';
  .register {
    // margin-top: 10%;
    // margin-left: auto;
    // margin-right: auto;
    // width: 100%;
    // max-width: 400px;
    @extend %login-register-container;

  }
</style>