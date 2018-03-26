<template>
  <tr class="vs-vendor-list-item">
    <td>{{vendorIndex}}</td>
    <td>
      <router-link :to="{name: 'Dash.Vendor.Detail', params: {id: vendor._id}}">{{vendor.name}}</router-link> 
    </td>
    <td>contact</td>
    <td>$$</td>
    <td>88</td>
  </tr>
</template>

<script>
  import api from '../../../util/api'

  export default {
    name: 'VendorListItem',
    props: ['vendor', 'vendorIndex'],
    created() {

    },    
    data() {
      return {

      }
    },

    methods: {

    }
  }

</script>

<style lang="sass" scoped>
  .vs-vendor-list-item {

  }
</style>