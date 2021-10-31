<template>
  <div>
    <b-row align-v="start">
      <!-- About Hotel -->
      <b-col lg="8" class="mb-3 mb-lg-0">
        <b-card class="shadow">
          <h1 class="mb-3">{{ hotel.name }}</h1>
          <!-- carousel -->
          <HotelCarousel :showcase-img="hotel.img" />

          <hr>

          <!-- Location -->
          <section>
            <div class="d-flex flex-wrap align-items-center mb-2">
              <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
              <!-- city -->
              <span class="text-muted">{{ hotel.location.city }}</span>
              <span class="mx-2">&#8226;</span>
              <!-- show on map -->
              <b-button 
                class="p-0"
                variant="link"
                v-b-modal.map-modal
              >
                Show On Map
              </b-button>
              <span class="mx-2">&#8226;</span>
              <!-- from center -->
              <span>{{ hotel.location.distance_from_center }} km from center</span>
              <!-- subway -->
              <span v-if="hotel.location.subway_access">
                <span class="mx-2">&#8226;</span>
                <span>Subway Access</span>
              </span>

              <HotelCardRating
                :id="hotel.id"
                :rating="hotel.rating"
                class="flex-1 text-right"
              />
            </div>
            <div>
              <i class="fas fa-hotel mr-2 text-primary"></i> 
              {{ hotel.location.addr }},
              {{ hotel.location.city }},
              {{ hotel.location.country }}
            </div>
          </section>

          <hr>

          <!-- desc -->
          <div class="mt-4">
            <p
              v-for="desc, i in hotelDesc"
              :key="i"
            >
              {{ desc }}
            </p>
          </div>

          <hr>

          <!-- facilities -->
          <div class="d-flex flex-wrap gap-1 mb-3 flex-1">
            <div
              v-for="facility, i in hotel.facilities"
              :key="i"
            >
              <i 
                class="mr-1 text-primary"
                :class="facilityIcons[facility]"
              ></i>
              <span class="text-muted">
                {{ facility | capitalize }}
              </span>
            </div>
          </div>

        </b-card>
      </b-col>

      <!-- Book -->
      <b-col lg="4" class="sticky p-lg-0">
        <b-card class="shadow">
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <h2 class="mb-0">Book Now</h2>
            <span v-if="totalPrice > 0">
              Total: {{ totalPrice }} $
            </span>
          </div>
          <hr>
          <b-form>
            <!-- Dates -->
            <b-form-group label="Check-In Date" label-class="font-weight-bold">
              <b-form-datepicker 
                v-model="form.checkInDate" 
                placeholder="Choose a check-in date" 
                locale="en"
                no-flip
                :state="validateState('form.checkInDate')"
              ></b-form-datepicker>
              <b-form-invalid-feedback>
                Choose a check-in date
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Check-Out Date" label-class="font-weight-bold">
              <b-form-datepicker 
                v-model="form.checkOutDate" 
                placeholder="Choose a check-out date" 
                locale="en"
                no-flip
                :state="validateState('form.checkOutDate')"
              ></b-form-datepicker>
              <b-form-invalid-feedback>
                Choose check-out date
              </b-form-invalid-feedback>
            </b-form-group>

            <!-- Visitor Counters -->
            <b-form-group label="Visitors" label-class="font-weight-bold">
              <b-dropdown 
                :text="totalVisitorCount > 0 ? `Adults: ${form.adultCount}${form.infantCount > 0 ? `, Infants: ${form.infantCount}` : ''}` : 'Choose the number of visitors'"
                block
                :toggle-class="`custom-dropdown-toggle ${!$v.form.adultCount.minValue && $v.form.adultCount.$dirty ? 'custom-dropdown-toggle--error' : ''} d-flex justify-content-between align-items-center`"
                menu-class="w-100"
              >
                <div class="d-flex flex-wrap justify-content-between align-items-center px-3">
                  <div class="text-center">
                    <b>Adult</b> 
                    <VisitorCounter :visitor-count="form.adultCount" @change="setVisitorCount('adult', $event)"/>
                  </div>
                  <span class="text-muted">|</span>
                  <div class="text-center">
                    <b>Infant</b>
                    <VisitorCounter :visitor-count="form.infantCount" @change="setVisitorCount('infant', $event)"/>
                  </div>
                </div>
              </b-dropdown>
              <small v-if="!$v.form.adultCount.minValue && $v.form.adultCount.$dirty" class="text-danger">Choose the number of adult visitors</small>
            </b-form-group>
            
            <!-- Bed sizes -->
            <b-form-group label="Bed Size" label-class="font-weight-bold">
              <div class="d-flex flex-wrap gap-0h">
                <div 
                  v-for="bedSize, i in hotel.bed_sizes"
                  :key="i"
                  class="custom-radio"
                >
                  <input 
                    v-model="$v.form.bedSize.$model"
                    type="radio" 
                    name="bed_size" 
                    :id="`${bedSize}-bed`" 
                    class="custom-radio__radio" 
                    :value="bedSize"
                  >
                  <label class="custom-radio__label d-flex flex-column align-items-center gap-0h" :for="`${bedSize}-bed`">
                    <i 
                      class="custom-radio__icon font-1h"
                      :class="bedSizeIcons[bedSize]"
                    ></i>
                    {{ bedSize | capitalize }} Size
                  </label>
                </div>
              </div>
              <small v-if="!$v.form.bedSize.required && $v.form.bedSize.$dirty" class="text-danger">Choose a bed size</small>
            </b-form-group>

            <!-- Included -->
            <b-form-group label="Included" label-class="font-weight-bold">
              <div class="d-flex flex-wrap gap-0h">
                <div 
                  v-for="included, i in hotel.included"
                  :key="i"
                  class="custom-radio"
                >
                  <input 
                    v-model="form.included"
                    type="radio" 
                    name="included" 
                    :id="`${included}`" 
                    class="custom-radio__radio" 
                    :value="included"
                  >
                  <label class="custom-radio__label d-flex flex-column align-items-center gap-0h" :for="`${included}`">
                    <i 
                      class="custom-radio__icon font-1h"
                      :class="includedIcons[included]"
                    ></i>
                    {{ included | capitalize }}
                  </label>
                </div>
              </div>
            </b-form-group>

            <div class="d-flex justify-content-between">
              <!-- book -->
              <b-button 
                variant="primary"
                @click="book()"
              >
                Book Now
              </b-button>
              <!-- auto fill -->
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
        </b-card>
      </b-col>
    </b-row>

    <MapModal 
      :coordinates="hotel.location.coordinates"
    />
  </div>
