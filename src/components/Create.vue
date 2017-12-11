<template>
  <div class="create-invoice">
    <div class="data-input-area">
      <div class="cmd-container">
        <button class="uk-button uk-button-small" type="button" @click="back">Discard</button>
      </div>
      <div class="invoice-control-container">
        <div class="uk-form uk-form-stacked">
    
          <div class="client-select">
            <a href="javascript:void(0)" @click="showClientInput" v-show="!clientInputVisible">{{value && value.name}}</a>

            <div v-show="clientInputVisible">
              <label class="typo__label"></label>
              <multiselect 
              v-model="value" 
              :options="options" 
              :custom-label="nameWithLang" 
              placeholder="Select one" 
              label="name" 
              @select="clientSelected"
              track-by="name"></multiselect>
              <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
            </div>

          </div>
          <div class="tags">
            <select>
              <option>Due Upon Receipt</option>
              <option>Net 7</option>
              <option>Net 15</option>
              <option>Net 30</option>
            </select>
            <select>
              <option>Default</option>
              <option>Law</option>
              <option>Agency</option>
            </select>
          </div>
        
        
          <div class="uk-form-row">
            <label class="uk-form-label" for="form-s-s">Items (Ctrl+i)</label>
            <textarea class="items-textarea" rows="10"></textarea>
          </div>
          <div class="uk-form-row">
            <label class="uk-form-label" for="form-s-t">Notes:</label>
            <div class="uk-form-controls">
              <textarea class="notes-textarea" rows="5" placeholder="Textarea text"></textarea>
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
  import Multiselect from 'vue-multiselect'
  export default {
    name: 'create',
    components: {Multiselect}, 
    data() {
      return {
        value: { name: 'Vue.js', language: 'JavaScript' },
        options: [
          { name: 'Vue.js', language: 'JavaScript' },
          { name: 'Rails', language: 'Ruby' },
          { name: 'Sinatra', language: 'Ruby' },
          { name: 'Laravel', language: 'PHP' },
          { name: 'Phoenix', language: 'Elixir' }
        ],
        clientInputVisible: false
      }
    },
    created() {

    },
    computed: {
  

    },
    methods: {
      back() {
        this.$router.go(-1)
      }, 
      nameWithLang ({ name, language }) {
          return `${name} — [${language}]`
      },
      showClientInput () {
        this.clientInputVisible = true
      }, 
      clientSelected() {
        this.clientInputVisible = false
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
      padding-right: 1em;

      .invoice-control-container {
        .client-select {
          // display: inline-block;
          padding-top: 1em;
          padding-bottom: 1em;
          a {
              font-size: 2em;
            }
        }
        .tags {
          margin-bottom: 1em;
        }
        .items-textarea, .notes-textarea {
          width: 100%;
        }
      }



    }

    .invoice-preview-area {
      
      padding-left: 1em;
      padding-right: 1em;
      margin-left: 40%;
      height: 100vh;
      width: 900px;
   
    }
  }
</style>