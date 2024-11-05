<template>
  <div class="wrapper">
    <b-footer class="text-center bg-light py-3">
      <p class="mb-0">&copy; {{ currentYear }} BSG. All rights reserved.</p>
    </b-footer>
  </div>
</template>

<script>
import { BFooter } from 'bootstrap-vue';

export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.wrapper {/* Ensure the wrapper takes up the full height of the viewport */
  display: flex;
  flex-direction: column;
}

b-footer {
  margin-top: auto; /* Pushes the footer to the bottom */
  width: 100%;
}
</style>
