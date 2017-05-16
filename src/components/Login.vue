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
          <div class="uk-form-controls">
            <button class="uk-button uk-button-primary" @click.prevent="register">Login</button>
            <!-- <a class="uk-link-muted reset-link" href="">Reset Password</a> -->
            <router-link class="reset-link" :to="{ name: 'ResetPassword', params: { userId: 123 }}">Reset Password</router-link>

          </div>
      </div>
    </form>    

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'this is login',
      email: '',
      password: ''
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
}
  
</style>