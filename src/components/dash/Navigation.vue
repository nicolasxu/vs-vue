<template>
  <nav class="navigation">
    <div class="logo">
      
    </div>
    <h2 class="section-title">Invoices</h2>
    <menu class="menu">
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Create', params: { userId: 123 }}">
          Create
        </router-link>
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Received', params: { userId: 123 }}">
          Received
        </router-link>        
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Sent', params: { userId: 123 }}">
          Sent
        </router-link> 
      </menuitem>
    </menu>
    <h2 class="section-title">My network</h2>
    <menu class="menu">
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Client', params: { userId: 123 }}">
          Client
        </router-link> 
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Vendor', params: { userId: 123 }}">
          Vendor
        </router-link>         
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Vendor', params: { userId: 123 }}">
          Product
        </router-link>         
      </menuitem>      
    </menu>
    <h2 class="section-title">Settings</h2>
    <menu class="menu">   
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Setting', params: { category: 'mycompany' }}">
          Settings
        </router-link>         
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Create', params: { userId: 123 }}">
          Logout
        </router-link>         
      </menuitem>
    </menu>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
    data() {
      return {
        msg: 'This is Navigation component'
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../scss/reusable.scss';
  .navigation {
    box-sizing: border-box;
    padding-top: 30px;
    padding-left: 10px;
    height: 100vh;
    width: 200px;
    float: left;
    .logo {
      width: 50px;
      height: 50px;
      background-color: orange;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1em;
    }
    .section-title {
      font-size: 12.8px;
      color: $grey-text-color;
      margin-bottom: 0.6em;
      margin-top: 0.6em;
    }
    .menu {
      padding-left: 0;
      margin-top: 0;
    }
    menuitem {
      display: block; // by default, menuitem is in-line element
    }
  }
</style>