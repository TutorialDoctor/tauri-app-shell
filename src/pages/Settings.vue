<script setup>
import { ref, computed } from "vue";
import { dataStore } from "../stores/store";

const store = dataStore();

//Setting Builder
// 1. select group
// Add setting field
// toggle 'has options' checkbox to conditionally show options array
// adjust label, type, tooltip and model
// add to group


const setting_groups = [
    {
        group: "Basic Info",
        description: "Pertinent information",
        fields: [
            { label: "App Name", type: "textField", tooltip: "input box", model: "appName" },
            { label: "First Name", type: "textField", tooltip: "input box", model: "firstName" },
            { label: "Last Name", type: "textField", tooltip: "input box", model: "lastName" },
            { label: "Password", type: "textField", tooltip: "input box", model: "password" },
            { label: "Email", type: "textField", tooltip: "input box", model: "email" },
            { label: "Birth Date", type: "dateField", tooltip: "input box", model: "birthDate" },
            { label: "Phone", type: "textField", tooltip: "input box", model: "phone" },
            { label: "Description", type: "textArea", tooltip: "input box", model: "description" },
            { label: "Favorite Number", type: "dropdown", tooltip: "select box", model: "favNum", options: ['one', 'two', 'three'] },
            { label: "Turn On?", type: "checkbox", tooltip: "on or off", model: "turnOn" },
            { label: "Frequency", type: "radioGroup", tooltip: "group of radios", model: "frequency", options: ['hourly', 'daily', 'weekly', 'monthly'] },
        ]
    },
    {
        group: "Appearance",
        description: "This is how others will see you on the site",
        fields: [
            { label: "Avatar", type: "textField", tooltip: "input box", model: "avatar" },
            { label: "Primary Color", type: "textField", tooltip: "input box", model: "primaryColor" },
            { label: "Secondary Color", type: "textField", tooltip: "input box", model: "secondaryColor" },
            { label: "CSS", type: "textField", tooltip: "input box", model: "css" },
            { label: "Theme", type: "dropdown", tooltip: "input box", model: "theme", options: ["Light", "Dark"] },
            { label: "Animations", type: "checkbox", tooltip: "input box", model: "animations" },
            { label: "Font Size", type: "textField", tooltip: "input box", model: "fontSize" },
            { label: "Border Radius", type: "textField", tooltip: "input box", model: "borderRadius" },
        ]
    },
    {
        group: "Notifications",
        description: "This is how others will see you on the site",
        fields: [
            { label: "Avatar", type: "textField", tooltip: "input box", model: "appName" },
            { label: "Push Notifications", type: "checkbox", tooltip: "on or off", model: "pushNotifications" },
            { label: "Email Notifications", type: "checkbox", tooltip: "on or off", model: "EmailNotifications" },
        ]
    },
    {
        group: "Display",
        description: "This is how others will see you on the site",
        fields: [
            { label: "Mobile", type: "textField", tooltip: "input box", model: "mobile" },
            { label: "Desktop", type: "textField", tooltip: "input box", model: "desktop" },
            { label: "language", type: "textField", tooltip: "input box", model: "language" }
        ]
    },
    {
        group: "Artificial Intelligence",
        description: "This is how others will see you on the site",
        fields: [
            { label: "AI Avatar", type: "textField", tooltip: "input box", model: "aiAvatar" },
            { label: "Default Model", type: "textField", tooltip: "select box", model: "defaultModel" },
            { label: "LLM MODEL", type: "dropdown", tooltip: "select box", model: "llm", options: ['llama3.2', 'deepseek-r1:8b', 'gemma3:4b'] },
            { label: "TTS MODEL", type: "dropdown", tooltip: "select box", model: "tts", options: ['kitten', 'kokoro', 'e5'] },
            { label: "GAN MODEL", type: "dropdown", tooltip: "select box", model: "gan", options: ['DreamShaper XL v2.1 Turbo (8-bit)', 'klein', 'sd1'] },

        ]
    },
    {
        group: "Other",
        description: "This is how others will see you on the site",
        fields: [
            { label: "Draw Things API", type: "textField", tooltip: "input box", model: "dtAPI" },
            { label: "LLM API", type: "textField", tooltip: "input box", model: "llmAPI" },
            { label: "ttsAPI", type: "textField", tooltip: "input box", model: "ttsAPI" },
            { label: "Debug Mode", type: "checkbox", tooltip: "input box", model: "debugMode" },
            { label: "Developer Tools", type: "checkbox", tooltip: "input box", model: "developerTools" }
        ]
    },
     {
        group: "Credits",
        description: "This is how others will see you on the site",
        fields: [
            { label: "Creator", type: "textField", tooltip: "maker of this website", model: "creator" },
            { label: "Website URL", type: "textField", tooltip: "The creators website", model: "creator" },
        ]
    }
]

// const ai_settings = {
//     group: "Artificial Intelligence", fields: [
//         { label: "LLM MODEL", type: "dropdown", tooltip: "select box", model: "llm", options: ['ollama', 'deepseek', 'qwen4'] },
//         { label: "TTS MODEL", type: "dropdown", tooltip: "select box", model: "tts", options: ['kitten', 'kokoro', 'e5'] },
//         { label: "GAN MODEL", type: "dropdown", tooltip: "select box", model: "gan", options: ['zit', 'klein', 'sd1'] },
//     ]
// }

