<template>
  <div class="master-detail">
    <!-- MASTER: list of all devices -->
    <section class="master">
      <h2>Geräte</h2>
      <ul class="device-list">
        <li
          v-for="device in devices"
          :key="device.id"
          :class="{ active: selectedDevice && selectedDevice.id === device.id }"
          @click="selectDevice(device)"
        >
          <strong>{{ device.name }}</strong>
          <span>{{ device.category }} · {{ device.location }}</span>
        </li>
      </ul>
    </section>

    <!-- DETAIL: the selected device -->
    <section class="detail">
      <div v-if="selectedDevice">
        <h2>{{ selectedDevice.name }}</h2>
        <p><strong>Kategorie:</strong> {{ selectedDevice.category }}</p>
        <p><strong>Standort:</strong> {{ selectedDevice.location }}</p>
        <p><strong>Seriennummer:</strong> {{ selectedDevice.serialNumber }}</p>
        <p><strong>Status:</strong> {{ selectedDevice.status }}</p>
        <p><strong>Kaufdatum:</strong> {{ selectedDevice.purchaseDate }}</p>
      </div>

      <!-- empty state: nothing selected yet -->
      <p v-else class="empty">Wähle links ein Gerät aus, um die Details zu sehen.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// mock data for testing (replaced by fetch in week 3)
// ref + array of objects -> list is reactive
const devices = ref([
  { id: '1', name: 'Lenovo ThinkPad T14', category: 'Laptop', location: 'Raum 204', serialNumber: 'PF3K9A21', status: 'aktiv', purchaseDate: '2023-09-01' },
  { id: '2', name: 'Dell P2422H', category: 'Monitor', location: 'Raum 204', serialNumber: 'CN0D2X44', status: 'aktiv', purchaseDate: '2022-03-15' },
  { id: '3', name: 'Epson EB-W49', category: 'Beamer', location: 'Raum 110', serialNumber: 'X4LF120093', status: 'defekt', purchaseDate: '2020-10-05' },
])

// currently selected device (null = nothing selected)
const selectedDevice = ref(null)

// arrow function: sets the selected device
const selectDevice = (device) => {
  selectedDevice.value = device
}
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

.device-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.device-list li {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.device-list li:hover {
  background-color: #f5f5f5;
}

.device-list li.active {
  background-color: #e3f2fd;
  border-left: 4px solid #1976d2;
}

.device-list span {
  font-size: 0.85rem;
  color: #666;
}

.empty {
  color: #999;
}
</style>
