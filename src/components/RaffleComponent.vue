<script setup>
import { computed } from "vue";
import { onMounted, reactive } from "vue";
import { Fireworks } from "@fireworks-js/vue";

const speedUp = (x) =>
  x.timeout > props.defaultTimeoutLowerLimit ? x.timeout * 0.9 : x.timeout;
const slowDown = (x) =>
  x.timeout <= props.defaultTimeoutUpperLimit ? x.timeout * 1.1 : x.timeout;

const props = defineProps({
  defaultTimeoutUpperLimit: {
    type: Number,
    default: 600,
  },
  defaultTimeoutLowerLimit: {
    type: Number,
    default: 100,
  },
  dataSource: {
    type: String,
    default: "",
  },
  inputImages: {
    type: Array,
    default() {
      return [];
    },
  },
});

const state = reactive({
  image: 0,
  images: [],
  interval: null,
  timeout: props.defaultTimeoutUpperLimit,
  currentFormula: speedUp,
  restartEnabled: false,
  showFireworks: false,
});

const emit = defineEmits(["showGallery"]);

const currentImage = computed(() => {
  return props.dataSource + "/" + state.images[state.image];
});

const moveToNextImage = () => {
  state.image = state.image >= state.images.length - 1 ? 0 : state.image + 1;
};

const runImages = () => {
  moveToNextImage();
  state.timeout = state.currentFormula(state);

  clearInterval(state.interval);

  if (state.timeout <= props.defaultTimeoutUpperLimit) {
    state.interval = setInterval(runImages, state.timeout);
  } else {
    setTimeout(() => {
      state.restartEnabled = true;
      state.showFireworks = true;
    }, 1000);
  }
};

const startInterval = () => {
  state.restartEnabled = false;
  state.interval = setInterval(runImages, state.timeout);
};

const stopInterval = () => {
  state.currentFormula = slowDown;
};

const restartRaffle = () => {
  state.images.splice(state.image, 1);
  moveToNextImage();

  state.timeout = props.defaultTimeoutUpperLimit;
  state.currentFormula = speedUp;

  startInterval();
};

const showGallery = () => {
  clearInterval(state.interval);

  if (confirm("Do you want to go back to the Gallery?")) {
    emit("showGallery");
  } else {
    startInterval();
  }
};

onMounted(() => {
  state.images = [...props.inputImages];
  startInterval();
});
</script>

<template>
  <div class="image-container">
    <img :src="currentImage" width="1000" height="400" />
    <p>There are {{ state.images.length }} images in the raffle</p>
  </div>
  <div class="control-container">
    <button class="material-button" @click="stopInterval">Stop</button>
    <button
      class="material-button"
      :disabled="!state.restartEnabled"
      @click="restartRaffle"
    >
      Rerun
    </button>
  </div>
  <div class="control-container">
    <button class="material-button separate-row-bigger" @click="showGallery">
      Gallery
    </button>
  </div>
  <!-- <div class="fireworks-container">
        <Fireworks/>
    </div> -->
</template>

<style>
.image-container {
  text-align: center;
  z-index: 4;
}
.control-container {
  margin: 0 auto;
  width: 20%;
  display: flex;
  justify-content: space-between;
}
.control-container button {
  z-index: 100;
  width: 100%;
  margin: 5px;
}
.separater-row-bigger {
  display: block;
  margin: 0 auto;
  width: 380px;
}
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
