<template>
  <div class="ItemSelect">
    <div class="my-2 border">

      <label for="day-range">{{ title }}: {{ index+1 }}/{{ max }}</label>
      <b-input-group size="sm">
        <b-form-input @change="updateDate($event)" id="day-range" :value="index" type="range" min="0" :max="max">
        </b-form-input>
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
    name: 'ItemSelect',
    props: [
      "title",
      "setter",
      "index",
      "max"
    ],
    data() {
      return {}
    },
    computed: {


    },
    methods: {
      incrementDate() {
        this.$store.dispatch(this.setter, this.index + 1)
        this.selectedCamera = "All"
      },
      decrementDate() {
        this.$store.dispatch(this.setter, this.index - 1)
        this.selectedCamera = "All"
      },
      resetDate() {
        this.$store.dispatch(this.setter, 0)
        this.selectedCamera = "All"
      },
      endDate() {
        this.$store.dispatch(this.setter, max - 1)
        this.selectedCamera = "All"
      },
      updateDate(value) {
        this.$store.dispatch(this.setter, value - 1)
        this.selectedCamera = "All"
      }

    },
    components: {}
  }
</script>


<style scoped>

</style>