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
    <!-- <iframe 
        width="100%" 
        height="600px" 
        frameborder="0" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0" 
        src="https://maps.google.com/maps?q=48.87171698,2.34947227&hl=en&z=18&amp;output=embed"
      >
      </iframe> -->
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
