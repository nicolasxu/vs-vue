<template>
  <div class="vs-vendor-detail">
    
    <h3 class="title">Vendor: {{vendor.name}}</h3>
    <div class="button-container">
      <button class="uk-button" @click="goBack">Back</button>
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
      goBack() {
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