<template>
  <div class="add-client">
    <h3>Add Client</h3>

    <div> search block</div>
    <div> search result block, connect btn, new search btn, show create btn </div>
    <div> create new client form, actual create btn </div>

    <form class="uk-form uk-form-stacked">
      <div class="uk-form-row">
        <label class="uk-form-label" for="client-email" >
          Client Email
          <span class="required-sign">*</span>
        </label>
        <div class="uk-form-controls">
          <input type="text" id="client-email" 
          placeholder="Client Email" 
          class="uk-width-1-3" 
          v-model="email"
          v-validate="'required|email'"
          name="email"
          @focusout="focusout"
          >
        </div>
      </div>
      <div class="uk-form-row">
        <div class="search-result" v-show="showSearchResult">
          <div class="uk-form-row found-company" v-show="!err_code">
            <legend>Result: </legend>
            <div class="checkmark-positioner"> <div class="checkmark">&#10003;</div> </div>
            <div class="company-info-positioner">
              <div class="name">Law Offices Of Meridith Gregory Gallant LLC</div>
              <div class="address"><span>Address: </span> 451 Andover St, North Andover, MA 01845</div>
              <div class="tel"><span>Tel: </span>619-204-2004</div>              
            </div>

          </div>
            {{err_code}}
            {{err_msg}}
          <div class="uk-form-row create-private-form" v-show="err_code===4002">
            create form
          </div>
          <div class="uk-form-row command-button">
            <button class="uk-button uk-button-primary" v-show="foundCompany._id" @click.prevent="connect">Connect</button>
            <button class="uk-button uk-button-primary" v-show="!foundCompany._id" @click.prevent="create">Create</button>
          </div>
        </div>
      </div>       
    </form>
  </div>
</template>


<script>
  import api from '../../../util/api'
  export default {
    name: 'AddClient',
    data() {
      return {
        email: '',
        err_msg: '',
        err_code: null,
        foundCompany: {},
        showSearchResult: false
      }
    },
    watch: {
      email(newEmail, oldEmail) {
        this.showSearchResult = false
      }
    },
    methods: {
      async focusout() {
        console.log('focus out...')
        let emailValid = this.fields.email && this.fields.email.valid
        if (!emailValid) {
          return
        }
        let findRes
        try {
          findRes = await api.company.findLiveByEmail(this.email)
        } catch(e) {
          console.log('find company error', e)
          return
        }

        if (findRes.err_code === 4002) {
          // token expired
          this.$router.push({name:'Login'})
          return
        }

        
        this.err_msg = findRes.data.getCompanyByEmail.err_msg
        this.err_code = findRes.data.getCompanyByEmail.err_code
          
        
        this.foundCompany = findRes.data.getCompanyByEmail
        this.showSearchResult = true
      },
      connect() {
        let confirmed = confirm('Are you sure you want to send client request to this company? ')
        if (!confirmed) {
          return
        }

        // TODO: ...
      },
      create() {
        console.log('create...')
      }

    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .add-client {
    @extend %dash-component-margin-padding;    
    .required-sign {
      color: red;
    }
    .found-company {
      vertical-align: middle;
      .name {
        font-size: 20px;
        font-weight: bold;
      }
      .address {

      }
      .tel {

      }

      .checkmark-positioner, .company-info-positioner {
        display: inline-block;
            vertical-align: middle;
      }
      .checkmark-positioner {
        .checkmark {
          padding: 0.5em;
          font-size: 25px;
          color: green;
        }
    }
    }

  }

</style>