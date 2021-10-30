<template>
  <div id="app" class="app">

    <Navbar @change-selected-facility="(val) => selectedFacilies = val" />

    <b-container>
      <router-view v-bind="selectedFacilies"/>
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
      selectedFacilies: []
    }
  }
}
</script>
