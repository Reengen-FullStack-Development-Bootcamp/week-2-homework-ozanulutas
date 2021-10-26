<template>
  <b-form :ref="refer">
    <b-form-group
      label="Email address:"
    >
      <b-form-input
        v-model="$v.form.fname.$model"
        :state="validateState('fname')"
        name="fname"
        placeholder="F name"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be at least 3 characters.
      </b-form-invalid-feedback>
      <!-- <div class="error" v-if="!$v.form.fname.required && $v.form.fname.$dirty">Field is required</div> -->
    </b-form-group>

    <b-form-group label="asd address:">
      <b-form-input
        v-model="$v.form.lname.$model"
        :state="validateState('lname')"
        name="lname"
        placeholder="L Name"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be at least 3 characters.
      </b-form-invalid-feedback>
      <!-- <div class="error" v-if="!$v.form.lname.required && $v.form.lname.$dirty">Field is required</div> -->
    </b-form-group>

    <b-button 
      v-if="showNextBtn"  
      variant="primary" 
      :disabled="$v.$invalid"
      @click="$emit('next')"
    >
      Next
    </b-button>
  </b-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ReservationForm",
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    showNextBtn: {
      type: Boolean,
      required: true
    },
    refer: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      form: {
        fname: "",
        lname: "",
      },
    };
  },
  validations: {
    form: {
      fname: {
        required,
      },
      lname: {
        required,
      },
    },
  },
  computed: {
    // Detects if form is invalid
    isInvalid() {
      return this.$v.$invalid;
    }
  },
  watch: {
    // Wathes the validity of the form and emits the changes.
    isInvalid: function(val) {
      this.$emit("is-invalid", val);
    },
    // Watches whether the form is active or not,
    // if form is active, sets the focused input
    isActive: function(isActive) {
      if(isActive) {
        // console.log("ref", this.$refs);
        // console.log("ref", this.$refs[this.refer]);
        // console.log("type", typeof this.$refs[this.refer]);
        // console.log("v", this.$v);
        if(!this.$v.$dirty) { // If form is never touched set first input to focused
          this.$refs[this.refer][1].focus();
        } else { // if form is touched set first invalid input to focused
          for (let i = 0; i < this.$refs[this.refer].length; i++) {
            if(!this.validateState(this.$refs[this.refer][i].name)) {
              this.$refs[this.refer][i].focus();
              break;
            }
          }
        }
      
      }
    }
  },
  created() {
    // Emits the validity of the form.
    this.$emit("is-invalid", this.$v.$invalid);
  },
  methods: {
    // Validates single form input
    validateState(name) {
      if(!this.$v.form[name]) { // if there are no vuealidate model, return
        return true;
      }
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null; // if form is touched return error state
    },
  }
};
</script>

