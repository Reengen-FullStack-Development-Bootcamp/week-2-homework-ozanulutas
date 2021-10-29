<template>
  <b-modal
    id="map-modal"
    title="BootstrapVue"
    size="xl"
    hide-header
    hide-footer
  >
    <b-embed
      type="iframe"
      aspect="16by9"
      :src="`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.long}&hl=en&z=18&amp;output=embed`"
      allowfullscreen
    >
    </b-embed>
  </b-modal>
</template>

<script>
export default {
  name: "MapModal",
  props: {
    coordinates: {
      type: Object,
      required: true,
    },
  },
};
</script>
