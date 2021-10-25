<template>
  <b-form>
    <b-form-group
      id="input-group-1"
      label="Email address:"
      label-for="input-1"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="input-1"
        v-model="$v.form.fname.$model"
        placeholder="F name"
        required
      ></b-form-input>
      <div class="error" v-if="!$v.form.fname.required && $v.form.fname.$dirty">Field is required</div>
    </b-form-group>

    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="$v.form.lname.$model"
        placeholder="L Name"
        required
      ></b-form-input>
      <div class="error" v-if="!$v.form.lname.required && $v.form.lname.$dirty">Field is required</div>
    </b-form-group>

    <b-button type="submit" variant="primary" :disabled="$v.$invalid">
      Submit
    </b-button>
  </b-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ReservationForm",
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
      return this.$v.$invalid
    }
  },
  watch: {
    // Wathes the validity of the form and emits the changes.
    isInvalid: function(val) {
      this.$emit("is-invalid", val)
    }
  },
  created() {
    // Emits the validity of the form.
    this.$emit("is-invalid", this.$v.$invalid)
  }
};
</script>

