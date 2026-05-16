<!-- App.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";

const folderPath = ref("");
const audioFiles = ref<string[]>([]);
const error = ref("");

// Supported audio extensions
const audioExtensions = [
  ".mp3",
  ".wav",
  ".ogg",
  ".flac",
  ".m4a",
  ".aac",
  ".webm",
];

function isAudio(filePath: string) {
  const lower = filePath.toLowerCase();
  return audioExtensions.some((ext) => lower.endsWith(ext));
}

async function loadAudio() {
  error.value = "";

  try {
    // Call your Rust command (same list_files)
    const files = await invoke<string[]>("list_files", {
      path: folderPath.value,
    });

    // Keep only audio files
    audioFiles.value = files.filter(isAudio);
  } catch (err) {
    error.value = String(err);
    audioFiles.value = [];
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="loadAudio">
      <input
        class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
        v-model="folderPath"
        type="text"
        placeholder="/Users/yourname/Music"
      />
    </form>

    <button @click="loadAudio">
      Load Audio
    </button>

    <p v-if="error">{{ error }}</p>

    <div class="audio-list">
      <div v-for="file in audioFiles" :key="file" class="audio-item">
        <audio controls :src="convertFileSrc(file)" />
        <div class="filename">
          {{ file.split(/[\\/]/).pop() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.audio-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.filename {
  margin-top: 6px;
  font-size: 12px;
  word-break: break-all;
}
</style>