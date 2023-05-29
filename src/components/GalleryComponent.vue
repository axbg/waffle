<script setup>
import { onMounted, ref } from "vue";
import arrayShuffle from "array-shuffle";

const props = defineProps({
  inputImages: {
    type: Array,
    default() {
      return [];
    },
  },
});

const images = ref([]);

const emit = defineEmits(["selected-data-source"]);

const removeImage = (index) => {
  if (confirm("Do you want to remove the selected image?")) {
    images.value = images.value.filter((image) => image.name !== index);
  }
};

const shuffleImages = () => {
  images.value = arrayShuffle(images.value);
};

const loadOtherSource = () => {
  if (
    confirm("Are you sure you want to load pictures from another data source?")
  ) {
    localStorage.removeItem("dataSource");
    location.reload();
  }
};

const raffle = () => {
  if (confirm("Are you sure you want to start the raffle?")) {
    emit("selected-data-source", images.value);
  }
};

onMounted(() => {
  images.value = props.inputImages;
});
</script>

<template>
  <div class="gallery-container">
    <div class="gallery">
      <div
        v-for="index in images"
        :key="index.name"
        class="image-holder"
        @click="removeImage(index.name)"
      >
        <img class="image" :title="index.name" :src="index.data" />
      </div>
    </div>
    <p>Loaded {{ images.length }} pictures</p>
    <button class="material-button" @click="shuffleImages">
      Shuffle selection
    </button>
    <button class="material-button" @click="loadOtherSource">
      Load other images
    </button>
    <button class="material-button separate-row-bigger" @click="raffle">
      Raffle!
    </button>
  </div>
</template>

<style scoped>
.gallery-container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.gallery {
  height: 55vh;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 5px;
  column-gap: 5px;

  overflow-y: auto;
  overflow-x: hidden;
}
.image-holder {
  cursor: not-allowed;
  transition: all 0.5s ease-in-out;
}
.image-holder:hover {
  transform: scale(1.1);
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
