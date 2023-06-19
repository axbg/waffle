<script setup>
import { computed } from "vue";
import { onMounted, reactive } from "vue";
import { Fireworks } from "@fireworks-js/vue";

const speedUp = (x) =>
  x.timeout > props.timeoutLowerLimit ? x.timeout * 0.9 : x.timeout;
const slowDown = (x) =>
  x.timeout <= props.timeoutUpperLimit ? x.timeout * 1.1 : x.timeout;
const fireworksOptions = {
  decay: {
    min: 0.01,
    max: 0.015,
  },
  traceLength: 1.1,
  acceleration: 1.2,
  explosion: 8,
};

const props = defineProps({
  timeoutUpperLimit: {
    type: Number,
    default: 600,
  },
  timeoutLowerLimit: {
    type: Number,
    default: 100,
  },
  inputImages: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits(["showGallery"]);

const state = reactive({
  image: 0,
  images: [],
  interval: null,
  timeout: props.timeoutUpperLimit,
  currentFormula: speedUp,
  stopEnabled: true,
  restartEnabled: false,
  showFireworks: false,
  showCurrentImage: false,
});

const currentImageName = computed(() => {
  return state.images[state.image].name;
});

const currentImageData = computed(() => {
  return state.images[state.image].data;
});

const moveToNextImage = () => {
  state.image = state.image >= state.images.length - 1 ? 0 : state.image + 1;
};

const runImages = () => {
  moveToNextImage();
  state.timeout = state.currentFormula(state);

  clearInterval(state.interval);

  if (state.timeout <= props.timeoutUpperLimit) {
    state.interval = setInterval(runImages, state.timeout);
  } else {
    setTimeout(() => {
      state.restartEnabled = true;
      state.showFireworks = true;

      setTimeout(() => {
        state.showFireworks = false;
      }, 30000);
    }, 800);
  }
};

const startInterval = () => {
  state.restartEnabled = false;
  state.interval = setInterval(runImages, state.timeout);
};

const stopInterval = () => {
  state.stopEnabled = false;
  state.currentFormula = slowDown;
};

const restartRaffle = () => {
  state.images.splice(state.image, 1);
  moveToNextImage();

  state.timeout = props.timeoutUpperLimit;
  state.currentFormula = speedUp;

  state.showFireworks = false;
  state.stopEnabled = true;
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
  state.showCurrentImage = true;
  startInterval();
});
</script>

<template>
  <div class="image-container">
    <img
      class="responsive-image"
      v-if="state.showCurrentImage"
      :src="currentImageData"
      :title="currentImageName"
    />
    <p>There are {{ state.images.length }} images in the raffle</p>
  </div>
  <div class="control-container">
    <button
      :disabled="!state.stopEnabled"
      class="material-button"
      @click="stopInterval"
    >
      Stop
    </button>
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
  <div v-if="state.showFireworks" class="fireworks-container">
    <Fireworks :options="fireworksOptions" />
  </div>
</template>

<style>
.image-container {
  text-align: center;
  z-index: 4;
}
.responsive-image {
  max-height: 57vh;
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
  height: 100vh;
  z-index: 5;
}
</style>
