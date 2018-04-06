<template>
  <div class="create-invoice">
    <div class="invoice-frame">
      <div class="scroll-box">
        <div class="data-input-area">
          <div class="cmd-container">
            <button class="uk-button uk-button-small" type="button" @click="back">Discard</button>
            <button class="uk-button uk-button-small uk-button-primary" @click="previewInvoice">Preview</button>
          </div>
          <div class="invoice-control-container">
            <div class="uk-form uk-form-stacked">

           
              <!-- select client -->
              <div class="uk-form-row client-select"> 
                <label class="light-label">To: </label>
                <a href="javascript:void(0)" 
                @click="showClientInput" 
                v-show="!clientInputVisible">{{toCompany && toCompany.name}}</a>

                <div v-show="clientInputVisible" >
                  <label class="typo__label"></label>
                  <multiselect
                  v-model="toCompany"
                  :options="foundClients"
                  :allow-empty="false"
                  :custom-label="nameWithLang"
                  :limit="7"
                  :options-limit="7"
                  placeholder="Select one" 
                  label="name"
                  track-by="name"
                  @select="clientSelected"
                  @close="selectDropdownClose"
                  @search-change="asyncFindClient"
                  >
                  </multiselect>
                </div>
              </div>
              <!-- tags: Invoice Date, Due Date, Template -->
              <div class="uk-form-row tags">
                <div class="invoice-element-tag">
                  <label class="light-label">Invoice Date</label>
                  <form class="uk-form">
                    <Datepicker placeholder="Select Date" v-model="invoiceDate"></Datepicker>
                  </form>      
                </div>
                <div class="invoice-element-tag">
                  <label class="light-label">Due Date</label>
                  <select v-model="term">
                    <option v-for="option, index in terms" :value="option" :key="index">{{option.desc}}</option>
                  </select>              
                </div>            
                <div class="invoice-element-tag">
                  <label class="light-label">Template</label>
                  <select v-model="template">
                    <option v-for="t, index in templates" :value="t" :key="index">{{t.name}}</option>
                  </select>              
                </div>
              </div>
              <!-- Item table -->
              <div class="uk-form-row">

                <label class="uk-form-label" for="form-s-s">Items (Ctrl+i)</label>
                <InputTable 
                :headers="columns" 
                :rows="invoiceData.items"
                >
                </InputTable>
                <div class="add-row-positioner">
                  <button class="uk-button uk-button-small uk-button-primary" @click="addRow">Add Row</button>                  
                </div>

              </div>
              <!-- Notes -->
              <div class="uk-form-row">
                <label class="uk-form-label" for="form-s-t">Notes:</label>
                <div class="uk-form-controls">
                  <textarea class="notes-textarea" rows="5" placeholder="Textarea text" v-model="invoiceData.note"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../util/api'
  import Multiselect from 'vue-multiselect'
  import InputTable from './InputTable.vue'
  import Datepicker from 'vuejs-datepicker'
  import invoiceStore from './createInvoiceStore.js'
  import store from '../../../components/store.js'


  export default {
    name: 'create',
    components: {Multiselect, InputTable, Datepicker}, 
    data() {
      return {
        messageOri: 'Nick',
        foundClients: [],
        clientInputVisible: false,
        columns: ['#', 'Description', 'Unit Price', 'Quantity', 'Sub Total'],
        templates: [{_id: '1234345', name: 'Default'}, {_id: '2', name: 'Law'}, {_id: '3', name: 'Agency'}],
        terms: [
          {day: 0, desc: 'Due On Receipt' }, 
          {day: 7, desc: 'Net 7'}, 
          {day: 15, desc: 'Net 15'},
          {day: 30, desc: 'Net 30'}
        ],
        invoiceData: invoiceStore.state.invoice
      }
    },
    computed: {
      invoiceDate:{
        get() {
          console.log('getter called')
          return this.invoiceData.invoiceDate
        },
        set(val) {
          console.log('setter called..')
          invoiceStore.setInvoiceDate(val)
        }
      },
      toCompany: {
        get() {
          return this.invoiceData.toCompany
        },
        set(value) {
          invoiceStore.setToCompany(value)
        }
      },
      term: {
        get() {
          return this.invoiceData.term
        },
        set(value) {
          invoiceStore.setTerm(value)
        }
      },
      template: {
        get() {
          return this.invoiceData.template
        },
        set(t) {
          invoiceStore.setTemplate(t)
        }
      }
    },
    async created() {

      // todo:
      // 1. get templates
      // 2. get myCompany
            

      this.invoiceData = invoiceStore.state.invoice
      if (!this.invoiceData.term.day) {
        // init term value
        
        invoiceStore.setTerm(this.terms[0]) 
      }

      if (!this.invoiceData.template._id) {
        console.log('set template called...')
        invoiceStore.setTemplate(this.templates[0])
      }



    },
    mounted () {
      

    },
    beforeDestroy() {
      let a = 2
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
        
        /* 
        Defer the callback to be executed after the next DOM update cycle. Use 
        it immediately after you’ve changed some data to wait for the DOM update.
        */
        this.$nextTick(()=> {
          let $input = $('.multiselect__input')
          $input.focus()
          this.asyncFindClient('')
        })
      }, 
      clientSelected() {
        this.clientInputVisible = false
      },
      selectDropdownClose(value, id) {
       
        this.clientInputVisible = false
      },
      async asyncFindClient(query) {
        let res = await api.client.searchMock(query)
        this.foundClients = res

      },
      previewInvoice() {
        
        // todo: update store
        this.$router.push({name: 'CreateInvoice.Preview'})
      },
      addRow(){
        invoiceStore.addNewItemsRow()
      }

    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .create-invoice {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;

    .invoice-frame {

      margin-top: 1em;
      border: 5px dashed lightgrey;
      width: 1024px;
      margin-left: auto;
      margin-right: auto;
      height: 100vh;
    }

    .cmd-container {
      @extend %cmd-container;
    }


    .data-input-area {
   
      box-sizing: border-box;
      
      // float: left;
      display: inline-block;
      // width: 50%;
      width: 100%;
      // border-right: 1px solid lightgrey;
      padding-left: 1em;
      padding-right: 1em;
      .invoice-element-tag {
        display:inline-block;
      }
      .light-label {
        display: block;
        margin-bottom: 0;
        font-weight: 100;
        font-size: 12px;
      }

      .invoice-control-container {
        .client-select {
          // display: inline-block;
          margin-top: 1em;
          margin-bottom: 1em;
          a {
              font-size: 2em;
              display: inline-block;
              line-height: 1.4em;
            }
        }
        .tags {
          margin-bottom: 1em;
        }
        .items-textarea, .notes-textarea {
          width: 100%;
        }
        .add-row-positioner {
          margin-top: 0.6em;
        }
      }
    }
  }
</style>

<style>
  fieldset[disabled] .multiselect {
    pointer-events: none;
  }

  .multiselect__spinner {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 48px;
    height: 35px;
    background: #fff;
    display: block;
  }

  .multiselect__spinner:before,
  .multiselect__spinner:after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    margin: -8px 0 0 -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border-color: #41B883 transparent transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px transparent;
  }

  .multiselect__spinner:before {
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
    animation-iteration-count: infinite;
  }

  .multiselect__spinner:after {
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite;
  }

  .multiselect__loading-enter-active,
  .multiselect__loading-leave-active {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
  }

  .multiselect__loading-enter,
  .multiselect__loading-leave-active {
    opacity: 0;
  }

  .multiselect,
  .multiselect__input,
  .multiselect__single {
    font-family: inherit;
    font-size: 14px;
    touch-action: manipulation;
    background-color: white;
    border: none !important;
  }

  .multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
    min-height: 40px;
    text-align: left;
    color: #35495E;
  }

  .multiselect * {
    box-sizing: border-box;
  }

  .multiselect:focus {
    outline: none;
  }

  .multiselect--disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .multiselect--active {
    z-index: 50;
  }

  .multiselect--active:not(.multiselect--above) .multiselect__current,
  .multiselect--active:not(.multiselect--above) .multiselect__input,
  .multiselect--active:not(.multiselect--above) .multiselect__tags {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .multiselect--active .multiselect__select {
    transform: rotateZ(180deg);
  }

  .multiselect--above.multiselect--active .multiselect__current,
  .multiselect--above.multiselect--active .multiselect__input,
  .multiselect--above.multiselect--active .multiselect__tags {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0;
  }

  .multiselect__input,
  .multiselect__single {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    padding: 0 0 0 5px;
    width: calc(100%);
    transition: border 0.1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
  }

  .multiselect__tag ~ .multiselect__input,
  .multiselect__tag ~ .multiselect__single {
    width: auto;
  }

  .multiselect__input:hover,
  .multiselect__single:hover {
    border-color: #cfcfcf;
  }

  .multiselect__input:focus,
  .multiselect__single:focus {
    border-color: #a8a8a8;
    outline: none;
    background-color: white !important;
  }

  .multiselect__single {
    padding-left: 6px;
    margin-bottom: 8px;
  }

  .multiselect__tags-wrap {
    display: inline
  }

  .multiselect__tags {
    min-height: 40px;
    display: block;
    padding: 2px 40px 0 2px;
    border-radius: 5px;
    border: 1px solid #E8E8E8;
    background: #fff;
  }

  .multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #41B883;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
  }

  .multiselect__tag-icon {
    cursor: pointer;
    margin-left: 7px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-weight: 700;
    font-style: initial;
    width: 22px;
    text-align: center;
    line-height: 22px;
    transition: all 0.2s ease;
    border-radius: 5px;
  }

  .multiselect__tag-icon:after {
    content: "×";
    color: #266d4d;
    font-size: 14px;
  }

  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
    background: #369a6e;
  }

  .multiselect__tag-icon:focus:after,
  .multiselect__tag-icon:hover:after {
    color: white;
  }

  .multiselect__current {
    line-height: 16px;
    min-height: 40px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    padding: 8px 12px 0;
    padding-right: 30px;
    white-space: nowrap;
    margin: 0;
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid #E8E8E8;
    cursor: pointer;
  }

  .multiselect__select {
    line-height: 16px;
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 40px;
    height: 38px;
    right: 1px;
    top: 1px;
    padding: 4px 8px;
    margin: 0;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .multiselect__select:before {
    position: relative;
    right: 0;
    top: 65%;
    color: #999;
    margin-top: 4px;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #999999 transparent transparent transparent;
    content: "";
  }

  .multiselect__placeholder {
    color: #ADADAD;
    display: inline-block;
    margin-bottom: 10px;
    padding-top: 2px;
  }

  .multiselect--active .multiselect__placeholder {
    display: none;
  }

  .multiselect__content-wrapper {
    position: absolute;
    display: block;
    background: #fff;
    width: 100%;
    max-height: 240px;
    overflow: auto;
    border: 1px solid #E8E8E8;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 50;
    -webkit-overflow-scrolling: touch;
  }

  .multiselect__content {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
    min-width: 100%;
    vertical-align: top;
  }

  .multiselect--above .multiselect__content-wrapper {
    bottom: 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: none;
    border-top: 1px solid #E8E8E8;
  }

  .multiselect__content::webkit-scrollbar {
    display: none;
  }

  .multiselect__element {
    display: block;
  }

  .multiselect__option {
    display: block;
    padding: 12px;
    min-height: 40px;
    line-height: 16px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
  }

  .multiselect__option:after {
    top: 0;
    right: 0;
    position: absolute;
    line-height: 40px;
    padding-right: 12px;
    padding-left: 20px;
  }

  .multiselect__option--highlight {
    background: #41B883;
    outline: none;
    color: white;
  }

  .multiselect__option--highlight:after {
    content: attr(data-select);
    background: #41B883;
    color: white;
  }

  .multiselect__option--selected {
    background: #F3F3F3;
    color: #35495E;
    font-weight: bold;
  }

  .multiselect__option--selected:after {
    content: attr(data-selected);
    color: silver;
  }

  .multiselect__option--selected.multiselect__option--highlight {
    background: #FF6A6A;
    color: #fff;
  }

  .multiselect__option--selected.multiselect__option--highlight:after {
    background: #FF6A6A;
    content: attr(data-deselect);
    color: #fff;
  }

  .multiselect--disabled {
    background: #ededed;
    pointer-events: none;
  }

  .multiselect--disabled .multiselect__current,
  .multiselect--disabled .multiselect__select {
    background: #ededed;
    color: #a6a6a6;
  }

  .multiselect__option--disabled {
    background: #ededed;
    color: #a6a6a6;
    cursor: text;
    pointer-events: none;
  }

  .multiselect__option--disabled.multiselect__option--highlight {
    background: #dedede !important;
  }

  .multiselect-enter-active,
  .multiselect-leave-active {
    transition: all 0.15s ease;
  }

  .multiselect-enter,
  .multiselect-leave-active {
    opacity: 0;
  }

  .multiselect__strong {
    margin-bottom: 8px;
    line-height: 20px;
    display: inline-block;
    vertical-align: top;
  }

  *[dir="rtl"] .multiselect {
      text-align: right;
  }

  *[dir="rtl"] .multiselect__select {
      right: auto;
      left: 1px;
  }

  *[dir="rtl"] .multiselect__tags {
      padding: 8px 8px 0px 40px;
  }

  *[dir="rtl"] .multiselect__content {
      text-align: right;
  }

  *[dir="rtl"] .multiselect__option:after {
      right: auto;
      left: 0;
  }

  *[dir="rtl"] .multiselect__clear {
      right: auto;
      left: 12px;
  }

  *[dir="rtl"] .multiselect__spinner {
      right: auto;
      left: 1px;
  }

  @keyframes spinning {
    from { transform:rotate(0) }
    to { transform:rotate(2turn) }
  }
</style>

<style lang="sass">
  .client-select {
    .multiselect {
      z-index:1050;
    }    
  }
</style>