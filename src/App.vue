<script setup lang="ts">
import { ref } from "vue";
import Nav from "./components/Nav.vue";
import StatusBar from "./components/StatusBar.vue";

import './assets/styles/global.css'
import "./assets/js/htmx.min.js";

</script>

<template>
  <main class="dark:text-white bg-white dark:bg-gray-900 relative">
    <Nav />
    <RouterView class="" />
    <StatusBar/>
  </main>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
</style>