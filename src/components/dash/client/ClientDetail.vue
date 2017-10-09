<template>
  <div class="client-detail">
    <h3 class="title">Client: {{client.name}}</h3>
    <button class="uk-button" @click="goBack">Back</button>
    <form class="uk-form-horizontal uk-margin-large client-detail-form">

      <div class="uk-margin">
        <label class="uk-form-label">Name: </label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.name}}</span>
          </div>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Public</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.public}}</span>          
          </div>
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Active</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.active}}</span>          
          </div>          
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Invoice Emails</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.invoiceEmails}}</span>          
          </div>          
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Contact Person</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.invoicePersonName? client.invoicePersonName: 'n/a' }}</span>          
          </div>          
        </div>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">Address</label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{client.addressLine1? client.addressLine1: 'n/a'}}</span>            
          </div>          
        </div>
      </div>
      <div class="uk-margin">
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
  export default {
    name: 'clientDetail',
    data() {
      return {
        client: {}
      }
    },
    async created() {
      let clientId = this.$route.params.id

      let res = await api.client.getDetail(clientId)
     
      this.client = res.data.clientDetail
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .client-detail {
    .title {
      border-left: 3px solid #1FA2D6;
      padding-left: 10px;

    }
    .client-detail-form {
      label {
        text-align: right;
      }
      .text {
        line-height: 31px;
        min-height: 31px;
      }
    }
  }
</style>
