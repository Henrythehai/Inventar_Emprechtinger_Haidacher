<template>
  <header class="app-header">
    <h1>Geräteverwaltung</h1>
    <nav>
      <RouterLink to="/">Geräte</RouterLink>
      <RouterLink to="/devices/new">Neues Gerät</RouterLink>
    </nav>
  </header>

  <main>
    <!-- the component of the current route is rendered here -->
    <RouterView />
  </main>
</template>

<style>
/* global styles (no "scoped"), valid for the whole app */
body {
  margin: 0;
  font-family: sans-serif;
  color: #222;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #e0e0e0;
}

.app-header nav a {
  margin-left: 16px;
}

/* RouterLink gets this class automatically when its route is active */
.app-header nav a.router-link-exact-active {
  font-weight: bold;
}

main {
  padding: 24px;
}
</style>