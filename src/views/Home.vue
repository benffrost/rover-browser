<template>
  <div class="home container-fluid" id="app">
    <div class="row">
      <div class="col">
        <h1>mars ro
          <img alt="Vue logo" src="../assets/logo.png">er image browser</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <Nav_Controls></Nav_Controls>
      </div>
      <div class="col-10">
        <img :src="current_img"></img>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Nav_Controls from '@/components/Nav_Controls'

  export default {
    name: 'home',
    computed: {
      current_img() {
        return this.$store.state.active_view.img_url;
      }
    },
    components: {
      Nav_Controls
    }
  }
</script>