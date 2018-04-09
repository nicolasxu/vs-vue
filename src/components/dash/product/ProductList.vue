<template>
  <div class="vs-product-list">
    
    <table class="uk-table uk-table-hover uk-table-striped client-list-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Price</th>
          <th>Code</th>
        </tr>
      </thead>
      <tbody>
        <product-item 
        v-for="(product, index) in products"
        :product="product"
        :key="index"
        :productIndex="index"
        ></product-item>
      </tbody>
    </table>
  </div>

</template>

<script>
  import api from '../../../util/api'
  import ProductItem from './ProductListItem.vue'

  export default {
    name: 'ProductList',
    components: {ProductItem},
    props: ['products'],
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
  .vs-product-list {

  }
</style>