import { createApp } from "vue";
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'
import App from "./App.vue";
import Home from './pages/Home.vue'
import Settings from './pages/Settings.vue'
import TestPage from './pages/TestPage.vue'
import StyleGuide from './pages/StyleGuide.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Items from './components/Items.vue'
import ItemDetail from './pages/ItemDetail.vue'
import DrawThings from './components/DrawThings.vue'
import Chat from './pages/Chat.vue'
import APi from './pages/API.vue'
import Database from './pages/Database.vue'

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/settings', component: Settings, name: 'Settings' },
    { path: '/test-page', component: TestPage, name: 'testpage' },
    { path: '/style-guide', component: StyleGuide, name: 'Style Guide' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/items', component: Items, name:"items" },
    { name: 'item', path: '/item/:id', component: ItemDetail, props: true },
    { path: '/draw', component: DrawThings, name:"Draw" },
    { path: '/chat', component: Chat, name:"Chat" },
    { path: '/api', component: APi, name:"API" },
    { path: '/database', component: Database, name:"Database" }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount("#app")
