<template>
  <section class="device-form">
    <h2 v-if="isEdit">Gerät bearbeiten (ID {{ route.params.id }})</h2>
    <h2 v-else>Neues Gerät</h2>

    <!-- .prevent stops the browser from reloading the page on submit -->
    <form @submit.prevent="saveDevice">
      <label>
        Name
        <input v-model.trim="form.name" type="text" />
      </label>

      <label>
        Kategorie
        <select v-model="form.category">
          <option value="" disabled>Bitte wählen</option>
          <option v-for="category in CATEGORIES" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>

      <label>
        Standort
        <input v-model.trim="form.location" type="text" />
      </label>

      <label>
        Seriennummer
        <input v-model.trim="form.serialNumber" type="text" />
      </label>

      <label>
        Status
        <select v-model="form.status">
          <option v-for="status in STATUSES" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </label>

      <label>
        Kaufdatum
        <input v-model="form.purchaseDate" type="date" />
      </label>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="actions">
        <!-- :disabled prevents double clicks while saving -->
        <button type="submit" :disabled="isSaving">Speichern</button>
        <RouterLink to="/">Abbrechen</RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { API_URL } from '@/api.js'
import { CATEGORIES, STATUSES } from '@/constants.js'

const route = useRoute() // read the current URL
const router = useRouter() // navigate in code

// edit mode when the URL contains an id (/devices/3/edit)
const isEdit = computed(() => route.params.id !== undefined)

// form data: reactive object (no .value needed), bound with v-model
const form = reactive({
  name: '',
  category: '',
  location: '',
  serialNumber: '',
  status: 'aktiv',
  purchaseDate: '',
})

const isSaving = ref(false)
const errorMessage = ref('')

// POST: create a new device on the server
const saveDevice = async () => {
  try {
    isSaving.value = true
    errorMessage.value = ''

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      throw new Error(`Server-Fehler: ${response.status}`)
    }

    // back to the list, it loads the data again in onMounted
    router.push('/')
  } catch (error) {
    console.error('Fehler beim Speichern:', error)
    errorMessage.value = 'Das Gerät konnte nicht gespeichert werden.'
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.device-form {
  max-width: 400px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.error {
  margin: 0;
  color: #d32f2f;
}
</style>
