import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGear);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
