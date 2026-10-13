<template>
  <div class="device-detail">
    <h2>{{ device.name }}</h2>
    <p><strong>Kategorie:</strong> {{ device.category }}</p>
    <p><strong>Standort:</strong> {{ device.location }}</p>
    <p><strong>Seriennummer:</strong> {{ device.serialNumber }}</p>
    <p><strong>Status:</strong> {{ device.status }}</p>
    <p><strong>Kaufdatum:</strong> {{ device.purchaseDate }}</p>
  </div>
</template>

<script setup>
// the device to show, passed in by the parent
defineProps({
  device: { type: Object, required: true },
})
</script>
