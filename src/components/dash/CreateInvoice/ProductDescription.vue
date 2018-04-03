<template>
  <div class="row-field-description">
    
    <Autocomplete 
    :options="products" 
    @searchTextChange="findProductsAsync"
    @close="autocompleteClosed"
    :initialText="description"
    >
    </Autocomplete>

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
        
        // this.row[this.rowKey] = selectedItem.description

        this.$emit('doneEditing', selectedItem)
      }

    }
  
  }
</script>

<style lang="sass" scoped>
  

</style>