<script setup lang="ts">
// import { ref } from "vue";
// import { invoke } from "@tauri-apps/api/core";
// import FileSearch from "./FileSearch.vue";
// import BaseComponent from "../components/BaseComponent.vue";
// import ImageGallery from "./ImageGallery.vue";
// import AudioGallery from "./AudioGallery.vue";
// import Calendar from "../components/Calendar.vue";

import ListView from "../components/ListView.vue";

const items = ["one","two","three","four","five","six","seven"];

const names = ["joe","sam","susan","rachel"];

</script>

<template>
  <div class="mt-4 w-full">
    TEST PAGE
    
    <ListView title="Numbers" :items="items"/>
    <ListView title="Names" :items="names"/>
    <!-- <Calendar/> -->
    <!-- <FileSearch/> -->
    <!-- <AudioGallery /> -->
  </div>
</template>