<template>
  <div class="Nav_Controls">

    <RoverSelect></RoverSelect>

    <ItemSelect title="Day" setter="setDate" :index="dateIndex" :max="totalDays"></ItemSelect>

    <CameraSelect></CameraSelect>

    <ItemSelect title="Photo" setter="setPhoto" :index="photoIndex" :max="totalPhotos"></ItemSelect>

    <infobox></infobox>

  </div>
</template>


<script>
  import ItemSelect from '@/components/ItemSelect'
  import Infobox from '@/components/Infobox'
  import RoverSelect from '@/components/RoverSelect'
  import CameraSelect from '@/components/CameraSelect'

  export default {
    name: 'Nav_Controls',
    data() {

      return {
      }
    },
    mounted() {
      this.$store.dispatch("setRover", "Curiosity")
    },
    computed: {

      loading() {
        return this.$store.state.active_view.loading
      },
      photoIndex() {
        return this.$store.state.active_view.img_index
      },
      totalPhotos() {
        return this.$store.state.photolist.length
      },
      dateIndex() {
        return this.$store.state.active_view.date_index;
      },
      totalDays() {
        return this.$store.state.manifest.length
      }
    },
    methods: {

    },
    components: {
      ItemSelect,
      RoverSelect,
      Infobox,
      CameraSelect
    }
  }
</script>


<style scoped>

</style>


<!--

-->