import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedProperties: [],
    // users: {
      // uid: 'hglakjghorie',
      // savedProperties: ['adfdsaf']
    //},
    user: {
      uid: 'hglakjghorie',
      savedProperties: ['adfdsaf']
    },
    isAuthenticated: false,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedProperties (state, payload) {
      state.loadedProperties = payload;
    },
    addProperty (state, payload) {
      state.loadedProperties.push(payload)
    },
    updateProperty (state, payload) {
      const property = state.loadedProperties.find(property => {
        return property.id === payload.id
      })
      if (payload.street) {
        property.street = payload.street
      }
      if (payload.suburb) {
        property.suburb = payload.suburb
      }
      if (payload.others) {
        property.others = payload.others
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
        state.isAuthenticated = payload;
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    userJoin({ commit }, { email, password }) {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
              commit('setUser', user);
              commit('setIsAuthenticated', true);
              router.push('/');
          })
          .catch(() => {
              commit('setUser', null);
              commit('setIsAuthenticated', false);
              router.push('/');
          })
  },
  signUserUp ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
      user => {
        commit('setLoading', false)
        const newUser = {
          uid: user.user.uid,
          savedProperties: []
        }
        commit('setUser', newUser)
      }
    )
    .catch(
      error => {
        commit('setLoading', false)
        commit('setError', error)
        console(error)
      }
    )
  },
  userLogin({ commit }, { email, password }) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            commit('setUser', user);
            commit('setIsAuthenticated', true);
            router.push('/');
        })
        .catch(() => {
            commit('setUser', null);
            commit('setIsAuthenticated', false);
            router.push('/');
        });
  },
  signUserIn ({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      user => {
        commit('setLoading', false)
        const newUser = {
          uid: user.user.uid,
          savedProperties: []
        }
        commit('setUser', newUser)
      }
    )
    .catch(
      error => {
        commit('setLoading', false)
        commit('setError', error)
        console(error)
      }
    )
  },
  autoSignIn ({ commit }, payload) {
    commit('setUser', payload)
  },
  userSignOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
      })
      .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
      });
  },
  loadProperties ({commit}) {
    firebase
    .database().
    ref('properties')
    .once('value')
    .then((snapshot) => {
      const properties = []
      const obj = snapshot.val()
      for (let key in obj) {
        properties.push({
          id: key,
          street: obj[key].street,
          suburb: obj[key].suburb,
          others: obj[key].others,
          src: obj[key].src,
          creatorId: obj[key].creatorId
        })
      }
      commit('setLoadedProperties', properties)
    })
    .catch()
  },
  addProperty ({commit, getters}, payload) {
    const property = {
      street: payload.street,
      suburb: payload.suburb,
      others: payload.others,
      creatorId: getters.user.uid
    }
    let imageUrl
    let key
    firebase.database().ref('properties').
    push(property)
    .then((data) => {
      key = data.key
      return key
    })
    .then(key => {
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      // return firebase.storage().ref('properties/' + key + '.' + ext).put(payload.image)
      return firebase.storage().ref('properties/' + key + '.' + ext).put(payload.image)
    })
    .then(fileData => {
      let fullPath = fileData.metadata.fullPath
      return firebase.storage().ref(fullPath).getDownloadURL()
    })
    .then(URL => {
      imageUrl = URL
      return firebase.database().ref('properties').child(key).update({src: imageUrl})
    })
    .then(() => {
      commit('addProperty', {
        ...property,
        src: imageUrl,
        id: key
      })
    })
    .catch()
  },
  updateProperty ({commit}, payload) {
    commit('setLoading', true)
    const updateObj = {}
    if (payload.street) {
      updateObj.street = payload.street
    }
    if (payload.suburb) {
      updateObj.suburb = payload.suburb
    }
    if (payload.others) {
      updateObj.others = payload.others
    }
    firebase.database().ref('properties').child(payload.id).update(updateObj)
    .then(() => {
      commit('setLoading', false)
      commit('updateProperty', payload)
    })
    .catch(error => {
      console(error)
      commit('setLoading', false)
    })
  }
},
  getters: {
    loadedProperties (state) {
      return state.loadedProperties.sort((propertyA, propertyB) => {
        return propertyA.id > propertyB.id
      })
    },
    featuredProperties (state, getters) {
      return getters.loadedProperties.slice(0,2)
    }, 
    loadedProperty (state) {
      return (propertyId) => {
        return state.loadedProperties.find((property) => {
          return property.id === propertyId
          })
        }
    },
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
  },
  user (state) {
      return state.user
    },
  loading (state) {
      return state.loading
  },
  error (state) {
    return state.error
    }
  }
})
