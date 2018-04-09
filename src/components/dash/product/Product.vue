<template>
  <div class="vs-product">
    <div class="header-bar">
      <div class="title-search-positioner">
        <div class="page-title">
          &lt;product/&gt;:
        </div>
        <form class="uk-form search-form">
          <input type="text" name="search" placeholder="search" class="uk-width-2-3">    
        </form>        

      </div>

    </div>
    <div class="command-bar">

      <button type="button" class="uk-button uk-button-primary uk-button-small" @click="newProduct">Create</button>
      
      <ul class="list-pagination">
        <li class="prev">
          <a href="#"><i class="uk-icon-angle-double-left"></i> Prev</a>
        </li>
        <li class="next">
          <a href="#">Next <i class="uk-icon-angle-double-right"></i></a>
        </li>      
      </ul>
    </div>
    <div class="list">
      <product-list :products="products"></product-list>
    </div>
  </div>

</template>

<script>
  import api from '../../../util/api'
  import ProductList from './ProductList.vue'

  export default {
    name: 'Product',
    components: {ProductList},
    data() {
      return {
        products:[],
        offset: 0,
        limit: 50, 
        total: 0
      }
    },
    async created() {
      let res
      try {
        res = await api.product.getProducts(this.offset, this.limit)
      } catch(e) {
        res = {}
        console.log('get product list error', e)
      }

      this.products = res.data.products.docs
      this.limit = res.data.products.limit
      this.offset = res.data.products.offset
      this.total = res.data.products.total
      
    },
    methods: {
      newProduct() {

        this.$router.push({name: 'Dash.Product.New', 
          query:{q1: 'q1'}, 
          params: {email: 'abc'} })
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';
  .vs-product {
    min-width: 435px;
    @extend %dash-component-margin-padding;
    .header-bar {
      @extend %header-bar;
      .title-search-positioner {
        .search-form {
          input {
            padding-left: 7.3em;
          }
        }
      }
    }
    .command-bar {
      position: relative;
      margin-bottom: 1em;
      .list-pagination {
        @extend %list-pagination;
      }

    }
    .list {
      margin-bottom: 1em;
    }
  }
</style>