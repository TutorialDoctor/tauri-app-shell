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
        <p class="mt-1 text-neutral-500 dark:text-neutral-200" style="font-size: .70rem">Manage your cookie settings here.</p>

        <div class="mt-4 grid gap-y-4">
            <RouterLink :to="{ name: setting }"
                v-for="setting in ['Draw', 'Chat', 'API', 'Database', 'File Search', 'Calendar', 'Command Center','Obsidian Interface','Server Runner','Existing DB','Python Coder','Text To Speech','Photo Uploader','Media Gallery','Weather','Style Guide', 'Settings']"
                class="capitalize p-2 rounded-md flex justify-start items-center dark:hover:bg-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md cursor-pointer">
                <svg v-if="setting === 'Draw'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-brush-icon lucide-brush">
                    <path d="m11 10 3 3" />
                    <path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" />
                    <path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" />
                </svg>
                <svg v-else-if="setting === 'Chat'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-message-circle-more-icon lucide-message-circle-more">
                    <path
                        d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    <path d="M8 12h.01" />
                    <path d="M12 12h.01" />
                    <path d="M16 12h.01" />
                </svg>
                <svg v-else-if="setting === 'Database'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-database-icon lucide-database">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                    <path d="M3 12A9 3 0 0 0 21 12" />
                </svg>
                <svg v-else-if="setting === 'Style Guide'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-pen-tool-icon lucide-pen-tool">
                    <path
                        d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
                    <path
                        d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
                    <path d="m2.3 2.3 7.286 7.286" />
                    <circle cx="11" cy="11" r="2" />
                </svg>
                <svg v-else-if="setting === 'File Search'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-folder-search2-icon lucide-folder-search-2">
                    <circle cx="11.5" cy="12.5" r="2.5" />
                    <path
                        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                    <path d="M13.3 14.3 15 16" />
                </svg>
                <svg v-else-if="setting === 'Calendar'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-calendar1-icon lucide-calendar-1">
                    <path d="M11 14h1v4" />
                    <path d="M16 2v4" />
                    <path d="M3 10h18" />
                    <path d="M8 2v4" />
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                </svg>
                <svg v-else-if="setting === 'Python Coder'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
                <svg v-else-if="setting === 'Command Center'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-command-icon lucide-command">
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <svg v-else-if="setting === 'Settings'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings">
                    <path
                        d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-inbox" viewBox="0 0 16 16">
                    <path
                        d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                </svg>
                <div class="ml-3 col-span-10">
                    <p class="text-xs">{{ setting }}</p>
                </div>
                <div class="ml-auto text-xs">
                    <p>128</p>
                </div>
            </RouterLink>
            <hr>
            <div>
                <button class="text-center text-xs border border-neutral-300 px-4 py-2 rounded-lg w-full">Save
                    Preferences</button>
            </div>
        </div>

    </aside>
</template>