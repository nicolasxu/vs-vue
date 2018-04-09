<template>
  <tr class="sent-list-item">
    <td>032</td>
    <td>Pyroloo Inc</td>
    <td>18 Apr 2018</td>
    <td>17 May 2018</td>
    <td>viewed</td>
    <td>$189</td>
    <td>processing</td>
  </tr>

</template>

<script>
  export default {
    name: 'SentListItem',
    components: {},
    props: ['invoice'],
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../scss/reusable.scss';
  .sent-list-item {

  }
</style>