import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createI18n } from "vue-i18n";
import esTranslation from "../locales/es/translation.json";
import ruTranslation from "../locales/ru/translation.json";

const savedLanguage = localStorage.getItem("selectedLanguage") || "es";

const i18n = createI18n({
  locale: savedLanguage,
  legacy: false,
  fallbackLocale: "es",
  messages: {
    es: esTranslation,
    ru: ruTranslation,
  },
});

export default i18n;


const app = createApp(App)
app.use(i18n)
app.mount('#app')