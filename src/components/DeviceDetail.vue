<template>
  <div class="device-detail">
    <h2>{{ device.name }}</h2>
    <p><strong>Kategorie:</strong> {{ device.category }}</p>
    <p><strong>Standort:</strong> {{ device.location }}</p>
    <p><strong>Seriennummer:</strong> {{ device.serialNumber }}</p>
    <p>
      <strong>Status:</strong>
      <!-- :class with an array: fixed class + class built from the status -->
      <span :class="['badge', `badge-${device.status}`]">{{ device.status }}</span>
    </p>
    <p><strong>Kaufdatum:</strong> {{ device.purchaseDate }}</p>

    <div class="status-buttons">
      Status ändern:
      <button
        v-for="status in STATUSES"
        :key="status"
        type="button"
        :disabled="status === device.status"
        @click="emit('change-status', device, status)"
      >
        {{ status }}
      </button>
    </div>

    <div class="actions">
      <!-- :to with a template string builds the URL, e.g. /devices/3/edit -->
      <RouterLink :to="`/devices/${device.id}/edit`">Bearbeiten</RouterLink>
      <!-- the child does not delete itself, it tells the parent via emit -->
      <button type="button" @click="emit('delete', device)">Löschen</button>
    </div>
  </div>
</template>

<script setup>
import { STATUSES } from '@/constants.js'

// the device to show, passed in by the parent
defineProps({
  device: { type: Object, required: true },
})

// events for the parent
const emit = defineEmits(['delete', 'change-status'])
</script>

<style scoped>
.badge {
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
}

.badge-aktiv {
  background-color: #2e7d32;
}

.badge-defekt {
  background-color: #d32f2f;
}

.badge-ausgemustert {
  background-color: #757575;
}

.status-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
</style>
