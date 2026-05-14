<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute();

// const item ={ id: 1, label: "Item 1",description:"+20.1% from last mon", cover: "/mosaic.png" };
console.log(route.params.id);
import { dataStore } from "../stores/store";
const store = dataStore();

const setting = "SDSDF"

const item = ref(null);

onMounted(() => {
    const itemId = route.params.id;
    // Ensure itemId is a number before passing it to the store
    const found = store.retrieveItem(Number(itemId));
    if (found) {
        item.value = found;
    } else {
        console.error("Item not found in store for ID:", itemId);
        store.setStatusMessage(`Item not found in store for ID ${itemID}`)
    }
});

</script>

<template>
    <div>
        <div id="music" class="h-auto col-span-5 empty">
            <div class="flex justify-start gap-x-6">
                <aside id="leftnav" class="hidden md:block w-1/5 p-4">

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
                                <p class="text-xs">{{ setting }}</p>
                            </div>
                            <div class="ml-auto text-xs">
                                <p>128</p>
                            </div>
                        </div>
                        <div v-for="setting in ['Drafts', 'Sent', 'Junk', 'Trash', 'Archive']"
                            class="p-2 rounded-md flex justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
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
                        </div>
                        <hr>
                        <div v-for="setting in ['Social', 'Updates', 'Forums', 'Shopping', 'Promotions']"
                            class="p-2 rounded-md flex justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-inbox" viewBox="0 0 16 16">
                                <path
                                    d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                            </svg>
                            <div class="ml-2 col-span-10">
                                <p class="text-xs">{{ setting }}</p>
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

                </aside>
                <div id="main" class="md:p-8 mt-8 w-full md:w-3/4">


                    <div class="flex justify-between">
                        <div id="breadcrumbs" class="w-2/5 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 p-1 gap-x-2">
                            <RouterLink to="/" class="inline-block mx-4 p-1 text-gray-500 dark:text-gray-200 rounded-md" role="tab">Items
                            </RouterLink>
                            <button class="inline-block shadow-sm p-1 bg-white dark:bg-gray-900 rounded-md" role="tab">Item /
                                1</button>
                            <RouterLink to="settings" class="inline-block ml-4  p-1 text-gray-500 dark:text-gray-200 rounded-md"
                                role="tab">Settings</RouterLink>

                        </div>
                        <button id="cta-button"
                            class="text-center text-xs bg-black text-white px-4 py-2 rounded-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                                class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>

                            <span class="ml-2">Add Music</span></button>
                    </div>

                    <header id="header-1">
                        <p class="mt-4 font-medium text-xl">Detail View</p>
                        <p class="text-gray-500 dark:text-gray-200" style="font-size: .75rem">Manager your account settings and set e-mail
                            preferences.</p>
                    </header>
                    <hr class="mt-4">

                    <!-- v-if is critical when defaulting item to null -->
                    <div class="mt-4 flex" v-if="item">
                        <div class="empty">
                            <img class="hover:opacity-75 border h-[260px] w-[200px] rounded-md object-contain"
                                :src="item.cover" />
                        </div>
                        <header id="header-1" class="ml-4 ">
                            <p class="hidden font-medium text-xl">{{ item.label }}</p>
                            <input v-model="item.label" class="font-medium text-xl outline-none"><br/>
                            <p class="hidden text-gray-500 dark:text-gray-200" style="font-size: .75rem">{{ item.description }}</p>
                            <input v-model="item.description" class="text-gray-500 dark:text-gray-200 outline-none" style="font-size: .75rem"><br/>
                            <input v-model="item.cover" class="w-full rounded-md px-2 text-bg-100 border outline-none" style="font-size: .75rem">
                        </header>
                    </div>
                    <div v-else>
                        <p>Loading item details or item not found...</p>
                    </div>

                    <hr class="mt-4">

                    <section class="mt-4">
                        <header id="header-1">
                            <p class="font-medium text-xl">Listen Now</p>
                            <p class="text-gray-500 dark:text-gray-200" style="font-size: .75rem">Manager your account settings and set
                                e-mail
                                preferences.</p>
                        </header>
                        <div id="table" class="mt-4 col-span-2 p-4 rounded-lg border border-gray-300 shadow-md">
                            <p class="hidden text-xs font-light font-semibold">Sidebar</p>
                            <p class="hidden mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings
                                here.</p>
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b">
                                        <th class="h-10 px-2 text-left align-middle font-medium">
                                            <button type="button" role="checkbox" value="on"
                                                class="h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                aria-label="Select all"></button>
                                        </th>
                                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                                            Status</th>
                                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                                            <button
                                                class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Email<svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-arrow-up-down">
                                                    <path d="m21 16-4 4-4-4"></path>
                                                    <path d="M17 20V4"></path>
                                                    <path d="m3 8 4-4 4 4"></path>
                                                    <path d="M7 4v16"></path>
                                                </svg></button>
                                        </th>
                                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                                            <div class="text-right">Amount</div>
                                        </th>
                                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="i in 3"
                                        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        data-state="false">
                                        <td class="p-2 align-middle">
                                            <button type="button" role="checkbox" aria-checked="false"
                                                data-state="unchecked" value="on"
                                                class="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                aria-label="Select row"></button>
                                        </td>
                                        <td class="p-2 align-middle">
                                            <div class="capitalize">success</div>
                                        </td>
                                        <td class="p-2 align-middle">
                                            <div class="lowercase">ken99@example.com</div>
                                        </td>
                                        <td class="p-2 align-middle">
                                            <div class="text-right font-medium">$316.00</div>
                                        </td>
                                        <td class="p-2 align-middle">
                                            <button
                                                class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none hover:text-accent-foreground h-8 w-8 p-0"
                                                type="button" id="radix-:r2o0:" aria-haspopup="menu"
                                                aria-expanded="false" data-state="closed"><span class="sr-only">Open
                                                    menu</span><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-ellipsis">
                                                    <circle cx="12" cy="12" r="1"></circle>
                                                    <circle cx="19" cy="12" r="1"></circle>
                                                    <circle cx="5" cy="12" r="1"></circle>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </section>



                </div>
                <aside id="rightnav" class="hidden md:block w-1/5 p-4">


                    <p class="text-sm font-light font-semibold">Discover</p>
                    <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings here.</p>


                    <div id="sidebar-settings" class="h-auto mt-4 p-4 rounded-lg border border-gray-300 shadow-md">

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
                            <div v-for="setting in ['Strictly Neccesary', 'Functional Cookies', 'Performance Cookies']"
                                class="flex justify-between items-center">
                                <div class="col-span-10">
                                    <p class="text-xs">{{ setting }}</p>
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
            </div>
        </div>




    </div>

</template>