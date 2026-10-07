<script setup>
import { ref, onMounted } from "vue";
const audioPlayer = ref(null);
const progressWidth = ref(0);

function handleTimeUpdate() {
    if (audioPlayer.value && audioPlayer.value.duration) {
        progressWidth.value = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
    }
}
function playMusic() {
  audioPlayer.value.play();
}

function playSound(snd) {
    const player = document.getElementById('audio-player');
    player.src = `/${snd}`
    player.play();
}


// onMounted(() => {
//   setupAudio();
// });
</script>

<template>
  <div>
    <!-- Use the converted audioSrc -->
    <audio id="audio-player" ref="audioPlayer" class="hidden" :src="audioSrc" @timeupdate="handleTimeUpdate"></audio>
    
    <!-- Rest of your UI remains the same -->
    <section class="mt-8 rounded-2xl p-4 bg-zinc-200 container w-1/2 mx-auto">
      <div class="mt-2 w-full hp_slide bg-zinc-800 h-[5px]">
        <div class="hp_range bg-red-500 h-[5px]" :style="{ width: progressWidth + '%' }"></div>
      </div>
      <button class="mt-4 bg-black px-4 py-2 rounded-lg text-white" @click="playMusic();playSound('music.mp3')">Play</button>
    </section>
  </div>
</template>