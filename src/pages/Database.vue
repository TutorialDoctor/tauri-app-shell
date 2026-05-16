<script setup>
import { ref, onMounted } from "vue";
import Database from '@tauri-apps/plugin-sql';
import { dataStore } from "../stores/store";
const store = dataStore();

// when using `"withGlobalTauri": true`, you may use
// const Database = window.__TAURI__.sql;

// const db = await Database.load('sqlite:test.db');
// const user = { id: 1, name: "Test User", email: "testuser@gmail.com" };

const all_users = ref([]);
const buttonTitle = ref("Create User");

const user = ref({
    name: "Test User",
    email: "testuser@gmail.com",
});

let db = null;

function resetTitle() {
    buttonTitle.value = "Create User"
}

async function initDb() {
    db = await Database.load("sqlite:test.db");

    await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);
}

async function createUser() {
    try {
        await db.execute(
            "INSERT INTO users (name, email) VALUES ($1, $2)",
            [user.value.name, user.value.email]
        );

        await getAllUsers();
    } catch (err) {
        console.error(err);
        store.setStatusMessage(err);
    }
}

async function updateUser(id, name, email) {
    try {
        await db.execute(
            "UPDATE users SET name = $1, email = $2 WHERE id = $3",
            [name, email, id]
        );

        await getAllUsers();
        store.setStatusMessage("Updated user!");
    } catch (err) {
        console.error(err);
    }
}

async function createOrUpdateUser() {
    try {
        await db.execute(
            `
            INSERT INTO users (name, email)
            VALUES ($1, $2)
            ON CONFLICT(email)
            DO UPDATE SET
                name = excluded.name
            `,
            [user.value.name, user.value.email]
        );

        await getAllUsers();

        store.setStatusMessage("User saved!");
    } catch (err) {
        console.error(err);
        store.setStatusMessage(err.toString());
    }
}

async function getAllUsers() {
    try {
        const users = await db.select("SELECT * FROM users");

        console.log(users);

        all_users.value = users;
    } catch (err) {
        console.error(err);
    }
}

async function getUserById(id) {
    try {
        const user = await db.select(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );

        return user[0];
    } catch (err) {
        console.error(err);
    }
}

async function deleteUser(id) {
    try {
        await db.execute(
            'DELETE FROM users WHERE id = $1',
            [id]
        );
        // Refresh the users list
        await getAllUsers();
        store.setStatusMessage("Deleted user!");
    } catch (err) {
        console.error(err);
    }
}

async function deleteAllUsers() {
    try {
        await db.execute('DELETE FROM users');

        await db.execute('DELETE FROM sqlite_sequence WHERE name = $1', ['users']);

        // Refresh the users list
        await getAllUsers();
    } catch (err) {
        console.error(err);
    }
}

onMounted(async () => {
    try {
        await initDb();
        await getAllUsers();
    } catch (err) {
        console.error(err);
    }
});

</script>

<template>
    <div class="w-4/5">

        <div class="mt-4 flex justify-between">
            <div id="breadcrumbs" class="w-2/5 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 p-1 gap-x-2">
                <button class="inline-block shadow-sm p-1 bg-white dark:bg-gray-900 rounded-md"
                    role="tab">Items</button>
                <RouterLink to="detail" class="inline-block ml-4 p-1 text-gray-500 dark:text-gray-200 rounded-md"
                    role="tab">Item</RouterLink>
                <RouterLink to="settings" class="inline-block ml-4 p-1 text-gray-500 dark:text-gray-200 rounded-md"
                    role="tab">Settings</RouterLink>

            </div>
            <button id="cta-button" @click="deleteAllUsers()"
                class="text-center text-xs bg-black text-white px-4 py-2 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                    class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>

                <span class="ml-2">Delete All</span></button>
        </div>
        <!--  -->

        <form @submit.prevent="createOrUpdateUser()" id="form" class="mt-4 p-4 rounded-lg border border-gray-300 shadow-md">

            <p class="text-xs font-light font-semibold">Form Details</p>
            <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie settings here.
            </p>

            <div class="mt-4 grid gap-y-4">
                <div class="formField flex justify-between items-center">
                    <div class="w-full">
                        <p class="text-xs">Name</p>
                        <p class="hidden text-gray-500 dark:text-gray-200" style="font-size: .60rem">These cookies are
                            essential in
                            order to use the website and
                            it's features</p>
                        <input v-model="user.name" @click="buttonTitle = 'Create User'"
                            class="mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
                            placeholder="Enter your name">
                    </div>
                </div>
                <div class="formField flex justify-between items-center">
                    <div class="w-full">
                        <p class="text-xs">Email</p>
                        <p class="hidden text-gray-500 dark:text-gray-200" style="font-size: .60rem">These cookies are
                            essential in
                            order to use the website and
                            it's features</p>
                        <input v-model="user.email"
                            class="mt-2 text-xs border border-gray-300 px-4 py-2 rounded-lg w-full"
                            placeholder="Enter your name">
                    </div>
                </div>
                <div>
                    <button @click="createOrUpdateUser()"
                        class="text-center text-xs bg-black text-white px-4 py-2 rounded-lg w-full">{{ buttonTitle }}</button>
                </div>
            </div>
        </form>

        <div id="table" class="mt-4 col-span-2 p-4 rounded-lg border border-gray-300 shadow-md">
            <p class="hidden text-xs font-light font-semibold">Sidebar</p>
            <p class="hidden mt-1 text-gray-500 dark:text-gray-200" style="font-size: .70rem">Manage your cookie
                settings here.</p>
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b">
                        <th class="h-10 px-2 text-left align-middle font-medium">
                            <button type="button" role="checkbox" value="on"
                                class="h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Select all"></button>
                        </th>
                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            ID</th>
                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            <button
                                class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Name<svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-arrow-up-down">
                                    <path d="m21 16-4 4-4-4"></path>
                                    <path d="M17 20V4"></path>
                                    <path d="m3 8 4-4 4 4"></path>
                                    <path d="M7 4v16"></path>
                                </svg></button>
                        </th>
                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                            <div class="text-right">Email</div>
                        </th>
                        <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="thisUser in all_users" @click="user = thisUser"
                        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        data-state="false">
                        <td class="p-2 align-middle">
                            <button type="button" role="checkbox" aria-checked="false" data-state="unchecked" value="on"
                                class="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                aria-label="Select row"></button>
                        </td>
                        <td class="p-2 align-middle">
                            <div class="capitalize">{{ thisUser.id }}</div>
                        </td>
                        <td class="p-2 align-middle">
                            <div>{{ thisUser.name }}</div>
                        </td>
                        <td class="p-2 align-middle">
                            <div class="text-right font-medium">{{ thisUser.email }}</div>
                        </td>
                        <td class="p-2 align-middle">
                            <button @click="deleteUser(thisUser.id)" class="" type="button" id="radix-:r2o0:"
                                aria-haspopup="menu" aria-expanded="false" data-state="closed"><span
                                    class="sr-only">Open menu</span><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-trash-icon lucide-trash">
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                            <button @click="updateUser(thisUser.id, user.name, user.email)" class="hidden" type="button"
                                id="radix-:r2o0:" aria-haspopup="menu" aria-expanded="false" data-state="closed"><span
                                    class="sr-only">Open menu</span><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-rotate-cw-icon lucide-rotate-cw">
                                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                                    <path d="M21 3v5h-5" />
                                </svg>
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <pre class="mt-8">{{ all_users }}</pre>
    </div>
</template>