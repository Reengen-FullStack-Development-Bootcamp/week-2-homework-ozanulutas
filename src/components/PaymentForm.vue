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

    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { getPropByPath } from "@/helpers/object-helpers.js";

export default {
  name: "PaymentModal",
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
  validations: {
    form: {
      name: {
        required,
      },
      cardNumber: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(16)
      },
      ccv: {
        required,
        maxLength: maxLength(3),
        minLength: minLength(3)
      },
      validThru: {
        month: {
          required,
        },
        year: {
          required,
        },
      },
    },
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
      this.isValid = true;

      this.$v.$touch();

      if(!this.$v.$error) {
        console.log("succ");
        this.isValid = true;
      }
    },

    // Validates single form input
    validateState(name) {
      if(!getPropByPath(this.$v, name)) { // if there are no vuealidate model, return
        return true;
      }
      const { $dirty, $error } = getPropByPath(this.$v, name);
      return $dirty ? !$error : null; // if form is touched return error state
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
    }
  }
}
</script>
