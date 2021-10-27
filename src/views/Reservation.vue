<template>
  <div>
    <b-row>
      <!-- Reservation -->
      <b-col lg="8">
        <h1>Reservation</h1>
        <b-card no-body class="shadow mr-2">
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
      <b-col lg="4">
        <h2>Hotel Name</h2>
        <b-card class="sticky shadow">
          <!-- <b-img fluid src="https://picsum.photos/400/400/?image=20" /> -->
          <ul>
            <li>
              Start Date: {{ bookingData.startDate }}
            </li>
            <li>
              End Date: {{ bookingData.endDate }}
            </li>
            <li>
              Visitors: {{ bookingData.totalVisitorCount }}
            </li>
          </ul>
          <b-button to="/hotel/2" variant="primary">Go Back</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ReservationForm from "@/components/ReservationForm";

export default {
  name: "Reservation",
  components: {
    ReservationForm,
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
        console.log("all forms completed");
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