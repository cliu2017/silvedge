<template>
<v-container  fluid fill-height class="home-hero" style="max-height: 100vh;">
  <v-layout row wrap v-if="loading">
          <v-flex xs12 class="text-xs-center">
              <v-progress-circular
              indeterminate
              class="primary--text"
              :width="7"
              :size="70"
              v-if="loading"></v-progress-circular>
          </v-flex>
      </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
    <v-carousel
      cycle
      height="700"
      hide-delimiter-background
      show-arrows-on-hover
      class="ml-3"
    >
      <v-carousel-item
        v-for="(item,i) in properties"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      properties () {
        return this.$store.getters.featuredProperties
      },
      loading () {
          return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
.home-hero {
  width: 100%;
  height: 100%;
}
</style>
