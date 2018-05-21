<template>
  <div class="sent-invoice-detail">

    <div class="detail-header">
      <div class="cmd-group">
        <button class="uk-button uk-button-small uk-button-default" @click="goBack">back</button>
        
        <a :href="pdfUrl" target="_blank" class="uk-button uk-button-small uk-button-primary" >PDF</a>
        
        <button class="uk-button uk-button-small uk-button-danger" @click="voidInvoice">void</button>
      </div>
      <div class="title">Sent: {{'ABC Company'}}</div>
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
  import api from '../../../util/api'
  export default {
    name: 'SentInvoiceDetail',
    components: {},
    props: [],
    data() {
      return {
        invoice: {},
        invoiceId: '',

      }
    },
    computed: {
      pdfUrl() {
        return 'http://localhost:3000/api/invoicepdf/' + this.invoice.viewId
      }
    },
    created() {
      this.invoiceId = this.$route.params.id
      this.fetchInvoice()

    },
    methods: {
      async fetchInvoice() {
        console.log('fetch invoice called...')
        if (!this.invoiceId) {
          return
        }
        console.log('making request...')
        let res
        try {
          res = await api.invoice.getById('sent', this.invoiceId)
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
        this.$router.push({name: 'Dash.Sent'})
      },
      voidInvoice () {
        let confirmed = confirm('Are you sure you want to void this invoice?') 
        if (!confirmed) {
          return
        }
        // todo: go on voiding...
        console.log('voiding... invoice')
      },
      getPdf() {
        // console.log('pdf...')
        try {
          //api.invoice.getPdf(this.invoice.viewId)

        } catch (e) {
          console.log('get pdf error:', e)
          return
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';
  .sent-invoice-detail {
    @extend %invoice-view-page;

  }

</style>