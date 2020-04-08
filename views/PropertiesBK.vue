<template>
  <v-card>
    <v-toolbar
      color="grey lighten-1 grey lighten-5--text"
      dark
    >
      <v-toolbar-title >My Properties</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/properties/new" tag="span" style="cursor: pointer">  
          <v-btn small class="grey lighten-5 black--text mt-1">
              <span class="subtitle-1 orange--text">Add a new property</span>
          </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn icon >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-layout row wrap>
          <v-flex xs12 sm12 md4
            v-for="property in properties"
            :key="property.id"
            @click="onLoadProperty(property.id)"
          >
            <v-card class="ma-3">
              <v-responsive>
              <v-img
                :src="property.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="property.suburb"></v-card-title>
              </v-img>
              </v-responsive>

              <v-card-actions>
                <v-content >{{ property.street }} </v-content>
                
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn router :to="'/properties/' + property.id"> details </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    computed: {
      properties () {
        // return this.$store.getters.loadedProperties
        return this.$store.state.loadedProperties
      }
    },
    mounted() {
      this.getProperties()
    },
    methods: {
      getProperties() {
        this.$store.dispatch('loadProperties')
      },
      onLoadProperty(id) {
        this.$router.push('/properties/' + id)
      }
    }
  }
</script>