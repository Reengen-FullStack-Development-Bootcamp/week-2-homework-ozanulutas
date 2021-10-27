<template>
  <div>
    <h1>Home</h1>

    <HotelCard
      v-for="i in 5"
      :key="i"
      :id="i"
      class="mb-3"
    />
  </div>
</template>

<script>
import HotelCard from "@/components/HotelCard"

export default {
  name: "Home",
  components: {
    HotelCard
  }
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