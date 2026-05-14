<script setup>
import { ref } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();
</script>

<template>
    <nav id="navbar" class="sticky z-50 top-0 bg-white dark:bg-gray-900 text-xs py-3 px-4 w-full border-b" placeholder="Enter your name">
        <ul class="flex justify-start gap-4 flex-wrap items-center">
            <li>
                <RouterLink to="/" class="font-bold">Home</RouterLink>
            </li>
            <li>
                <a>File</a>
            </li>
            <li>
                <a>Edit</a>
            </li>
            <li>
                <a>View</a>
            </li>
            <li>
                <a>Account</a>
            </li>
            <li>
                <RouterLink to="/test-page" class="font-bold">TestPage</RouterLink>
            </li>
             <li>
                <RouterLink to="/settings" class="font-bold">Settings</RouterLink>
            </li>
            <li class="ml-auto">
                <Button @click="store.clearStore()" class="font-semibold bg-black text-white px-3 py-2 rounded-lg">Clear
                    Store</Button>
            </li>
            <li class="ml-2">
                <Button @click="store.saveItems()" class="font-semibold bg-black text-white px-3 py-2 rounded-lg">Save
                    Items</Button>
            </li>
            <li class="ml-2">
                <Button @click="store.deleteItem(5)"
                    class="font-semibold bg-black text-white px-3 py-2 rounded-lg">Delete Item 5</Button>
            </li>
            <li class="ml-2 hidden">
                <Button @click="store.saveSettings()"
                    class="font-semibold bg-black text-white px-3 py-2 rounded-lg">Save Settings</Button>
            </li>
            <li class="ml-2">
                <button class="ml-4" @click="async () => {
                    await store.saveObjectToJSONFile(
                        store.settings,
                        'settings.json'
                    )
                }">Export Settings</button>
                <button class="ml-4" @click="async () => {
                    store.settings = await store.loadObjectFromJSONFile()
                }">Load Settings</button>
                <button class="ml-4" @click="async () => {
                    await store.saveObjectToJSONFile(
                        store.items,
                        'items.json'
                    )
                }">Export Items</button>
            
                <button class="ml-4" @click="async () => {
                    store.items = await store.loadObjectFromJSONFile()
                }">Load Items</button>
            </li>
        </ul>
    </nav>

</template>