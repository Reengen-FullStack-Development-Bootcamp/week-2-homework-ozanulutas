<template>
  <div id="app" class="app">

    <Navbar/>

    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
    }
  }
}
</script>
