<template>
  <div id="app" class="wrapper">
    <MainNavbar />
    <div class="content">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    MainNavbar,
    FooterComponent,
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%; /* Ensure the wrapper takes at least the full height of the viewport */
}

.content {
  flex: 1; /* This allows the content area to take up available space */
}
html, body {
  margin: 0; /* Reset default margins */
  padding: 0; /* Reset default padding */
  height: 100%; /* Ensure the body takes the full height */
}
</style>
