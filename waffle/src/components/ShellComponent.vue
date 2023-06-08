<script setup>
import HeaderComponent from "./HeaderComponent.vue";
import LandingComponent from "./LandingComponent.vue";
import GalleryComponent from "./GalleryComponent.vue";
import RaffleComponent from "./RaffleComponent.vue";
import ControlComponent from "./ControlComponent.vue";
import FooterComponent from "./FooterComponent.vue";
import LoginComponent from "./LoginComponent.vue";

import axios from "axios";
import { reactive, onMounted } from "vue";

const allowedExtensions = ["jpg", "jpeg", "png"];
const logoPlaceholder = "logo-placeholder.png";
const defaultColor = "#bd00ff";
const defaultTimeoutUpperLimit = 600;
const defaultTimeoutLowerLimit = 100;
const requireAuthentication = !!import.meta.env.VITE_REQUIRE_AUTHENTICATION;

const state = reactive({
  showLanding: false,
  showLogin: false,
  showGallery: false,
  showRaffle: false,
  dataSource: "",
  images: [],
  companyLogo: "",
  eventLogo: "",
  accentColor: "",
  timeoutUpperLimit: defaultTimeoutUpperLimit,
  timeoutLowerLimit: defaultTimeoutLowerLimit,
});

const loadedLocalSource = (files) => {
  state.showLanding = false;
  state.showGallery = true;

  for (const file of files) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (ev) => {
      state.images.push({ name: file.name, data: ev.target.result });
    };
  }
};

const loadedRemoteSource = async (dataSource, storeValue = true) => {
  try {
    state.dataSource = dataSource;

    const response = await axios.get(dataSource);
    state.images = response.data
      .filter((file) => allowedExtensions.some((ext) => file.includes(ext)))
      .map((file) => {
        return { name: file, data: state.dataSource + "/" + file };
      });

    state.showLanding = false;
    state.showLogin = false;
    state.showGallery = true;

    if (storeValue) {
      localStorage.setItem("dataSource", dataSource);
    }
  } catch (err) {
    localStorage.removeItem("dataSource");
    alert("There was an error loading the resource. Please try again.");
    console.log(err);
    showFirstPage();
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

const reloadSettings = (
  newCompanyLogo,
  newEventLogo,
  newAccentColor,
  newTimeoutUpperLimit,
  newTimeoutLowerLimit
) => {
  state.companyLogo = newCompanyLogo || logoPlaceholder;
  state.eventLogo = newEventLogo || logoPlaceholder;
  state.accentColor = newAccentColor || defaultColor;
  state.timeoutUpperLimit = Number.isInteger(newTimeoutUpperLimit)
    ? newTimeoutUpperLimit
    : defaultTimeoutUpperLimit;
  state.timeoutLowerLimit = Number.isInteger(newTimeoutLowerLimit)
    ? newTimeoutLowerLimit
    : defaultTimeoutLowerLimit;

  localStorage.setItem("companyLogo", state.companyLogo);
  localStorage.setItem("eventLogo", state.eventLogo);
  localStorage.setItem("timeoutUpperLimit", state.timeoutUpperLimit);
  localStorage.setItem("timeoutLowerLimit", state.timeoutLowerLimit);
  localStorage.setItem("accentColor", state.accentColor);

  document.documentElement.style.setProperty(
    "--accent-color",
    state.accentColor
  );
};

const showFirstPage = () => {
  if (requireAuthentication) {
    state.showLogin = true;
  } else {
    state.showLanding = true;
  }
};

onMounted(() => {
  const dataSource = localStorage.getItem("dataSource");
  if (dataSource) {
    loadedRemoteSource(dataSource, false);
  } else {
    showFirstPage();
  }

  reloadSettings(
    localStorage.getItem("companyLogo"),
    localStorage.getItem("eventLogo"),
    localStorage.getItem("accentColor"),
    localStorage.getItem("timeoutUpperLimit"),
    localStorage.getItem("timeoutLowerLimit")
  );
});
</script>

<template>
  <div class="shell-container">
    <ControlComponent
      :company-logo="state.companyLogo"
      :event-logo="state.eventLogo"
      :accent-color="state.accentColor"
      :timeout-upper-limit="state.timeoutUpperLimit"
      :timeout-lower-limit="state.timeoutLowerLimit"
      @reload-settings="reloadSettings"
    />
    <HeaderComponent
      :company-logo="state.companyLogo"
      :event-logo="state.eventLogo"
    />
    <div class="content-container">
      <LoginComponent
        v-if="state.showLogin"
        @loaded-data-source="loadedRemoteSource"
      />
      <LandingComponent
        v-if="state.showLanding"
        @loaded-local-source="loadedLocalSource"
        @loaded-data-source="loadedRemoteSource"
      />
      <GalleryComponent
        v-if="state.showGallery"
        :input-images="state.images"
        @selected-data-source="selectedDataSource"
      />
      <RaffleComponent
        v-if="state.showRaffle"
        :timeout-upper-limit="state.timeoutUpperLimit"
        :timeout-lower-limit="state.timeoutLowerLimit"
        :input-images="state.images"
        @show-gallery="showGallery"
      />
      <FooterComponent />
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
