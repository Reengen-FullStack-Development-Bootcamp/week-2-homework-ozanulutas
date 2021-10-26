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
        <b-form @submit.prevent="book()">
          <!-- Dates -->
          <b-form-group
            label="Start Date:"
          >
            <b-form-datepicker 
              v-model="form.startDate" 
              placeholder="Choose a start date" 
              locale="en"
              no-flip
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group
            label="End Date:"
          >
            <b-form-datepicker 
              v-model="form.endDate" 
              placeholder="Choose an end date" 
              locale="en"
              no-flip
            ></b-form-datepicker>
          </b-form-group>

          <!-- Visitor Counters -->
          <section>
            Adult
            <VisitorCounter @change="setVisitorCount('adult', $event)"/>
          </section>
          <section>
            Infant
            <VisitorCounter @change="setVisitorCount('infant', $event)"/>
          </section>
          <!-- <b-button to="/reservation" variant="primary">Book Now</b-button> -->
          <b-button type="submit" variant="primary">Book Now</b-button>
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
        visitorCount: { // bunları ayır
          adult: 0,
          infant: 0,
        },
        startDate: "",
        endDate: "",
      }
    }
  },
  validations: {
    form: {
      visitorCount: {
        adult: {
          minValue: minValue(1),
        },
      },
      startDate: {
        required
      },
      endDate: {
        required
      },
    },
  },
  computed: {
    // calcs the total visitor count
    totalVisitorCount() {
      return this.form.visitorCount.adult + this.form.visitorCount.infant;
    },
    v() {
      return this.$v;
    }
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
      this.form.visitorCount[type] = $event;

      if(type === "adult") {
        this.form.visitorCount[type].$touch();
      }
    },
    // // Validates single form input
    // validateState(name) {
    //   if(!this.$v.form[name]) { // if there are no vuealidate model, return
    //     return true;
    //   }
    //   const { $dirty, $error } = this.$v.form[name];
    //   return $dirty ? !$error : null; // if form is touched return error state
    // },
    book() {
      // console.log(this.$v);
      // this.$v.$touch();
      if (this.$v.$error) {
        console.log('Form is in error')
      }
    }
  }  
};
</script>

<style lang="scss">

</style>
