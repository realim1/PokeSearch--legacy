
<template>

  <div id="app">
    <Navbar />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: "app",
  components: {
    Navbar
  },
  
}
</script>

<style>
</style>
