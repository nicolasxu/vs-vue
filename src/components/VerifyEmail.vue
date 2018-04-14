<template>
  <div class="verify-email">
    Verify Email  
  </div>
</template>


<script>
  import api from '../util/api'

  export default {
    name: 'VerifyEmail',
    data() {
      return {

      }
    },
    created() {
      console.log(this.$route.params.hash)
      console.log(this.$route.query.email)
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .verify-email {

  }
</style>