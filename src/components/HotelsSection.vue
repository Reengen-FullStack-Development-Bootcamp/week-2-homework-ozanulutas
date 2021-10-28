<template>
  <section>
    <HotelCard
      v-for="hotel, i in hotels"
      :key="i"
      :hotel="hotel"
      class="mb-3"
      @show-on-map="showOnMap"
    />

    <MapModal 
      :coordinates="coordinates"
    />
  </section>
  
</template>

<script>
import HotelCard from "@/components/HotelCard"
import MapModal from "@/components/modals/MapModal"
import hotels from "@/assets/data/hotels"

export default {
  name: "HotelsSection",
  components: {
    HotelCard,
    MapModal
  },
  data() {
    return {
      hotels,
      coordinates: {}, // coordinates of hotel
    }
  },
  methods: {
    showOnMap(coordinates) {
      this.coordinates = coordinates;
    }
  }
}
</script>
