<script setup>
import { ref } from "vue";
import { Modal } from "usemodal-vue3";

const visibleModal = ref(false);

const toggleControlModal = () => {
  visibleModal.value = !visibleModal.value;
};
</script>

<template>
  <div class="control-button" @click="toggleControlModal">
    <font-awesome-icon icon="gear" size="xl" />
  </div>
  <Modal v-model:visible="visibleModal" title="Control Options">
    <div>fancy Control modal</div>
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
</style>
