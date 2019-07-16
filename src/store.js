import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/' //todo

})

export default new Vuex.Store({
  state: {

    active_view: {
      rover: "Curiosity",

      camera: "MAST",
      available_cameras: [],

      date_index: 0,

      img_index: 0,

      img_url: "https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00100/opgs/edr/fcam/FRA_406374643EDR_F0050178FHAZ00301M_.JPG"
    },

    manifest: [],

    photolist: [{ img_src: "//placehold.it/200x200" }]


  },
  mutations: {
    setRover(state, data) {
      state.active_view.rover = data
    },
    setManifest(state, data) {
      state.manifest = data
    },
    setDateIndex(state, data) {
      state.active_view.date_index = data
    },
    setPhotolist(state, data) {
      state.photolist = data
    },
    setPhoto(state, index) {
      state.active_view.img_index = index
    },

    refreshUrl(state) {
      const index = state.active_view.img_index
      state.active_view.img_url = state.photolist[index].img_src
    }


  },
  actions: {
    async setRover({ commit, dispatch }, rover) {

      commit('setRover', rover)

      try {
        let res = await api.get('/manifests/' + this.state.active_view.rover.toLowerCase() + '?api_key=t3Kb6e87RheJxo50YkY92f4qpafTgdM0Qf46waXA')
        commit("setManifest", res.data.photo_manifest.photos)
      } catch (err) { console.error(err) }
    },
    async setDate({ commit, dispatch }, index) {
      commit('setDateIndex', index)

      let soldate = this.state.manifest[index].sol

      try {
        let res = await api.get('/rovers/' + this.state.active_view.rover.toLowerCase() + '/photos?sol=' + soldate + '&api_key=t3Kb6e87RheJxo50YkY92f4qpafTgdM0Qf46waXA')
        commit("setPhotolist", res.data.photos)
      } catch (err) { console.error(err) }
    },
    setPhoto({ commit, dispatch }, index) {
      commit('setPhoto', index)
    }
  }
})
