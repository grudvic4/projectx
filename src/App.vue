<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/new-client">Novi klijent</router-link> | 
      <router-link to="/clients">Klijenti</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
