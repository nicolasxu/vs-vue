<template>
  <div class="vs-vendor-detail">
    
    <h3 class="title">Vendor: {{vendor.name}}</h3>
    <div class="button-container">
      <button class="uk-button" @click="goBack">Back</button>
      <button class="uk-button uk-button-danger" @click="disconnect" >Disconnect</button>
    </div>
    <form class="uk-form uk-form-horizontal uk-margin-large vendor-detail-form">
      <div class="uk-form-row">
        <label class="uk-form-label">Name: </label>
        <div class="uk-form-controls">
          <div class="text">
            <span>{{vendor.name}}</span> 
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
    name: 'VendorDetail',
    mixins: [processResErrorMixin],
    props: [],
    data() {
      return { 
        vendor: {},
        vendorId: this.$route.params.id
      }
    },
    async created() {

      this.fetch()
    },
    methods: {
      async fetch() {

        let res
        try {
          res = await api.vendor.getDetail(this.vendorId)
        } catch (e) {
          console.log('Get vendor by id error', e)
          return
        }
        let isSuccess = this.processResError(res, 'vendor')
        if (!isSuccess) {
          return
        }

        this.vendor = res.data.vendor

      },
      goBack() {
        this.$router.push({name: 'Dash.Vendor'})
      }, 
      async disconnect () {

        let confirmed = confirm('Are you sure you want to disconnect this vendor?')
        if (!confirmed) {
          return
        }

        let disconnectRes
        try {
          disconnectRes = await api.vendor.sever(this.vendor._id)
        } catch (e) {
          console.log('request error', e)
          return
        }

        let isSuccess = this.processResError(disconnectRes, 'severVendorRelationship')

        if (!isSuccess) {
          return
        }
        this.$notify({
          timeout: 3000,
          group: 'foo',
          type: 'success',
          title: '&#10003; Success',
          text: 'Vendor disconnected...'
        })

        this.$router.push({name: 'Dash.Vendor'})
      }
    }
  }

</script>

<style lang="sass" scoped>
  @import '../../../scss/reusable.scss';
  .vs-vendor-detail {
    @extend %dash-component-margin-padding;
    
  }
</style>