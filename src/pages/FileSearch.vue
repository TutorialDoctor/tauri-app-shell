<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

const folderPath = ref("/");
const files = ref<string[]>([]);
const error = ref("");

async function listFiles() {
  error.value = "";

  try {
    // Calls the Rust command:
    // #[tauri::command]
    // async fn list_files(path: String) -> Result<Vec<String>, String>
    files.value = await invoke<string[]>("list_hidden_files", {
      path: folderPath.value,
    });
  } catch (err) {
    error.value = String(err);
    files.value = [];
  }
}
</script>

<template>
  <div class="w-4/5">
    <div class="flex w-full justify-between items-center flex-wrap">
     <form @submit.prevent="listFiles" class="w-full">
          <input class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
      v-model="folderPath"
      type="text"
      placeholder="/Users/raphaelsmith"
    />
    </form>
      
    </div>

    <p v-if="error">{{ error }}</p>

    <ul class="mt-4 w-1/2 break-all">
      <li v-for="file in files" :key="file">
        {{ file }}
      </li>
    </ul>
  </div>
</template>