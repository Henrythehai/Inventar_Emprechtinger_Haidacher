<template>
  <section class="device-form">
    <h2 v-if="isEdit">Gerät bearbeiten (ID {{ route.params.id }})</h2>
    <h2 v-else>Neues Gerät</h2>

    <p v-if="isLoading" class="status">Gerät wird geladen...</p>

    <!-- .prevent stops the browser from reloading the page on submit -->
    <form v-else @submit.prevent="saveDevice">
      <label>
        Name
        <input v-model.trim="form.name" type="text" />
        <small v-if="submitted && errors.name" class="error">{{ errors.name }}</small>
      </label>

      <label>
        Kategorie
        <select v-model="form.category">
          <option value="" disabled>Bitte wählen</option>
          <option v-for="category in CATEGORIES" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <small v-if="submitted && errors.category" class="error">{{ errors.category }}</small>
      </label>

      <label>
        Standort
        <input v-model.trim="form.location" type="text" />
        <small v-if="submitted && errors.location" class="error">{{ errors.location }}</small>
      </label>

      <label>
        Seriennummer
        <input v-model.trim="form.serialNumber" type="text" />
        <small v-if="submitted && errors.serialNumber" class="error">{{ errors.serialNumber }}</small>
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
        <small v-if="submitted && errors.purchaseDate" class="error">{{ errors.purchaseDate }}</small>
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
import { reactive, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { API_URL } from '@/api.js'
import { CATEGORIES, STATUSES } from '@/constants.js'

const route = useRoute() // read the current URL
const router = useRouter() // navigate in code

// edit mode when the URL contains an id (/devices/3/edit)
const isEdit = computed(() => route.params.id !== undefined)

// empty form values, used for "new" and to reset the form
const emptyForm = {
  name: '',
  category: '',
  location: '',
  serialNumber: '',
  status: 'aktiv',
  purchaseDate: '',
}

// form data: reactive object (no .value needed), bound with v-model
// { ...emptyForm } creates a copy, so emptyForm itself never changes
const form = reactive({ ...emptyForm })

const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')

// errors are only shown after the first click on "Speichern"
const submitted = ref(false)

// today as "YYYY-MM-DD", same format as the date input
const today = new Date().toISOString().slice(0, 10)

// computed: validation rules, recalculated on every input
const errors = computed(() => {
  const result = {}

  if (form.name === '') {
    result.name = 'Name ist ein Pflichtfeld.'
  }
  if (form.category === '') {
    result.category = 'Bitte eine Kategorie wählen.'
  }
  if (form.location === '') {
    result.location = 'Standort ist ein Pflichtfeld.'
  }
  if (form.serialNumber.length < 5) {
    result.serialNumber = 'Die Seriennummer braucht mindestens 5 Zeichen.'
  }
  if (form.purchaseDate === '') {
    result.purchaseDate = 'Kaufdatum ist ein Pflichtfeld.'
  } else if (form.purchaseDate > today) {
    result.purchaseDate = 'Das Kaufdatum darf nicht in der Zukunft liegen.'
  }

  return result
})

// valid when there is no error message
const isValid = computed(() => Object.keys(errors.value).length === 0)

// GET one device by id and copy its values into the form
const loadDevice = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await fetch(`${API_URL}/${route.params.id}`)

    if (!response.ok) {
      throw new Error(`Server-Fehler: ${response.status}`)
    }

    const device = await response.json()
    // take everything except the id (the id stays in the URL)
    const { id, ...fields } = device
    // Object.assign copies all fields into the reactive form
    Object.assign(form, fields)
  } catch (error) {
    console.error('Fehler beim Laden:', error)
    errorMessage.value = 'Das Gerät konnte nicht geladen werden.'
  } finally {
    isLoading.value = false
  }
}

// POST (new device) or PUT (edit device)
const saveDevice = async () => {
  submitted.value = true

  // stop here if the form is not valid
  if (!isValid.value) {
    return
  }

  try {
    isSaving.value = true
    errorMessage.value = ''

    // edit: PUT /devices/:id   new: POST /devices
    const url = isEdit.value ? `${API_URL}/${route.params.id}` : API_URL
    const method = isEdit.value ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method: method,
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

// /devices/new and /devices/:id/edit use the SAME component.
// When switching between them, Vue reuses it (onMounted does not run again),
// so we watch the id in the URL and reset/load the form on every change.
watch(
  () => route.params.id,
  () => {
    submitted.value = false
    errorMessage.value = ''
    Object.assign(form, emptyForm)

    if (isEdit.value) {
      loadDevice()
    }
  },
  { immediate: true }, // also run once when the page opens
)
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

.status {
  color: #999;
}

.error {
  margin: 0;
  color: #d32f2f;
  font-size: 0.85rem;
}
</style>
