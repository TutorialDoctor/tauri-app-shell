<script setup>
// (Look for a folder matching your app name, then look inside `gallery-media`)
// MAC: ~/Library/Application Support/
// Windows: Press `Win + R`, type `%APPDATA%`, and hit Enter. Look for your app's folder name, then open `gallery-media`.
// Linux: Look inside `~/.config/[your-app-name]/gallery-media`.

import { ref, onMounted, computed } from 'vue';
import { convertFileSrc } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { appDataDir, join } from '@tauri-apps/api/path';
import { mkdir, copyFile, readDir, remove } from '@tauri-apps/plugin-fs';
import { dataStore } from "../stores/store";
const store = dataStore();

const imageHeight = ref(430)

const imageClass = computed(
  () => `w-full object-cover h-[${imageHeight.value}px]`
)


const images = ref([]);

async function uploadAndLoadImages() {
  try {
    const selectedFiles = await open({
      multiple: true,
      filters: [
        {
          name: 'Images',
          extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp']
        }
      ]
    });

    if (!selectedFiles) return;

    const appDir = await appDataDir();
    const galleryDir = await join(appDir, 'gallery-media');

    await mkdir(galleryDir, { recursive: true });

    // Clean JavaScript loop with no "as string[]" syntax
    for (const file of selectedFiles) {
      const filename = file.split(/[\\/]/).pop();
      if (!filename) continue;

      const destinationPath = await join(galleryDir, filename);
      await copyFile(file, destinationPath);
    }

    await refreshGallery();

  } catch (err) {
    console.error("Gallery operation failed:", err);
  }
}

async function refreshGallery() {
  try {
    const appDir = await appDataDir();
    const galleryDir = await join(appDir, 'gallery-media');
    const readFiles = await readDir(galleryDir);

    images.value = await Promise.all(
      readFiles.map(async (file) => {
        const absolutePath = await join(galleryDir, file.name);
        return {
          name: file.name,
          url: convertFileSrc(absolutePath), // Used for your <img> tag :src
          realPath: absolutePath             // Used for your copy button!
        };
      })
    );
  } catch (e) {
    console.log(e);
  }
}

async function deleteImage(filename) {
  try {
    const appDir = await appDataDir();
    const galleryDir = await join(appDir, 'gallery-media');
    const targetFilePath = await join(galleryDir, filename);

    // Use the core remove function
    await remove(targetFilePath);

    // Refresh the UI state
    await refreshGallery();
  } catch (err) {
    console.error("Failed to delete file:", err);
  }
}

onMounted(() => {
  refreshGallery();
});
</script>

<template>
  <div class="mt-4 w-full gallery-container p-4">
    <h2 class="text-lg font-bold mb-2">Media Uploader</h2>

    <p>Note: Uploaded files are stored in the Application Support folder and NOT in the resources folder like the Media
      Gallery photos.</p>


    <div
      class="my-4 text-xs border dark:bg-neutral-700 dark:border-neutral-700 border-neutral-300 px-4 py-2 rounded-lg w-1/2">
      <label for="image-height">Image Height: {{ imageHeight }}px</label><br />
      <input class="w-full" name="image-height" type="range" v-model="imageHeight" min="200" max="600" value="430" />
    </div>

    <button @click="uploadAndLoadImages"
      class="mt-2 font-semibold bg-black text-white px-3 py-2 rounded-lg  transition">
      Upload Images
    </button>

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div v-for="(img, idx) in images" :key="idx" class="border rounded p-1 bg-white shadow-sm">
        <img :src="img.url" :alt="img.name" :class="imageClass" class="w-full h-32 object-cover rounded" />
        <p class="text-xs truncate mt-1 text-gray-600 px-1">{{ img.name }}</p>

        <div class="grid gap-2 grid-cols-2">
          <button
            class="mt-3 rounded-lg dark:hover:bg-neutral-700 hover:bg-neutral-200 border border-neutral-300 dark:border-neutral-700 px-2 py-1 w-full"
            @click="store.copyInputToClipboard(img.url)">Copy Url</button>
          <button @click="deleteImage(img.name)"
            class="mt-3 rounded-lg dark:hover:bg-neutral-700 hover:bg-neutral-200 border border-neutral-300 dark:border-neutral-700 px-2 py-1 w-full">
            ✕ Delete
          </button>

        </div>

      </div>
    </div>
  </div>
</template>