<script setup>
import { ref } from "vue";

// Define the props this component accepts
const props = defineProps({
  title: String,
  count: Number,
  user: Object,
  items: Array,
  objectItems: {
    type: Array,
    default: () => []
  }
});

// Optional: use props directly
console.log(props.title);
const keys = Object.keys(props.objectItems[0] || {});

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <p>User Name: {{ user?.name }}</p>

    <ul>
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>

    <hr/>

    <!-- Render table headers -->
    <div>
      <span v-for="key in keys" :key="key">
        {{ key }}
      </span>
    </div>

    <!-- Render values -->
    <div v-for="(item, index) in objectItems" :key="index">
      <span v-for="key in keys" :key="key">
        {{ item[key] }}
      </span>
    </div>
  </div>
</template>