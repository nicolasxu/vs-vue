<template>
  <div class="create-my-company">
    <form class="uk-form uk-form-stacked uk-width-medium-2-3">

      <fieldset>
        <legend>Create Your Own Company First</legend>
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
        <div class="uk-form-row">
            <div class="uk-form-controls">
                <button class="uk-button uk-button-primary" :disabled="hasCompany||(!allValid)? true: null" @click="createMyCompany">Create </button>
            </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import api from '../util/api'
  import store from '../components/store.js'

  export default {
    name: 'createMyCompany',
    data() {
      return {
        hasCompany: false,
        myCompany: {
            name: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            eid: '',
            invoiceEmails: store.user.email
        }
      }
    },
    computed: {
        allValid() {
            if (this.myCompany && this.myCompany.name && this.myCompany.invoiceEmails) {
                return true
            } else {
                return false
            }
        }
    },
    async created() {
      
      let res = await api.company.getDetail()
      let company = res.data.myCompany
      
      if (company) {
        this.hasCompany = true
      } else {
        this.hasCompany = false
      }
    },
    methods: {
        createMyCompany() {
            let myCompany = $.extend({}, this.myCompany, true)
            myCompany.invoiceEmails = myCompany.invoiceEmails.split(',')
            console.log('myCompany', myCompany)
            api.company.create(myCompany)
        }
    }
  }
</script>


<style lang="sass" scoped>
  .create-my-company {
    padding-top: 50px;
    padding-left: 30px;
   
  }
</style>