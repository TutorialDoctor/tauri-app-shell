<script setup>
import { ref } from "vue";

// Use Props and slots to make this dynamic to contain nested components

const props = defineProps({
    items: Array
})

// [{label:'',route:'',icon:''}]



</script>

<template>
    <aside id="leftnav" class="hidden md:block w-1/5 p-4">

                    <p class="text-sm font-light font-semibold">Discover</p>
                    <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings here.</p>

                    <div class="mt-4 grid gap-y-4">
                        <RouterLink :to="{name: setting}" v-for="setting in ['Draw','Style Guide','Settings','Chat','API','Database']"
                            class="capitalize p-2 rounded-md flex justify-start items-center dark:hover:bg-gray-700 hover:bg-gray-100 dark:bg-gray-800 p-2 rounded-md cursor-pointer">
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
                        </RouterLink>
                        <hr>
                        <div>
                            <button class="text-center text-xs border border-gray-300 px-4 py-2 rounded-lg w-full">Save
                                Preferences</button>
                        </div>
                    </div>

                </aside>
</template>