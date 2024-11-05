<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="px-5">
      <b-navbar-brand href="#">BSG +</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/new-client">Novi klijent</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/clients">Klijenti</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script>
  export default {
    name: "NavBar",
  };
  </script>
  