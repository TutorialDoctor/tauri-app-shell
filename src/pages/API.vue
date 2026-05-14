<script setup>
import { ref, onMounted } from "vue";
import { dataStore } from "../stores/store";
import { invoke } from "@tauri-apps/api/core";
import { appDataDir, join, resolveResource } from '@tauri-apps/api/path';

import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs'; 


const store = dataStore();
const data = ref(null);
const endpoint = ref("https://jsonplaceholder.typicode.com/todos/1")
const greetMsg = ref("");
const name = ref("");
const text = ref("");

async function getData() {
    try {
        const response = await fetch(endpoint.value);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const jsonData = await response.json();
        data.value = jsonData;
    } catch (error) {
        console.error(error);
    }
}

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}


async function openURL() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  await invoke("open_url", { url: 'https://www.google.com' });
}

async function saveFile() {
//   const appDataPath = await appDataDir();
   const resourcePath = await resolveResource('resources/fake.txt');
//   const filePath = await join(resourcePath, 'resources/fake.txt');
  await writeTextFile(resourcePath, "Hello there");
}


async function readBundleFile() {
  // This resolves the correct path regardless of OS
  const resourcePath = await resolveResource('resources/fake.txt');
  const contents = await readTextFile(resourcePath);
  console.log(contents);
  text.value = contents
}

// const text = await invoke("read_text_file", {
//   path: "/resources/fake.txt",
// });

// console.log(text);

onMounted(() => {
    console.log("API Ready!");
    // saveFile();
    readBundleFile();
    // openURL();
})
</script>

<template>
    <div class="p-4">

        {{text}}

        <div class="w-full">
        <form class="flex" @submit.prevent="greet">
            <input class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full" id="greet-input" v-model="name" placeholder="Enter a name..." />
            <button class="ml-4 text-center text-xs dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-lg" type="submit">Greet</button>
        </form>

        <p class="mt-4">{{ greetMsg }}</p>
        </div>

        <div class="mt-4 flex items-center space-x-4">
            <input
                class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
                v-model="endpoint">
            <button class="text-center text-xs dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-lg"
                @click="getData()">Refresh</button>
        </div>
        <div class="mt-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 p-3 break-all">
            {{ data ? JSON.stringify(data, null, 2) : "Waiting..." }}
        </div>


    </div>
</template>