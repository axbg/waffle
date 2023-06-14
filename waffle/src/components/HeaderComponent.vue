<script setup>
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
</script>

<template>
  <div class="header-container">
    <img :src="props.companyLogo" class="logo" />
    <img :src="props.eventLogo" class="logo" />
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-evenly;
  padding: 2rem;
}
.logo {
  width: 30vw;
  max-width: 250px;
  max-height: 10vh;
  object-fit: contain;
}
</style>
