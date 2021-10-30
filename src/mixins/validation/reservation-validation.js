import { required, email, minValue, minLength, maxLength } from "vuelidate/lib/validators";
import { hesCode, validPhone } from "@/helpers/validation-rules.js"

export default {
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      age: {
        required,
        minValue: minValue(6),
      },
      hes_code: {
        required,
        hesCode
      },
      tc: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      phone: {
        required,
        validPhone
      },
      sex: {
        required
      },
    },
  },
}