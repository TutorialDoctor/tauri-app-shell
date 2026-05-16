<!-- App.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";

const folderPath = ref("");
const images = ref<string[]>([]);
const error = ref("");

// Supported image extensions
const imageExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
  ".ico",
  ".tif",
  ".tiff",
];

function isImage(filePath: string) {
  const lower = filePath.toLowerCase();
  return imageExtensions.some((ext) => lower.endsWith(ext));
}

async function loadImages() {
  error.value = "";

  try {
    // Call your Rust command
    const files = await invoke<string[]>("list_files", {
      path: folderPath.value,
    });

    // Keep only image files
    images.value = files.filter(isImage);
  } catch (err) {
    error.value = String(err);
    images.value = [];
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="loadImages">
    <input class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
      v-model="folderPath"
      type="text"
      placeholder="/Users/yourname/Pictures"
    />
    </form>

    <button @click="loadImages">
      Load Images
    </button>

    <p v-if="error">{{ error }}</p>

    <div class="gallery">
      <img
        v-for="image in images"
        :key="image"
        :src="convertFileSrc(image)"
        :alt="image"
        class="thumbnail"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>