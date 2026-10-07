<!-- TerminalRunner.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Command } from "@tauri-apps/plugin-shell";
import { resolveResource } from "@tauri-apps/api/path"; // 1. Path resolver
import { convertFileSrc } from "@tauri-apps/api/core";   // 2. Asset URL converter

const out = ref("");
const running = ref(false);
const error = ref("");
const currentVoice = ref("Bella");
const audioUrl = ref(""); // Track the dynamic audio asset URL

const ttsPrompt = ref("This application was created by the Tutorial Doctor");
const voiceList = ['Bella', 'Jasper', 'Luna', 'Bruno', 'Rosie', 'Hugo', 'Kiki', 'Leo']

async function runPython() {
  out.value = "";
  running.value = true;
  error.value = "";
  audioUrl.value = ""; // Reset player during generation

  try {
    // 3. Resolve the script path dynamically
    const scriptPath = await resolveResource("resources/scripts/voice.py");
    
    // 4. Resolve where the output audio file should be saved/read
    const outputPath = await resolveResource("resources/voices/output.wav");

    // Arguments you want to pass to the Python script
    // Note: Make sure to update your voice.py script to accept this 3rd argument 
    // for where to save the file, rather than hardcoding it inside Python!
    const args = [
      scriptPath,
      ttsPrompt.value,
      currentVoice.value,
      outputPath 
    ];

    const command = Command.create("python3", args);
    const output = await command.execute();
    out.value = output.stdout.trim();

    // 5. Convert the local system path into a safe URL the UI can stream
    audioUrl.value = convertFileSrc(outputPath);

  } catch (err: any) {
    error.value = String(err);
  } finally {
    running.value = false;
  }
}
</script>

<template>
    <div class="mt-4 w-full">
         <select v-model="currentVoice"
                class="h-10 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">
                <option v-for="voice in voiceList" :value="voice">{{ voice }}</option>
            </select>
        <div class="mt-2 flex gap-2 items-center">
            <input v-model="ttsPrompt" class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">
            
            <button @click="runPython" :disabled="running"
                class="ml-auto w-64 font-semibold bg-black text-white px-3 py-2 rounded-lg">
                {{ running ? "Generating..." : "Generate Speech" }}
            </button>
        </div>

        <!-- Update: Bind :src directly to audioUrl and add a :key to force reloads -->
        <audio 
            class="mt-2" 
            v-if="!running && audioUrl" 
            controls 
            :src="audioUrl" 
            :key="audioUrl"
        >
            Your browser does not support the audio element.
        </audio>

        <div class="mt-4" v-if="out">
            {{ out }}
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