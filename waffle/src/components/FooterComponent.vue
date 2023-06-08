<script setup></script>

<template>
  <svg class="svg-container" viewBox="0 0 10 1">
    <polygon points="-1,1 0,0 4,1 6,1 9,0 11,1 20,1"></polygon>
  </svg>
  <div class="footer-text-container">
    <a href="https://github.com/axbg/waffle" target="_blank">
      <p>made with ♡</p></a
    >
  </div>
</template>

<style scoped>
.svg-container {
  display: block;
  position: absolute;
  bottom: 0;
  z-index: -2;
}
.svg-container > polygon {
  fill: var(--accent-color);
}
.footer-text-container {
  background-color: var(--accent-color);
  padding-bottom: 1vh;
  padding-top: 1vh;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: -1;
}
.footer-text-container p {
  color: var(--second-color-text);
  width: 100%;
  margin: 0;
  text-align: center;
}
.footer-text-container a {
  text-decoration: none;
}
</style>
