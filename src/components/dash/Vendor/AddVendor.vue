<template>
  <div class="add-vendor">
    <h3>Add Vendor</h3>
    <div class="search" v-show="state==='search'">
      <form class="uk-form uk-form-stacked">
        <div class="uk-form-row">
          <div class="uk-form-controls">
            <label class="uk-form-label" for="vendor-email" >
              Vendor Email
              <span class="required-sign">*</span>
            </label>          
            <input type="text" id="vendor-email" 
            placeholder="Vendor Email" 
            class="uk-width-1-3" 
            v-model="email"
            v-validate="'required|email'"
            name="email"
            @keydown.enter.prevent="searchByEmail"
            >
            <span class="return-icon">&#8629; </span>
          </div>          
        </div>
        <div class="uk-form-row">
          <button class="uk-button uk-button-primary uk-button-small" @click.prevent="searchByEmail">Search</button>
        </div>     
      </form>      
    </div>
    <div class="search-result" v-show="state==='search-result'">
      search result
      <div class="uk-form">
        <div class="uk-form-row found-company" v-show="foundCompany._id">
          
          <legend>Result: </legend>
          <div class="checkmark-positioner">
            <div class="checkmark">&#10003;</div> 
          </div>
          <div class="company-info-positioner">
            <div class="name">{{foundCompany.name}} </div>
            <div class="address"><span>Address: </span> 451 Andover St, North Andover, MA 01845</div>
            <div class="tel"><span>Tel: </span>619-204-2004</div>              
          </div>
          <div class="connect-positioner">
            <button class="uk-button uk-button-primary uk-button-small" @click="connect">Connect</button>
            <div class="btn-note">As your vendor</div>
          </div>          



        </div>
        <div class="uk-form-row" v-show="!foundCompany._id">
          <h3>No company found with this email: {{email}}</h3>
        </div>
        <div class="uk-form-row">
          <button class="uk-button uk-button-primary uk-button-small" @click="connect" v-show="foundCompany._id">Connect</button>
          <button class="uk-button uk-button-default uk-button-small" @click="backToSearch">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../util/api'
  import processResErrorMixin from '../../../util/processResError.js'

  export default {
    name: 'AddVendor',
    mixins: [processResErrorMixin],
    data() {
      return {
        state: 'search',
        email: '',
        foundCompany: {}
      }
    },
    methods: {
      async connect() {
        let confirmed = confirm('Are you sure you want to connect this company as vendor?')
        if (!confirmed) {
          return
        }

        let connectRes 
        try {
          connectRes = await api.request.create(this.email, 'vendor')
        } catch (e) {
          console.log('Connect request error')
          return
        }
        let isSuccess = this.processResError(connectRes, 'createRequest')
        if (isSuccess) {
          this.$router.push({name: 'Dash.Request', query: {direction: 'sent'}})
        }        


      },
      backToSearch() {
        this.state = 'search'
      },
      async searchByEmail() {
        let emailValid = this.fields.email && this.fields.email.valid
        if (!emailValid) {
          return
        }
        let findRes
        try {
          findRes = await api.company.findLiveByEmail(this.email)
        } catch (e) {
          console.log('find company error', e)
          return
        }
        let isSuccess = this.processResError(findRes, 'getCompanyByEmail')
        if (!isSuccess) {
          return
        }

        if (findRes.data.getCompanyByEmail._id) {
          this.foundCompany = findRes.data.getCompanyByEmail
        }
        this.state = 'search-result'
      }
    }
  }
</script>


<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';

  .add-vendor {
    @extend %dash-component-margin-padding;
    .required-sign {
      color: red;
    }
    .search {

      .return-icon {
        position: relative;
        left: -25px;
        top: 2px;
      }

    }
    .search-result {
      display: inline-block;
      min-width: 70%;
      .found-company {
        @extend %found-company;         
      }
    }
  }
</style>