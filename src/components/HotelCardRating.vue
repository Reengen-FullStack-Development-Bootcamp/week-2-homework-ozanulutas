<template>
  <div>
    <b-form-rating
      v-model="avgRating"
      variant="warning"
      :id="`rating-popover-target-${id}`"
      no-border
      inline
      readonly
    >
    </b-form-rating>
    <b-popover 
      :target="`rating-popover-target-${id}`" 
      triggers="hover" 
      placement="top"
    >
      <template #title>Ratings</template>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-user-tie"></i> Staff: </span>
        <b-form-rating
          v-model="rating.staff"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-concierge-bell"></i> Service: </span>
        <b-form-rating
          v-model="rating.service"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-soap"></i> Cleanliness: </span>
        <b-form-rating
          v-model="rating.cleanliness"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
      <div class="d-flex align-items-center">
        <span class="flex-1 text-muted"><i class="text-primary fas fa-couch"></i> Comfort: </span>
        <b-form-rating
          v-model="rating.comfort"
          variant="warning"
          no-border
          inline
        ></b-form-rating>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: "HotelCardRating",
  props: {
    id: Number,
    rating: Object
  },
  data() {
    return {
     
    }
  },
  computed: {
    avgRating() {
      return Object.values(this.rating).reduce((prev, curr) => prev + curr) / 4;
    }
  }
};
</script>

<style>
.b-rating {
  background-color: transparent;
}
</style>