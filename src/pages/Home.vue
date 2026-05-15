<script setup>
import { ref,onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Items from "../components/Items.vue";
import { dataStore } from "../stores/store";
const store = dataStore();

onMounted(() => {
    store.getSettings()
})

</script>

<template>
  <div>
                <div id="main" class="mt-8 w-full">

                    <div class="flex justify-between">
                        <div id="breadcrumbs" class="w-2/5 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 p-1 gap-x-2">
                            <button class="inline-block shadow-sm p-1 bg-white dark:bg-gray-900 rounded-md" role="tab">Items</button>
                            <RouterLink to="detail" class="inline-block ml-4 p-1 text-gray-500 dark:text-gray-200 rounded-md" role="tab">Item</RouterLink>
                            <RouterLink to="settings" class="inline-block ml-4 p-1 text-gray-500 dark:text-gray-200 rounded-md" role="tab">Settings</RouterLink>

                        </div>
                        <button id="cta-button" @click="store.createItem()"
                            class="text-center text-xs bg-black text-white px-4 py-2 rounded-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                                class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>

                            <span class="ml-2">Add Item</span></button>
                    </div>

                    <header id="header-1">
                        <p class="mt-4 font-medium text-xl">All Items</p>
                        <p class="text-gray-500 dark:text-gray-200" style="font-size: .75rem">Manager your account settings and set e-mail
                            preferences.</p>
                    </header>
                    <hr class="mt-4">

                   <Items/>
                

                    <header id="header-2">
                        <p class="mt-4 font-medium text-xl">Related Items</p>
                        <p class="text-gray-500 dark:text-gray-200" style="font-size: .75rem">Your personal playlists. Updated daily.</p>
                    </header>
                    <hr class="mt-4">

                    <section class="mt-4 grid grid-cols-5 md:flex md:flex-wrap gap-3">
                        <a href="./detail.html" v-for="col in 12" class="empty">
                            <img class="opacity-25 h-32 w-32 rounded-md object-cover"
                                src="/mosaic.png" />
                            <p class="mt-2 text-xs font-medium">Heads up!</p>
                            <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .65rem">+20.1% from last month</p>
                        </a>
                    </section>
                    




                </div>



    </div>

</template>