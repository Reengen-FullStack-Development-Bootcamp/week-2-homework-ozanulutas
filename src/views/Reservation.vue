<template>
  <div>
    <b-row align-v="start">
      <!-- Reservation -->
      <b-col lg="8">
        <h1>Reservation</h1>
        <b-card no-body class="shadow mr-2">
          <b-tabs pills card>
            <!-- <Tab 
              v-for="i in 5" 
              :key="i"  
              :title="`${i}. Visitor`"
              @is-invalid="isInvalid(i, $event)"
            /> -->
            <b-tab
              v-for="i in 5"
              :key="i"
              :title="`${i}. Visitor`"
              :disabled="i > firstInvalidForm"
            >
              <b-card-text>
                <ReservationForm @is-invalid="setInvalidForms(i, $event)" />
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <!-- About Hotel -->
      <b-col lg="4">
        <h2>Hotel Name</h2>
        <b-card class="sticky shadow">
          <b-img fluid src="https://picsum.photos/400/400/?image=20" />

          <b-button to="/hote/3" variant="primary">Go Back</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ReservationForm from "@/components/ReservationForm";
// import Tab from "@/components/Tab";

export default {
  name: "Reservation",
  components: {
    ReservationForm,
    // Tab
  },
  data() {
    return {
      invalidForms: [], // List of invalid forms
      firstInvalidForm: 1,  // Firt of the invalid forms
    };
  },
  methods: {
    // Creates a new set of invalid forms
    setInvalidForms(i, $event) {
      if ($event) {
        this.invalidForms.push(i);
      } else {
        const index = this.invalidForms.indexOf(i);
        this.invalidForms.splice(index, 1);
      }

      this.setFirstInvalidForm();
    },
    // Finds the firt invalid form
    setFirstInvalidForm() {
      this.firstInvalidForm = Math.min(...this.invalidForms)
    },
  },
};
</script>

<style>
</style>