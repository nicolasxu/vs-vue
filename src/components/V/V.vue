<template>
  <div class="view-invoice">
    <div class="detail-header">
      <div class="cmd-group">
        <a :href="pdfUrl" target="_blank" class="uk-button uk-button-small uk-button-primary">PDF</a>
        <button class="uk-button uk-button-small uk-button-primary" @click="pay">Pay</button>
        <button class="uk-button uk-button-small uk-button-default">Login</button>        
      </div>
    </div>
    <div class="preview-area">
      <div class="invoice-positioner">
        <div v-html="invoice.renderedInvoice"></div>        
      </div>
      <div class="status-positioner">
        <div class="inv-status">
          invoice status recap
        </div>
      </div>       
    </div>
  </div>
</template>

<script>
  import api from '../../util/api'
  import processResErrMixin from '../../util/processResError.js'

  export default {
    name: 'V',
    components: {},
    mixins: [processResErrMixin],
    data() {
      return {
        invoice: {},
        pdfUrl: ''
      }
    },
    created() {
      let viewId = this.$route.params.viewId

      // 1. get viewId
      // 4. who is this viewer? get token from localstorage
      // 2. call api with token to fetch invoice by viewId
      //    if token belong sender, redirect to sent invoice detail page
      //    if token belong to receiver, redirect to received detail page
      //    if neighter or no token, then delete token from localstorage. 
      //       if to_company alive? 
      //       yes: 'pay' will redirect to login
      //       no: no login shown, 'pay' will redirect to "pay and registration page", can not change email. 
      //           re-enter the receive invoice mail required
      
    },
    methods: {
      pdf() {

      },
      pay() {

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../scss/reusable.scss';

  .view-invoice {
    @extend %invoice-view-page;

  }
</style>