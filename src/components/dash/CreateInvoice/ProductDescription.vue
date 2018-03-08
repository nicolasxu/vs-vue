<template>
  <div class="row-field-description">
    
  
  <autocomplete 
  :options="products" 
  @searchChange="findProductsAsync"
  @close="autocompleteClosed"
  :item="description"
  >
  </autocomplete>
  </div>
</template>

<script>
  

  import api from '../../../util/api'
  import Autocomplete from './vs-autocomplete.vue'

  export default {
    name: 'ProductDescription',
    components: { Autocomplete  },
    props: ['row', 'rowKey'],
    data () {
      return {
        products: [],
        description: this.row[this.rowKey]
      }
    },
    created() {

    },
    mounted() {
    },
    methods: {
      async findProductsAsync(query) {
        this.products = []
        
        let res = await api.product.searchMock(query)
        this.products = res
      },
      autocompleteClosed(selectedItem) {
       
        this.row[this.rowKey] = selectedItem.description
        this.$emit('doneEditing')
      }

    }
  
  }
</script>

<style lang="sass" scoped>
  

</style>