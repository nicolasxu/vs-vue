<template>
  <nav class="navigation">
    <div class="logo">
    </div>
    <h2 class="section-title">Invoices</h2>
    <menu class="menu">
      <menuitem class="new-btn-positioner">
        <router-link :to="{ name: 'CreateInvoice', params: { userId: 123 }}">
          <button class="uk-button uk-button-primary new-invoice-btn">New</button>
        </router-link>
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Received', params: { userId: 123 }}" active-class="active">
          Received
        </router-link>        
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Sent', params: { userId: 123 }}" active-class="active">
          Sent
        </router-link> 
      </menuitem>
    </menu>
    <h2 class="section-title">Connections</h2>
    <menu class="menu">
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Client', params: { userId: 123 }}" active-class="active">
          Client
        </router-link> 
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Vendor', params: { userId: 123 }}" active-class="active">
          Vendor
        </router-link>         
      </menuitem>
    
    </menu>
    <h2 class="section-title">Maintenance</h2>
    <menu class="menu">
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Product', params: { userId: 123 }}" active-class="active">
          Invoice Item
        </router-link>         
      </menuitem>
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Discount', params: { userId: 123 }}" active-class="active">
          Discount
        </router-link>         
      </menuitem>      
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Request', query: { direction: 'received' }}" active-class="active">
          Request
        </router-link>         
      </menuitem>      
    </menu>
    <h2 class="section-title">Settings</h2>
    <menu class="menu">   
      <menuitem>
        <router-link class="nav-link" :to="{ name: 'Dash.Setting', params: { category: 'mycompany' }}" active-class="active">
          Setting
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

    height: 100vh;
    width: 200px;
    float: left;
    .new-btn-positioner {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      .new-invoice-btn {
        font-weight: bold;
        margin-bottom: 10px;
        border-radius: 5px;
        padding-left: 25px;
        padding-right: 25px;

      }      
    }

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
      padding-left: 10px;
      padding-right: 10px;      
    }
    .menu {

      padding-left: 0;
      margin-top: 0;
      .nav-link {
        display: block;
        line-height: 2em;
        padding-left: 20px;
        border-left: 4px solid transparent;


        &.active {
          border-left: 4px solid orange;
          background-color: #d8d7d7;
        }
        &:hover {
          background-color: #f7f7f7;
          text-decoration: none;
          
        }
      }
     
    }
    menuitem {
      display: block; // by default, menuitem is in-line element
    }
  }
</style>