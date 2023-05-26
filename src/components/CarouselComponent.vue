<script setup>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

const image_base = "/unsamples/image-";
const ext = ".jpg"
const state = reactive({image: 1, interval: null});

let dynamicTimeout = 1000;

const computedName = computed(() => {
    return image_base + state.image + ext;
});

const runImages = () => {
    state.image = state.image >= 25 ? 1 : state.image + 1;

    dynamicTimeout = dynamicTimeout > 100 ? dynamicTimeout * 0.9 : dynamicTimeout;

    clearInterval(state.interval);
    state.interval = setInterval(runImages, dynamicTimeout);
}

const startInterval = () => {
    state.interval = setInterval(runImages, dynamicTimeout);
};

const stopInterval = () => {
    clearInterval(state.interval);
}
</script>

<template>
    <div class="image-container">
        <img :src="computedName" width="1000" height="400">
    </div>
    <button @click="startInterval">Start</button>
    <button @click="stopInterval">Stop</button>
</template>

<style>
.image-container {
    display: block;
}
</style>