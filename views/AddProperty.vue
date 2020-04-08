<template>
<v-container>
    <v-layout class="justify-center">
      <v-flex xs12 sm6 offset-sm3>
            <h1> Add a new property</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs12>
            <form @submit.prevent="onAddProperty">
                <v-layout row>
                    <v-flex xs10 sm6 offset-sm3 offset-xs1>
                      <v-btn raised small class="grey darken-4 yellow--text caption" @click="onPickFile">Upload image</v-btn>
                        <input
                        type="file"
                        style="display: none"
                        ref="fileInput"
                        accept="image/*"
                        @change="onFilePicked">
                        <v-layout row>
                          <v-flex xs10 sm6 offset-sm3 offset-xs1 class="mt-3">
                            <v-img :src="src" width="300"></v-img>
                          </v-flex>
                        </v-layout>
                        <v-text-field
                        class="mt-3 title"
                        name="street"
                        label="Street"
                        id="street"
                        v-model="street"
                        :rules="rules"
                        counter
                        maxlength="20"></v-text-field>
                        <v-text-field
                        class="mt-3 title"
                        name="suburb"
                        label="Suburb, State, and Post Code"
                        id="suburb"                        
                        v-model="suburb"
                        :rules="rules"
                        counter
                        maxlength="20"></v-text-field>
                        <v-textarea
                          class="mt-3 title"
                          v-model="others"
                          label="Other details"
                          counter
                          maxlength="120"
                          full-width
                          single-line
                          :rules="[rules.required]"
                        ></v-textarea>
                        <v-btn 
                        class="success mx-0 mt-3" 
                        :disabled="!formIsValid" 
                        type="submit">Add property</v-btn>
                    </v-flex>
                </v-layout>
            </form>
      </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      src: '',
      image: null,
      street: '',
      suburb: '',
      others: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: v => v.length <= 20 || 'Max 20 characters'
      }
    }
  },
  computed: {
    formIsValid () {
      return this.imageUrl !== '' &&
      this.street !== '' &&
      this.suburb !== '' &&
      this.others !== ''
    }
  },
  methods: {
    onAddProperty () {
      if (!this.image) {
        return
      }
      const propertyData = {
        street: this.street,
        suburb: this.suburb,
        image: this.image,
        others: this.others,
        src: this.src
      }
      this.$store.dispatch('addProperty', propertyData)
      this.$router.push('/properties')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      // let file = event.target.files[0]
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      // firebase.storage().ref('properties/' + file.name).put(file)
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.src = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>