<script setup>
import { ref } from "vue";

const allowedExtensions = ".jpg,.jpeg,.png";

const emit = defineEmits(["loaded-data-source", "loaded-local-source"]);

const inputDataSource = ref("");
const inputLocalSource = ref(null);

const triggerLocalLoad = () => {
  inputLocalSource.value.click();
};

const loadLocalSource = (files) => {
  emit("loaded-local-source", files.target.files);
};

const loadDataSource = () => {
  const value = inputDataSource.value;

  if (!value.includes("http")) {
    alert("Inserted value does not include a valid http address");
    return;
  }

  emit("loaded-data-source", value);
};
</script>

<template>
  <div class="landing-container">
    <div class="landing-section">
      <p class="landing-p">
        Please upload the image files that you want to include in the raffle
        from your local drive
      </p>
      <button class="material-button landing-button" @click="triggerLocalLoad">
        Load from local disk
      </button>
      <input
        ref="inputLocalSource"
        type="file"
        class="hidden"
        :accept="allowedExtensions"
        multiple
        @change="loadLocalSource"
      />
    </div>
    <div class="landing-section">
      <p class="landing-p">Or you can insert an URL to load the images</p>
      <input
        v-model="inputDataSource"
        class="landing-input"
        type="text"
        placeholder="Insert a valid source for your images"
        @keyup.enter="loadDataSource"
      />
      <button class="material-button landing-button" @click="loadDataSource">
        Load from remote
      </button>
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  width: 500px;
  margin: 0 auto;
  text-align: center;
}
.landing-section {
  margin-top: 6vh;
}
.landing-p {
  width: 100%;
  margin: 0 auto;
}
.landing-input {
  display: block;
  margin: 0 auto;
  width: 90%;
  margin-top: 1vh;
  padding: 10px;
}
.landing-button {
  width: 95%;
  margin-top: 2vh;
}
.hidden {
  visibility: none;
  height: 0px;
  width: 0px;
}
</style>
