<template>
  <div class="add-client">
    <h3>Add Client</h3>

    <div class="search" v-show="state==='search'"> 
      <form class="uk-form uk-form-stacked">
        <div class="uk-form-row">
          <div class="uk-form-controls">
            <label class="uk-form-label" for="client-email" >
              Client Email
              <span class="required-sign">*</span>
            </label>          
            <input type="text" id="client-email" 
            placeholder="Client Email" 
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
      <div class="search-result" >
        <div class="uk-form">
          <div class="uk-form-row found-company" v-show="!err_code">
            <legend>Result: </legend>
            <div class="checkmark-positioner"> <div class="checkmark">&#10003;</div> </div>
            <div class="company-info-positioner">
              <div class="name">Law Offices Of Meridith Gregory Gallant LLC</div>
              <div class="address"><span>Address: </span> 451 Andover St, North Andover, MA 01845</div>
              <div class="tel"><span>Tel: </span>619-204-2004</div>              
            </div>
          </div>          
        </div>

        <div class="uk-form-row"> 
          {{err_code}} <br/>
          {{err_msg}}            
        </div>
        <div class="uk-form-row">
          <button class="uk-button uk-button-default uk-button-small" @click="backToSearch">Back</button>
          <button class="uk-button uk-button-primary uk-button-small" @click="connect" v-show="foundCompany._id">Connect</button>
          <button class="uk-button uk-button-primary uk-button-small" @click="create" v-show="err_code===4002">Create</button>

        </div>
      </div>      
    </div>
    <div class="create-client" v-show="state==='create-client'">
      <div class="uk-form uk-form-stacked creat-company-form">
        
        <div class="uk-form-row">
          <legend>Identity</legend>
        </div>
        
        <div class="uk-form-row">        
          <label class="uk-form-label" for="company-name">Client Business Name</label>
          <div class="uk-form-controls">
            <input type="text" 
            placeholder="Name" id="company-name" 
            class="uk-form-width-large"
            v-model="client.name"/>
          </div>
        </div>
        <div class="uk-form-row">        
          <label class="uk-form-label" for="invoice-email">Client Email To Receive Invoice</label>
          <div class="uk-form-controls">
            <input type="text" 
            placeholder="Email" id="invoice-email" 
            class="uk-form-width-large"
            v-model="client.invoiceEmails[0]"/>
          </div>
        </div>        
        
        <div class="uk-form-row">
          <legend>Address</legend>
        </div>
        
        <div class="uk-form-row">
          <label class="uk-form-label">Address line 1</label>
          <div class="uk-form-controls">
            
            <input type="text" placeholder="line 1" 
            id="add-line1" 
            class="uk-form-width-large"
            v-model="client.addressLine1"/>
          </div>            
        </div>
        <div class="uk-form-row">
          <label class="uk-form-label" for="add-line2">Address line 2</label>
          <div class="uk-form-controls">
            <input type="text" 
            placeholder="line 2" 
            id="add-line2" 
            class="uk-form-width-large" 
            v-model="client.addressLine2"/>
          </div>            
        </div>
        <div class="uk-form-row vs-grid">
          <div class="half-width">
            <label class="uk-form-label" for="city">City</label>
            <div class="uk-form-controls">
              <input type="text" placeholder="City" id="city"
              v-model="client.city" />
            </div>              
          </div>
          <div class="half-width">
            <label class="uk-form-label" for="city">State</label>
            <div class="uk-form-controls">
              <input type="text" placeholder="State" id="city" 
              v-model="client.state"/>
            </div>              
          </div>
        </div>
        <div class="uk-form-row vs-grid">
          <div class="half-width">
            <label class="uk-form-label" for="zip">Zip</label>
            <div class="uk-form-controls">
              <input type="text" placeholder="zip" id="zip" 
              v-model="client.zip"/>
            </div>              
          </div>
          <div class="half-width">
            <label class="uk-form-label" for="country">Country</label>
            <div class="uk-form-controls">
              
              <input type="text" placeholder="country" id="country" 
              v-model="client.country"/>
            </div>              
          </div>
        </div>
        <div class="uk-form-row">
          <legend>Additional</legend>        
        </div>
        <div class="uk-form-row vs-grid">
          <div class="half-width">
            <label class="uk-form-label" for="client-website">Website</label>
            <div class="uk-form-controls">
              <input type="text"
              placeholder="website"
              id="client-website" 
              class="uk-form-width-large" 
              v-model="client.website"/>
            </div>              
          </div>
          <div class="half-width">
            <label class="uk-form-label" for="client-website">Tel</label>
            <div class="uk-form-controls">
              <input type="text"
              placeholder="xxx-xxx-xxxx"
              id="client-website" 
              class="uk-form-width-large" 
              v-model="client.tel"/>
            </div>            
          </div>
          
        </div>

        <div class="uk-form-row">
          <label class="uk-form-label" for="client-website">Product & Service </label>
          <div class="uk-form-controls">
            <textarea type="text"
            placeholder="description"
            id="client-website" 
            class="uk-form-width-large" 
            v-model="client.serviceDesc"/>
            </textarea>
          </div>            
        </div>        

        <div class="uk-form-row">
          <button class="uk-button uk-button-default uk-button-small" @click.prevent="backToSearch">Back</button>
          <button class="uk-button uk-button-primary uk-button-small" @click.prevent="createClientSubmit">Submit</button>
        </div>
        <div class="uk-form-row" v-show="clientErrCode">
          <div class="uk-alert">
            {{cleintErrMsg}}
          </div>
        </div>      
      </div>

    </div>
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
        searchDone: false,
        createClient: false,
        state: 'search', // 'search-result', 'create-client'
        client: {
          name: '',
          invoiceEmails: [''],
          addressLine1: '',
          addressLine2:'',
          city: '',
          state: '',
          zip: '',
          country: '',
          tel: '',
          website: '',
          serviceDesc: ''
        },
        clientErrCode: '',
        cleintErrMsg: ''
      }
    },
    watch: {
      email(newEmail, oldEmail) {
        this.searchDone = false
      }
    },
    methods: {
      async searchByEmail() {
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
        this.state = 'search-result' 
      },
      connect() {
        let confirmed = confirm('Are you sure you want to send client request to this company? ')
        if (!confirmed) {
          return
        }

        // TODO: ...
      },
      create() {
        this.state = 'create-client'
        this.client.invoiceEmails[0] = this.email
      },
      backToSearch() {
        this.state = 'search'
      },
      async createClientSubmit() {
        let confirmed = confirm('Are you sure you want to create this client?')
        if (!confirmed) {
          return
        }
        this.clientErrCode = ''
        this.cleintErrMsg = ''
        // api.client.create(this.client)
        let createRes

        try {
          createRes = await api.client.create(this.client)
        } catch (e) {
          console.log('create client error', e)
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: e.message
          })
          return
        }
        if (createRes.err_code === 4002) {
          this.$router.push({name: 'Login'})
          return
        }

        if (createRes.errors && createRes.errors.length > 0) {
          this.$notify({
                timeout: 3000,
                group: 'foo',
                type: 'error',
                title: 'Error',
                text: createRes.errors[0].message
              })          
          return
        }

        if (createRes.data.createMyClient.err_code) {
          this.cleintErrMsg = createRes.data.createMyClient.err_msg
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: createRes.data.err_msg
          })          
        } else {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'success',
            title: '&#10003; Success',
            text: 'Create client success'          
          })
          this.$router.push({name: 'Dash.Client'})

        }

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
    .search {
      .return-icon {
        position: relative;
        left: -25px;
        top: 2px;
      }
      #client-email {
        padding-right: 28px;
      }
    }
    .search-result {
      display: inline-block;
      min-width: 70%;
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
    .create-client {
      .creat-company-form {
        max-width: 500px;
        legend {
          color: #5190e6;
          font-weight: bold;
          border: none;
          &::after {
            border-bottom: none;
          }
        }
        label {
          font-weight: normal;
        }
        .vs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-gap: 20px;
          .half-width {
            input {
              width: 100%;
            }
          }
          &::after, &::before {
            display: none; // remove pseudo class added by uikit 2 
          }        
        }

      }
    }



  }

</style>