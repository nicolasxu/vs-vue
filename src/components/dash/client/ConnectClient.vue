<template>
  <div class="connect-client">
    <h3>Connect To a Live Client Company</h3>
    <form class="uk-form uk-form-stacked" v-if="!(resultSuccess || resultError)">
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-email" >
          Client Email
          <span class="required-sign">*</span>
        </label>
        
        <div class="uk-form-controls">
            <input type="text" id="client-email" 
            placeholder="enter client email" 
            class="uk-width-1-3" 
            v-model="email"
            v-validate="'required|email'"
            name="email"
            >

        </div>         
      </div>
      <div class="uk-form-row">
        <h4>Search Result</h4>
      </div>
      <div class="uk-form-row">
        <button type="button" class="uk-button uk-button-primary" 
        @click="connect" :disabled="fields.email && fields.email.valid? null:true">Connect</button>
        <button type="button" class="uk-button" @click="cancel">Cancel</button>        
      </div>

    </form>
    <form class="uk-form-row success-msg" v-show="resultSuccess">
      result
      <h3>
        <i class="fa fa-check" aria-hidden="true"></i>
        Success! Client request sent...
      </h3>
      <div class="uk-form-row">
        <button class="uk-button uk-button-default" @click.prevent="tryAgain">Another Request</button>
      </div>
    </form>

    <form class="error-msg" v-show="resultError">
      <div class="uk-form-row">
        <i class="fa fa-times" aria-hidden="true"></i> 
        {{errorMsg}}
      </div>
      <div class="uk-form-row">
        <button class="uk-button uk-button-default" @click.prevent="tryAgain">Try Again</button>
      </div>
    </form>

  </div>
</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'connectClient',
    created() {
      // console.log('this.$route', this.$route)
   
      window.vvv = this.$validator
    },
    data() {
      return {
        email: '', 
        resultSuccess: false,
        resultError: false,
        errorMsg: ''
      }
    },
    methods: {
      async connect() {
        var res = await api.request.create(this.email, 'client')

        if (res.errors || res.data.createRequest.err_code !== null) {
          this.resultError = true
          this.errorMsg = res.data.createRequest.err_msg || res.errors[0].message
        } else {
          this.resultSuccess = true
        }
      },
      cancel() {
        this.$router.go(-1)
      },
      tryAgain() {
        this.resultSuccess = false
        this.resultError = false
        this.email = null
        //this.$validator.errors.remove('email')

        console.log('$validator', this.$validator)

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .connect-client {
    margin-top: 1em;
    @extend %dash-component-margin-padding;

    .success-msg {

    }

    .error-msg {

    }

  }
</style>