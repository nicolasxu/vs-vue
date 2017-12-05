<template>
  <div class="create-invoice">

    <div class="data-input-area">
      <div class="cmd-container">
        <button class="uk-button uk-button-small" type="button" @click="back">Discard</button>
       
      </div>
      <div class="invoice-control-container">
        <div class="uk-form uk-form-stacked">
          Client, Net 30, Template (dropdown)


          <div class="uk-form-row">
            <label class="uk-form-label" for="form-s-s">Items (Ctrl+i)</label>
            <textarea name="" cols="65" rows="10"></textarea>
            
          </div>

          <div class="uk-form-row">
            <label class="uk-form-label" for="form-s-t">Notes:</label>
            <div class="uk-form-controls">
              <textarea id="form-s-t" cols="65" rows="5" placeholder="Textarea text"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>







    <div class="invoice-preview-area">
      <div class="cmd-container">
        <button class="uk-button uk-button-primary uk-button-small" type="button">Send</button>
        <button class="uk-button uk-button-primary uk-button-small" type="button">Draft</button>

      </div>
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
  

    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../scss/reusable.scss';
  .create-invoice {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;

    .cmd-container {
      @extend %cmd-container;
    }


    .data-input-area {
      box-sizing: border-box;
      height: 100vh;
      float: left;
      display: inline-block;  
      width: 40%;
      border-right: 1px solid lightgrey;
      padding-left: 1em;

      .vs-items-container {
        padding-left: 0;
        position: relative;
        .vs-item {
          list-style: none;
          .quantity-input {
            width: 4em;
            position:absolute;
            right: 1em;
          }
        }
      }

    }

    .invoice-preview-area {
      
      padding-left: 1em;
      margin-left: 40%;
      height: 100vh;
      width: 900px;
     

   
    }
  }
</style>