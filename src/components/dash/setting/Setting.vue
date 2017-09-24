<template>
  <div class="setting">
    <h3>Setting</h3>
    
    <!-- a tab goes here -->

    <ul class="uk-tab" data-uk-tab>
        <li :class="{'uk-active': currentTab == 'account'}"><a href="#" @click.prevent="account">Account</a></li>
        <li :class="{'uk-active': currentTab == 'mycompany'}"><a href="#" @click.prevent="myCompany">My Company</a></li>
        <li :class="{'uk-active': currentTab == 'role'}"><a href="#" @click.prevent="role">Role</a></li>
        <li :class="{'uk-active': currentTab == 'plan'}"><a href="#" @click.prevent="plan">Plan</a></li>
    </ul>
    <ul class="uk-switcher">
      <li :class="{'uk-active': currentTab == 'account'}">account</li>
      <li :class="{'uk-active': currentTab == 'mycompany'}">
        <my-company></my-company>
      </li>
      <li :class="{'uk-active': currentTab == 'role'}">role</li>
      <li :class="{'uk-active': currentTab == 'plan'}">plan</li>
    </ul> 
    
  </div>
</template>

<script>
  import MyCompany from './MyCompany.vue'
  export default {
    name: 'setting', 
    components: {MyCompany},
    data() {
      return {
        currentTab: 'account'
      }
    },
    created() {
      //console.log('$route', this.$route)
      this.currentTab = this.$route.params.category
     
    },
    watch: {
      '$route': function (to, from) {
        
        this.currentTab = to.params.category 
      }
    },
    methods: {
      account() {
        this.$router.push({name: 'Dash.Setting', params: {category: 'account'} })
      },
      myCompany() {
        this.$router.push({name: 'Dash.Setting', params: { category: 'mycompany'}})
      },
      role() {
        this.$router.push({name: 'Dash.Setting', params: {category: 'role'} })        
      },
      plan() {
        this.$router.push({name: 'Dash.Setting', params: {category: 'plan'}})
      }
    }
  }
</script>

<style lang="sass" scoped>
  .setting {
    // background-color: yellow;
  }
</style>