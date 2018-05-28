<template>
  <div class="view-invoice">
    <div class="detail-header">
      <div class="cmd-group">
        <div class="left-group">

          <a :href="pdfUrl" target="_blank" class="uk-button uk-button-small uk-button-primary" >PDF</a>
          <button class="uk-button uk-button-small uk-button-primary" 
          @click="showPayModal" v-show="toCompanyIs!='live'"
          :disabled="invoice.paymentStatus=='paid'||invoice.paymentStatus=='pending' "
          >Pay</button>
          <button class="uk-button uk-button-small uk-button-primary" 
          @click="loginPay" v-show="toCompanyIs=='live'"
          >Login</button>          

        </div>
        <div class="right-group">
         
        </div>


     
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
      <Modal v-show="showModal">
        <div class="modal-header">
          <h2>Pay Invoice $ {{invoice.total}}</h2>
        </div>
        <div class="modal-body">
          <form class="uk-form uk-form-stacked">
            <div class="uk-form-row">
              <label class="uk-form-label" for="email">Receiver email</label>
              <input type="text" id="email" placeholder="email"
              name="email"
              v-model="email"
              v-validate="{required: true, email: true} " />
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label" for="routing-number">Routing Number</label>
              <input type="text" id="routing-number" placeholder="US bank routing number" 
              class="uk-form-width-large" 
              name="routing-number"
              v-model="routingNumber"
              v-validate="{required: true, length: 9, numeric: true}"/>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label" for="account-number">Bank Account</label>
              <input type="text" id="account-number" placeholder=" US bank account number"
              class="uk-form-width-large"
              name="account-number"
              v-model="bankAccount"
              v-validate="{required: true, min: 4, max: 17, numeric: true}"/>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label" for="password">Password</label>
              <input type="password" id="password" placeholder="password" 
              name="password"
              v-model="password"
              v-validate="{required: true, min: 8}"/>
            </div>
            <div class="uk-form-row">
              <label class="uk-form-label" for="password">Password Repeat</label>
              <input type="password" id="password-repeat" placeholder="password" 
              name="password-repeat"
              v-model="passwordRepeat"
              v-validate="{is: password, required: true}"/>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div class="uk-form-row">
            <button class="uk-button uk-button-small uk-button-primary" 
            :disabled="(paying || !isFormValid)? true: false"
            @click="modalPayInvoice">
              <span v-show="!paying">Pay Invoice</span>
              <span v-show="paying">Paying...</span>
            </button>            
            <button class="uk-button uk-button-small uk-button-default"
            :disabled="paying? true: false"
            @click="cancel" >Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>



  </div>
</template>

<script>
  import api from '../../util/api'
  import processResErrMixin from '../../util/processResError.js'
  import store from '../store.js'
  import Modal from './Modal.vue'

  export default {
    name: 'V',
    components: {Modal},
    mixins: [processResErrMixin],
    data() {
      return {
        invoice: {},
        showModal: false,
        toCompanyIs: '',
        paying: false,
        email: '',
        routingNumber: '',
        bankAccount: '',
        password: '',
        passwordRepeat: ''
      }
    },
    computed: {
      pdfUrl() {
        return 'http://localhost:3000/api/invoicepdf/' + this.invoice.viewId
      },
      isFormValid() {
        return !Object.keys(this.fields).some(key=> !this.fields[key].valid)
      }
    },
    async created() {
      // 1. get viewId      
      let viewId = this.$route.params.viewId

      // 2. get token from localstorage, user identity
      store.retrieveToken()

      // 2. call api with token to fetch invoice by viewId
      if (!viewId) {
        return
      }
      let res = await api.invoice.getByViewId(viewId)
      let isSuccess = this.processResError(res, 'invoiceByViewId')
      if (!isSuccess) {
        return
      }
      let resData = res.data.invoiceByViewId

      this.invoice = resData.invoice
      this.toCompanyIs = resData.toCompanyIs
      if (resData.loginUserIs === 'sender') {
        // goto invoice sent
        this.$router.push({name: 'Dash.Sent.Detail', params: {id: resData.invoice._id}})
        return
      }

      if (resData.loginUserIs === 'receiver') {
        // goto invoice receiver
        this.$router.push({name: 'Dash.Received.Detail', params: {id: resData.invoice._id}})
        return  
      }
      //    if token belong sender, redirect to sent invoice detail page
      //    if token belong to receiver, redirect to received detail page
      //    if neighter or no token, then delete token from localstorage. 
      //       if to_company alive? 
      //       yes: 'pay' will redirect to login
      //       no: no login shown, 'pay' will redirect to "pay and registration page", can not change email. 
      //           re-enter the receive invoice mail required
    },
    methods: {
      showPayModal() {
        this.showModal = true
      },
      loginPay() {
        this.$router.push({name: 'Login', query: {to: 'Dash.Received.Detail', viewId: this.invoice.viewId}})
      },
      cancel() {
        this.showModal = false
      },
      modalPayInvoice() {
        this.paying = true
      }

    }
  }
</script>

<style lang="sass" scoped>
  @import '../../scss/reusable.scss';

  .view-invoice {
    @extend %invoice-view-page;
    .cmd-group {
      width: 100%;
      margin-right: 1em;
    }
    .left-group, .right-group {
      display: inline-block;
    }
    .right-group {
      float: right;
    }
    .modal-header {
      line-height: 1.5em;
      border-bottom: 1px solid lightgrey;
      font-weight: bold;
    }
    .modal-body {
      padding-top: 1em;
    }
    .modal-footer {
      padding-top: 1em;
    }
  }
</style>