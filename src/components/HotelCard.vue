<template>
  <b-card
    no-body
    class="hotel-card shadow-sm"
  >
    <b-row no-gutters>
      <b-col 
        md="4" 
        lg="3"
        class="p-2"
      >
        <!-- Img -->
        <b-card-img
          :src="require(`@/assets/img/hotels/${hotel.img}.jpg`)"
          class="hotel-card__img"
        ></b-card-img>
        <!-- Like -->
        <b-button 
          class="like-btn text-danger"
          variant="dark"
          @click="isFavorite = !isFavorite"
        >
          <i :class="`${isFavorite ? 'fas' : 'far'} fa-heart`"></i>
        </b-button>
      </b-col>
      <b-col md="8" lg="9">
        <b-card-body class="d-flex flex-column h-100">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Name -->
            <h4 class="card-title">{{ hotel.name }}</h4>
            <!-- Rating -->
            <HotelCardRating
              :id="hotel.id"
              :rating="hotel.rating"
            />
          </div>
          <!-- Location -->
          <div class="d-flex flex-wrap align-items-center mb-2">
            <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
            <!-- city -->
            <span class="text-muted">{{ hotel.location.city }}</span>
            <span class="mx-2">&#8226;</span>
            <!-- show on map -->
            <b-button 
              class="p-0"
              variant="link"
              v-b-modal.map-modal
              @click="$emit('show-on-map', hotel.location.coordinates)"
            >
              Show On Map
            </b-button>
            <span class="mx-2">&#8226;</span>
            <!-- from center -->
            <span>{{ hotel.location.distance_from_center }} km from center</span>
            <!-- subway -->
            <span v-if="hotel.location.subway_access">
              <span class="mx-2">&#8226;</span>
              <span>Subway Access</span>
            </span>
          </div>
          <!-- Desc -->
          <!-- <b-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iure!
          </b-card-text> -->

          <!-- facilities -->
          <div class="d-flex flex-wrap gap-1 mb-3 flex-1">
            <div
              v-for="facility, i in hotel.facilities"
              :key="i"
            >
              <i 
                class="mr-1 text-primary"
                :class="facilityIcons[facility]"
              ></i>
              <span class="text-muted">
                {{ facility | capitalize }}
              </span>
            </div>
          </div>
          <hr class="w-100">

          <div class="d-flex justify-content-between align-items-center">
            <span class="font-1h">Starts from {{ minPrice }}$</span>
            <!-- Book Btn -->
            <b-button :to="`/hotel/${hotel.id}`" variant="primary">Book Now</b-button>
          </div>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import HotelCardRating from "@/components/HotelCardRating"
import facilityIcons from "@/assets/data/maps/facility-icons"

export default {
  name: "HotelCard",
  components: {
    HotelCardRating,
  },
  props: {
    hotel: { // data about hotel
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false,
      facilityIcons,
    }
  },
  computed: {
    // calculates minimum bed price
    minPrice() {
      return Math.min(...Object.values(this.hotel.pricing.bed));
    }
  }
};
</script>
