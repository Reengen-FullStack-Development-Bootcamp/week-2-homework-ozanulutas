<template>
  <b-form @submit.prevent="submit()">
    <b-form-group label="Name Surname">
      <b-form-input
        v-model="$v.form.name.$model"
        :state="validateState('form.name')"
      ></b-form-input>
      <b-form-invalid-feedback>
        Enter your name and surname
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Credit Card Number">
      <b-form-input
        v-model="$v.form.cardNumber.$model"
        type="number"
        :state="validateState('form.cardNumber')"
      ></b-form-input>
      <b-form-invalid-feedback>
        This field is required and must be 16 digits
      </b-form-invalid-feedback>
    </b-form-group>

    <b-row>
      <b-col cols="8">
        <b-form-group label="Valid Thru">
          <b-row no-gutters>
            <b-col>
              <b-form-select
                v-model="$v.form.validThru.month.$model"
                :options="validThru.months"
                :state="validateState('form.validThru.month')"
              ></b-form-select>
              <b-form-invalid-feedback>
                Choose a month
              </b-form-invalid-feedback>
            </b-col>
            <span class="mx-2 font-1h"> / </span>
            <b-col>
              <b-form-select
                v-model="$v.form.validThru.year.$model"
                :options="validThru.years"
                :state="validateState('form.validThru.year')"
              ></b-form-select>
              <b-form-invalid-feedback> Choose a year </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="CCV">
          <b-form-input
            v-model="$v.form.ccv.$model"
            type="number"
            :state="validateState('form.ccv')"
          ></b-form-input>
          <b-form-invalid-feedback>
            This field is required and must be 3 digits
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>

    <div class="d-flex justify-content-between">
      <b-button type="submit" variant="primary">Submit</b-button>

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
import paymentValidation from "@/mixins/validation/payment-validation.js"
import validateState from "@/mixins/validation/validate-state.js"

export default {
  name: "PaymentModal",
  mixins: [paymentValidation, validateState],
  data() {
    return {
      isValid: false,
      validThru: {
        months: [],
        years: [],
      },
      form: {
        name: "",
        cardNumber: "",
        validThru: {
          month: "",
          year: "",
        },
        ccv: ""
      }
    }
  },
  created() {
    this.setValidThruYears();
    this.setValidThruMonths();
  },
  watch: {
    // wathes validity of the form, if form is valid emits the state and visitors name
    isValid(isValid) {
      if(isValid) {
        this.$emit("on-validate", isValid, this.form.name);
      }
    }
  },
  methods: {
    // if form is valid submits it
    submit() {
      this.$v.$touch();

      if(!this.$v.$error) {
        this.isValid = true;
      }
    },
    // sets the valid thru years
    setValidThruYears() {
      const thisYear = new Date().getFullYear();
      this.validThru.years = [
        ...Array.from(Array(10).keys()).map((year) => thisYear + year)
      ];
    },
    // sets the valid thru months
    setValidThruMonths() {
      this.validThru.months = [
        ...Array.from(Array(12).keys()).map((month) => month + 1)
      ];
    },

    // magically fills the form
    formMagic() {
      this.form.name = "Ozanus Ulutaşus";
      this.form.cardNumber = "1234567891234567";
      this.form.validThru.month = "8";
      this.form.validThru.year = "2025";
      this.form.ccv = "222";

      this.$v.$touch();
    }
  }
}
</script>
