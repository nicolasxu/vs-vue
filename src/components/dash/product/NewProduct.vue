<template>
  <div class="vs-product-new">
    <h3>Create New Product</h3>
    <form class="uk-form uk-form-stacked">

      <div class="uk-form-row">
        <label class="uk-form-label" for="product-description">
          Product Description
          <span class="required-sign">*</span>
        </label>
        <div class="uk-form-controls">
            <input type="text" id="product-description" placeholder="description" class="uk-width-1-2" 
            v-model="newProduct.description">
            <div class="input-note">Searchable text</div>
        </div>          
      </div>

      <div class="uk-form-row">
        <label class="uk-form-label" for="product-shortcode">
          Product Shortcode
        </label>
        <div class="uk-form-controls">
            <input type="text" id="product-shortcode" placeholder="short code" class="uk-width-1-2" 
            v-model="newProduct.shortCode">
            <div class="input-note">Can be used to search product quick</div>
        </div>
      </div>
      
      <div class="uk-form-row">
        <label class="uk-form-label" for="product-price">
          Unit Price
        </label>
        <div class="uk-form-controls">
            <input type="text" id="product-price" placeholder="price" class="uk-width-1-2" 
            v-model="newProduct.price">
            <div class="input-note">Unit price of product </div>
        </div>
      </div>

      <div class="uk-form-row">
        <button type="button" class="uk-button uk-button-primary" @click="createProduct">Create</button>
        <button type="button" class="uk-button" @click="cancel">Cancel</button>
      </div>      

    </form>
  </div>

</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'NewProduct',
    components: {},
    data() {
      return {
        newProduct: {
          description: '',
          shortCode: '',
          price: null

        }
      }
    },
    created() {

    },
    methods: {
      async createProduct() {
        
        let res
        try {
          res = await api.product.createProduct(this.newProduct)
        } catch (e) {
          res = {}
          console.log('create product error', e)
        }
      
        if (res.data && res.data.createProduct._id) {
          this.$router.push({name: 'Dash.Product'})
        } else {
          console.log('create product error')
        }
      },
      cancel() {
        this.$router.push({name: 'Dash.Product'})
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';

  .vs-product-new {
    @extend %dash-component-margin-padding;
    .required-sign {
      margin-left: 0.2em;
      color: red;
    }
    .input-note {
      font-size: 12px;
      color: grey;
    }

  }
</style>