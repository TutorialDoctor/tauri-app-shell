<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();

function deleteAndRedirect(item) {
    store.deleteItem(item.id);
    router.push("/")
}


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

    <div id="music" class="w-4/5 mt-8 h-auto col-span-5 empty">
        <div class="flex justify-start gap-x-6">

            <div id="itemDetails" class="w-full">


                <div class="flex justify-between">
                    <div id="breadcrumbs" class="w-2/5 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 p-1 gap-x-2">
                        <RouterLink to="/" class="inline-block mx-4 p-1 text-gray-500 dark:text-gray-200 rounded-md"
                            role="tab">Items
                        </RouterLink>
                        <button class="inline-block shadow-sm p-1 bg-white dark:bg-gray-900 rounded-md" role="tab">Item
                            /
                            1</button>
                        <RouterLink to="settings"
                            class="inline-block ml-4  p-1 text-gray-500 dark:text-gray-200 rounded-md" role="tab">
                            Settings</RouterLink>

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
                    <p class="text-gray-500 dark:text-gray-200" style="font-size: .75rem">Manager your account settings
                        and set e-mail
                        preferences.</p>
                </header>
                <hr class="mt-4">

                <!-- v-if is critical when defaulting item to null -->
                <div class="mt-4 flex" v-if="item">
                    <div class="empty">
                        <img class="hover:opacity-75 border h-[260px] w-auto rounded-md object-contain"
                            :src="item.cover" />
                    </div>
                    <header id="header-1" class="ml-4 ">
                        <p class="hidden font-medium text-xl">{{ item.label }}</p>
                        <input v-model="item.label"
                            class="dark:bg-gray-900 dark:text-white mt-2 w-full outline-none"><br />
                        <p class="hidden text-gray-500 dark:text-gray-200" style="font-size: .75rem">{{ item.description
                            }}</p>
                        <input v-model="item.description"
                            class="dark:bg-gray-900 dark:text-white mt-2 text-xs w-full outline-none"
                            style="font-size: .75rem"><br />
                        <input v-model="item.cover"
                            class="dark:bg-gray-900 dark:text-white mt-2 text-xs w-full outline-none"
                            style="font-size: .75rem">
                        <button class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-1 rounded mt-2"
                            @click.prevent="deleteAndRedirect(item)">
                            Delete
                        </button>
                    </header>
                </div>
                <div v-else>
                    <p>Loading item details or item not found...</p>
                </div>

                <hr class="mt-4">

                <section class="mt-4">
                    <header id="header-1">
                        <p class="font-medium text-xl">Listen Now</p>
                        <p class="text-gray-500 dark:text-gray-200" style="font-size: .75rem">Manager your account
                            settings and set
                            e-mail
                            preferences.</p>
                    </header>
                    <div id="table" class="mt-4 col-span-2 p-4 rounded-lg border border-gray-300 shadow-md">
                        <p class="hidden text-xs font-light font-semibold">Sidebar</p>
                        <p class="hidden mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your
                            cookie settings
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
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
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
                                            type="button" id="radix-:r2o0:" aria-haspopup="menu" aria-expanded="false"
                                            data-state="closed"><span class="sr-only">Open
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

        </div>
    </div>


</template>