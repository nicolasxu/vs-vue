<template>
  <div class="vs-vendor-list">

    <table class="uk-table uk-table-hover uk-table-striped vendor-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Vendor Name</th>
            <th>Contact Person</th>
            <th>$$ Outstanding(#)</th>
            <th>Avg. AP Cycle (days)</th>
          </tr>
        </thead>
     
        <tbody>
          <vendor-item v-for="(vendor, index) in vendors" 
          :vendor="vendor" 
          :key="index" 
          :vendorIndex="index">
            
          </vendor-item>                 
        </tbody>
    </table>    


  </div>
</template>

<script>
  import api from '../../../util/api'
  import VendorItem from './VendorListItem.vue'

  export default {
    name: 'VendorList',
    components: {VendorItem},
    props: ['vendors', 'vendorIndex'],
    data() {
      return {

      }
    },
    created() {

    },
    methods: {

    }
  }

</script>

<style lang="sass" scoped>
  .vs-vendor-list {

  }
</style>