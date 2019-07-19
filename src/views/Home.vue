<template>
  <div id="app">
    <b-container fluid class="home">
      <b-row id="title">
        <b-col>
          <h1>mars rover image browser
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <Nav_Controls></Nav_Controls>
        </b-col>
        <b-col cols="8">
          <b-spinner label="Spinning" v-if="isLoading"></b-spinner>
          <b-img :src="current_img" fluid v-else></b-img>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Nav_Controls from '@/components/Nav_Controls'

  import infobox from '@/components/Infobox.vue'
  export default {
    name: 'home',
    computed: {
      isLoading() {
        return this.$store.state.active_view.loading
      },
      current_img() {
        let index = this.$store.state.active_view.img_index
        return this.$store.state.photolist[index].img_src;
      }
    },
    components: {
      Nav_Controls
    }
  }
</script>