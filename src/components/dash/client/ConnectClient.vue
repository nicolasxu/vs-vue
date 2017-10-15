<template>
  <div class="connect-client">
    <h3>Connect To a Live Client Company</h3>
    <form class="uk-form uk-form-stacked">
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-email" >
          Client Email
          <span class="required-sign">*</span>
        </label>
        {{this.fields.email.valid}}
        <div class="uk-form-controls">
            <input type="text" id="client-email" 
            placeholder="enter client email111" 
            class="uk-width-1-3" v-model="email"
            v-validate="'required|email'"
            >

        </div>         
      </div>
      <div class="uk-form-row">
        <h4>Search Result</h4>
      </div>
      <div class="uk-form-row">
        <button type="button" class="uk-button uk-button-primary" @click="connect" :disabled="fields.email.valid? null:true">Connect</button>
        <button type="button" class="uk-button" @click="cancel">Cancel</button>        
      </div>
      <div class="uk-form-row">
        result
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
    },
    data() {
      return {
        email: ''
      }
    },
    methods: {
      connect() {
        console.log('connect...')
      },
      cancel() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .connect-client {
    margin-top: 1em;
    @extend %dash-component-margin-padding;

  }
</style>