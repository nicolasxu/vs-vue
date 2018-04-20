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
            <span>{{vendor.name}} - test</span> 
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>

  import api from '../../../util/api'
  export default {
    name: 'VendorDetail',

    props: [],
    data() {
      return { 
        vendor: {}
      }
    },
    async created() {
      let vendorId = this.$route.params.id
      console.log('vendorId', vendorId)
      let res
      try {
        res = await api.vendor.getDetail(vendorId)
      } catch (e) {
        console.log('Get vendor by id error', e)
        res = {}
      }
      if (res.data && !res.data.vendor.err_code) {
        this.vendor = res.data.vendor
      }
    },
    methods: {
      processResError(res, name) {

        if (!res) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: ''            
          })
          return false
        }

        if (res.err_code === 4002) {
          this.$router.push({name: 'Login'})
          return false
        }

        if (res.errors && res.errors.length > 0) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: res.errors[0]
          })     
          return false
        }

        if (!res.data[name]) {
          this.$notify({
              timeout: 3000,
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: name + ' is empty'
            })   
          return false
        }

        if (res.data[name].err_code) {
          this.$notify({
            timeout: 3000,
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: res.data[name].err_msg
          })     
          return false  
        }

        return true
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

        let shouldContinue = this.processResError(disconnectRes, 'severVendorRelationship')

        if (!shouldContinue) {
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