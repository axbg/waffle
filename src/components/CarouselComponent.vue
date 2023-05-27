<script setup>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import { Fireworks } from '@fireworks-js/vue';

const image_base = "/unsamples/image-";
const ext = ".jpg"

const speedUp = (x) => x.timeout > props.defaultTimeoutLowerLimit ? x.timeout * 0.9 : x.timeout;
const slowDown = (x) => x.timeout <= props.defaultTimeoutUpperLimit ? x.timeout * 1.1 : x.timeout;

const props = defineProps(['defaultTimeoutUpperLimit', 'defaultTimeoutLowerLimit', 'numberOfImages']);

const state = reactive({
    image: 1, 
    interval: null, 
    timeout: props.defaultTimeoutUpperLimit, 
    currentFormula: speedUp,
    showFireworks: true
});

const computedName = computed(() => {
    return image_base + state.image + ext;
});

const runImages = () => {
    state.image = state.image >= props.numberOfImages ? 1 : state.image + 1;
    state.timeout = state.currentFormula(state);

    clearInterval(state.interval);

    if(state.timeout <= props.defaultTimeoutUpperLimit) {
        state.interval = setInterval(runImages, state.timeout);
    } else {
        state.showFireworks = true;
    }
}

const startInterval = () => {
    state.interval = setInterval(runImages, state.timeout);
};

const stopInterval = () => {
    state.currentFormula = slowDown;
}
</script>

<template>
    <div class="image-container">
        <img :src="computedName" width="1000" height="400">
    </div>
    <div class="control-container">
        <button @click="startInterval">Start</button>
        <button @click="stopInterval">Stop</button>
    </div>
    <div class="fireworks-container">
        <Fireworks v-if="state.showFireworks"/>
    </div>
</template>

<style>
.image-container {
    text-align: center;
}
.control-container {
    margin: 0 auto;
    width: 20%;
    display: flex;
    justify-content: space-between;
}
.control-container button {
    width: 100px;
}
.fireworks-container {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80%;
}
</style>