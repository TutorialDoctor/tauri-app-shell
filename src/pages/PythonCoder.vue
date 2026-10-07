<!-- TerminalRunner.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Command } from "@tauri-apps/plugin-shell";
import { resolveResource } from "@tauri-apps/api/path"; // 1. Import the path resolver

const out = ref("");
const running = ref(false);
const error = ref("");
const currentScript = ref("my_script.py");

const scriptList = ["my_script.py", "test.py", "voice.py"]

async function runPython() {
    out.value = "";
    running.value = true;
    error.value = "";
    try {
        // 2. Dynamically resolve the path to your script
        // This automatically handles the path differences between dev and build
        const scriptPath = await resolveResource(`resources/scripts/${currentScript.value}`);

        // 3. Pass the resolved absolute path to the command
        const command = Command.create("python3", [scriptPath]);
        const output = await command.execute();

        out.value = output.stdout.trim();

    } catch (err: any) {
        error.value = String(err);
    } finally {
        running.value = false;
    }
}
</script>

<template>
    <div class="mt-4 w-full">
        <div class="flex gap-2 items-center">
            <select v-model="currentScript"
                class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">
                <option v-for="script in scriptList" :value="script">{{ script }}</option>
            </select>
            <!-- {{currentScript}} -->
            <button @click="runPython" :disabled="running"
                class="ml-auto w-64 font-semibold bg-black text-white px-3 py-2 rounded-lg">{{
                    running ? "Running..." : "Run Python Script" }}</button>

        </div>

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