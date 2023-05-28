<script setup>
import { ref } from 'vue'

const emit = defineEmits(['loadedDataSource'])

const inputDataSource = ref("");

const loadDataSource = () => {
    const value = inputDataSource.value;

    if(!value.includes("http")) {
        alert("Inserted value does not include a valid http address");
        return;
    }

    emit('loadedDataSource', value);
}
</script>

<template>
    <div class="landing-container">
        <p class="landing-p">Please insert the URL used as source to load the images that will be included in the raffle</p>
        <input class="landing-input" type="text" placeholder="Insert a valid source for your images" v-model="inputDataSource" v-on:keyup.enter="loadDataSource">
        <button class="material-button landing-button" @click="loadDataSource">Load from remote</button>
    </div>
</template>

<style scoped>
.landing-container {
    width: 500px;
    margin: 0 auto;
    text-align: center;
}
.landing-p {
    width: 100%;
    margin: 0 auto;
}
.landing-input {
    display: block;
    margin: 0 auto;
    width: 90%;
    margin-top: 3vh;
    padding: 10px;
}
.landing-button {
    width: 95%;
    margin-top: 3vh;
}
</style>