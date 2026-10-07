<script setup>
import { ref } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();

const props = defineProps({
    items: Array,
    title: String
})

const currentItem = ref(null);

</script>

<template>
    <div class="mt-4" v-if="items">
        <aside id="scrollview" class="p-4 rounded-lg border border-neutral-300 shadow-md">
            
            <div class="example mt-4 gap-y-2 overflow-y-scroll h-[400px]">
                <p class="text-xs font-light font-semibold" v-if="title">{{title}}</p>
                <div v-if="currentItem" class="mt-2 dark:bg-neutral-700 bg-neutral-100 font-light">
                    <p class="p-2 text-xs">Current Item: {{currentItem}}</p>
                    <hr>
                </div>
                <div @click="currentItem = item" v-for="item in items" class="mt-2 dark:hover:bg-neutral-700 hover:bg-neutral-100 font-light">
                    <p class="p-2 text-xs">{{item}}</p>
                    <hr>
                </div>
            </div>
        </aside>
    </div>
    <div v-else>
        No items found
    </div>
</template>