<template>
  <div class="verify-email">
     
    <div class="uk-block" v-show="verifying">
      <div class="uk-container">
        <h1>Verifying email...</h1>
      </div>
    </div>
    <div class="uk-block" v-show="!verifying">
      <div class="uk-container verified" v-show="verified">
        <h2 class="title"> &#10003; Email Verified!</h2>
        <button class="uk-button uk-button-primary" @click="goToLogin" >Go To Login</button>
      </div>

      <div class="uk-container not-verified" v-show="!verified">
        <h2 class="title">&#10008; Can not proceed! </h2>
      </div>
    </div>    

  </div>
</template>


<script>
  import api from '../util/api'

  export default {
    name: 'VerifyEmail',
    data() {
      return {
        verifying: true,
        verified: false
      }
    },
    created() {

      this.verify()
    },
    mounted() {

    },
    methods: {
      async verify() {
        let hash = this.$route.params.hash
        let email = this.$route.query.email
        let verifyRes
        try {
          verifyRes = await api.user.verifyEmail(hash, email)
        } catch (e) {
          console.log('error')
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: e.message
          })
          return
        }
        this.verifying = false
        if (verifyRes.code === 2000) {

          this.verified = true
        } else {
          this.verified = false
        }
      },
      goToLogin() {
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .verify-email {
    border: 1px solid lightgrey;
    display: flex;
    justify-content: center; // horizental
    align-items: center; // vertical
    .verified {
      .title {
        color: green;
      }
      
    }
    .not-verified {
      .title {
        color: red;
      }
      
    }
  }
</style>