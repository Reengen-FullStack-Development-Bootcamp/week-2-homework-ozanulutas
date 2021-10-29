<template>
  <section>
    <b-carousel
      v-model="slide"
      controls
      indicators
      :interval="4000"
    >
      <b-carousel-slide 
        v-for="img, i in carouselImgs" 
        :key="i"
      >
        <template #img>
          <img
            class="max-h-20 w-100 object-fit-cover object-position-center-bottom rounded" 
            :src="require(`@/assets/img/${img}.jpg`)"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
    <div class="d-flex gap-0q mt-1 max-h-5 ">
      <button 
        v-for="img, i in carouselImgs" 
        :key="i"
        class="flex-1 reset-btn"
        @click="slide = i"
      >
        <img
          class="w-100 h-100 object-fit-cover object-position-center-bottom rounded" 
          :class="slide !== i ? 'grayscale' : ''"
          :src="require(`@/assets/img/${img}.jpg`)"
        >
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "HotelCarousel",
  props: {
    showcaseImg: {  // hotel's original image
      type: String,
      required: true,
    }
  },
  data() {
    return {
      carouselImgs: [], // images to show in carousel slide
      slide: 0, // active slide index
    }
  },
  created() {
    this.setCarouselImgs();
  },
  methods: {
    // gets random integer number between given args. Min is inclusive, max is exclusive
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // sets the images to show in carousel slide. Sets the first img as hotel's original img and other's as images randomly
    setCarouselImgs() {
      this.carouselImgs = [
      `hotels/${this.showcaseImg}`,
        ...Array.from(Array(4).keys()).map(() => `carousel/${this.randomNumber(1, 29)}`)
      ];
    }
  }
}
</script>

<style>

</style>