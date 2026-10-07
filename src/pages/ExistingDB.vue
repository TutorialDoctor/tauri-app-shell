<script setup>
import { ref, onMounted,computed } from "vue";
import { dataStore } from "../stores/store";
import { appDataDir, join, resolveResource } from "@tauri-apps/api/path";
import { exists, copyFile, mkdir } from "@tauri-apps/plugin-fs";
import Database from "@tauri-apps/plugin-sql";
import ListView from "../components/ListView.vue";

const store = dataStore();
const result = ref([]);
let db = null;

async function initDatabase() {
  // Writable app data directory
  const dir = await appDataDir();
  await mkdir(dir, { recursive: true });
  // Destination database path
  const dbPath = await join(dir, "bible-sqlite.db");

  // Copy bundled database on first run
  if (!(await exists(dbPath))) {
    // Make sure src-tauri/resources/bible-sqlite.db is listed in
    // tauri.conf.json -> bundle.resources
    const resourcePath = await resolveResource("resources/bible-sqlite.db");
    await copyFile(resourcePath, dbPath);
  }

  // Open the database
  db = await Database.load(`sqlite:${dbPath}`);
}

async function runQuery() {
  const rows = await db.select("SELECT * FROM key_english");
  console.log(rows);
  result.value = result.value = rows.map(book => `${book.b}. ${book.n}`);
}


onMounted(async () => {
  await initDatabase();
  await runQuery();
});
</script>

<template>
  <div class="mt-4 w-full">
    <ListView title="Books" :items="result" />
  </div>
</template>