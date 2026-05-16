<script setup>
import { ref } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();

const props = defineProps({
    data: Object
})

</script>

<template>
    <div class="mt-4" v-if="data">
        {{data}}
    </div>
    <div v-else>
        No data found
    </div>
</template>