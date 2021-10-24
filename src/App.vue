<template>
  <div id="app" class="app">
    <b-container id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/hotel/2">Hotel</router-link> |
      <router-link to="/reservation">Reservation</router-link>
    </b-container>

    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
