<template>
  <ul class="device-list">
    <li
      v-for="device in devices"
      :key="device.id"
      :class="{ active: device.id === selectedId }"
      @click="emit('select', device)"
    >
      <strong>{{ device.name }}</strong>
      <span>{{ device.category }} · {{ device.location }}</span>
    </li>
  </ul>
</template>

<script setup>
// props: data from the parent component (read-only in the child!)
defineProps({
  devices: { type: Array, required: true },
  selectedId: { type: String, default: null },
})

// emits: events the child sends up to the parent
const emit = defineEmits(['select'])
</script>

<style scoped>
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
</style>
