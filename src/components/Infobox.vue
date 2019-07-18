<template>
  <div class="Infobox">
    <div class="border my-2 py-1">
      <p>Info:</p>
      <p>Earth Date: {{ earthDate }}</p>
      <p>{{fullCameraName}}</p>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Infobox',
    data() {
      return {}
    },
    computed: {
      earthDate() {
        return this.$store.state.manifest[this.$store.state.active_view.date_index].earth_date
      },
      fullCameraName() {
        let index = this.$store.state.active_view.img_index
        return this.$store.state.photolist[index].camera.full_name
      },
    },
    methods: {},
    components: {}
  }
</script>


<style scoped>

</style>