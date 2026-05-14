<script setup>
import { ref } from "vue";
import { useRoute } from 'vue-router'
import { dataStore } from "../stores/store";
const store = dataStore();


const route = useRoute();
const props = defineProps({
    item: Object
})
</script>

<template>
    <div class="mt-4 grid grid-cols-3 md:flex md:flex-wrap gap-3">
        <!-- The RouterLink acts as a wrapper -->
        <RouterLink id="item-card" :to="{ name: 'item', params: { id: item.id } }" class="">
            <img class="hover:opacity-75 h-[260px] w-auto object-contain" :src="item.cover" />
            <div>
                <p class="mt-2 text-xs font-medium">{{ item.label }}</p>
                <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .65rem">{{ item.description }}</p>
            </div>

            <!-- Use .stop to prevent the RouterLink from triggering -->
            <button class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-1 rounded mt-2" @click.stop.prevent="store.deleteItem(item.id)">
                Delete
            </button>
        </RouterLink>
    </div>
</template>