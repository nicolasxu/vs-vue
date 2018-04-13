<template>
  <div class="received-invoice-detail">
    <div class="detail-header">
      <div class="cmd-group">
        <button class="uk-button uk-button-small uk-button-default" @click="goBack">back</button>
        <button class="uk-button uk-button-small uk-button-primary" @click="payInvoice">Pay</button>
      </div>
      <div class="title">Received: {{'ABC Company'}}</div>      
    </div>

    <div class="preview-area">
      <div class="invoice-positioner" >
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
  import api from '../../../util/api'

  export default {
    name: 'ReceivedInvoiceDetail',
    components: {},
    props: [],
    data() {
      return {
        invoice: {
          renderedInvoice: 'fdsf'
        },
        invoiceId: ''
      }
    },
    created() {
      this.invoiceId = this.$route.params.id
    },
    methods: {
      async fetchData() {
        if (!this.invoiceId) {
          return
        }
        let res
        try {
          res = await api.invoice.getById('received', this.invoiceId)
        } catch (e) {
          console.log('Get invoice by id error', e)
            this.$notify({
              timeout: 3000,
              group: 'foo',
              type: 'error',
              title: '&#10005; Error',
              text: e.message          
            })
          return          
        }

        if (res.err_code === 4002) {
          this.$router.push({name: 'Login'})
          return
        }
        if (res.errors) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: '&#10005; Error',
            text: res.errors[0].message          
          })
          return
        }
        if (res.data.invoice.err_code) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: '&#10005; Error',
            text: ''             
          })
          return
        }        
        this.invoice = res.data.invoice
      },
      goBack() {
        this.$router.push({name: 'Dash.Received'})
      },
      payInvoice() {
        console.log('paying... invoice')
      }
    }

  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .received-invoice-detail {
    position: relative;
    min-height: 100vh;    
    .detail-header {
      height: 48px;
      border-bottom:1px solid #efefef;
      display: flex;
      flex-direction: row;
      align-items: center;      
      .cmd-group {
        display: inline-block;
        margin-left: 1em;
      }
      .title {
        display: inline-block;
        margin-left: 1em;
        font-size: 18px;
        font-family: monospace;
      }
      @media print {
        display: none;
      }
    }
    .preview-area {
      background: #e0e0e0;
      width: 100%;
      margin: 0;
      vertical-align: top;
      padding-left: 2em;
      .invoice-positioner {
        display: inline-block;
        background: white;
        box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
        margin: 5mm auto;
      }
      .status-positioner {
        vertical-align: top;
        display: inline-block;
        background: white;
        box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
        margin: 5mm auto; 
        margin-left: 2em;       
      }
    }    
  }

</style>