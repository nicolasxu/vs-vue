<template>
  <div class="my-company">
 
<form class="uk-form-horizontal uk-margin-large">

    <div class="uk-margin">
        <label class="uk-form-label" for="company-name">Company Name</label>
        <div class="uk-form-controls">
          <input class="uk-input uk-form-width-large uk-form-small" id="company-name" type="text" placeholder="Company name" v-model="name">
        </div>
    </div>

    <div class="uk-margin address">
        <label class="uk-form-label" for="company-address1">Address</label>
        <div class="uk-form-controls">
            <input class="uk-input uk-form-small uk-form-width-large" id="company-address1" type="text" placeholder="Address line 1" v-model="address1">
        </div>
        <div class="uk-form-controls">
          <input class="uk-input  uk-form-small uk-form-width-large" id="company-address2" type="text" placeholder="Address line 2" v-model="address2">
        </div>
        <div class="uk-form-controls">
          <input class="uk-input uk-form-small uk-form-width-small" id="company-address-city" type="text" placeholder="City" v-model="city"> 
          <input class="uk-input uk-form-small uk-form-width-small" id="company-address-state" type="text" placeholder="State" v-model="state"> 
          <input class="uk-input uk-form-small uk-form-width-small" id="company-address-zip " type="text" placeholder="Zip" v-model="zip"> <br/>
          <input class="uk-input uk-form-small uk-form-width-medium" id="company-address-country " type="text" placeholder="Country" v-model="country"> 

        </div>
    </div>

    <div class="uk-margin">
        <div class="uk-form-controls">
          <button class="uk-button uk-button-primary uk-button-small" @click.prevent="save">{{updateBtnText}}</button>
          <router-link class="reset-link" :to="{ name: 'Dash.Received', params: { userId: 123 }}">Cancel</router-link>
        </div>
    </div>

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
            if (res.code === 2000) {
              store.company = res.data.company
              thisComponent.copyFromStore()
            } else {
              throw new Error("getting my company detail error")
            }
          })
          .catch(e=> {
            console.log(e)
          })
      }
    },
    data() {
      return {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        tel: ''
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
        this.name = store.company.name
        this.address1 = store.company.addressLine1
        this.address2 = store.company.addressLine2
        this.city = store.company.city
        this.state = store.company.state
        this.zip = store.company.zip
        this.tel = store.company.tel
        this.country = store.company.country        
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