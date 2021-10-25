<template>
  <b-tab 
    :title="title"
    :disabled="disabled"
  >
    <b-card-text>
      <ReservationForm @is-invalid="$emit('is-invalid', $event)" />
    </b-card-text>
  </b-tab>
</template>

<script>
import ReservationForm from "@/components/ReservationForm";

export default {
  components: {
    ReservationForm,
  },
  props: {
    title: String,
    disabled: Boolean,
  },
  data() {
    return {
      inValidForms: [],
    };
  },
  // methods: {
  //   isInvalid($event) {
  //     console.log($event);
  //   },
  // },
};
</script>

<style>
</style>