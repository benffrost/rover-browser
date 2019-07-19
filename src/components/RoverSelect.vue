<template>
  <div class="RoverSelect">
    <div class="border">
      <b-form-group id="rover-select" label="Rover Selection">
        <b-form-radio-group button-variant="outline-primary" v-model="selectedRover" :options="roverOptions" buttons
          stacked name="radio-rover-select" @change="setRover($event)">
        </b-form-radio-group>
      </b-form-group>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'RoverSelect',
    data() {
      return {
        selectedRover: 'curiosity',
        roverOptions: [
          { text: 'Curiosity', value: 'curiosity' },
          { text: 'Opportunity', value: 'opportunity' },
          { text: 'Spirit', value: 'spirit' }],
      }
    },
    computed: {
      rover() {
        return this.$store.state.active_view.rover;
      }
    },
    methods: {
      setRover(val) {
        this.$store.dispatch("setRover", val)
      }
    },
    components: {}
  }
</script>


<style scoped>

</style>