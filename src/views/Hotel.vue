<template>
  <div>
    <b-row align-v="start">
      <b-col lg="8">
        <section class="border rounded shadow mr-2 p-3">
          <h1>Hotel</h1>
          <b-img src="https://picsum.photos/400/400/?image=20" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            asperiores mollitia consequuntur ipsa totam quas libero dolorum?
            Odit deserunt deleniti iure nemo laboriosam. Libero soluta placeat
            nam minima voluptatibus deleniti?
          </p>
        </section>
      </b-col>
      <b-col lg="4" class="sticky border rounded shadow py-3">
        <h2>Book Now</h2>
        <b-form>
          <!-- Dates -->
          <b-form-group
            label="Check-in Date:"
          >
            <b-form-datepicker 
              v-model="form.checkInDate" 
              placeholder="Choose a check-in date" 
              locale="en"
              no-flip
              :state="validateState('checkInDate')"
            ></b-form-datepicker>
            <b-form-invalid-feedback>
              Choose a check-in date to book
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="End Date:"
          >
            <b-form-datepicker 
              v-model="form.checkOutDate" 
              placeholder="Choose check-out date" 
              locale="en"
              no-flip
              :state="validateState('checkOutDate')"
            ></b-form-datepicker>
            <b-form-invalid-feedback>
              Choose check-out date to book
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Visitor Counters -->
          <b-form-group
            label="Adult:"
          >
            <VisitorCounter @change="setVisitorCount('adult', $event)"/>
            <small v-if="!$v.form.adultCount.minValue && $v.form.adultCount.$dirty" class="text-danger">Choose the number of visitors</small>
          </b-form-group>
          <b-form-group
            label="Infant:"
          >
            <VisitorCounter @change="setVisitorCount('infant', $event)"/>
          </b-form-group>
          <!-- <b-button to="/reservation" variant="primary">Book Now</b-button> -->
          <b-button 
            variant="primary"
            @click="book()"
          >
            Book Now
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VisitorCounter from "@/components/VisitorCounter.vue"
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "Hotel",
  components: {
    VisitorCounter
  },
  data() {
    return {
      form: {
        adultCount: 0,
        infantCount: 0,
        checkInDate: new Date(),
        checkOutDate: new Date(),
      }
    }
  },
  validations: {
    form: {
      adultCount: {
        minValue: minValue(1),
      },
      checkInDate: {
        required
      },
      checkOutDate: {
        required
      },
    },
  },
  computed: {
    // calcs the total visitor count
    totalVisitorCount() {
      return this.form.adultCount + this.form.infantCount;
    },
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to, from);
    },
  },
  methods: {
    // Sets the visitors count according to type (adult or infant)
    setVisitorCount(type, $event) {
      if(type === "adult") {
        this.form.adultCount = $event;
      } else if(type === "infant") {
        this.form.infantCount = $event;
      }
    },

    // Validates single form input
    validateState(name) {
      if(!this.$v.form[name]) { // if there are no vuealidate model, return
        return true;
      }
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null; // if form is touched return error state
    },

    // if basic requirements for booking is satisfied, redirect to reservation page
    book() {
      this.$v.$touch();

      if(!this.$v.$error) {
        this.$router.push({ 
          name: "Reservation",
          params: {
            bookingData: {
              ...this.form,
              totalVisitorCount: this.totalVisitorCount
            },
          }
        });
      }
    }
  }  
};
</script>

<style lang="scss">

</style>
