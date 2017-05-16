<template>
  <nav class="navigation">
    <div class="logo">
      
    </div>
    <h4>Invoices</h4>
    <menu class="menu">
      <menuitem>received</menuitem>
      <menuitem>sent</menuitem>
    </menu>
    <h4>My network</h4>
    <menu>
      <menuitem>client</menuitem>
      <menuitem>vendor</menuitem>
    </menu>
    <h4>More</h4>
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
  .navigation {
    padding-top: 30px;
    .logo {
      width: 50px;
      height: 50px;
      background-color: yellow;
      margin-left: auto;
      margin-right: auto;
    }
    background-color: LightCyan;
    height: 100vh;
    width: 260px;
    float: left;
    menuitem {
      display: block; // by default, menuitem is in-line element
    }
  }
</style>