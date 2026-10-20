<template>
  <div class="master-detail">
    <!-- MASTER: list of all devices -->
    <section class="master">
      <h2>Geräte</h2>

      <!-- search and filter: v-model binds the inputs to refs -->
      <div class="toolbar">
        <input v-model="search" type="search" placeholder="Suche nach Name..." />
        <select v-model="statusFilter">
          <option value="">Alle Status</option>
          <option v-for="status in STATUSES" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <!-- loading and error states for the API request -->
      <p v-if="isLoading" class="status">Daten werden geladen...</p>
      <p v-else-if="errorMessage" class="status error">{{ errorMessage }}</p>
      <p v-else-if="filteredDevices.length === 0" class="status">Keine Geräte gefunden.</p>
      <DeviceList
        v-else
        :devices="filteredDevices"
        :selected-id="selectedDevice?.id"
        @select="selectDevice"
      />
    </section>

    <!-- DETAIL: the selected device -->
    <section class="detail">
      <DeviceDetail v-if="selectedDevice" :device="selectedDevice" />
      <p v-else class="empty">Wähle links ein Gerät aus, um die Details zu sehen.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { API_URL } from '@/api.js'
import { STATUSES } from '@/constants.js'
import DeviceList from '@/components/DeviceList.vue'
import DeviceDetail from '@/components/DeviceDetail.vue'

// reactive state
const devices = ref([])
const selectedDevice = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const search = ref('')
const statusFilter = ref('')

// computed: recalculated automatically when devices, search or statusFilter change
const filteredDevices = computed(() => {
  const term = search.value.trim().toLowerCase()

  return devices.value.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(term)
    const matchesStatus = statusFilter.value === '' || device.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

// GET all devices from the server
const fetchDevices = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await fetch(API_URL)

    // response.ok is true for status 200-299
    if (!response.ok) {
      throw new Error(`Server-Fehler: ${response.status}`)
    }

    // parse JSON and store it in the reactive array
    devices.value = await response.json()
  } catch (error) {
    console.error('Fehler beim Laden:', error)
    errorMessage.value = 'Die Geräte konnten nicht geladen werden. Läuft der json-server?'
  } finally {
    // runs on success AND on error
    isLoading.value = false
  }
}

// called when DeviceList emits "select"
const selectDevice = (device) => {
  selectedDevice.value = device
}

// lifecycle hook: load data as soon as the component is mounted
onMounted(() => {
  fetchDevices()
})
</script>

<style scoped>
.master-detail {
  display: flex;
  gap: 24px;
}

.master {
  width: 35%;
}

.detail {
  flex: 1;
  padding-left: 24px;
  border-left: 1px solid #e0e0e0;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.toolbar input {
  flex: 1;
}

.empty,
.status {
  color: #999;
}

.error {
  color: #d32f2f;
}
</style>
