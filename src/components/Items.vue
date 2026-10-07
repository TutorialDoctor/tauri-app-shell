<script setup>
import { ref,onMounted } from "vue";
import Nav from "../components/Nav.vue";
import Item from "./Item.vue";

const all_items = ref([])

import { dataStore } from "../stores/store";
const store = dataStore();

async function getAllItems() {
    all_items.value = await store.db.get('items')
}

onMounted(() => {
    // store.saveItems();
    getAllItems()
})

</script>

<template>
    <p class="mt-4 font-semibold">DB Items</p>
     <section class="mt-4 grid grid-cols-3 md:flex md:flex-wrap gap-3">
        <Item :item="item" v-for="item in all_items" :key="item.id" />
    </section>
    <hr/>
     <p class="mt-4 font-semibold">Store Items</p>
    <section class="mt-4 grid grid-cols-3 md:flex md:flex-wrap gap-3">
        <Item :item="item" v-for="item in store.items" :key="item.id" />
    </section>
</template>