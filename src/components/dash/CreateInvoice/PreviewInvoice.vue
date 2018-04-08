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
      
      
      <div class="invoice-positioner">
        <div v-html="renderedInvoice"></div>
      </div>
      
    </div>    

  </div>
</template>

<script>
  import api from '../../../util/api'
  import invoiceStore from './createInvoiceStore.js'

  export default {
    name: 'PreviewInvoice',
    components: {},
    data() {
      return {
        template: {},
        renderedInvoice: '',
        invoiceData: invoiceStore.state.invoiceRenderData  
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
      this.template = res.data.getTemplateById

      this.renderInvoice()
    },
    mounted() {
      this.$notify({
        group: 'foo',
        title: 'Important message',
        text: 'Hello user! This is a notification'
      })
    },
    methods: {
      send() {
        console.log('sending invoice...')
      },
      back() {
        this.$router.push({name: 'CreateInvoice'})
      },
      saveDraft() {
        console.log('saving draft...')
      }, 
      renderInvoice() {
        this.renderedInvoice = "<h1>nick</h1>"
      }
    }
  }
</script>

<style lang="sass" scoped>
  .preview-invoice {
    position: relative;
    height: 100vh;
    .preview-header {
      height: 48px;
      border-bottom:1px solid #efefef;
      display: flex;
      flex-direction: row;
      align-items: center;      
      .cmd-group {
        margin-left: 1em;
      }
    }
    .preview-area {
      position: absolute;
      top: 49px;
      bottom: 0;
      background: #e0e0e0;
      width: 100%;
      margin: 0;
      display: flex;
      // flex-direction: row;
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