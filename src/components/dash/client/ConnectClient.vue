<template>
  <div class="connect-client">
    <h3>Connect To a Live Client Company</h3>
    <form class="uk-form uk-form-stacked">
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-email">Client Email<span class="required-sign">*</span></label>
        <div class="uk-form-controls">
            <input type="text" id="client-email" placeholder="email" class="uk-width-1-3">
            <div class="input-note">Search live client by this email</div>
        </div>         
      </div>
      <div class="uk-form-row">
        <h4>Search Result</h4>
      </div>
      <div class="uk-form-row">
        <button type="button" class="uk-button uk-button-primary" @click="connect">Connect</button>
        <button type="button" class="uk-button" @click="cancel">Cancel</button>        
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'connectClient',
    created() {
      // console.log('this.$route', this.$route)
    },
    data() {
      return {

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