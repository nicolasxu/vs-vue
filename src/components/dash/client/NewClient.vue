<template>
  <div class="new-client">
    <h3>Create New Private Client</h3>
    <form class="uk-form uk-form-stacked">
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-email">Client Email<span class="required-sign">*</span></label>
        <div class="uk-form-controls">
            <input type="text" id="client-email" placeholder="email" class="uk-width-1-2" v-model="client.invoiceEmails">
            <div class="input-note">client's email to receive invoice sent by you</div>
        </div>          
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-name">Client Company Name<span class="required-sign">*</span></label>
        <input type="text" id="client-name" placeholder="company name" class="uk-width-1-2" v-model="client.name">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="addressline1">Address Line 1</label>
        <input type="text" id="addressline1" placeholder="address line 1" class="uk-width-1-2" v-model="client.addressLine1">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="addressline2">Address Line 2</label>
        <input type="text" id="addressline2" placeholder="address line 1" class="uk-width-1-2" v-model="client.addressLine2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="city">City</label>
        <input type="text" id="city" placeholder="city" class="uk-width-1-2" v-model="client.city">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="state">State</label>
        <input type="text" id="state" placeholder="state" class="uk-width-1-2" v-model="client.state">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="zip">Zip</label>
        <input type="text" id="zip" placeholder="xxxxx" class="uk-width-1-2" v-model="client.zip">
      </div>      
      <div class="uk-form-row">
        <label class="uk-form-label" for="country">Country</label>
        <input type="text" id="country" placeholder="country" class="uk-width-1-2" v-model="client.country">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="phone-number">Phone Number</label>
        <input type="text" id="phone-number" placeholder="xxx-xxx-xxxx" class="uk-width-1-2" v-model="client.tel">
      </div>
      <div class="uk-form-row">
        <button type="button" class="uk-button uk-button-primary" @click="createClient">Submit</button>
        <button type="button" class="uk-button" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>

</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'newClient',
    data() {
      return {
        mustConnect: false,
        client: {
          invoiceEmails: '',
          name: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          tel: ''
        }
      }
    },
    methods: {
      cancel() {
        this.$router.go(-1)
      },
      createClient() {
        console.log('api', api)
        api.client.create(this.client)
      }
    }
  }

</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .new-client {
    margin-top: 1em;
    @extend %dash-component-margin-padding;
    .required-sign {
      margin-left: 0.2em;
      color: red;
    }
    .input-note {
      font-size: 12px;
      color: grey;
    }
  }
</style>