<script setup>
import { ref } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();

</script>

<template>
                    <aside id="rightnav" class="hidden md:block w-1/5 p-4">

                    <p class="text-sm font-light font-semibold">Discover</p>
                    <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings here.</p>

                    <div class="mt-4 grid gap-y-4">
                        <div v-for="setting in ['Listen Now']"
                            class="bg-gray-100 dark:bg-gray-800 p-2 rounded-md flex justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-inbox" viewBox="0 0 16 16">
                                <path
                                    d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                            </svg>
                            <div class="ml-3 col-span-10">
                                <p class="text-xs">{{setting}}</p>
                            </div>
                            <div class="ml-auto text-xs">
                                <p>128</p>
                            </div>
                        </div>
                        <div v-for="setting in ['Drafts','Sent','Junk','Trash','Archive']"
                            class="p-2 rounded-md flex justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-inbox" viewBox="0 0 16 16">
                                <path
                                    d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                            </svg>
                            <div class="ml-3 col-span-10">
                                <p class="text-xs">{{setting}}</p>
                            </div>
                            <div class="ml-auto text-xs">
                                <p>128</p>
                            </div>
                        </div>
                        <hr>
                        <div v-for="setting in ['Social','Updates','Forums','Shopping','Promotions']"
                            class="p-2 rounded-md flex justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-inbox" viewBox="0 0 16 16">
                                <path
                                    d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                            </svg>
                            <div class="ml-2 col-span-10">
                                <p class="text-xs">{{setting}}</p>
                            </div>
                            <div class="ml-auto text-xs">
                                <p>128</p>
                            </div>
                        </div>
                        <div>
                            <button class="text-center text-xs border border-gray-300 px-4 py-2 rounded-lg w-full">Save
                                Preferences</button>
                        </div>
                    </div>
                    <div id="chat-box" class="mt-4 p-4 rounded-lg border border-gray-300 shadow-md">
                        <div class="text-xs font-light flex items-start items-center">
                            <img class="w-8 h-8 object-cover" src="https://ui.shadcn.com/avatars/01.png">
                            <div class="ml-3">
                                <p>Tutorial Doctor</p>
                                <p class="text-xs text-gray-500 dark:text-gray-200">m@example.com</p>
                            </div>
                            <button
                                class="border p-2 w-8 h-8 flex items-center rounded-full text-center justify-center ml-auto">
                                +
                            </button>
                        </div>
                        <div class="mt-4">
                            <div class="text-xs">
                                <div v-for="(message,ndx) in ['Hi, how can I help you today?','Hey, I am having trouble with my account','What seems to be the problem?','I cannot log in.']"
                                    :key="ndx">
                                    <span v-if="ndx%2 == 0"
                                        class="text-left bg-gray-100 dark:bg-gray-800 p-2 rounded-lg flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2">{{message}}</span>
                                    <span v-else
                                        class="text-left my-3 bg-black text-white p-2 rounded-lg flex w-max max-w-[75%] flex-col rounded-lg px-3 py-2 ml-auto">{{message}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="sidebar-settings" class="mt-4 p-4 rounded-lg border border-gray-300 shadow-md">

                        <p class="text-xs font-light font-semibold">Cookie Settings</p>
                        <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings here.</p>

                        <div class="mt-4 grid gap-y-4">
                            <div>
                                <p class="text-xs">First Name</p>
                                <p class="text-gray-500 dark:text-gray-200" style="font-size: .60rem">These cookies are essential in order
                                    to use
                                    the website and
                                    it's features</p>
                                <input class="mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
                                    placeholder="Enter your name">
                            </div>
                            <div v-for="setting in ['Strictly Neccesary','Functional Cookies','Performance Cookies']"
                                class="flex justify-between items-center">
                                <div class="col-span-10">
                                    <p class="text-xs">{{setting}}</p>
                                    <p class="text-gray-500 dark:text-gray-200" style="font-size: .60rem">These cookies are essentil in
                                        order to
                                        use the website and
                                        it's features</p>
                                </div>
                                <div class="ml-4">
                                    <button type="button" role="switch" aria-checked="true" data-state="checked"
                                        value="on"
                                        class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed bg-black disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                        id="necessary" aria-label="Necessary"><span data-state="checked"
                                            class="pointer-events-none block h-4 w-4 rounded-full bg-white dark:bg-gray-900 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></span></button>
                                </div>
                            </div>
                            <div>
                                <button
                                    class="text-center text-xs border border-gray-300 px-4 py-2 rounded-lg w-full">Save
                                    Preferences</button>
                            </div>
                        </div>
                    </div>

                    


                </aside>

</template>