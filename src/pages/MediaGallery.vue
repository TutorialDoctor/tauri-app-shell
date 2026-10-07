<script setup>
import { ref, onMounted,computed } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { convertFileSrc } from '@tauri-apps/api/core';
import { dataStore } from "../stores/store";
const store = dataStore();

const mediaItems = ref([]);

const isImage = (filename) => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(filename);
const isVideo = (filename) => /\.(mp4|webm|ogv|mov)$/i.test(filename);
const isAudio = (filename) => /\.(mp3|wav|ogg|m4a|flac|aac)$/i.test(filename);

const imageHeight = ref(300)

const imageClass = computed(
  () => `w-full object-cover h-[${imageHeight.value}px]`
)


const convertedPaths = ref([]);

onMounted(async () => {
    try {
        const rawPaths = await invoke('get_gallery_files');
        console.log("1. Raw Paths from Rust:", rawPaths);

        mediaItems.value = rawPaths.map(path => {
            const url = convertFileSrc(path);
            convertedPaths.value.push(url)
            console.log("2. Converted Asset URL:", url);

            let type = 'unknown';
            if (isImage(path)) type = 'image';
            if (isVideo(path)) type = 'video';
            else if (isAudio(path)) type = 'audio';

            return { url, type };
        }).filter(item => item.type !== 'unknown');
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <div class="mt-4 w-full gallery-container">
        <h2>Media Gallery</h2>

        <div class="my-4 text-xs border dark:bg-neutral-700 dark:border-neutral-700 border-neutral-300 px-4 py-2 rounded-lg w-1/2">
        <label for="image-height">Image Height: {{imageHeight}}px</label><br/>
        <input class="w-full" name="image-height" type="range" v-model="imageHeight" min="300" max="800" value="300"/>
        </div>

        <!-- {{paths}} -->
        <!-- {{imageClass}} -->

        <!-- <img :src="paths[1]"> -->

        <div class="grid grid-cols-4 gap-2">
            <div v-for="(item, index) in mediaItems" :key="index">
                <!-- Render Images -->
                <img :src="item.url" :class="imageClass" alt="Gallery Image" loading="lazy" />
               
                <!-- Render Videos (Tauri v2 supports range requests/streaming automatically) -->
                <video v-if="item.type === 'video'" :src="item.url" controls preload="metadata"></video>

                <audio v-if="item.type === 'audio'" :src="item.url" controls preload="metadata"></audio>

                <button class="mt-3 rounded-lg dark:hover:bg-neutral-700 hover:bg-neutral-200 border border-neutral-300 dark:border-neutral-700 px-2 py-1 w-full" @click="store.copyInputToClipboard(item.url)">Copy URL</button>


            </div>
        </div>
    </div>
</template>


<style scoped>

</style>