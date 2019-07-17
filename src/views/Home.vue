<template>
  <div class="home container-fluid" id="app">
    <div class="row">
      <div class="col">
        <h1>mars rover image browser</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <Nav_Controls></Nav_Controls>
      </div>
      <div class="col-10">
        <img class="img" :src="current_img"></img>
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
        let index = this.$store.state.active_view.img_index
        return this.$store.state.photolist[index].img_src;
      }
    },
    components: {
      Nav_Controls
    }
  }
</script>