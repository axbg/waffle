<script setup>
import HeaderComponent from './HeaderComponent.vue';
import LandingComponent from './LandingComponent.vue';
import GalleryComponent from './GalleryComponent.vue';
import RaffleComponent from './RaffleComponent.vue';

import axios from 'axios';
import { reactive, onMounted } from 'vue';

const allowedExtensions = ['jpg', 'jpeg', 'png'];

const state = reactive({
  showLanding: false,
  showGallery: false,
  showRaffle: false,
  dataSource: "",
  images: []
});

const loadedDataSource = async (dataSource, storeValue = true) => {
  try {
    state.dataSource = dataSource;

    const response = await axios.get(dataSource);
    state.images = response.data.files
      .filter(file => allowedExtensions.includes(file.ext))
      .map(file => file.base);
    
    state.showLanding = false;
    state.showGallery = true;

    if(storeValue) {
      localStorage.setItem("dataSource", dataSource);
    }
  } catch (err) {
    localStorage.removeItem("dataSource");
    alert("There was an error loading the resource. Please try again.");
    console.log(err);
    state.showLanding = true;
  }
}

const selectedDataSource = (images) => {
  state.images = images;

  state.showGallery = false;
  state.showRaffle = true;
}

const showGallery = () => {
  state.showGallery = true;
  state.showRaffle = false;
}

onMounted(() => {
    const dataSource = localStorage.getItem("dataSource");
    if(dataSource) {
        loadedDataSource(dataSource, false);
    } else {
      state.showLanding = true;
    }
});
</script>

<template>
  <div class="shell-container">
    <HeaderComponent />
    <div class="content-container">
      <LandingComponent v-if="state.showLanding" @loadedDataSource="loadedDataSource"/>
      <GalleryComponent v-if="state.showGallery" @selectedDataSource="selectedDataSource" :dataSource="state.dataSource" :images="state.images"/>
      <RaffleComponent v-if="state.showRaffle" @showGallery="showGallery" defaultTimeoutUpperLimit="600" defaultTimeoutLowerLimit="100" :dataSource="state.dataSource" :images="state.images"/>
    </div>
  </div>

</template>

<style scoped>
.shell-container {
  width: 100%;
}
.content-container {
  width: 100%;
}
</style>