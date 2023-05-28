<script setup>
import HeaderComponent from "./HeaderComponent.vue";
import LandingComponent from "./LandingComponent.vue";
import GalleryComponent from "./GalleryComponent.vue";
import RaffleComponent from "./RaffleComponent.vue";
import ControlComponent from "./ControlComponent.vue";

import axios from "axios";
import { reactive, onMounted } from "vue";

const allowedExtensions = ["jpg", "jpeg", "png"];

const state = reactive({
  showLanding: false,
  showGallery: false,
  showRaffle: false,
  dataSource: "",
  images: [],
  companyLogo: "",
  eventLogo: "",
});

const loadedDataSource = async (dataSource, storeValue = true) => {
  try {
    state.dataSource = dataSource;

    const response = await axios.get(dataSource);
    state.images = response.data.files
      .filter((file) => allowedExtensions.includes(file.ext))
      .map((file) => file.base);

    state.showLanding = false;
    state.showGallery = true;

    if (storeValue) {
      localStorage.setItem("dataSource", dataSource);
    }
  } catch (err) {
    localStorage.removeItem("dataSource");
    alert("There was an error loading the resource. Please try again.");
    console.log(err);
    state.showLanding = true;
  }
};

const selectedDataSource = (images) => {
  state.images = images;

  state.showGallery = false;
  state.showRaffle = true;
};

const showGallery = () => {
  state.showGallery = true;
  state.showRaffle = false;
};

const reloadSettings = (newCompanyLogo, newEventLogo) => {
  state.companyLogo = newCompanyLogo;
  state.eventLogo = newEventLogo;

  localStorage.setItem("companyLogo", state.companyLogo);
  localStorage.getItem("eventLogo", state.eventLogo);
};

onMounted(() => {
  const dataSource = localStorage.getItem("dataSource");
  if (dataSource) {
    loadedDataSource(dataSource, false);
  } else {
    state.showLanding = true;
  }

  state.companyLogo =
    localStorage.getItem("companyLogo") || "logo-placeholder.png";
  state.eventLogo = localStorage.getItem("eventLogo") || "logo-placeholder.png";
});
</script>

<template>
  <div class="shell-container">
    <ControlComponent
      :company-logo="state.companyLogo"
      :event-logo="state.eventLogo"
      @reload-settings="reloadSettings"
    />
    <HeaderComponent
      :company-logo="state.companyLogo"
      :event-logo="state.eventLogo"
    />
    <div class="content-container">
      <LandingComponent
        v-if="state.showLanding"
        @loaded-data-source="loadedDataSource"
      />
      <GalleryComponent
        v-if="state.showGallery"
        :data-source="state.dataSource"
        :input-images="state.images"
        @selected-data-source="selectedDataSource"
      />
      <RaffleComponent
        v-if="state.showRaffle"
        default-timeout-upper-limit="600"
        default-timeout-lower-limit="100"
        :data-source="state.dataSource"
        :input-images="state.images"
        @show-gallery="showGallery"
      />
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
