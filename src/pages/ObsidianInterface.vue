<!-- TerminalRunner.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Command } from "@tauri-apps/plugin-shell";

const command = ref("echo Hello there!");
const output = ref("");
const error = ref("");
const running = ref(false);

//TODO: Improve, fix

const commandList = [
  { label: "Obsidian Help", command: "obsidian help" },
  { label: "Obsidian Read", command: "obsidian read" },
  { label: "Copy Images To Public", command: "cp ./resources/images/ ../public/copied_images/" },
  { label: "Copy Videos To Public", command: "cp ./videos/ ../public/videos/" },
  { label: "Generate DT Image", command: "draw-things-cli generate  --prompt 'a cinematic portrait of a warrior' --output dt_image.png --model 'vendo'" },
  { label: "Search Obsidian", command: "obsidian search query='meeting notes'" },
  { label: "New File In Master Vault", command: `obsidian vault=MasterVault create name=Note content="Hello" open overwrite` },
  { label: "Files By Folder", command: `obsidian files folder=Records` },
   { label: "List Tasks", command: `obsidian tasks` },
]


async function runCommand() {
  output.value = "";
  error.value = "";
  running.value = true;

  try {
    // Parse command string while preserving quoted text
    // Example:
    // draw-things-cli generate --prompt "a cinematic portrait of a warrior" --output warrior.png
    // becomes:
    // [
    //   "draw-things-cli",
    //   "generate",
    //   "--prompt",
    //   "a cinematic portrait of a warrior",
    //   "--output",
    //   "warrior.png"
    // ]
    const parts =
      command.value.match(/"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|\S+/g)
        ?.map((part) => {
          // Remove surrounding quotes if present
          if (
            (part.startsWith('"') && part.endsWith('"')) ||
            (part.startsWith("'") && part.endsWith("'"))
          ) {
            return part.slice(1, -1);
          }
          return part;
        }) || [];

    if (parts.length === 0) {
      throw new Error("No command provided.");
    }

    const program = parts[0];
    const args = parts.slice(1);

    const cmd = Command.create(program, args);
    const result = await cmd.execute();

    output.value = result.stdout?.trim() || "";

    if (result.stderr?.trim()) {
      error.value = result.stderr.trim();
    }
  } catch (err: any) {
    error.value = String(err);
  } finally {
    running.value = false;
  }
}
</script>

<template>
  <div class="mt-4 w-full">
    <!-- {{command}} -->
    <select v-model="command" class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">
      <option v-for="cmd in commandList" :value="cmd.command">{{ cmd.label }}</option>
    </select>
    <small>This is a WIP</small>
    <div class="mt-4 flex gap-2 items-center">
      <form @submit.prevent="runCommand" class="w-full flex gap-2">
        <input v-model="command" spellcheck="false" placeholder="Enter command"
          class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">
        <button :disabled="running" class="ml-auto w-64 font-semibold bg-black text-white px-3 py-2 rounded-lg">{{
          running ? "Running..." : "Run Command" }}</button>
      </form>

    </div>

    <small>Permitted commands: echo, ls, touch, pwd, mkdir, mv, cp, cat</small>

    <h3 class="mt-4">Output</h3>
    <div v-if="output" class="output">
      <pre>{{ output }}</pre>
    </div>

    <div v-if="error" class="error">
      <h3>Error</h3>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<style scoped>
.command-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}

.output,
.error {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
}

.output {
  background: #f5f5f5;
}

.error {
  background: #ffe6e6;
  color: #b00020;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>