// TODO: Options could perhaps be objects to show tooltips for the selected option (can map over them)
// TODO These can be stored in the tauri store db. Users will be able to create their own settings for their apps.
// TODO: May need to adjust for field types, so an array of objects [{label:'','key','type','description','defaultValue'}]
//types: select, checkbox, radio, textField, textArea, button? some types will be array-like options for select and items radioGroup
// TODO: Separate presentation from data if I want to make an AutoBuilder

const current_section = ref('Basic Info');

const currentSetting = computed(() =>
    setting_groups.find(
        (section) => section.group === current_section.value
    )
);

</script>

<template>
    <div class="h-screen flex w-4/5 justify-start gap-x-6 col-span-4 empty">
        <!-- Sidebar -->
        <aside class="hidden w-1/5 mt-4">
            <div v-for="section in setting_groups" :key="section.group" @click="current_section = section.group"
                class="dark:hover:bg-gray-800 hover:bg-gray-100 dark:bg-gray-800 p-2 rounded-md cursor-pointer">
                <p class="text-xs">{{ section.group }}</p>
            </div>

        </aside>

        <!-- DataViewer -->
        <div class="hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 p-3 break-all"> {{ store.settings }}</div>
        <!-- /DataViewer -->


        <div class="w-1/5 mt-4 px-4">
            <p class="text-sm font-light font-semibold">Discover</p>
            <p class="mt-1 mb-4 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings
                here.</p>

            <div class="gap-y-4 grid">
                <div v-for="section in setting_groups" :key="section.group" @click="current_section = section.group"
                    class="cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100 dark:bg-gray-800 capitalize p-2 rounded-md flex justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-inbox" viewBox="0 0 16 16">
                        <path
                            d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                    </svg>
                    <div class="ml-3 col-span-10">
                        <p class="text-xs">{{ section.group }}</p>
                    </div>
                    <div class="ml-auto text-xs">
                        <p>{{ section.fields.length }}</p>
                    </div>
                </div>
                <hr>
                <div class="mt-4">
                    <button class="text-center text-xs border border-gray-300 px-4 py-2 rounded-lg w-full">Show
                        Data</button>
                </div>
                <p class="text-xs">This application was developed by <a target="_blank"
                        class="underline text-teal-500 font-semibold" href="https://tutorialdoctor.github.io">The
                        Tutorial Doctor</a> The creator of <a target="_blank"
                        class="underline text-purple-500 font-semibold" href="https://upskil.dev">upskil.dev</a></p>
            </div>
        </div>


        <!-- Selected Section Only -->
        <div id="chart" class="mt-8 w-1/3" v-if="currentSetting">
            <p class="text-sm font-medium font-light">
                {{ currentSetting.group }}
            </p>

            <p class="text-gray-500 dark:text-gray-200" style="font-size: .65rem">
                {{ currentSetting.description }}
            </p>

            <hr class="mt-4" />

            <div class="mt-4 grid gap-y-4">
                <div v-for="field in currentSetting.fields" :key="field.model" class="mt-2 w-full">
                    <p class="text-xs">{{ field.label }}</p>

                    <!-- Text Field -->
                    <input v-if="field.type === 'textField'" v-model="store.settings[field.model]"
                        class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full" />
                    
                    <!-- Date -->
                    <input v-if="field.type === 'dateField'" v-model="store.settings[field.model]" type="date"
                        class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full" />


                    <!-- Text Area -->
                    <textarea v-else-if="field.type === 'textArea'" v-model="store.settings[field.model]"
                        class="dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full" />

                    <!-- Dropdown -->
                    <select v-else-if="field.type === 'dropdown'" v-model="store.settings[field.model]"
                        class="h-8 mt-2 dark:bg-gray-800 dark:text-white text-xs border border-gray-300 px-4 py-2 rounded-lg w-full">
                        <option v-for="option in field.options" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>

                    <!-- Checkbox -->
                    <input v-else-if="field.type === 'checkbox'" type="checkbox"
                        v-model="store.settings[field.model]" />

                    <!-- Radio Group -->
                    <div v-else-if="field.type === 'radioGroup'" class="mt-4 grid grid-cols-3 gap-4 ">
                        <div v-for="option in field.options" :key="option">
                            {{ field.label }}
                            <input :id="`${field.model}-${option}`" type="radio" :name="field.model" :value="option"
                                v-model="store.settings[field.model]" />
                            <label class="ml-2" :for="`${field.model}-${option}`">
                                {{ option }}
                            </label>
                        </div>
                    </div>

                     <!-- <div v-else-if="field.type === 'section'" class="mt-4 ">
                        <hr class="mb-3"/>
                        <div>
                            <label class="text-xs font-semibold" :for="`${field.model}-${field.options[0]}`">
                                {{ field.options[0] }}
                            </label>
                            <input class="my-2 dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full" :id="`${field.model}-${field.options[0]}`" :name="field.model"
                                v-model="store.settings[field.options[0]]" />
                            <label class="text-xs font-semibold" :for="`${field.model}-${field.options[1]}`">
                                {{ field.options[1] }}
                            </label>
                            <input class="my-2 dark:bg-gray-800 dark:text-white mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full" :id="`${field.model}-${field.options[1]}`" :name="field.model"
                                v-model="store.settings[field.options[1]]" />

                        </div>
                    </div> -->

                    <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">
                        {{ field.tooltip }}
                    </p>
                </div>

                <button @click="store.saveSettings()"
                    class="text-center text-xs dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-lg">
                    Save Settings
                </button>
            </div>
        </div>
    </div>
</template>