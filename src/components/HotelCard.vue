<template>
  <b-card
    no-body
    class="hotel-card shadow-sm"
  >
    <b-row no-gutters>
      <b-col md="4" lg="2">
        <b-card-img
          src="https://picsum.photos/400/400/?image=20"
          class="hotel-card__img"
        ></b-card-img>
      </b-col>
      <b-col md="8" lg="10">
        <b-card-body>
          <div class="d-flex justify-content-between">
            <!-- Name -->
            <h4 class="card-title">Hotel Name</h4>
            <!-- Rating -->
            <HotelCardRating
              :id="id"
              :rating="rating"
            />
          </div>
          <!-- Location -->
          <div class="d-flex align-items-center gap-1h mb-2">
            <i class="fas fa-map-marker-alt"></i>
            <span class="text-muted">Location</span>
            &#8226;
            <a href="">Show In Map</a>
          </div>
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
</template>

<script>
import HotelCardRating from "@/components/HotelCardRating"

export default {
  name: "HotelCard",
  components: {
    HotelCardRating,
  },
  props: {
    id: Number
  },
  data() {
    return {
      rating: {
        cleanliness: 4,
        staff: 4,
        comfort: 4,
        service: 4,
      },
      specs: [
        "pool",
        "spa",
        "beach",
        "gym",
        "massage",
        "restaurant",
        "breakfast",
        "room service",
        "bar",
        "wifi",
        "accesible"
      ],
      specIcons: {
        "restaurant": '<i class="fas fa-utensils"></i>',
        "breakfast": '<i class="fas fa-bread-slice"></i>',
        "room service": '<i class="fas fa-concierge-bell"></i>',
        "bar": '<i class="fas fa-glass-martini-alt"></i>',
        "wifi": '<i class="fas fa-wifi"></i>',
        "pool": '<i class="fas fa-swimming-pool"></i>',
        "beach": '<i class="fas fa-umbrella-beach"></i>',
        "spa": '<i class="fas fa-spa"></i>',
        "gym": '<i class="fas fa-dumbbell"></i>',
        "smoke": '<i class="fas fa-smoking"></i>',
        "no smoke": '<i class="fas fa-smoking-ban"></i>',
        "casino": '<i class="fas fa-dice"></i>',
        "accesible": '<i class="fab fa-accessible-icon"></i>',
      }
    }
  },
};
</script>

<style>
</style>