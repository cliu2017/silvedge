<template>
    <v-content>
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
                <v-card>
                    <v-card-title class="ml-5">{{ property.street + ', ' + property.suburb }}
                        <v-spacer></v-spacer>
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
                        <v-btn small fab v-if="userIsCreator" class="ma-5 grey--text lighten">
                            <app-edit-property-details :property="property"></app-edit-property-details>
                        </v-btn>
                    </v-card-title>
                    <v-img 
                    :src="property.src"
                    height="600"
                    width="2000"
                    ></v-img>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        property () {
            return this.$store.getters.loadedProperty(this.id)
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator () {
            if (!this.userIsAuthenticated) {
                return false
            }
            return this.$store.getters.user.uid === this.property.creatorId
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

