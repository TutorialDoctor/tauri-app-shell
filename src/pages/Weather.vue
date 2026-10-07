<script setup>
import { ref, onMounted,computed } from "vue";
import { dataStore } from "../stores/store";
import { invoke } from "@tauri-apps/api/core";
import { resolveResource } from '@tauri-apps/api/path';
import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';

const jsonData = ref(null);

async function loadStuff(){
    const resourcePath = await resolveResource('resources/data.json');
    console.log(resourcePath);
    const content = await readTextFile(resourcePath);
    jsonData.value = content;
    console.log(content)
}

async function loadStuffOld(){
    // const resourcePath = await resolveResource('resources/hello.json');
    const resourcePath = await resolveResource('data.json');
    console.log(resourcePath);
    // const langDe = await readFile(resourcePath);
    const content = await readTextFile(resourcePath);
    //let textDecoder = new TextDecoder();
    //let result = textDecoder.decode(langDe);
    jsonData.value = content;
    console.log(content)
    // console.log(JSON.parse(result))
}

const lat = ref(33.45)
const long = ref(-84.15);
const store = dataStore();
const data = ref(null);
// const endpoint = ref(`https://api.open-meteo.com/v1/forecast?latitude=${lat.value}&longitude=-84.15&timezone=GMT&temperature_unit=fahrenheit&hourly=temperature_2m,precipitation,rain,weathercode,surface_pressure,cloudcover,temperature_700hPa&daily=sunrise,sunset&current_weather=true&past_days=1`);

const endpoint = computed(() =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat.value}&longitude=${long.value}5&timezone=GMT&temperature_unit=fahrenheit&hourly=temperature_2m,precipitation,rain,weathercode,surface_pressure,cloudcover,temperature_700hPa&daily=sunrise,sunset&current_weather=true&past_days=1`
);

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


async function openURL() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("open_url", { url: 'https://www.google.com' });
}

onMounted(async () => {
    console.log("API Ready!");
    readBundleFile();
    loadStuff();
})
</script>

<template>
    <div class="p-4 w-full">
        <div class="mt-4  grid grid-cols-2 gap-2">
            <input
                class="col-span-2 dark:bg-neutral-800 dark:text-white mt-2 text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full"
                v-model="endpoint">
            <input
                class="dark:bg-neutral-800 dark:text-white mt-2 text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full"
                v-model="lat">
                <input
                class="dark:bg-neutral-800 dark:text-white mt-2 text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full"
                v-model="long">
            
        </div>
        <button class="mt-2 text-center text-xs dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-lg"
                @click="getData()">Refresh</button>
        <div class="mt-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 p-3 break-all">
            {{ data ? JSON.stringify(data, null, 2) : "Waiting..." }}
        </div>


    </div>
</template>