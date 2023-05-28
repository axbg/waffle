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
});

const emit = defineEmits(["reload-settings"]);

const visibleModal = ref(false);
const companyLogoField = ref("");
const eventLogoField = ref("");

const toggleControlModal = () => {
  const visibleState = !visibleModal.value;

  if (visibleState) {
    companyLogoField.value = props.companyLogo;
    eventLogoField.value = props.eventLogo;
  }

  visibleModal.value = visibleState;
};

const updateSettings = () => {
  emit("reload-settings", companyLogoField.value, eventLogoField.value);
  toggleControlModal();
};
</script>

<template>
  <div class="control-button" @click="toggleControlModal">
    <font-awesome-icon icon="gear" size="xl" />
  </div>
  <Modal v-model:visible="visibleModal" title="Control Options">
    <div class="control-content">
      <label>Company Logo URL</label>
      <input v-model="companyLogoField" type="text" />
      <label>Event Logo URL</label>
      <input v-model="eventLogoField" type="text" />
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
