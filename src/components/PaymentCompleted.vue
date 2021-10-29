<template>
  <div>
    <p>
      Congratulations <b>{{ name | capitalize | prefix }}</b>. 
      Your payment has been successfully made. 
    </p>
    <p>
      <i class="fas fa-umbrella-beach"></i> Enjoy your vacation
    </p>
  </div>
</template>

<script>
export default {
  name: "PaymentCompleted",
  props: {
    name: {
      type: String,
      default: "Visitor"
    }
  }
}
</script>

<style>

</style>