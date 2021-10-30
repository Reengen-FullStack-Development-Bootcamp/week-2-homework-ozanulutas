<template>
  <div>
    <b-row align-v="start">
      <!-- Reservation -->
      <b-col lg="8" class="mb-3 mb-lg-0">
        <b-card no-body class="shadow">
          <b-tabs 
            v-model="tabIndex"
            pills 
            card
          >
            <b-tab
              v-for="i in formCount"
              :key="i"
              :title="`${i}. Visitor`"
              :disabled="i > firstInvalidForm"
              title-item-class="position-relative"
              :title-link-class="`tab-link tab-link--${invalidForms.includes(i) ? 'error' : 'success'}`"
            >
              <b-card-text>
                <ReservationForm 
                  :refer="`reservation-form-${i}`"
                  :show-next-btn="tabIndex !== formCount - 1"
                  :disable-payment-btn="invalidFormCount > 0"
                  :is-active="tabIndex === i - 1"
                  @is-invalid="setInvalidForms(i, $event)"
                  @next="tabIndex++"
                />
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <!-- About Hotel -->
      <b-col lg="4" class="sticky p-lg-0">
        <b-card class="shadow">
          
          <h2>{{ bookingData.hotel.name }}</h2>

          <b-img 
            class="rounded shadow-sm"
            fluid 
            :src="require(`@/assets/img/hotels/${bookingData.hotel.img}.jpg`)" 
          />

          <ul class="reset-list mt-2">
            <li>
              <b>Check-In Date:</b> {{ bookingData.checkInDate | parseDate }}
            </li>
            <li>
              <b>Check-Out Date:</b> {{ bookingData.checkOutDate | parseDate }}
            </li>
            <li>
              <b>Visitors:</b> {{ `${bookingData.adultCount} Adults${bookingData.infantCount > 0 ? `, ${bookingData.infantCount} Infants` : ""}` }}
            </li>
            <li>
              <b>Total Price:</b> {{ bookingData.totalPrice }}$
            </li>
          </ul>

          <b-button 
            variant="primary" 
            :disabled="invalidFormCount > 0"
            v-b-modal.payment-modal
          >
            Proceed To Payment
            <i class="ml-1 fas fa-credit-card"></i>
          </b-button>
        </b-card>
      </b-col>
    </b-row>

    <PaymentModal :visible="showPaymentModal" />
  </div>
</template>

<script>
import ReservationForm from "@/components/ReservationForm";
import PaymentModal from "@/components/modals/PaymentModal.vue"

export default {
  name: "Reservation",
  components: {
    ReservationForm,
    PaymentModal,
  },
  props: {
    bookingData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      invalidForms: [], // List of invalid forms
      firstInvalidForm: 1,  // Firt of the invalid forms
      showPaymentModal: false,

      tabIndex: 0, // Currently active tab
    };
  },
  computed: {
    invalidFormCount() { // Retruns the invalid forms count
      return this.invalidForms.length;
    },
    formCount() { // Returns the number of total forms
      return this.bookingData.totalVisitorCount;
    }
  },
  watch: {
    invalidFormCount: function(val) {
      if(val < 1) { // if there are no invalid forms...
        this.showPaymentModal = true;
      }
    }
  },
  created() {
    if(!this.bookingData) {
      this.$router.push("/");
    }
  },
  methods: {
    // Creates a new set of invalid forms
    setInvalidForms(i, $event) {
      if ($event) { // if form is invalid
        this.invalidForms.push(i);
      } else {
        const index = this.invalidForms.indexOf(i);
        this.invalidForms.splice(index, 1);

        this.setTabIndex();
      }

      this.setFirstInvalidForm();
    },

    // Finds the firt invalid form
    setFirstInvalidForm() {
      if(this.invalidFormCount > 0) { // if there are invalid forms, get first
        this.firstInvalidForm = Math.min(...this.invalidForms);
      } else {  // if there are no invalid forms set first to forms count
        this.firstInvalidForm = this.formCount;
      }
    },

    // Sets the currently active tab
    setTabIndex() {
      setTimeout(() => {
        this.tabIndex = this.firstInvalidForm - 1;
      }, 100);
    }
  },
};
</script>

<style lang="scss">
.tab-link {
  &::after {
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    margin-left: 0.3rem;
    // position: absolute;
    // top: 0;
    // right: 0;
    // transform: translate(50%, -50%);
  }

  &--error::after {
    content: "\f057";
  }
  &--success::after {
    content: "\f058";
  }
}
</style>