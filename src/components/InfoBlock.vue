<template>
  <div
    id="products"
    ref="infoRef"
    :class="[
      'py-10 md:py-15 scroll-animate-stagger',
      isInfoVisible ? 'animate-in' : '',
      className,
    ]"
  >
    <div class="container flex flex-col gap-8">
      <h2 class="text-center">{{ t(title) }}</h2>

      <div class="hidden md:flex gap-4 w-full">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="handleTabClick(tab.id)"
          :class="['card w-full', activeTab.id === tab.id ? 'active' : '']"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="md:hidden relative" ref="dropdownRef">
        <button
          @click="handleDropdownToggle"
          :class="[
            'card w-full',
            activeTab.id === activeTab.id ? 'active' : '',
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="flex-1 text-center">{{ activeTab.label }}</span>
            <img
              src="/img/arrow.svg"
              :class="[
                'w-6 h-6 transition-transform duration-600',
                isDropdownOpen ? 'rotate-180' : '',
              ]"
              alt="arrow"
              loading="lazy"
            />
          </div>
        </button>

        <div
          :class="[
            'absolute top-full left-0 mt-2 w-full bg-[#0D0D0D] border border-[#332B40] rounded-[10px] shadow-lg z-20 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
            isDropdownOpen
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform -translate-y-2 pointer-events-none',
          ]"
        >
          <div
            v-for="tab in tabs.filter((t) => t.id !== activeTab.id)"
            :key="tab.id"
            @click="handleTabClick(tab.id)"
            class="block w-full px-4 py-3 text-left hover:text-white transition-colors text-[#9F9BA5] border-b border-[#332B40] last:border-b-0 cursor-pointer"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>

      <div
        v-if="currentInfo"
        class="grid md:grid-cols-[40%_60%] gap-14 md:gap-18 items-start overflow-hidden"
      >
        <div
          :key="activeTab.id"
          class="flex flex-col gap-4 tab-content-animate p-2"
        >
          <img
            :src="activeTab.icon"
            class="w-15 h-15"
            loading="lazy"
            :alt="activeTab.label"
          />
          <h3 class="tab-title">{{ activeTab.label }}</h3>
          <h4 class="tab-subtitle">{{ currentInfo.title }}</h4>
          <div class="tab-text">
            <div
              v-if="Array.isArray(currentInfo.text)"
              v-for="(textItem, index) in currentInfo.text"
              :key="index"
              class="flex items-center gap-2 mb-2"
            >
              <img
                src="/img/check.svg"
                class="w-4 h-4"
                loading="lazy"
                alt="check"
              />
              <span>{{ textItem }}</span>
            </div>
            <span v-else>{{ currentInfo.text }}</span>
          </div>
          <button class="w-1/2 mt-6">
            <a href="https://one-click.app/register">
              {{ t("common.register") }}
            </a>
          </button>
        </div>
        <div>
          <img
            v-if="!info.videos?.length"
            :src="info.image"
            class="md:w-full md:h-full md:max-w-[550px] max-w-[300px] rounded-[10px]"
            loading="lazy"
            :alt="info.title"
          />
          <VideoBlock v-else :info="info" class="md:mt-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";
import VideoBlock from "./VideoBlock.vue";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const [infoRef, isInfoVisible] = useScrollAnimation(0.1, "-50px");
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const tabs = computed(() => [
  {
    id: "possibilities",
    label: t("infoBlock.possibilities"),
    icon: "/img/possibilities.png",
  },
  { id: "features", label: t("menu.features"), icon: "/img/features.png" },
  { id: "for", label: t("infoBlock.for"), icon: "/img/for.png" },
]);

const activeTab = ref(tabs.value[0]);

const handleTabClick = (tabId) => {
  activeTab.value = tabs.value.find((tab) => tab.id === tabId);
  isDropdownOpen.value = false;
};

const handleDropdownToggle = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

const currentInfo = computed(() => props.info?.[activeTab.value.id]);

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
  activeTab.value =
    tabs.value.find((tab) => tab.id === activeTab.value.id) || tabs.value[0];
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
