<template>
  <div class="device-stats">
    <p><strong>Gesamt:</strong> {{ devices.length }}</p>
    <p v-for="item in countsByStatus" :key="item.status">
      {{ item.status }}: {{ item.count }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { STATUSES } from '@/constants.js'

// props are needed in the script here, so we store them in a variable
const props = defineProps({
  devices: { type: Array, required: true },
})

// one entry per status, e.g. { status: 'aktiv', count: 4 }
const countsByStatus = computed(() =>
  STATUSES.map((status) => ({
    status: status,
    count: props.devices.filter((device) => device.status === status).length,
  })),
)
</script>

<style scoped>
.device-stats {
  display: flex;
  gap: 16px;
  padding: 8px 12px;
  margin-bottom: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.device-stats p {
  margin: 0;
}
</style>
