<template>
  <section class="counter d-flex align-items-center">
    <b-button 
      variant="primary"
      @click="descrease()"
    >
      <i class="fas fa-minus"></i>
    </b-button>
    <div class="counter__count">
      {{ count }}
    </div>
    <b-button 
      variant="primary"
      @click="increase()"
    >
      <i class="fas fa-plus"></i>
    </b-button>
  </section>
</template>

<script>
export default {
  name: "VisitorCounter",
  data() {
    return {
      count: 0,
    }
  },
  watch: {
    count: function(val) {
      this.$emit("change", val);
    }
  },
  methods: {
    increase() {
      if(this.count < 15) {
        this.count++;
      }
    },
    descrease() {
      if(this.count > 0) {
        this.count--;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.counter {

  &__count {
    text-align: center;
    font-size: 1.5rem;
    width: 2em;
  }
}
</style>