<template>
  <div class="device-detail">
    <h2>{{ device.name }}</h2>
    <p><strong>Kategorie:</strong> {{ device.category }}</p>
    <p><strong>Standort:</strong> {{ device.location }}</p>
    <p><strong>Seriennummer:</strong> {{ device.serialNumber }}</p>
    <p><strong>Status:</strong> {{ device.status }}</p>
    <p><strong>Kaufdatum:</strong> {{ device.purchaseDate }}</p>

    <div class="actions">
      <!-- :to with a template string builds the URL, e.g. /devices/3/edit -->
      <RouterLink :to="`/devices/${device.id}/edit`">Bearbeiten</RouterLink>
      <!-- the child does not delete itself, it tells the parent via emit -->
      <button type="button" @click="emit('delete', device)">Löschen</button>
    </div>
  </div>
</template>

<script setup>
// the device to show, passed in by the parent
defineProps({
  device: { type: Object, required: true },
})

// events for the parent
const emit = defineEmits(['delete'])
</script>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
</style>
