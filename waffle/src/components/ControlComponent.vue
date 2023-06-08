<script setup>
import { ref } from "vue";
import { Modal } from "usemodal-vue3";

const props = defineProps({
  companyLogo: {
    type: String,
    default: "",
  },
  eventLogo: {
    type: String,
    default: "",
  },
  accentColor: {
    type: String,
    default: "",
  },
  timeoutUpperLimit: {
    type: Number,
    default: 600,
  },
  timeoutLowerLimit: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(["reload-settings"]);

const visibleModal = ref(false);
const companyLogoField = ref("");
const eventLogoField = ref("");
const accentColorField = ref("");
const timeoutUpperLimitField = ref(0);
const timeoutLowerLimitField = ref(0);

const toggleControlModal = () => {
  const visibleState = !visibleModal.value;

  if (visibleState) {
    companyLogoField.value = props.companyLogo;
    eventLogoField.value = props.eventLogo;
    accentColorField.value = props.accentColor;
    timeoutUpperLimitField.value = props.timeoutUpperLimit;
    timeoutLowerLimitField.value = props.timeoutLowerLimit;
  }

  visibleModal.value = visibleState;
};

const updateSettings = () => {
  emit(
    "reload-settings",
    companyLogoField.value,
    eventLogoField.value,
    accentColorField.value,
    timeoutUpperLimitField.value,
    timeoutLowerLimitField.value
  );
  toggleControlModal();
};
</script>

<template>
  <div class="control-button" @click="toggleControlModal">
    <font-awesome-icon icon="gear" size="xl" />
  </div>
  <Modal v-model:visible="visibleModal" title="Control Options">
    <div class="control-content">
      <label>Company logo URL</label>
      <input v-model="companyLogoField" type="text" />

      <label>Event logo URL</label>
      <input v-model="eventLogoField" type="text" />

      <label>Main accent color</label>
      <input v-model="accentColorField" type="text" />

      <label>Minimum raffle speed</label>
      <input
        v-model="timeoutUpperLimitField"
        type="number"
        min="600"
        max="1000"
      />

      <label>Maximum raffle speed</label>
      <input v-model="timeoutLowerLimitField" type="number" min="1" max="599" />

      <button class="material-button" @click="updateSettings">Save</button>
    </div>
  </Modal>
</template>

<style scoped>
.control-button {
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 30px;
}
.control-content {
  width: 100%;
  text-align: center;
}
.control-content * {
  display: block;
  margin: 0 auto;
  width: 80%;
  margin-top: 1vh;
}
.control-content label {
  text-align: left;
  margin-top: 3vh;
}
.control-content input {
  padding: 5px;
}
.control-content button {
  margin-top: 3vh;
  width: 50%;
}
</style>
