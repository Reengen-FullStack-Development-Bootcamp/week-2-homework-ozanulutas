<template>
  <div>
    <b-row align-v="start">
      <b-col lg="8" class="mb-3 mb-lg-0">
        <b-card class="shadow">
          <h1 class="mb-3">{{ hotel.name }}</h1>
          <!-- carousel -->
          <HotelCarousel :showcase-img="hotel.img" />

          <hr>

          <!-- Location -->
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
            <b-form-group label="Check-in Date" label-class="font-weight-bold">
              <b-form-datepicker 
                v-model="form.checkInDate" 
                placeholder="Choose a check-in date" 
                locale="en"
                no-flip
                :state="validateState('checkInDate')"
              ></b-form-datepicker>
              <b-form-invalid-feedback>
                Choose a check-in date to book
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Check-out Date" label-class="font-weight-bold">
              <b-form-datepicker 
                v-model="form.checkOutDate" 
                placeholder="Choose check-out date" 
                locale="en"
                no-flip
                :state="validateState('checkOutDate')"
              ></b-form-datepicker>
              <b-form-invalid-feedback>
                Choose check-out date to book
              </b-form-invalid-feedback>
            </b-form-group>

            <!-- Visitor Counters -->
            <b-form-group label="Visitors" label-class="font-weight-bold">
              <div class="d-flex align-items-center">
                Adult: <VisitorCounter @change="setVisitorCount('adult', $event)"/>
              </div>
              <small v-if="!$v.form.adultCount.minValue && $v.form.adultCount.$dirty" class="text-danger">Choose the number of adult visitors</small>
              <div class="d-flex align-items-center">
                Infant: <VisitorCounter @change="setVisitorCount('infant', $event)"/>
              </div>
            </b-form-group>
            
            <!-- Bed sizes -->
            <b-form-group label="Bed Size" label-class="font-weight-bold">
              <div class="d-flex gap-0h">
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
                  <label class="custom-radio__label shadow-sm d-flex flex-column align-items-center gap-0h" :for="`${bedSize}-bed`">
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
              <div class="d-flex gap-0h">
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
                  <label class="custom-radio__label shadow-sm d-flex flex-column align-items-center gap-0h" :for="`${included}`">
                    <i 
                      class="custom-radio__icon font-1h"
                      :class="includedIcons[included]"
                    ></i>
                    {{ included | capitalize }}
                  </label>
                </div>
              </div>
            </b-form-group>

            <!-- book -->
            <b-button 
              variant="primary"
              @click="book()"
            >
              Book Now
            </b-button>
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

import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "Hotel",
  components: {
    VisitorCounter,
    HotelCarousel,
    MapModal,
    HotelCardRating
  },
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
        checkInDate: new Date(),
        checkOutDate: new Date(),
        bedSize: null,
        included: null,
      }
    }
  },
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
  // watch: {
  //   $route(to, from) {
  //     // react to route changes...
  //     console.log(to, from);
  //     // console.log(to.params.id);
  //   },
  // },
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

    // Validates single form input
    validateState(name) {
      if(!this.$v.form[name]) { // if there are no vuealidate model, return
        return true;
      }
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null; // if form is touched return error state
    },

    // if basic requirements for booking is satisfied, redirect to reservation page
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
  }  
};
</script>
