<template>
  <v-row wrap>
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on }">
        <v-btn fab small v-on="on" class="mx-3">
            <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <template>
        <v-layout row justify-center>
          <v-flex xs6>
      <v-card>
        <v-container>
        <v-card-title>
          <span class="headline">Edit Property Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row wrap xs12 md8>
              <v-flex xs12>
                <v-text-field
                        class="mt-3 display"
                        name="street"
                        label="Street"
                        id="street"
                        :rules="rules"
                        counter
                        maxlength="20"></v-text-field>
              </v-flex>
              <v-flex xs12>
                        <v-text-field
                        class="mt-3 display"
                        name="suburb"
                        label="Suburb, State, and Post Code"
                        id="suburb"
                        :rules="rules"
                        counter
                        maxlength="20"></v-text-field>
              </v-flex>
              <v-flex xs12>
                        <v-textarea
                          class="mt-3 display"
                          label="Other details"
                          counter
                          maxlength="120"
                          full-width
                          single-line
                          :rules="[rules.required]"
                        ></v-textarea>
              </v-flex>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      editedStreet: '',
      editedSuburb: '',
      editedOthers: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: v => v.length <= 20 || 'Max 20 characters'
      }
    }),
  }
</script>