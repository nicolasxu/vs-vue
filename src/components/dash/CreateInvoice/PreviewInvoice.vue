<template>
  <div class="preview-invoice">
    <div class="preview-header">
      <div class="cmd-group">
        <button class="uk-button uk-button-small uk-button-primary" @click="send">Send</button>
        <button class="uk-button uk-button-small" @click="back">Back</button>
        <button class="uk-button uk-button-small" type="button" @click="saveDraft">Save Draft</button>
      </div>
    </div>

    <div class="preview-area">
      
      
      <div class="invoice-positioner" ref="attachPoint">
        <div v-html="renderResult"></div>
      </div>
      
    </div>    

  </div>
</template>

<script>
  import api from '../../../util/api'
  import invoiceStore from './createInvoiceStore.js'
  import _ from 'lodash'
  import processResErrorMixin from '../../../util/processResError.js'

  export default {
    name: 'PreviewInvoice',
    mixins: [processResErrorMixin],
    components: {},
    data() {
      return {
        template: {},
        invoiceData: invoiceStore.state.invoiceRenderData,
        renderResult: ''
      }
    },
    async created() {
      
      // todo:
      // 1. get template
      let res 
      try {
        let tid = this.invoiceData.template._id
        if (!tid) {
          console.error('Template id is empty')
          return
        }
        res = await api.template.getTemplateById(tid)
      } catch (e) {
        console.log('get template by id error', e)
        return
      }
      if (res.err_code === 4002) {
        this.$router.push({name:'Login'})
        return
      }
      this.template = res.data.template

      this.renderInvoice()
    },
    mounted() {
      // this.$notify({
      //   group: 'foo',
      //   type: 'error', // 'warning', 'success', 'info', 'warning'
      //   title: 'Important message',
      //   text: 'Hello user! This is a notification'
      // })
    },
    methods: {
      async send() {

        let confirmed = confirm('Are you sure to send this invoice?')
        if (!confirmed) {
          return
        }

        let input = invoiceStore.createSendData()
        let sendRes
        try {
          sendRes = await api.invoice.send(input)
        } catch (e) {
          console.log('Send invoice request error', e)
          return
        }

        let isSuccess = this.processResError(sendRes, 'createInvoice')

        if (isSuccess) {
          this.$router.push({name: 'Dash.Sent'})          
        }
      },
      back() {
        this.$router.push({name: 'CreateInvoice'})
      },
      saveDraft() {
        console.log('saving draft...')
      }, 
      renderInvoice() {
        
        let tempFunc = _.template(this.template.html)
        this.renderResult = tempFunc(this.invoiceData)
        this.insertCss()
        window.invoiceStore = invoiceStore
      },
      insertCss() {
        let styleNode = document.createElement('style')
        styleNode.type = 'text/css'
        styleNode.appendChild( document.createTextNode(this.template.css) )
        this.$refs.attachPoint.appendChild(styleNode)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .preview-invoice {
    position: relative;
    min-height: 100vh;

    .preview-header {
      height: 48px;
      border-bottom:1px solid #efefef;
      display: flex;
      flex-direction: row;
      align-items: center;      
      .cmd-group {
        margin-left: 1em;
      }
      @media print {
        display: none;
      }
    }
    .preview-area {
      
      background: #e0e0e0;
      width: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      .invoice-positioner {
        display: inline-block;
        background: white;
        box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
        margin: 5mm auto;

      }
    }
  }
</style>
<style>
  
    @page { margin: 0 }
    @media print {
      body {
        width: 215mm;
      }
    }
    @page { size: letter; }


</style>