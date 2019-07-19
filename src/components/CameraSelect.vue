<template>
  <div class="CameraSelect">
    <div class="my-2 border">
      <p>Camera:</p>

      <b-form-group id="camera-select" size="sm" stacked :disabled="loading">
        <b-form-radio-group id="btn-radios-3" button-variant="outline-secondary" :value="camera"
          :options="cameraOptions" buttons stacked name="radio-rover-select" @change="setCamera()">
        </b-form-radio-group>
      </b-form-group>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'CameraSelect',
    props: [
      "selected"
    ],
    data() {
      return {
        selectedCamera: 'All'
      }
    },
    computed: {
      camera() {
        return this.$store.state.active_view.camera
      },
      cameraOptions() {
        let index = this.$store.state.active_view.date_index
        let inputArray = ['All'].concat(this.$store.state.manifest[index].cameras)
        let outArray = []
        for (let i = 0; i < inputArray.length; i++) {
          outArray.push({ text: inputArray[i], value: inputArray[i] })
        }
        return outArray
      }

    },
    methods: {
      setCamera() {
        this.$nextTick(() => this.$store.dispatch("setCamera", this.selectedCamera))
      }
    },
    components: {}
  }
</script>


<style scoped>

</style>