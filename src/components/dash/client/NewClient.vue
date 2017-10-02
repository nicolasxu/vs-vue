<template>
  <div class="new-client">
    <h3>Create New Private Client</h3>
    <form class="uk-form uk-form-stacked">
      <div class="uk-form-row">
        <label class="uk-form-label" for="form-s-it">Client Email<span class="required-sign">*</span></label>
        <div class="uk-form-controls">
            <input type="text" id="form-s-it" placeholder="email" class="uk-width-1-2">
            <div class="input-note">client's email to receive invoice sent by you</div>
        </div>          
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-name">Client Company Name<span class="required-sign">*</span></label>
        <input type="text" id="client-name" placeholder="company name" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="addressline1">Address Line 1</label>
        <input type="text" id="addressline1" placeholder="address line 1" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="addressline2">Address Line 2</label>
        <input type="text" id="addressline2" placeholder="address line 1" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="city">City</label>
        <input type="text" id="city" placeholder="city" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="state">State</label>
        <input type="text" id="state" placeholder="state" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="country">Country</label>
        <input type="text" id="country" placeholder="country" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label" for="phone-number">Phone Number</label>
        <input type="text" id="phone-number" placeholder="country" class="uk-width-1-2">
      </div>
      <div class="uk-form-row">
        <button type="button" class="uk-button uk-button-primary">submit</button>
        <button type="button" class="uk-button">Cancel</button>
      </div>
    </form>
  </div>

</template>

<script>
  export default {
    name: 'newClient',
    data() {
      return {
        mustConnect: false
      }
    },
    methods: {

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