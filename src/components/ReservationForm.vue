<template>
  <b-form :ref="refer">
    <b-form-group
      label="Name and Surname"
    >
      <b-form-input
        v-model="$v.form.name.$model"
        name="name"
        :state="validateState('form.name')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Email">
      <b-form-input
        v-model="$v.form.email.$model"
        name="email"
        :state="validateState('form.email')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be a valid e-mail adress.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Identification Number">
      <b-form-input
        v-model="$v.form.tc.$model"
        name="tc"
        type="number"
        :state="validateState('form.tc')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be a 11 digits.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Phone Number">
      <b-form-input
        v-model="$v.form.phone.$model"
        name="phone"
        type="number"
        :state="validateState('form.phone')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be a valid phone number. e.g. 05554443322
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Age">
      <b-form-input
        v-model="$v.form.age.$model"
        name="age"
        type="number"
        :state="validateState('form.age')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be greater than 6.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Hes Code">
      <b-form-input
        v-model="$v.form.hes_code.$model"
        name="hes_code"
        :state="validateState('form.hes_code')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This is a required field and must be a valid HES code. e.g. A1B2-1234-12
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Sex">
      <b-form-select
        v-model="$v.form.sex.$model"
        name="sex"
        :options="sex"
        :state="validateState('form.sex')"
      ></b-form-select>
      <b-form-invalid-feedback>
        This is a required.
      </b-form-invalid-feedback>
    </b-form-group>

    <div class="d-flex justify-content-between">
      <!-- next btn -->
      <b-button 
        v-if="showNextBtn"  
        variant="primary" 
        :disabled="$v.$invalid"
        @click="$emit('next')"
      >
        Next
        <i class="ml-1 fas fa-arrow-right"></i>
      </b-button>

      <!-- payment btn -->
      <b-button 
        v-if="!showNextBtn"  
        variant="primary" 
        :disabled="disablePaymentBtn"
        v-b-modal.payment-modal
      >
        Proceed To Payment
        <i class="ml-1 fas fa-credit-card"></i>
      </b-button>

      <!-- autofill btn -->
      <b-button 
        class="font-1h"
        variant="link"
        v-b-tooltip.hover title="Auto Fill"
        @click="formMagic()"
      >
        <i class="fas fa-hat-wizard"></i>
      </b-button>
    </div>

  </b-form>
</template>

<script>
import reservationValidation from "@/mixins/validation/reservation-validation.js"
import validateState from "@/mixins/validation/validate-state.js"

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
    disablePaymentBtn: {
      type: Boolean,
      required: true
    },
    refer: {
      type: String,
      required: true
    },
  },
  mixins: [reservationValidation, validateState],
  data() {
    return {
      form: {
        name: "",
        email: "",
        age: null,
        hes_code: "",
        tc: "",
        phone: "",
        sex: ""
      },
      sex: ["Male", "Female", "Other"],
    };
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
        if(!this.$v.$dirty) { // If form is never touched set first input to focused
          this.$refs[this.refer][1].focus();
        } else { // if form is touched set first invalid input to focused
          for (let i = 0; i < this.$refs[this.refer].length; i++) {
            if(!this.validateState(`form.${this.$refs[this.refer][i].name}`)) {
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
    // magically fills the form
    formMagic() {
      this.form.name = "Ozanus Ulutaşus";
      this.form.email = "purrfect@mail.com";
      this.form.age = 30;
      this.form.hes_code = "A1B2-1234-12";
      this.form.tc = "24654265426";
      this.form.phone = "05554443322";
      this.form.sex = "Male";

      this.$v.$touch();
    }
  }
};
</script>

