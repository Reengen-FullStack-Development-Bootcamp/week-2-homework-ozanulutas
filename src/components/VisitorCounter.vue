<template>
  <section class="counter d-flex align-items-center">
    <b-button 
      variant="link"
      size="sm"
      @click="descrease()"
    >
      <i class="fas fa-minus"></i>
    </b-button>
    <div class="counter__count">
      {{ count }}
    </div>
    <b-button 
      variant="link"
      size="sm"
      @click="increase()"
    >
      <i class="fas fa-plus"></i>
    </b-button>
  </section>
</template>

<script>
export default {
  name: "VisitorCounter",
  props: {
    visitorCount: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      count: 0,
    }
  },
  watch: {
    count: function(val) {
      this.$emit("change", val);
    },
    visitorCount: function(val) {
      this.count = val;
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
    font-size: 1rem;
    width: 1.5em;
  }
}
</style>