import { required, minValue } from "vuelidate/lib/validators";

export default {
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
      bedSize: {
        required
      },
    },
  },
}