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
  import store from '../../Store.js'
  export default {
    name: 'mycompany', 
    data() {
      return {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
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
      save() {
        console.log('save...')

        if (store.company) {
          // call update company api
        } else {
          // call create company api
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