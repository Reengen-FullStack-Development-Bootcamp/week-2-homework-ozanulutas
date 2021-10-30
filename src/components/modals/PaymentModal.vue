<template>
  <b-modal 
    id="payment-modal" 
    title="Payment"
    hide-footer
    :visible="visible"
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
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isValid: false, // payment form's state
      isPaymentSuccessful: false,
      name: "",  // name of the visitor who made the payment
      component: () => import("@/components/PaymentForm"), // mount payment form as default
    }
  },
  watch: {
    // watch the validity of payment form, if valid mount the loading component then completed componenet
    isValid(isValid) {
      if(isValid) {
        this.component = () => import("@/components/PaymentLoading"); // if paymnet form is valid mount loading component

        setTimeout(() => {
          this.component = () => import("@/components/PaymentCompleted");  // after 2 secs mount payment completed component
          this.isPaymentSuccessful = true;
        }, 2000);
      } 
    }
  },
  created() {
    // if payment is succefully completed redirect to homepage when modal close
    this.$root.$on('bv::modal::hide', () => {
      if(this.isPaymentSuccessful) {
        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      }
    })
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
