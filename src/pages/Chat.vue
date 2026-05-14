<script setup>
import { ref, onMounted, nextTick } from "vue";
import ollama from 'ollama/browser'
import { dataStore } from "../stores/store";
const store = dataStore();

const conversation = ref(["Hi, how can I help you today?", "Actually, I've been trying to log into my account for hours, but it keeps saying that my password is incorrect.", "Sorry to hear that. Can you tell me a little bit more about what's happening? Are you getting an error message or anything else when you try to log in?", "Yeah, all I get is this 'Invalid username or password' message. It's so frustrating!", "Okay, let me walk you through the next steps. Have you tried resetting your password by clicking on the 'Forgot Password' link on our website?", "Actually, I did that already, but it just took me back to the login page with the same error message.", "I see. That's frustrating. Can you try clearing your browser's cache and cookies, then try logging in again?", "Hmm, I'm not sure if that will work since my issue is probably more complex than a simple browser glitch.", "In any case, our team should be able to help you out. Can you please provide me with your account email address so I can look into this further?", "Okay... let me check on the status of your account. (pause) Okay, it looks like we do have some issues with your account. I'm going to go ahead and reset your password for you.", "Great, thank you so much! I really appreciate your help. Can you also please explain why this is happening?", "I'd be happy to explain what might be causing the issue. Sometimes our systems can get a bit wonky due to technical issues or user errors. In your case, it looks like there may have been an issue with the password hashing algorithm.", "Okay, got it. I'll make sure to pass that on to our development team so they can look into it. Can you please confirm that your new password is working properly?", "Yeah, just tried logging in again and everything seems fine now. Thanks again for your help! You've been a lifesaver.", "You're welcome! I'm glad we could resolve the issue. If you have any other questions or concerns, feel free to ask.", "By the way, would you like me to provide some additional tips on how to keep your account secure in the future? We also offer a tutorial on password management and security best practices if you're interested.", "That sounds great, thank you! I'd love to learn more about how to keep my account safe. Can you send me that tutorial somehow?", "Of course, I can email it to you right away. (email sent) If you have any other questions or need further assistance, don't hesitate to reach out.", "Okay, thanks again for your help today! Have a great day and happy logging in from now on!", "You're welcome! Take care, and we'll see you next time you log in.", "One more thing..."]);

const ollama_result = ref("");
const status = ref("idle");
const text = ref("Here we go");
const prompt = ref("");
const model_selection = ref("llama3.2");

async function chat() {
    text.value = ""
    conversation.value.push(prompt.value);
    const message = { role: 'user', content: prompt.value };
    prompt.value  = "";
    const response = await ollama.chat({ model: model_selection.value, messages: [message], stream: true })
    status.value = "thinking..."
    for await (const part of response) {
        text.value += part.message.content;
    }
    conversation.value.push(text.value);

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
})

</script>

<template>
    <div class="p-4">
        <div id="chat-box" class="rounded-lg border border-gray-300 shadow-md">
            <div class="p-4 text-xs font-light flex items-start items-center">
                <img class="w-8 h-8 object-cover" src="https://ui.shadcn.com/avatars/01.png">
                <div class="ml-3">
                    <p>Tutorial Doctor</p>
                    <p class="text-xs text-gray-500 dark:text-gray-200">m@example.com</p>
                </div>
                <button class="border p-2 w-8 h-8 flex items-center rounded-full text-center justify-center ml-auto">
                    +
                </button>
            </div>
            <div class="mt-4">
                <div class="text-xs space-y-8">
                    <div class="p-4">
                        <div id="chat-window" v-for="(message, ndx) in conversation" :key="ndx">
                            <span v-if="ndx % 2 == 0"
                                class="text-left bg-gray-100 dark:bg-gray-800 p-2 rounded-lg flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2">{{
                                    message }}</span>
                            <span v-else
                                class="text-left my-3 bg-black text-white p-2 rounded-lg flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 ml-auto">{{
                                    message }}</span>
                        </div>
                    </div>

                    <form @submit.prevent="chat()"
                        class="flex items-center justify-start bg-white dark:bg-gray-900 dark:text-white p-3 sticky bottom-0"
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
                            class="border ml-auto text-right w-full rounded-lg bg-zinc-50 dark:bg-gray-800 dark:text-white px-4 py-2"
                            placeholder="Aa">
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>