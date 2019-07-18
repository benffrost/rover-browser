<template>
  <div class="DaySelect">
    <div class="my-2 border">

      <label for="day-range">Day: {{ dateIndex+1 }}/{{ totalDays }}</label>
      <b-input-group size="sm">
        <b-form-input @change="updateDate($event)" id="day-range" :value="dateIndex" type="range" min="0"
          :max="totalDays"></b-form-input>
        <b-button @click="resetDate()" slot="prepend"><i class="fas fa-fast-backward"></i>
        </b-button>
        <b-button @click="decrementDate()" slot="prepend"><i class="fas fa-step-backward"></i>
        </b-button>
        <b-button @click="incrementDate()" slot="append"><i class="fas fa-step-forward"></i>
        </b-button>
        <b-button @click="endDate()" slot="append"><i class="fas fa-fast-forward"></i>
        </b-button>
      </b-input-group>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'DaySelect',
    props: [
      "setter",
      "index",
      "max",
    ],
    data() {
      return {}
    },
    computed: {
      dateIndex() {
        return this.$store.state.active_view.date_index;
      },
      totalDays() {
        return this.$store.state.manifest.length
      },

    },
    methods: {
      incrementDate() {
        this.$store.dispatch("setDate", this.dateIndex + 1)
        this.selectedCamera = "All"
      },
      decrementDate() {
        this.$store.dispatch("setDate", this.dateIndex - 1)
        this.selectedCamera = "All"
      },
      resetDate() {
        this.$store.dispatch("setDate", 0)
        this.selectedCamera = "All"
      },
      endDate() {
        this.$store.dispatch("setDate", this.totalDays - 1)
        this.selectedCamera = "All"
      },
      updateDate(value) {
        debugger
        this.$store.dispatch("setDate", value - 1)
        this.selectedCamera = "All"
      }

    },
    components: {}
  }
</script>


<style scoped>

</style>