<template>
  <div
    ref="headerRef"
    :class="[
      'header flex justify-between items-center bg-[#0D0D0D] border border-[#332B40] rounded-[10px] fixed top-4 left-1/2 -translate-x-1/2 z-10 scroll-animate px-4 py-4 max-w-[1200px] w-[calc(100%-32px)]',
      isHeaderVisible ? 'animate-in' : '',
      className,
    ]"
  >
    <div>
      <img src="/img/logo.webp" class="w-25 md:w-30" alt="Logo" />
    </div>

    <div class="hidden lg:flex gap-4">
      <template v-for="item in menuItems" :key="item.key">
        <a
          :href="item.href"
          class="text-[#9F9BA5] transition-colors"
          @click="isMobileMenuOpen = false"
        >
          {{ item.key }}
        </a>
      </template>
    </div>

    <div
      :class="[
        'absolute top-full left-0 right-0 mt-2 bg-[#9560EB] rounded-[10px] px-5 py-14 lg:hidden transition-all duration-300 ease-in-out transform',
        isMobileMenuOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none',
      ]"
    >
      <button
        class="w-[40px] h-[40px] bg-[url(\'/img/close.svg\')] bg-center bg-no-repeat"
        style="position: absolute; top: 10px; right: 10px"
        @click="toggleMobileMenu"
      />
      <div class="flex flex-col gap-3">
        <template v-for="item in menuItems" :key="item.key">
          <a
            :href="item.href"
            class="font-bold text-white text-2xl"
            @click="isMobileMenuOpen = false"
          >
            {{ item.key }}
          </a>
        </template>
        <div class="mt-8">
          {{ t("header.feedback") }}:
          <p class="text-xl font-bold text-white">info@one-click.app</p>
        </div>
      </div>
    </div>

    <div class="flex gap-4 items-center">
      <a href="https://one-click.app/register" class="text-[#9F9BA5]">
        {{ t("header.login") }}
      </a>
      <div class="relative" ref="languageMenuRef">
        <a
          href="#"
          class="text-[#9F9BA5]"
          @click.prevent="isLanguageMenuOpen = !isLanguageMenuOpen"
        >
          {{ currentLanguage }}
        </a>

        <div
          v-if="isLanguageMenuOpen"
          class="absolute left-[-20px] mt-2 w-15 bg-[#0D0D0D] border border-[#332B40] rounded-[10px] shadow-lg z-20"
        >
          <template v-for="lang in languages" :key="lang.code">
            <a
              href="#"
              @click.prevent="handleLanguageChange(lang.code)"
              :class="[
                'block px-4 py-2 hover:text-white transition-colors text-[#9F9BA5]',
                currentLanguage === lang.code ? 'text-white' : '',
              ]"
            >
              {{ lang.code }}
            </a>
          </template>
        </div>
      </div>
      <div
        @click="toggleMobileMenu"
        class="lg:hidden cursor-pointer"
        aria-label="Toggle mobile menu"
      >
        <img src="/img/menu.svg" class="w-8 h-6" alt="Menu" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { t, locale } = useI18n();
const [headerRef, isHeaderVisible] = useScrollAnimation(0.1, "-50px");

const isLanguageMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const languageMenuRef = ref(null);

const currentLanguage = ref(() => {
  return localStorage.getItem("selectedLanguage")?.toUpperCase() || "ES";
});

const menuItems = computed(() => [
  { href: "#products", key: t("menu.products") },
  { href: "#features", key: t("menu.features") },
  { href: "#tariffs", key: t("menu.tariffs") },
  { href: "#contacts", key: t("menu.contacts") },
]);

const languages = [
  { code: "ES", name: "Español" },
  { code: "RU", name: "Русский" },
];

const handleClickOutside = (event) => {
  if (languageMenuRef.value && !languageMenuRef.value.contains(event.target)) {
    isLanguageMenuOpen.value = false;
  }
};

const handleLanguageChange = (language) => {
  currentLanguage.value = language;
  isLanguageMenuOpen.value = false;
  locale.value = language.toLowerCase();
  localStorage.setItem("selectedLanguage", language.toLowerCase());
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
  const currentI18nLang = locale.value.toUpperCase();
  currentLanguage.value = currentI18nLang;
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
