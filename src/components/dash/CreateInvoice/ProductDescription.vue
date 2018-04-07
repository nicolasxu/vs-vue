<template>
  <div class="row-field-description">
    
    <Autocomplete 
    :options="products" 
    :initialSearchText="initialDescText"
    @searchTextChange="findProductsAsync"
    @close="autocompleteClosed"
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
    props: ['initialDescText'],
    data () {
      return {
        products: [],
      }
    },
    computed: {
      
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
        
        this.$emit('doneEditing', selectedItem)
      }

    }
  
  }
</script>

<style lang="sass" scoped>
  

</style>