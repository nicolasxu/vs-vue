<template>
  <div class="reset-password">
    <div v-show="!sendSucceed">
      <form class="uk-form uk-width-medium-2-3">

        <legend class="uk-legend">Reset Password</legend>

        <div class="uk-form-row">
            <label class="uk-form-label" for="form-email">Email</label>
            <div class="uk-form-controls">
                <input class="uk-input email-input" id="form-email" type="text" placeholder="your@email.com" v-model="email" >
            </div>
        </div>
        <div class="uk-form-row" v-show="err_code">
          <div class="uk-alert-danger alert-msg">
            {{err_msg}}
          </div>

        </div>  
        <div class="uk-form-row">
          <div class="uk-form-controls">
            <button class="uk-button uk-button-primary" @click.prevent="reset">Reset</button>
            <router-link class="login-link" :to="{ name: 'Login', params: { userId: 123 }}">
              Login
            </router-link>
          </div>
        </div>
      </form>      
    </div>
    <div v-show="sendSucceed">
      <h1 class="success-title"> &#10003; Success!</h1>
      <h4>Plese use the link you received in {{email }} to reset password.</h4>
    </div>


  </div>
</template>

<script>
  import api from '../util/api'
  export default {
    name: 'resetPasswordRequest',
    data() {
      return {
        email: '',
        err_code: '',
        err_msg: '',
        sendSucceed: false
      }
    },
    created() {

    },
    methods: {
      async reset() {
        console.log('reseting...')
        let sendRes
        try {
          sendRes = await api.user.sendResetPwdLink(this.email)
        } catch (e) {
          console.log('Send request error', e)
          return
        }
        console.log('sendRes', sendRes)
        if (sendRes.err_code) {
          this.err_code = sendRes.err_code
          this.err_msg = sendRes.err_msg
        }

        if (sendRes.code === 2000) {
          this.sendSucceed = true
        }
        

        
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../scss/reusable.scss';

  .reset-password {
    @extend %login-register-position;
    .email-input {
      width: 100%;
    }
    .login-link {
      float: right;
    }
    .alert-msg {
      padding: 1em;
    }
    .success-title {
      color: green;
    }
  }
  
</style>