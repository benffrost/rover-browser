<template>
  <div class="Nav_Controls">
    <div class="border">
      <b-form-group id="rover-select" label="Rover Selection">
        <b-form-radio-group button-variant="outline-primary" v-model="selectedRover" :options="roverOptions" buttons
          stacked name="radio-rover-select" @change="setRover()">
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div class="my-2 border">
      <p>Day: {{ dateIndex+1 }}/{{ totalDays }} </p>

      <b-button-group size="sm">
        <b-button @click="decrementDate()" :disabled="loading">-</b-button>
        <b-button @click="incrementDate()" :disabled="loading">+</b-button>
      </b-button-group>
    </div>
    <div class="my-2 border">
      <p>Camera:</p>

      <b-form-group id="camera-select" size="sm" stacked :disabled="loading">
        <b-form-radio-group id="btn-radios-3" button-variant="outline-secondary" v-model="selectedCamera"
          :options="cameraOptions" buttons stacked name="radio-rover-select" @change="setCamera()">
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div class="my-2 border">
      <p>Photo number: {{ photoIndex+1 }} / {{ totalPhotos }}</p>
      <b-button-group size="sm">
        <b-button @click="decrementPhoto()" :disabled="loading">-</b-button>
        <b-button @click="incrementPhoto()" :disabled="loading">+</b-button>
      </b-button-group>
    </div>
    <div class="my-2 border">
      <p>Info:</p>
      <p>Earth Date: {{ earthDate }}</p>
      <p>{{fullCameraName}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Nav_Controls',
    data() {

      return {
        selectedRover: 'curiosity',
        roverOptions: [
          { text: 'Curiosity', value: 'curiosity' },
          { text: 'Opportunity', value: 'opportunity' },
          { text: 'Spirit', value: 'spirit' }],
        selectedCamera: 'All'

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
      },
      cameras() {
        return this.$store.state.manifest[this.$store.state.active_view.date_index].cameras
      },
      camera() {
        return this.$store.state.active_view.camera
      },
      cameraOptions() {
        let inputArray = ['All'].concat(this.$store.state.manifest[this.$store.state.active_view.date_index].cameras)
        let outArray = []
        for (let i = 0; i < inputArray.length; i++) {
          outArray.push({ text: inputArray[i], value: inputArray[i] })
        }
        return outArray
      },
      fullCameraName() {
        let index = this.$store.state.active_view.img_index
        return this.$store.state.photolist[index].camera.full_name
      },
      loading() {
        return this.$store.state.active_view.loading
      }

    },
    methods: {
      setRover() {
        this.$store.dispatch("setRover", this.selectedRover)
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
      },
      setCamera() {
        this.$store.dispatch("setCamera", this.selectedCamera)
      }

    },
    components: {}
  }
</script>


<style scoped>

</style>


<!--

-->