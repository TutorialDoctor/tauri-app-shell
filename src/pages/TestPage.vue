<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import FileSearch from "./FileSearch.vue";
import BaseComponent from "../components/BaseComponent.vue";
import ImageGallery from "./ImageGallery.vue";
import AudioGallery from "./AudioGallery.vue";
import Calendar from "../components/Calendar.vue";
</script>

<template>
  <div class="mt-4 w-4/5">
    test
    <Calendar/>
    <!-- <FileSearch/> -->
    <!-- <AudioGallery /> -->
  </div>
</template>