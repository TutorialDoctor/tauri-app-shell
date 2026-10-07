<!-- TerminalRunner.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Command } from "@tauri-apps/plugin-shell";

const command = ref("python3 /Users/username/Desktop/test_server_py/server.py");
const output = ref("");
const error = ref("");
const running = ref(false);

//TODO: Improve, fix

const commandList = [
  { label: "Run server", command: "python3 /Users/username/Desktop/test_server_py/server.py" },
  { label: "Start Chat", command: "python3 /Users/username/Desktop/OfflineInternet/src/applications/chat_agent/app.py" },
  { label: "App Store", command: "python3 /Users/username/Desktop/OfflineInternet/src/applications/app_store/app.py" }
]



// const serverProcess = ref(null);

const servers = ref(new Map());

async function runCommand() {
  output.value = "";
  error.value = "";
  running.value = true;

  try {
    const parts =
      command.value.match(
        /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|\S+/g
      )?.map((part) => {
        if (
          (part.startsWith('"') && part.endsWith('"')) ||
          (part.startsWith("'") && part.endsWith("'"))
        ) {
          return part.slice(1, -1);
        }
        return part;
      }) || [];

    const program = parts[0];
    const args = parts.slice(1);

    const cmd = Command.create(program, args);

    const id = crypto.randomUUID(); // 👈 unique server ID

    cmd.stdout.on("data", (line) => {
      output.value += `[${id}] ${line}\n`;
    });

    cmd.stderr.on("data", (line) => {
      error.value += `[${id}] ${line}\n`;
    });

    cmd.on("close", ({ code }) => {
      output.value += `\n[${id}] exited with code ${code}\n`;
      servers.value.delete(id);
    });

    const child = await cmd.spawn();

    servers.value.set(id, {
      id,
      process: child,
      cmd,
      program,
      args
    });

  } catch (err) {
    error.value = String(err);
    running.value = false;
  }
}

async function stopServer(id: string) {
  const server = servers.value.get(id);

  if (server?.process) {
    await server.process.kill();
    servers.value.delete(id);
    output.value += `\n[${id}] stopped\n`;
    running.value = false
  }
}

</script>

<template>
  <div class="mt-4 w-full">

    <!-- Command selector -->
    <select
      v-model="command"
      class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full"
    >
      <option v-for="cmd in commandList" :key="cmd.command" :value="cmd.command">
        {{ cmd.label }}
      </option>
    </select>

    <!-- Run command -->
    <div class="mt-4 flex gap-2 items-center">
      <form @submit.prevent="runCommand" class="w-full flex gap-2">
        <input
          v-model="command"
          spellcheck="false"
          placeholder="Enter command"
          class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full"
        />

        <button
          class="ml-auto w-64 font-semibold bg-black text-white px-3 py-2 rounded-lg"
        >
          {{ running ? "Running..." : "Run Command" }}
        </button>
      </form>
    </div>

    <small>Permitted commands: echo, ls, touch, pwd, mkdir, mv, cp, cat</small>

    <!-- ========================= -->
    <!-- MULTI SERVER DASHBOARD -->
    <!-- ========================= -->
    <div class="mt-6">
      <h3 class="font-semibold mb-2">Running Servers</h3>

      <div v-if="servers.size === 0" class="text-sm opacity-60">
        No servers running
      </div>

      <div
        v-for="[id, server] in servers"
        :key="id"
        class="border rounded-lg p-3 mb-2 flex justify-between items-center"
      >
        <div>
          <div class="text-xs font-mono">
            {{ id }}
          </div>

          <div class="text-xs opacity-70">
            {{ server.program }} {{ server.args?.join(" ") }}
          </div>
        </div>

        <button
          @click="stopServer(id)"
          class="bg-red-600 text-white text-xs px-3 py-1 rounded"
        >
          Stop
        </button>
      </div>
    </div>

    <!-- OUTPUT -->
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