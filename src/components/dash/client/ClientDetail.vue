<template>
  <div class="client-detail">
    <h3 class="title">Client: {{client.name}}</h3>
    <div class="button-container">
      <button class="uk-button" @click="goBack">Back</button>
      <button class="uk-button uk-button-danger" @click="deleteClient" v-show="client.creatorCompanyId">Delete</button>
      <button class="uk-button uk-button-danger" @click="disconnectClient" v-show="!client.creatorCompanyId">Disconnect</button>
    </div>
    <form class="uk-form uk-form-horizontal uk-margin-large client-detail-form">

      <div class="uk-form-row">
        <label class="uk-form-label">Name: </label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.name}}</span>
          </div>
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Public</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.public}}</span>          
          </div>
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Active</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.active}}</span>          
          </div>          
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Invoice Emails</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.invoiceEmails}}</span>          
          </div>          
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Contact Person</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.invoicePersonName? client.invoicePersonName: 'n/a' }}</span>          
          </div>          
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Address</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.addressLine1? client.addressLine1: 'n/a'}}</span>            
          </div>          
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Tel</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.tel? client.tel: 'n/a'}}</span>            
          </div>
        </div>
      </div>
    </form>

  </div>  
</template>

<script>
  import api from '../../../util/api'
  import processResErrorMixin from '../../../util/processResError.js'
  export default {
    name: 'clientDetail',
    mixins: [processResErrorMixin],
    data() {
      return {
        client: {}
        
      }
    },
    watch: {
   
    },
    async created() {
      let clientId = this.$route.params.id

      let clientDetailRes 
      try {
        clientDetailRes = await api.client.getDetail(clientId)
      } catch (e) {
        console.log('Request error', e)
        return
      }
      
      let shouldContinue = this.processResError(clientDetailRes, 'clientDetail')
      if (!shouldContinue) {
        return
      }

      this.client = clientDetailRes.data.clientDetail
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      async deleteClient() {
        let confirmed = confirm('Are you sure you want to delete this client? ')
        if (!confirmed) {
          return
        }

        let deleteRes

        try {
          deleteRes = await api.client.deletePrivateClient(this.client._id)
        } catch (e) {
          console.log('Request error', e)
          return 
        }

        let isSuccess = this.processResError(deleteRes, 'deleteMyClient')
        if (!isSuccess) {
          return
        }

        this.$notify({
          timeout: 3000,
          group: 'foo',
          type: 'success',
          title: '&#10003; Success',
          text: 'Client deleted...'          
        })

        this.$router.push({name: 'Dash.Client'})

      },
      async disconnectClient() {
        let confirmed = confirm('Are you sure you want to disconnect this client?')
        if (!confirmed) {
          return
        }

        let disconnectRes
        try {
          disconnectRes = await api.client.disconnect(this.client._id)
        } catch (e) {
          console.log('Request error', e)
          return
        }

        let isSuccess = this.processResError(disconnectRes, 'severClientRelationship')

        if (!isSuccess) {
          return
        }
        this.$notify({
          timeout: 3000,
          group: 'foo',
          type: 'success',
          title: '&#10003; Success',
          text: 'Client disconnected...'          
        })

        this.$router.push({name:'Dash.Client'})

      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .client-detail {
    @extend %dash-component-margin-padding;
 
    .client-detail-form {
      label {
      }
      .text {
    
      }
    }
  }
</style>
