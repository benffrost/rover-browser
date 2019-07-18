import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let _key = "t3Kb6e87RheJxo50YkY92f4qpafTgdM0Qf46waXA"


Vue.use(Vuex)

let api = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/' //todo

})

export default new Vuex.Store({
  state: {

    active_view: {
      rover: "Curiosity",

      loading: false,

      camera: "All",

      date_index: 0,

      img_index: 0,
    },

    manifest: [{
      "sol": 0,
      "earth_date": "2012-08-06",
      "total_photos": 3702,
      "cameras": [
        "CHEMCAM",
        "FHAZ",
        "MARDI",
        "RHAZ"]
    }],

    photolist: [{
      img_src: "//placehold.it/200x200",
      camera: {
        full_name: "Data Loading"
      }
    }]


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
    startLoading(state) {
      state.active_view.loading = true
    },
    endLoading(state) {
      state.active_view.loading = false
    },
    setCamera(state, camera) {
      state.active_view.camera = camera
    }



  },
  actions: {
    async setRover({ commit, dispatch }, rover) {
      commit('startLoading')
      commit('setRover', rover)
      commit("setDateIndex", 0)
      commit('setCamera', "All")
      commit('setPhoto', 0)

      let manSuffix = '/manifests/'
      manSuffix += this.state.active_view.rover.toLowerCase()
      manSuffix += '?api_key=' + _key

      try {
        let manifestRes = await api.get(manSuffix)

        let photolistSuffix = '/rovers/' + this.state.active_view.rover.toLowerCase()
        photolistSuffix += '/photos'
        photolistSuffix += '?sol=' + manifestRes.data.photo_manifest.photos[0].sol
        photolistSuffix += '&api_key=' + _key

        let photolistRes = await api.get(photolistSuffix)

        commit("setManifest", manifestRes.data.photo_manifest.photos)
        commit("setPhotolist", photolistRes.data.photos)
        commit("endLoading")
      } catch (err) { console.error(err) }
    },

    async setDate({ commit, dispatch }, index) {
      if (index >= 0 && index < this.state.manifest.length) {
        commit('setDateIndex', index)
        commit('setPhoto', 0)
        commit('setCamera', "All")
        commit('startLoading')

        let suffix = '/rovers/' + this.state.active_view.rover.toLowerCase()
        suffix += '/photos'
        suffix += '?sol=' + this.state.manifest[index].sol
        suffix += '&api_key=' + _key


        try {
          let res = await api.get(suffix)

          commit("setPhotolist", res.data.photos)
          commit("endLoading")

        } catch (err) { console.error(err) }
      }
    },

    setPhoto({ commit, dispatch }, index) {
      if (index >= 0 && index < this.state.photolist.length) {
        commit('setPhoto', index)
      }
    },

    async setCamera({ commit, dispatch }, camera) {
      commit('startLoading')
      commit('setCamera', camera)
      commit('setPhoto', 0)

      let index = this.state.active_view.date_index

      let suffix = '/rovers/' + this.state.active_view.rover.toLowerCase()
      suffix += '/photos'
      suffix += '?sol=' + this.state.manifest[index].sol
      if (camera != "All") {
        suffix += '&camera=' + this.state.active_view.camera.toLowerCase()
      }
      suffix += '&api_key=' + _key


      try {
        let res = await api.get(suffix)

        commit("setPhotolist", res.data.photos)
        commit("endLoading")
      } catch (err) { console.error(err) }
    }
  }
})
