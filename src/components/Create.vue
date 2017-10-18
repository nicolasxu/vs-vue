<template>
  <div class="create-invoice">
    Create
    <div class="data-input-area">
      data input
    </div>
    <div class="invoice-preview-area">
      invoice preview
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create', 
    data() {
      return {

      }
    },
    created() {

    },
    computed: {
  

    }
  }
</script>

<style lang="sass" scoped>
  .create-invoice {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;


    .data-input-area {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 34%;
      min-width: 300px;
      background-color: grey;
    }

    .invoice-preview-area {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 66%;
      min-width: 600px;
      background-color: pink;
      // #vs-invoice-container {

      // }
    }
  }
</style>