<script setup>
import { onMounted, ref } from 'vue';
import arrayShuffle from 'array-shuffle';

const props = defineProps(['dataSource', 'images']);
const images = ref([]);

const emit = defineEmits(['selectedDataSource'])

const getImage = (image) => {
    return props.dataSource + '/' + image;
}

const shuffleImages = () => {
    images.value = arrayShuffle(images.value);
}

const loadOtherSource = () => {
    if(confirm("Are you sure you want to load pictures from another datasource?")) {
        localStorage.removeItem("dataSource");
        location.reload();
    }
}

const ruffle = () => {
    emit("selectedDataSource", images.value);
}

onMounted(() => {
    images.value = props.images;
})
</script>

<template>
    <div class="gallery-container">
        <div class="gallery">
            <div v-for="index in images" :key="index">
                <img class="image" :src="getImage(index)">
            </div>
        </div>
        <p>Loaded {{images.length}} pictures</p>
        <button class="material-button" @click="shuffleImages">Shuffle selection</button>
        <button class="material-button" @click="loadOtherSource">Load other images</button>
        <button class="material-button separate-row-bigger" @click="ruffle">Ruffle!</button>
    </div>
</template>

<style scoped>
.gallery-container {
    width: 80%;
    margin: 0 auto;
    text-align: center;
}
.gallery {
    height: 60vh;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    row-gap: 5px;
    column-gap: 5px;

    overflow: auto;
}
.image {
    height: 15vh;
}
.separate-row-bigger {
    display: block;
    margin: 0 auto;
    width: 380px;
}
button {
    margin: 10px;
}
</style>
