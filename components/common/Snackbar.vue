<script setup lang="ts">
const { snackbar } = useSnackbar()
</script>

<template>
  <v-snackbar
    v-model="snackbar.isShow"
    location="top"
    :timeout="3000"
    :color="snackbar.color"
  >
    <span>{{ snackbar.message }}</span>
    <template #actions>
      <v-btn icon small @click="snackbar.isShow = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
