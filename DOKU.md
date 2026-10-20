# DOKU – Geräteverwaltung (SWP Vue-Projekt)

## Verlauf

### W1A – Git, json-server, Daten
- Git-Repository angelegt, json-server installiert (`npm run server`, Port 3000).
- `db.json` mit 6 Beispielgeräten.
- Konzepte: Client-Server-Architektur, REST-Endpunkte, npm-Scripts.

### W1B – Router und Layout
- Routen `/`, `/devices/new`, `/devices/:id/edit`; App.vue mit Navigation und `<RouterView />`.
- Platzhalter: DevicesView, DeviceFormView (erkennt Bearbeiten-Modus über `route.params.id`).
- Konzepte: Vue Router, RouterLink, RouterView, Routenparameter, useRoute, computed, v-if/v-else.

### W2A – Master-Detail mit Testdaten
- DevicesView: Liste links, Details rechts, aktive Zeile markiert, leerer Zustand.
- Konzepte: ref, v-for + :key, :class, @click, v-if/v-else, Arrow Functions.

### W2B – Komponenten
- Neue Komponenten: DeviceList (props: devices, selectedId; emit: select), DeviceDetail (props: device).
- DevicesView hält die Daten und reicht sie per Props weiter.
- Konzepte: Komponenten, defineProps, defineEmits, Optional Chaining.

### W3A – Daten per fetch laden
- `api.js` mit API_URL; DevicesView lädt Geräte per GET in `onMounted`.
- Lade- und Fehleranzeige (`isLoading`, `errorMessage`).
- Konzepte: fetch, async/await, try/catch/finally, response.ok, onMounted, v-else-if.
