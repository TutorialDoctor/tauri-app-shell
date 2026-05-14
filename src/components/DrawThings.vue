<script setup>
import { ref } from "vue";
import { dataStore } from "../stores/store";
const store = dataStore();
import Navigation from "../components/partials/Navigation.vue";

// {"sharpness":0,"controls":[],"faceRestoration":"","originalImageHeight":960,"tiledDecoding":false,"steps":12,"targetImageWidth":1728,"hiresFix":false,"targetImageHeight":960,"aestheticScore":6,"maskBlurOutset":0,"refinerModel":"","cropLeft":0,"originalImageWidth":1728,"seedMode":2,"loras":[],"cfgZeroInitSteps":0,"zeroNegativePrompt":false,"negativeAestheticScore":2.5,"strength":1,"height":960,"upscaler":"","clipSkip":2,"cropTop":0,"cfgZeroStar":false,"seed":149156595,"tiledDiffusion":false,"preserveOriginalAfterInpaint":true,"model":"dreamshaper_xl_v2.1_turbo_f16.ckpt","maskBlur":1.5,"sampler":10,"causalInferencePad":0,"batchCount":1,"batchSize":1,"shift":1,"width":1728,"guidanceScale":1,"negativeOriginalImageHeight":512,"negativeOriginalImageWidth":832}

let payload = ref({
    prompt: "photo of an apple with depth of field blurred background",
    negative_prompt: "cartoon, cgi, 3d render, blurry",
    seed: Math.floor(Math.random() * 100000000),
    steps: 12,
    model: "DreamShaper XL v2.1 Turbo (8-bit)",
    guidance_scale: 6,
    batch_count: 1,
    width: 768,
    height: 768
})

function send() {
    store.generatePhoto(payload.value)
}


</script>

<template>
    <div class="p-8">
        <!-- Form -->
        <div id="form" class="p-4 rounded-lg border border-gray-300 shadow-md">
            <p class="text-xs font-light font-semibold">Draw Things</p>
            <p class="mt-1 text-gray-500 dark:text-gray-200" style="font-size: 0.7rem;">Enter your settings below.</p>
            <div class="mt-4 grid gap-y-4">
                
                <img id="resultImage" src="" />

                <div class="flex justify-between items-center">
                    <div class="w-full">
                        <p class="text-xs">Prompt</p>
                        <p class="hidden text-gray-500 dark:text-gray-900" style="font-size: 0.6rem;">These cookies are essential in order
                            to use the website and it's features</p>
                            <input v-model="payload.prompt"
                            class="mt-2 text-xs border border-gray-300 px-4 py-2 dark:bg-gray-900 rounded-lg w-full"
                            placeholder="Enter your name">
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="w-full">
                        <p class="text-xs">Negative Prompt</p>
                        <p class="hidden text-gray-500 dark:text-gray-900" style="font-size: 0.6rem;">These cookies are essential in order
                            to use the website and it's features</p>
                            <input v-model="payload.negative_prompt"
                            class="mt-2 text-xs border border-gray-300 px-4 py-2 dark:bg-gray-900 rounded-lg w-full"
                            placeholder="Enter your name">
                    </div>
                </div>
                <div><button class="text-center text-xs bg-black text-white px-4 py-2 rounded-lg w-full" @click="send()">Generate</button></div>
            </div>
        </div>
        <!-- /Form -->

             <Navigation class="mt-8 border p-4 rounded-lg" :items="['one', 'two']" :objectItems="[{ name: 'Joe' }]" />

    </div>
</template>