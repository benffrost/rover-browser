<template>
  <div class="Nav_Controls">
    <select class="rover-select" v-model="selected" @change="setRover()">
      <option disabled value="">Curiosity</option>
      <option>Curiosity</option>
      <option>Opportunity</option>
      <option>Spirit</option>
    </select>
    <span>Selected: {{ rover }}</span>
    <div>
      <p>Date_Index is {{ dateIndex }} </p>
      <button @click="incrementDate()">Increment Date</button>
      <button @click="decrementDate()">Decrement Date</button>
    </div>
    <div>
      <p>Photo number: {{photoIndex}}</p>
      <button @click="incrementPhoto()">Increment Photo</button>
      <button @click="decrementPhoto()">Decrement Photo</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Nav_Controls',
    data() {

      return {
        selected: ""
      }
    },
    computed: {
      dateIndex() {
        return this.$store.state.active_view.date_index;
      },
      rover() {
        return this.$store.state.active_view.rover;
      },
      photoIndex() {
        return this.$store.state.active_view.img_index
      }
    },
    methods: {
      setRover() {
        this.$store.dispatch("setRover", this.selected)
      },
      incrementDate() {
        this.$store.dispatch("setDate", ++this.dateIndex)
      },
      decrementDate() {
        this.$store.dispatch("setDate", --this.dateIndex)
      },
      incrementPhoto() {
        this.$store.dispatch("setPhoto", ++this.photoIndex)
      },
      decrementPhoto() {
        this.$store.dispatch("setPhoto", --this.photoIndex)
      }

    },
    components: {}
  }
</script>


<style scoped>

</style>


<!--

-->