</template>

<script>
import VisitorCounter from "@/components/VisitorCounter.vue"
import HotelCarousel from "@/components/HotelCarousel.vue"
import MapModal from "@/components/modals/MapModal"
import HotelCardRating from "@/components/HotelCardRating"

import hotels from "@/assets/data/hotels"
import bedSizeIcons from "@/assets/data/maps/bed-size-icons"
import facilityIcons from "@/assets/data/maps/facility-icons"
import includedIcons from "@/assets/data/maps/included-icons"

import bookingValidation from "@/mixins/validation/booking-validation.js"
import validateState from "@/mixins/validation/validate-state.js"

export default {
  name: "Hotel",
  components: {
    VisitorCounter,
    HotelCarousel,
    MapModal,
    HotelCardRating
  },
  mixins: [bookingValidation, validateState],
  data() {
    return {
      hotels,
      bedSizeIcons,
      facilityIcons,
      includedIcons,
      hotel: {},
      hotelDesc: "",  // description about hotel
      form: { // booking data
        adultCount: 0,
        infantCount: 0,
        checkInDate: null,
        checkOutDate: null,
        bedSize: null,
        included: null,
      }
    }
  },
  computed: {
    // calcs the total visitor count
    totalVisitorCount() {
      return this.form.adultCount + this.form.infantCount;
    },
    // calcs the total price.
    totalPrice() {
      return this.form.adultCount * ((this.hotel.pricing.bed[this.form.bedSize || "normal"]) + (this.hotel.pricing.included[this.form.included] || 0));
    }
  },
  created() {
    const hotelId = this.$route.params.id; // get hotel id from route param
    this.hotel = this.hotels.find(hotel => hotel.id == hotelId); // find hotel by id
    this.hotelDesc = this.hotel.desc.split("\n"); // split hotel description by new lines for making paragraphs
  },
  methods: {
    // Sets the visitors count according to type (adult or infant)
    setVisitorCount(type, $event) {
      if(type === "adult") {
        this.form.adultCount = $event;
      } else if(type === "infant") {
        this.form.infantCount = $event;
      }
    },

    // if basic requirements for booking is satisfied, redirect to reservation page with props
    book() {
      this.$v.$touch();

      if(!this.$v.$error) {
        this.$router.push({ 
          name: "Reservation",
          params: {
            bookingData: {
              ...this.form,
              totalVisitorCount: this.totalVisitorCount,
              totalPrice: this.totalPrice,
              hotel: {
                img: this.hotel.img,
                name: this.hotel.name
              }
            },
          }
        });
      }
    },

    // magically fills the form.
    formMagic() {
      const date = new Date();

      this.form.adultCount = 2;
      this.form.infantCount = 1;
      this.form.checkInDate = new Date();
      this.form.checkOutDate = new Date(date.setDate(date.getDate() + 3));
      this.form.bedSize = "king";
      this.form.included = "all-in";
    }
  }  
};
</script>

<style lang="scss">
.custom-dropdown-toggle {
  border: 1px solid #ced4da;
  background-color: white !important;
  color: #6c757d !important;

  &:hover {
    border-color: #ced4da;
  }

  &--error {
    border-color: #dc3545;
     &:hover {
      border-color: #dc3545;
    }
  }
}
</style>