<template>
  <b-navbar 
    toggleable="md" 
    type="dark" 
    variant="dark"
    class="mb-5"
  >
    <b-container>

      <b-navbar-brand to="/">CoolName</b-navbar-brand>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-form>
              <b-form-checkbox-group
                v-model="selectedFacilies"
                :options="facilityOptions"
                name="facility"
                @change="$emit('change-selected-facility', selectedFacilies)"
              ></b-form-checkbox-group>
            </b-dropdown-form>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse> -->
    </b-container>
  </b-navbar>
</template>

<script>
import facilities from "@/assets/data/maps/facility-icons.json"

export default {
  name: "Navbar",
  data() {
    return {
      facilityOptions: [],
      selectedFacilies: [],
    }
  },
  created() {
    this.setFacilityOptions();
  },
  methods: {
    setFacilityOptions() {
      Object.keys(facilities).forEach(facility => {
        this.facilityOptions.push({
          text: facility, 
          value: facility
        });
      });
    }
  }
}
</script>

<style>

</style>