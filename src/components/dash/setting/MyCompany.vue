<template>
  <div class="my-company">
 
<form class="uk-form uk-form-stacked uk-width-medium-2-3">
  <fieldset>
    <legend>Your company setting</legend>
      <div class="uk-form-row">
          <label class="uk-form-label" for="company-name">Company Name</label>
          <div class="uk-form-controls">
              <input type="text" id="company-name" placeholder="name" class="uk-form-width-large" v-model="myCompany.name">
          </div>
      </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">Address Line 1</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="address line 1" class="uk-form-width-large" v-model="myCompany.addressLine1">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">Address Line 2</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="address line 2" class="uk-form-width-large" v-model="myCompany.addressLine2">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">City</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="city" class="uk-form-width-large" v-model="myCompany.city">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">State</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="state" class="uk-form-width-large" v-model="myCompany.state">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">Zip</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="zip" class="uk-form-width-large" v-model="myCompany.zip">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">Country</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="country" class="uk-form-width-large" v-model="myCompany.country">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">EID</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="eid" class="uk-form-width-large" v-model="myCompany.eid">
            </div>
        </div>
        <div class="uk-form-row">
            <label class="uk-form-label" for="company-name">Invoice Receiving Email</label>
            <div class="uk-form-controls">
                <input type="text" id="company-name" placeholder="emails" class="uk-form-width-large" v-model="myCompany.invoiceEmails">
            </div>
        </div>         
  </fieldset>

</form>

  </div>
</template>

<script>
  import store from '../../store.js'
  import {api} from '../../../util/api'
  export default {
    name: 'mycompany',
    created () {
      if (store.company) {
   
        this.copyFromStore()
      } else {
        let thisComponent = this
        api.company.getMyCompany()
          .then(res => {
            
            if (res.data.myCompany !== null) {
              store.company = res.data.company
              thisComponent.copyFromStore()
            } else {
              throw new Error("my company detail is empty")
            }
          })
          .catch(e=> {
            console.log(e)
          })
      }
    },
    data() {
      return {
        myCompany: {
          name: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          eid: '',
          invoiceEmails: ''        
        }
      }
    },
    computed: {
      updateBtnText () {
        if (store.company) {
          return 'Update'
        } else {
          return 'Create'
        }
      }
    },
    methods: {
      copyFromStore () {
        this.myCompany = $.extend({}, store.company)
       
      },

      save() {
        console.log('save...')

        if (store.company) {
          // call update company api

        } else {
          // call create company api
          let companyJson = {
            name: this.name,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            zip: this.zip,
            country: this.country,
            tel:'',
            eid: ''
          }
          api.company.create(companyJson)
            .then(res => {
              console.log(res)
              store.company = res.data.company
            })
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .my-company {
    // background-color: yellow;
    .address {
      .uk-input {
        margin-bottom: 8px;
      }
    }
  }
</style>