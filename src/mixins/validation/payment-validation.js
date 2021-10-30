import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
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
}