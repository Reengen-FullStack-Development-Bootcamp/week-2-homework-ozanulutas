<template>
  <div>
    <b-row align-v="start">
      <b-col lg="8">
        <section class="border rounded shadow mr-2 p-3">
          <h1>Hotel</h1>
          <b-img src="https://picsum.photos/400/400/?image=20" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
        </section>
      </b-col>
      <b-col lg="4" class="sticky border rounded shadow py-3">
        <h2>Book Now</h2>
        <b-button to="/reservation" variant="primary">Book Now</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to, from);
    },
  },
  mounted() {},
};
</script>

<style lang="scss">

</style>
