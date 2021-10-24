<template>
  <div>
    <b-row align-v="start">
      <!-- Reservation -->
      <b-col lg="8">
        <h1>Reservation</h1>
        <b-card no-body class="shadow mr-2">
          <b-tabs pills card>
            <b-tab v-for="i in 5" :key="i" :title="`${i}. Visitor`">
              <b-card-text>
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
                    <div class="error" v-if="!$v.form.fname.required">
                      Field is required
                    </div>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Your Name:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="$v.form.lname.$model"
                      placeholder="L Name"
                      required
                    ></b-form-input>
                    <div class="error" v-if="!$v.form.lname.required">
                      Field is required
                    </div>
                  </b-form-group>

                  <b-button type="submit" variant="primary" :disabled="$v.$invalid">Submit</b-button>
                </b-form>
              </b-card-text>
            </b-tab>
            <!-- <b-tab title="Tab 2">
              <b-card-text>Tab contents 2</b-card-text>
            </b-tab> -->
          </b-tabs>
        </b-card>
      </b-col>
      <!-- About Hotel -->
      <b-col lg="4">
        <h2>Hotel Name</h2>
        <b-card class="sticky shadow">
          <b-img fluid src="https://picsum.photos/400/400/?image=20" />

          <b-button to="/hote/3" variant="primary">Go Back</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
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
};
</script>

<style>
</style>