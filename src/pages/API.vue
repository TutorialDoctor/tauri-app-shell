<script setup>
import { ref, onMounted } from "vue";
import { dataStore } from "../stores/store";
// import { invoke, convertFileSrc } from "@tauri-apps/api/core";
import { appDataDir, join, resolveResource } from '@tauri-apps/api/path';

import { writeTextFile, readTextFile,BaseDirectory,readFile } from '@tauri-apps/plugin-fs';

const jsonData = ref(null);

async function loadStuff(){
    const resourcePath = await resolveResource('resources/hello.json');
    console.log(resourcePath);
    const content = await readTextFile(resourcePath);
    jsonData.value = content;
    console.log(content)
}

async function loadStuffOld(){
    // const resourcePath = await resolveResource('resources/hello.json');
    const resourcePath = await resolveResource('hello.json');
    console.log(resourcePath);
    // const langDe = await readFile(resourcePath);
    const content = await readTextFile(resourcePath);
    //let textDecoder = new TextDecoder();
    //let result = textDecoder.decode(langDe);
    jsonData.value = content;
    console.log(content)
    // console.log(JSON.parse(result))
}


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


// const resourcePath = await resolveResource('resources/fake.txt');

// const moreText = await invoke("read_text_file", {
//   path: resourcePath, 
// });

// console.log(text);



const imageSource = ref('');
const videoSource = ref('');

// onMounted(async () => {
//   // 1. Get the system path
//   const imgPath = await resolveResource('resources/my-image.png');
//   const vidPath = await resolveResource('resources/my-video.mp4');

//   // 2. Convert to asset protocol URL (e.g., asset://localhost/...)
//   imageSource.value = convertFileSrc(imgPath);
//   videoSource.value = convertFileSrc(vidPath);
// });

// const icon = await readFile('resources/screen.png', {
//   baseDir: BaseDirectory.Resources,
// });

onMounted(async () => {
    console.log("API Ready!");
    // saveFile();
    readBundleFile();
    loadStuff();
    //URL.revokeObjectURL(imageSource.value);
    // openURL();

    // 1. Get the system path
    // const imgPath = await resolveResource('screen.png');
    // console.log(imgPath)
    //const vidPath = await resolveResource('resources/music_vid.mp4');

    // 2. Convert to asset protocol URL (e.g., asset://localhost/...)
    // imageSource.value = convertFileSrc(imgPath);
    // console.log(imageSource.value)
    //videoSource.value = convertFileSrc(vidPath);
//OTHER ATTEMPT
    // try {
    // 1. Read the raw bytes
    // const contents = await readFile('screen.png', {
    //   baseDir: BaseDirectory.Resource,
    // });

    // 2. Convert to a Blob (Binary Large Object)
    // const blob = new Blob([contents], { type: 'image/png' });

    // 3. Create a temporary URL for the template
//     imageSource.value = URL.createObjectURL(blob);
//     console.log(imageSource.value)
//   } catch (err) {
//     console.error("Failed to load icon:", err);
//   }
})
</script>

<template>
    <div class="p-4 w-full">
        {{jsonData.name}}

        {{ text }}

        ICON
        <!-- {{icon}} -->

     <img 
      v-if="imageSource" 
      :src="imageSource" 
      alt="App Icon" 
      style="width: 100px; height: auto;" 
    />

    <!-- <p v-else>Loading resource...</p> -->

        <hr class="mt-2" />

        <!-- VideoAndImages -->
        <!-- <div>
            <img v-if="imageSource" :src="imageSource" alt="Local Resource" />
            <video v-if="videoSource" controls>
                <source :src="videoSource" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
         -->
        <!-- VideoAndImages -->
        <div class="w-full">
            <form class="mt-4 flex" @submit.prevent="greet">
                <input
                    class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
                    id="greet-input" v-model="name" placeholder="Enter a name..." />
                <button
                    class="ml-4 text-center text-xs dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-lg"
                    type="submit">Greet</button>
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