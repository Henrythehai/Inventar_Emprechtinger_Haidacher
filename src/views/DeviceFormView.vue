<template>
  <h2 v-if="isEdit">Gerät bearbeiten (ID {{ route.params.id }})</h2>
  <h2 v-else>Neues Gerät</h2>
  <p>Hier kommt in Woche 4 das Formular hin.</p>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// current route: gives access to URL parameters like route.params.id
const route = useRoute()

// edit mode when the URL contains an id (/devices/3/edit)
const isEdit = computed(() => route.params.id !== undefined)
</script>
