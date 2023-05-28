<script setup>
import HeaderComponent from './HeaderComponent.vue';
import LandingComponent from './LandingComponent.vue';
import GalleryComponent from './GalleryComponent.vue';
import RaffleComponent from './RaffleComponent.vue';
import axios from 'axios';

import { reactive } from 'vue';

const state = reactive({
  showLanding: true,
  showGallery: false,
  showRaffle: false,
  dataSource: "",
  images: []
});

const loadedDataSource = async (dataSource) => {
  try {
    state.dataSource = dataSource;

    const response = await axios.get(dataSource);
    state.images = response.data.files.filter(file => file.root === '/').map(file => file.base);

    state.showLanding = false;
    state.showGallery = true;
  } catch (err) {
    alert("There was an error loading the resource. Please try again.");
    console.log(err);
    localStorage.removeItem("dataSource");
  }
}

const selectedDataSource = (images) => {
  state.images = images;

  state.showGallery = false;
  state.showRaffle = true;
}
</script>

<template>
  <div class="shell-container">
    <HeaderComponent />
    <div class="content-container">
      <LandingComponent v-if="state.showLanding" @loadedDataSource="loadedDataSource"/>
      <GalleryComponent v-if="state.showGallery" @selectedDataSource="selectedDataSource" :dataSource="state.dataSource" :images="state.images"/>
      <RaffleComponent v-if="state.showRaffle" defaultTimeoutUpperLimit="600" defaultTimeoutLowerLimit="100" :dataSource="state.dataSource" :images="state.images"/>
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