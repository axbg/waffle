<script setup>
import { ref } from "vue";
import axios from "axios";

const LOGIN_PATH = import.meta.env.VITE_LOGIN_PATH || "/login";

const emit = defineEmits(["loaded-data-source"]);

const usernameInput = ref("");
const passwordInput = ref("");

const login = async () => {
  try {
    const response = await axios.post(LOGIN_PATH, {
      username: usernameInput.value,
      password: passwordInput.value,
    });

    emit("loaded-data-source", response.data.path);
  } catch (err) {
    alert("Invalid credentials. Please try again.");
  }
};
</script>

<template>
  <div class="landing-container">
    <div class="landing-section">
      <input
        v-model="usernameInput"
        class="landing-input"
        type="text"
        placeholder="Username"
      />
      <input
        v-model="passwordInput"
        class="landing-input"
        type="password"
        placeholder="Password"
        @keyup.enter="login"
      />
      <button class="material-button landing-button" @click="login">
        Login
      </button>
    </div>
  </div>
</template>
