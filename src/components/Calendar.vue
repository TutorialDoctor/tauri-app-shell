<script setup>
import { ref,computed } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();

const props = defineProps({
    data: Object
});

const message = ref('Saved');
const currentTitle = ref('Title')
const currentTime = ref('Title')

const fullDate = ref({})

const currentDate = ref(new Date())

    // < !-- const currentDate = ref(document.getElementById("date").valueAsDate = new Date())
const selectedDate = ref(null)
const events = ref([
    { id: 1, date: '2024-09-20', title: 'Start Working on Apps', time: '10:00 PM' },
    { id: 2, date: '2024-09-15', title: 'Project Deadline', time: '11:59 PM' },
    { id: 3, date: '2024-09-21', title: 'Pitch Meeting', time: '2:00 PM' },
    { id: 4, date: '2024-10-03', title: 'Client Appointment', time: '9:00 AM' },
    { id: 5, date: '2024-11-13', title: 'Client Appointment', time: '7:00 PM' },
])

function timeWithMeridian() {
    const [h, m] = document.getElementById('time').value.split(":");
    const hour12 = h % 12 || 12; // Handle midnight (0) as 12
    const meridian = h >= 12 ? 'PM' : 'AM';
    fullDate.value.time = `${hour12}:${m} ${meridian}`;
}


function setTime() {
    timeWithMeridian()
}

function go() {
    fullDate.value.id = events.value.length + 1
    events.value.push(fullDate.value)
}


const currentMonthYear = computed(() => {
    return currentDate.value.toLocaleDateString('default', { month: 'long', year: 'numeric' });
})

const weekDays = computed(() => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
})

const daysInMonth = computed(() => {
    const days = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
})

const paddingDays = computed(() => {
    const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).getDay();
    return Array.from({ length: firstDayOfMonth });
})

const selectedEvents = computed(() => {
    if (!selectedDate.value) return [];
    return events.value.filter((event) => event.date === selectedDate.value);
})




function nextMonth() {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1);
    currentDate.value = new Date(currentDate.value);
}
function previousMonth() {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1);
    currentDate.value = new Date(currentDate.value);
}
function selectDate(day) {
    const month = currentDate.value.getMonth() + 1;
    const year = currentDate.value.getFullYear();
    selectedDate.value = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
function hasEvent(day) {
    const month = currentDate.value.getMonth() + 1;
    const year = currentDate.value.getFullYear();
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.value.some((event) => event.date === date);
}

</script>

<template>
    <div class="mt-4">

        <div class="flex p-8 container mx-auto">
        <!-- CALENDAR -->
        <div class="w-full border-r px-4">
            <!-- Calendar Header -->
            <div class="flex justify-between items-center mb-4">
                <button @click="previousMonth" class="px-3 py-1 bg-black text-white rounded">Previous</button>
                <h2 class="text-xl font-bold">{{ currentMonthYear }}</h2>
                <button @click="nextMonth" class="px-3 py-1 bg-black text-white rounded">Next</button>
            </div>


            <div class="grid grid-cols-7 gap-2">
                <div v-for="day in weekDays" :key="day" class="text-center font-bold">
                    {{ day }}
                </div>

                <div v-for="day in paddingDays" :key="'p'+day" class="text-center bg-gray-100 h-12"></div>

                <div v-for="day in daysInMonth" :key="day"
                    class="text-center bg-gray-200/5 p-2 h-32 relative cursor-pointer hover:bg-gray-700/5"
                    @click="selectDate(day)">
                    <span class="absolute top-2 left-2 font-bold">{{ day }}</span>

                    <!-- Check for Events -->
                    <div v-if="hasEvent(day)" class="absolute bottom-2 right-2 bg-green-500 rounded-full w-3 h-3"></div>
                </div>
            </div>

            <div v-if="selectedEvents.length" class="mt-4">
                <h3 class="text-xl font-bold">Events for {{ selectedDate }}</h3>
                <ul>
                    <li v-for="event in selectedEvents" :key="event.id" class="flex justify-between p-2 bg-gray-700/5 mt-2 rounded shadow">
                        <div>{{ event.title }} at {{ event.time }}</div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                              </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- /CALENDAR -->
        <aside class="w-1/3 px-4">
            <p>Scheduling Form</p>
            <form @submit.prevent="go()" class="mt-4 space-y-4">
                <!-- {{fullDate}} -->
                <div>
                    <label for="date" class="font-normal">Date</label>
                    <input name="date" v-model="fullDate.date" type="date" pattern="\d{4}-\d{2}-\d{2}"
                        class="mt-2 px-4 w-full bg-gray-100 rounded-lg h-8">
                    <!-- <p class="text-black">{{currentDate}}</p> -->
                </div>
                <div>
                    <label for="time" class="font-normal">Time</label><br>
                    <input id="time" name="time" type="time" @change="setTime()"
                        class="mt-2 px-4 w-full bg-gray-100 rounded-lg h-8">
                    <!-- <p class="text-black">{{currentTime}}</p> -->
                </div>
                <div>
                    <label for="title" class="font-normal">Title</label>
                    <input name="title" v-model="fullDate.title" class="w-full mt-2 px-4 bg-gray-100 rounded-lg h-8">
                    <!-- <p class="text-black">{{currentTitle}}</p> -->
                </div>
                <input type="Submit" class="bg-black text-white w-full p-2 rounded-md" />
            </form>
            <div>  
                <div class="text-xs text-gray-800 border border-gray-400 bg-gray-50 mt-4 shadow rounded-lg"
                    v-for="event in events">
                    <div class="px-3 py-2 flex justify-between border-b border-gray-400">
                        <p>{{event.title}}</p>
                        <p>{{event.time}}</p>
                    </div>

                    <p class="font-semibold px-3 py-2 rounded-b-lg bg-gray-100">{{event.date}}</p>

                </div>
            </div>
        </aside>
    </div>


    </div>
</template>