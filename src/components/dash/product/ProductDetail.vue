<template>
  <div class="vs-product-detail">

    <h3>Product Detail</h3>
    <div class="button-container">
      <button class="uk-button" @click="goBack">Back</button>
    </div>
    <form class="uk-form uk-form-horizontal uk-margin-large product-detail-form">
      <div class="uk-form-row">
        <label class="uk-form-label">Description: </label>
        <div class="uk-form-controls">
          <div class="text" v-show="!isEditing">
            <span>{{product.description}}</span>
          </div>
          
          <input type="text" v-model="productInEdit.description" placeholder="description" v-show="isEditing"/>
          
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Short Code: </label>
        <div class="uk-form-controls">
          <div class="text" v-show="!isEditing">
            <span>{{product.shortCode}}</span>
          </div>
          
          <input type="text" v-model="productInEdit.shortCode" placeholder="short code" v-show="isEditing"/>
          
        </div>
      </div>
      <div class="uk-form-row">
        <label class="uk-form-label">Price: </label>
        <div class="uk-form-controls">
          <div class="text" v-show="!isEditing">
            <span>{{product.price}}</span>
          </div>
          
          <input type="text" v-model="productInEdit.price" placeholder="price"  v-show="isEditing"/>
          
        </div>
      </div>

      <div class="uk-margin">
        <button class="uk-button" @click.prevent="editProduct" v-show="!isEditing">Edit</button>
        <button class="uk-button uk-button-primary"  v-show="isEditing" @click.prevent="submitUpdate">Submit</button>        
        <button class="uk-button uk-button-danger" @click.prevent="deleteProduct" v-show="!isEditing">Delete</button>
        <button class="uk-button"  v-show="isEditing" @click.prevent="cancelEditing">Cancel</button>

      </div>

    </form>
  </div>

</template>

<script>
  import api from '../../../util/api'
  export default {
    name: 'ProductDetail',
    components: {},
    data() {
      return {
        product: {},
        productInEdit: {},
        isEditing: false
      }
    },
    async created() {
      let productId = this.$route.params.id
      let res
      try {
        res = await api.product.getProductById(productId)
      } catch (e) {
        res = {}
        console.log('Get product detail error', e)
      }

      if (res.data && res.data.product._id) {
        this.product = res.data.product
      }
    },
    methods: {
      goBack () {
        this.$router.push({name: 'Dash.Product'})
      },
      editProduct () {
        
        this.isEditing = true
        this.productInEdit = {
          description: this.product.description, 
          shortCode: this.product.shortCode, 
          price: this.product.price
        }
      },
      async deleteProduct() {
        let confirmed = confirm('Do you really want to delete this product?')
        
        if(confirmed) {
          // do delete
          let res 
          try {
            res = await api.product.deleteProduct(this.product._id)
          } catch (e) {
            console.log('Delete product error:', e)
          }
          
          if (res.data && res.data.deleteProduct.count === 1 ) {
            alert('product delete success')
            this.$router.push({name: 'Dash.Product'})
          }
        }
      },
      cancelEditing() {
        this.isEditing = false
        this.productInEdit = {}
      },
      async submitUpdate() {
        console.log('submit update')
        let res
        try {
          res = await api.product.updateProduct(this.product._id, this.productInEdit)
        } catch (e) {
          console.log('Update product error:', e)
          res = {}
        }
        if (res.data && res.data.updateProduct._id) {
          this.product = res.data.updateProduct
        }
        this.isEditing = false
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';
  .vs-product-detail {
    @extend %dash-component-margin-padding;
    .product-detail-form {

    }
  }
</style>