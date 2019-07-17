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

      loading: false,

      camera: "",

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
    startLoading(state) {
      state.active_view.loading = true
    },
    endLoading(state) {
      state.active_view.loading = false
    }



  },
  actions: {
    async setRover({ commit, dispatch }, rover) {
      commit('startLoading')
      commit('setRover', rover)
      commit("setDateIndex", 0)
      commit('setPhoto', 0)

      try {
        let manifestRes = await api.get('/manifests/' + this.state.active_view.rover.toLowerCase() + '?api_key=t3Kb6e87RheJxo50YkY92f4qpafTgdM0Qf46waXA')
        let photolistRes = await api.get('/rovers/' + this.state.active_view.rover.toLowerCase() + '/photos?sol=0&api_key=t3Kb6e87RheJxo50YkY92f4qpafTgdM0Qf46waXA')

        commit("setManifest", manifestRes.data.photo_manifest.photos)
        commit("setPhotolist", photolistRes.data.photos)
        commit("endLoading")
      } catch (err) { console.error(err) }
    },

    async setDate({ commit, dispatch }, index) {
      if (index >= 0 && index < this.state.manifest.length) {
        commit('setDateIndex', index)
        commit('setPhoto', 0)
        commit('startLoading')

        let soldate = this.state.manifest[index].sol

        try {
          let res = await api.get('/rovers/' + this.state.active_view.rover.toLowerCase() + '/photos?sol=' + soldate + '&api_key=t3Kb6e87RheJxo50YkY92f4qpafTgdM0Qf46waXA')
          commit("setPhotolist", res.data.photos)
          commit("endLoading")
        } catch (err) { console.error(err) }
      }
    },

    setPhoto({ commit, dispatch }, index) {
      if (index >= 0 && index < this.state.photolist.length) {
        commit('setPhoto', index)
      }
    }
  }
})
