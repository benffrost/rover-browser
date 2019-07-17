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
      <p>Day number: is {{ dateIndex+1 }}/{{ totalDays }} </p>
      <p>Earth Date photos were taken: {{ earthDate }}</p>
      <button @click="incrementDate()">Increment Date</button>
      <button @click="decrementDate()">Decrement Date</button>
    </div>
    <div>
      <p>Photo number: {{ photoIndex+1 }} / {{ totalPhotos }}</p>
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
    mounted() {
      this.$store.dispatch("setRover", "Curiosity")
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
      },
      totalDays() {
        return this.$store.state.manifest.length
      },
      earthDate() {
        return this.$store.state.manifest[this.$store.state.active_view.date_index].earth_date
      },
      totalPhotos() {
        return this.$store.state.photolist.length
      }

    },
    methods: {
      setRover() {
        this.$store.dispatch("setRover", this.selected)
      },
      incrementDate() {
        this.$store.dispatch("setDate", this.dateIndex + 1)
      },
      decrementDate() {
        this.$store.dispatch("setDate", this.dateIndex - 1)
      },
      incrementPhoto() {
        this.$store.dispatch("setPhoto", this.photoIndex + 1)
      },
      decrementPhoto() {
        this.$store.dispatch("setPhoto", this.photoIndex - 1)
      }

    },
    components: {}
  }
</script>


<style scoped>

</style>


<!--

-->