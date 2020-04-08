<template>
    <div>
    <v-alert
      error
      border="left"
      close-text="Close Alert"
      color="red"
      dismissible
      @input="onClose"
      :value="true">
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
