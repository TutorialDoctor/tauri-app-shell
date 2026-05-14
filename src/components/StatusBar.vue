<script setup>
import { ref } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();

</script>

<template>
    <div id="status-message"
      class="hidden w-1/3 mb-4 mr-4 sticky bottom-4 right-0 float-right mt-4 bg-black text-white p-4 rounded-md">
      <p class="text-xs font-medium">Warning!</p>
      <p class="mt-1" style="font-size: .65rem">You still have some work to do. Please complete it then try again.
      </p>
    </div>

</template>

