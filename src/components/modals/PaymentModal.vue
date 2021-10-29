<template>
  <b-modal 
    id="payment-modal" 
    title="Payment"
    hide-footer
  >
    <component 
      :is="component"
      :name="name" 
      @on-validate="onValidate" 
    ></component>
  </b-modal>
</template>

<script>
export default {
  name: "PaymentModal",
  data() {
    return {
      isValid: false, // payment form's state
      component: () => import("@/components/PaymentForm"), // mount payment form as default
      name: ""  // name of the visitor who made the payment
    }
  },
  watch: {
    // watch the validity of payment form, if valid mount the loading component then completed componenet
    isValid(isValid) {
      if(isValid) {
        this.component = () => import("@/components/PaymentLoading"); // if paymnet form is valid mount loading component

        setTimeout(() => {
          this.component = () => import("@/components/PaymentCompleted");  // after 2 secs mount payment completed component
        }, 2000);
      } 
    }
  },
  methods: {
    // if form is valid change the state of valideness and customer name
    onValidate(isValid, senderName) {
      this.isValid = isValid;
      this.name = senderName;
    }
  }
}
</script>
