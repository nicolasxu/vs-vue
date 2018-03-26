<template>
  <tr class="vs-product-list-item">
    <td>{{productIndex}}</td>
    <td>
      <router-link :to="{name: 'Dash.Product.Detail', params: {id: product._id}}">{{product.description}}</router-link> 
    </td>
    <td>{{product.price}}</td>
    <td>{{product.shortCode}}</td>
  </tr>

</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'ProductListItem',
    props: ['product', 'productIndex'],
    components: {},
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

<style lang="scss" scoped>
  .vs-product-list-item {

  }
</style>