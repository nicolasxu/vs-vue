<template>
  <div class="reset-password">
    <div v-show="!resetSuccess">
      <form class="uk-form uk-width-medium-2-3">
        <legend class="uk-legend">Reset Password</legend>
        <div class="uk-form-row">
          <label class="uk-form-label" for="form-pwd">New Password</label>
          <div class="uk-form-controls">
            <input class="uk-input email-input" 
            id="form-pwd" type="password" 
            placeholder="password" v-model="pwd"
            v-validate="{min: 8}"
            >
          </div>
        </div>

        <div class="uk-form-row">
          <label class="uk-form-label" for="form-pwd-repeat">Repeat</label>
          <div class="uk-form-controls">
            <input class="uk-input email-input" 
            id="form-pwd-repeat" type="password" 
            placeholder="password repeat" 
            v-model="pwdRepeat"
            v-validate="{is: pwd}">
          </div>
        </div>
        <div class="uk-form-row" v-show="err_code">
          <div class="uk-alert-danger alert-msg">
              {{err_msg}}
            </div>
        </div>

        <div class="uk-form-row">
          <div class="uk-form-controls">
            <button class="uk-button uk-button-primary" @click.prevent="update">Update</button>
            <router-link class="login-link" :to="{ name: 'Login', params: { userId: 123 }}">
              Login
            </router-link>
          </div>
        </div>      
      </form>
    </div>

    <div v-show="resetSuccess">
      <h2 class="success-title">&#10003; Success</h2>
      <h4>
        Password successfully updated. Please go to  
        <router-link class="nav-link" :to="{ name: 'Login', params: { userId: 123 }}">
          Login
        </router-link>
      </h4>

    </div>
  </div>
</template>


<script>
  import api from '../util/api'

  export default {
    name: 'ResetPassword',
    data() {
      return {
        pwd: '',
        pwdRepeat: '',
        resetSuccess: false,
        err_code: '',
        err_msg: ''
      }
    },
    created() {

    },
    methods: {
      async update() {

        let hash = this.$route.params.hash
        let email = this.$route.query.email

        let resetRes 
        try {
          resetRes = await api.user.resetPwd(email, hash, this.pwd)
        } catch (e) {
          console.log('')
          return
        }

        if (resetRes.code === 2000) {
          this.resetSuccess = true
        }

        if (resetRes.err_code) {
          this.err_code = resetRes.err_code
          this.err_msg = resetRes.err_msg
          this.resetSuccess = false
        }

      }
    }
  }
  
</script>


<style lang="scss" scoped>
  @import '../scss/reusable.scss';
  .reset-password {
    @extend %login-register-position;
    #form-pwd, #form-pwd-repeat {
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