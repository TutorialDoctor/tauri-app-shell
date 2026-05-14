import { defineStore } from "pinia";
import { LazyStore } from "@tauri-apps/plugin-store";

import { create, BaseDirectory, writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';
import { save, open } from '@tauri-apps/plugin-dialog';
import { fetch } from '@tauri-apps/plugin-http';

import { sum } from './methods.js';

export const dataStore = defineStore("dataStore", {
    state: () => {
        return {
            db: new LazyStore("database.json", { autoSave: true }),
            name: 'My Store',
            counter: 6,
            showModal: false,
            loading: false,
            processing: false,
            items: [
                { id: 1, label: "Item 1", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 2, label: "Item 2", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 3, label: "Item 3", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 4, label: "Item 4", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 5, label: "Item 5", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 6, label: "Item 6", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 7, label: "Item 7", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 8, label: "Item 8", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 9, label: "Item 9", description: "+20.1% from last mon", cover: "/mosaic.png" },
                { id: 10, label: "Item 10", description: "+20.1% from last mon", cover: "/mosaic.png" }
            ],
            settings: {
                appName: "Tauri App Shell"
            },
            history: []
        }
    },
    getters: {
        doubleCount: (state) => state.counter * 2,
        oddOrEven: (state) => {
            if (state.counter % 2 === 0) return 'even'
            return 'odd'
        },
        getAPI: (state)=> state.dtAPI
    },
    actions: {
        increment() {
            this.counter++
        },
        setStatusMessage(msg) {
            document.getElementById("status-message").classList.remove("hidden")
            setTimeout(() => {
                document.getElementById("status-message").classList.add("hidden")
            }, 5000)
            document.getElementById("status-message").innerHTML = msg
        },
        async saveItems() {
            //TODO  not saving passed in param
            try {
                const cleanData = this.items.map(item => ({
                    id: item.id,
                    label: item.label,
                    description: item.description,
                    cover: item.cover
                }));

                await this.db.set('items', cleanData);
                await this.db.save();

                this.setStatusMessage("Saved items to database");
            } catch (error) {
                console.error("Issue saving items to database", error);
            }
        },
        async saveSettings() {
            //TODO  not saving passed in param
            try {
                await this.db.set('settings', this.settings);
                await this.db.save();

                this.setStatusMessage("Saved settings");
            } catch (error) {
                console.error("Issue saving settings", error);
            }
        },
        async clearStore() {
            await this.db.clear();
            await this.db.save();
            this.setStatusMessage("Cleared Store");
        },
        async fetchItems() {
            this.loading = true
            try {
                const { data } = await axios.get('/api/items');
                this.items = data
            } finally {
                this.loading = false
            }
        },
        createItem() {
            // Find the highest ID currently in the array. 
            // If the array is empty, default to 0.
            const maxId = this.items.length > 0
                ? Math.max(...this.items.map(item => item.id))
                : 0;

            const nextId = maxId + 1;

            this.items.push({
                id: nextId,
                label: `Item ${nextId}`,
                description: "Pushed Item",
                cover: "/mosaic.png"
            });

            this.setStatusMessage("Added Item");
            console.log(sum(3,4))
        },
        retrieveItem(id) {
            return this.items.find(obj => obj.id == id);
        },
        updateItem(id, updates) {
            const index = items.findIndex(t => t.id === id)
            if (index !== -1) items[index] = { ...items[index], ...updates }
            //TODO: Automatic save to db can go here
        },
        deleteItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.setStatusMessage("Removed Item");
            //TODO: Automatic save to db can go here
        },
        async getSettings() {
            if (await this.db.get('settings') != undefined) {
                this.settings = await this.db.get("settings")
                this.setStatusMessage("Got backed up settings");
                this.initialized = true
            } else {
                // this.saved_settings = this.settings
                this.setStatusMessage("No settings to get");
            }
        },
        async saveObjectToJSONFile(data, defaultFilename = "data.json") {
            try {
                const filePath = await save({
                    title: "Save File",
                    defaultPath: defaultFilename,
                    filters: [
                        {
                            name: "JSON Files",
                            extensions: ["json"]
                        }
                    ]
                });
                if (!filePath) {
                    this.setStatusMessage("Save cancelled");
                    return false;
                }
                await writeTextFile(
                    filePath,
                    JSON.stringify(data, null, 2)
                );
                console.log("File saved:", filePath);
                this.setStatusMessage(`Saved file: ${filePath}`);
                return true;

            } catch (error) {
                console.error("Failed to save JSON file:", error);
                this.setStatusMessage("Failed to save file");
                return false;
            }
        },
        async loadObjectFromJSONFile() {
            try {
                const file = await open({
                    multiple: false,
                    directory: false,
                    filters: [
                        {
                            name: "JSON Files",
                            extensions: ["json"]
                        }
                    ]
                });

                if (!file) {
                    this.setStatusMessage("No file selected");
                    return null;
                }

                const content = await readTextFile(file);

                try {
                    const parsed = JSON.parse(content);
                    this.setStatusMessage("Loaded JSON file");
                    return parsed;

                } catch (parseError) {
                    console.error("JSON Parse Error:", parseError);
                    this.setStatusMessage("Invalid JSON file");
                    return null;
                }
            } catch (error) {
                console.error("Failed to load file:", error);
                this.setStatusMessage("Failed to load file");
                return null;
            }
        },
        async saveHistory() {
            await this.db.set('history', this.history)
            this.setStatusMessage("Saved History");
        },
        async clearHistory() {
            this.history = []
            await this.db.set('history', this.history)
            this.setStatusMessage("Cleared History");
        },
        async generatePhoto(payload) {
            console.log("Sending payload:", payload);
            this.processing_request = true

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

            try {
                const response = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    signal: controller.signal,
                });

                clearTimeout(timeout);

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                console.log(data)

                const base64Image = `data:image/png;base64,${data.images[0]}`;
                document.getElementById('resultImage').classList.remove('hidden');
                document.getElementById("resultImage").src = base64Image;
                this.processing_request = false

                await writeTextFile('avatar.png', base64Image, {
                    baseDir: BaseDirectory.AppData,
                });

            } catch (err) {
                if (err.name === 'AbortError') {
                    console.error("❌ Request timed out");
                } else {
                    console.error("❌ Error generating image:", err.message);
                }
            }
        },
    }
});