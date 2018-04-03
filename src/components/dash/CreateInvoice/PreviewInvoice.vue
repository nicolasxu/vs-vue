<template>
  <div class="preview-invoice">
    <div class="preview-header">
      <div class="cmd-group">
        <button class="uk-button uk-button-small uk-button-primary" @click="send">Send</button>
        <button class="uk-button uk-button-small" @click="back">Back</button>
        <button class="uk-button uk-button-small" type="button" @click="saveDraft">Save Draft</button>
      </div>

      <div class="preview-area">
        preview area
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'PreviewInvoice',
    components: {},
    data() {
      return {

      }
    },
    created() {
      // todo:
      // 1. get template
      // 2. render template from store.invoiceData
      // 3. update preview area
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
      }
    }
  }
</script>

<style lang="sass" scoped>
  .preview-invoice {
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
  }
</style>