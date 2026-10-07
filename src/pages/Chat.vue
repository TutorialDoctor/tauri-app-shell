<script setup>
import { ref, onMounted, nextTick } from "vue";
import ollama from 'ollama/browser'
import { dataStore } from "../stores/store";
const store = dataStore();

const ollama_result = ref("");
const status = ref("idle");
const text = ref("Here we go");
const prompt = ref("");
const model_selection = ref("gemma3:270m");

const model_list = ["gemma3:270m","gemma3:1b","granite4:350m","llama3.2","deepseek-r1:1.5b","llama2-uncensored","wizard-vicuna-uncensored:latest"]

async function chat() {
    text.value = ""
    store.chat_history.push(prompt.value);
    const message = { role: 'user', content: store.settings.systemPrompt + prompt.value };
    // store.setStatusMessage(store.settings.systemPrompt)
    prompt.value  = "";
    const response = await ollama.chat({ model: model_selection.value, messages: [message], stream: true })
    status.value = "thinking..."
    for await (const part of response) {
        text.value += part.message.content;
    }
    store.chat_history.push(text.value);

    // const responses_div = document.querySelector("#chat-box");
    // responses_div.scrollTop = responses_div.scrollHeight;
    // window.scrollTo({top: y, behavior: 'smooth'});
    // window.scrollBy(0,5);
    // responses_div.scrollIntoView({ block: "end", behavior: 'smooth' });
    // window.scrollBy(0,-10);

    status.value = "idle";
}

async function stopChat() {
    await ollama.abort()
}

onMounted(() => {
    console.log("Ready to Chat");
    store.getChatHistory();
})

</script>

<template>
    <div class="mt-4 w-full">
        <div class="flex gap-2 items-center">
        <select v-model="model_selection"   class="h-10 dark:bg-neutral-800 dark:text-white text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">
            <option v-for="model in model_list" :value="model">{{model}}</option>
        </select>
                <button @click="store.saveChatHistory()" class="ml-auto w-64 font-semibold bg-black text-white px-3 py-2 rounded-lg">Save Chat History</button>
           
    </div>

    <!-- {{store.settings}} -->
    
<!-- {{store.chat_history}} -->
        <div id="chat-box" class="mt-4 rounded-lg border border-neutral-300 shadow-md">
            <div class="p-4 text-xs font-light flex items-start items-center">
                <img class="rounded-full w-10 h-10 object-cover object-top" :src="store.settings.avatar">
                <div class="ml-3">
                    <p>Tutorial Doctor</p>
                    <p class="text-xs text-neutral-500 dark:text-neutral-200">m@example.com</p>
                </div>
                <button class="border p-2 w-10 h-10 flex items-center rounded-full text-center justify-center ml-auto">
                    +
                </button>
            </div>
            <div class="mt-4">
                <div class="text-xs space-y-8">
                    <div class="p-4">
                        <div id="chat-window" v-for="(message, ndx) in store.chat_history" :key="ndx">
                            <div class="flex items-center" v-if="ndx % 2 == 0">
                                 <img class="rounded-full w-10 h-10 object-cover object-top" :src="store.settings.aiAvatar">
                                <span 
                                class="ml-2 w-1/4 text-left bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2">{{
                                    message }}</span>
                                    
                            </div>
                            <div class="flex items-center" v-else>
                            <span
                                class="text-left my-3 bg-black text-white p-2 rounded-lg flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 ml-auto">{{
                                    message }}</span>
                                    <img class="ml-2 rounded-full w-10 h-10 object-cover object-top" :src="store.settings.avatar">
                            </div>
                        </div>
                    </div>

                    <form @submit.prevent="chat()"
                        class="pb-8 flex items-center justify-start bg-white dark:bg-neutral-900 dark:text-white p-3 sticky bottom-0"
                        id="chat-input">
                        <button class="mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="text-black dark:text-white bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z">
                                </path>
                            </svg>
                        </button>
                        <input v-model="prompt" autocomplete="off" name="question"
                            class="border ml-auto text-right w-full rounded-lg bg-zinc-50 dark:bg-neutral-800 dark:text-white px-4 py-2"
                            placeholder="Aa">
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>