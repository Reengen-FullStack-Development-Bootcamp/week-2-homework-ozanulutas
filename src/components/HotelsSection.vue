<template>
  <section>
    <div v-if="isFiltering && filteredHotels.length === 0">
      <p>Aradığınız kriterlerde bir hotel bulunamadı.</p>
    </div>
    <div v-else>
    <HotelCard
      v-for="hotel, i in (filteredHotels.length > 0 ? filteredHotels : hotels)"
      :key="i"
      :hotel="hotel"
      class="mb-3"
      @show-on-map="showOnMap"
    />
    </div>

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
      filteredHotels: [],
      locationSearch: "",
      isFiltering: false,
      coordinates: {}, // coordinates of hotel
    }
  },
  watch: {
    $route: function() {
      this.filter();
    }
  },
  created() {
    this.filter();
  },
  methods: {
    // set the hotel's coordinates to show in map
    showOnMap(coordinates) {
      this.coordinates = coordinates;
    },

    // filters hotels by search query
    filter() {
      let hotels = this.hotels;
      const to = this.$route

      this.filteredHotels = [];
      this.isFiltering = false;

      // if searched by location set hotels and filtered hotels with result
      if(to.query.location) {
        this.isFiltering = true;
        this.locationSearch = to.query.location;
        hotels = this.hotels.filter(hotel => hotel.location.city.toLowerCase() === this.locationSearch.toLowerCase() || hotel.location.country.toLowerCase() === this.locationSearch.toLowerCase())
        this.filteredHotels = hotels;
      }

      // if filtered by facility set filtered hotels with result
      if(to.query.facilities) {
        this.isFiltering = true;
        const filters = to.query.facilities.split(",");

        this.filteredHotels = hotels.filter(hotel => filters.every(facility => hotel.facilities.includes(facility)));
      }
    }
  }
}
</script>
