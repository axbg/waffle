<script setup>
    const image_base = "/unsamples/image-";
    const ext = ".jpg"

    let no_of_images = 25;

    const imageName = (number) => {
        return image_base + number + ext;
    }
</script>

<template>
    <div class="gallery">
        <div v-for="index in no_of_images" :key="index">
            <img :src="imageName(index)" width="100" height="100">
        </div>
    </div>
</template>

<style scoped>
.gallery {
    display: flex;
    flex-wrap: wrap;
}

</style>
