import { getPropByPath } from "@/helpers/object-helpers.js";

// Validates single form input
export default {
  methods: {
    validateState(name) {
      if (!getPropByPath(this.$v, name)) { // if there are no vuealidate model, return
        return true;
      }
      const { $dirty, $error } = getPropByPath(this.$v, name);
      return $dirty ? !$error : null; // if form is touched return error state
    }
  }
}
