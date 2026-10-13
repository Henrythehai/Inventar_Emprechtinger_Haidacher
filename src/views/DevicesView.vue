<template>
  <div class="master-detail">
    <!-- MASTER: list of all devices -->
    <section class="master">
      <h2>Geräte</h2>
      <!-- :prop passes data down, @event listens to the child's emit -->
      <DeviceList
        :devices="devices"
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
import { ref } from 'vue'
import DeviceList from '@/components/DeviceList.vue'
import DeviceDetail from '@/components/DeviceDetail.vue'

// mock data for testing (replaced by fetch in week 3)
const devices = ref([
  { id: '1', name: 'Lenovo ThinkPad T14', category: 'Laptop', location: 'Raum 204', serialNumber: 'PF3K9A21', status: 'aktiv', purchaseDate: '2023-09-01' },
  { id: '2', name: 'Dell P2422H', category: 'Monitor', location: 'Raum 204', serialNumber: 'CN0D2X44', status: 'aktiv', purchaseDate: '2022-03-15' },
  { id: '3', name: 'Epson EB-W49', category: 'Beamer', location: 'Raum 110', serialNumber: 'X4LF120093', status: 'defekt', purchaseDate: '2020-10-05' },
])

// currently selected device (null = nothing selected)
const selectedDevice = ref(null)

// called when DeviceList emits "select"
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

.empty {
  color: #999;
}
</style>
