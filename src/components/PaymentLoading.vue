<template>
  <div>
    <h5>Your payment is processing...</h5>
    <div class="text-center">
    <b-spinner class="my-4" variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentLoading",
};
</script>

<style>
</style>