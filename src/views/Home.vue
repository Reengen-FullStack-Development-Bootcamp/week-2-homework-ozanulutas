<template>
  <div>
    <h1>Home</h1>

    <b-card no-body class="hotel-card shadow-sm">
      <b-row no-gutters>
        <b-col md="4" lg="2">
          <b-card-img
            src="https://picsum.photos/400/400/?image=20"
            class="hotel-card__img"
          ></b-card-img>
        </b-col>
        <b-col md="8" lg="10">
          <b-card-body title="Hotel Name">
            <b-card-text>
              This is a wider card with supporting text as a natural lead-in to
              additional content. This content is a little bit longer. This is a
              wider card with supporting text as a natural lead-in to additional
              content. This content is a little bit longer. This is a wider card
              with supporting text as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
            <div class="d-flex justify-content-end">
              <b-button to="/hotel/3" variant="primary">Book Now</b-button>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss">
.hotel-card {
  &__img {
    height: 100%;
    object-fit: cover;
  }
}
</style>