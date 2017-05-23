<template>
  <nav class="navigation">
    <div class="logo">
      
    </div>
    <h2 class="section-title">Invoices</h2>
    <menu class="menu">
      <menuitem>received</menuitem>
      <menuitem>sent</menuitem>
    </menu>
    <h2 class="section-title">My network</h2>
    <menu class="menu">
      <menuitem>client</menuitem>
      <menuitem>vendor</menuitem>
    </menu>
    <h2 class="section-title">More</h2>
    <menu class="menu">
      <menuitem>Settings</menuitem>
      <menuitem>Logout</menuitem>
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