<template>
  <div
    id="features"
    ref="featuresRef"
    :class="[
      className,
      'py-7 md:py-10 scroll-animate-stagger',
      isFeaturesVisible ? 'animate-in' : '',
    ]"
  >
    <div class="container">
      <h2 class="text-center mb-8">{{ t("menu.features") }}</h2>
      <div class="features-grid">
        <div
          v-for="(feature, index) in featuresData"
          :key="index"
          :class="[
            'feature-card',
            feature.area,
            'py-8 px-5',
            feature.className || '',
          ]"
        >
          <template v-if="feature.children">
            <component :is="feature.children" />
          </template>
          <template v-else>
            <img
              v-if="feature.image"
              :src="feature.image"
              class="w-15 h-15"
              loading="lazy"
              :alt="feature.title"
            />
            <h4 v-if="feature.title" class="text-left">{{ feature.title }}</h4>
            <p v-if="feature.description" class="text-left">
              {{ feature.description }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const [featuresRef, isFeaturesVisible] = useScrollAnimation(0.1, "-50px");
const videoRef = ref(null);
const isPlaying = ref(false);

const handlePlay = () => {
  if (videoRef.value) {
    videoRef.value.play();
    isPlaying.value = true;
  }
};

const handleVideoClick = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause();
      isPlaying.value = false;
    } else {
      videoRef.value.play();
      isPlaying.value = true;
    }
  }
};

const openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};

const featuresData = computed(() => [
  {
    image: "/img/copy.png",
    title: t("features.allLinks.title"),
    description: t("features.allLinks.description"),
    area: "area-a",
  },
  {
    image: "/img/custom.png",
    title: t("features.fullCustomization.title"),
    description: t("features.fullCustomization.description"),
    area: "area-b",
  },
  {
    area: "area-c",
    className: "relative feature-video overflow-hidden",
    children: {
      template: `
        <div>
          <video
            src="/video/featvideo.webm"
            ref="videoRef"
            class="absolute top-0 left-0 w-full h-full object-cover"
            loop
            playsinline
            muted
            loading="lazy"
            preload="metadata"
            @play="handlePlay"
            @click="handleVideoClick"
          />
          <button
            v-if="!isPlaying"
            class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 !bg-black flex items-center justify-center !rounded-full !border-2 !border-white"
            @click="handlePlay"
          >
            <img
              src="/img/play.svg"
              class="w-10 h-10"
              loading="lazy"
              alt="Play"
            />
          </button>
        </div>
      `,
    },
  },
  {
    area: "area-d",
    className: "bg-[url('/img/background.svg')] bg-cover bg-top",
    children: {
      template: `
        <div class="bg-[url('/img/pattern.webp')] bg-cover bg-top h-full w-full text-left">
          <h3 class="mb-2 relative z-10">
            {{ t("features.efficiency.title") }}
          </h3>
          <h4 class="mb-5 relative z-10">
            {{ t("features.efficiency.description") }}
          </h4>
          <button @click="openInNewTab('https://one-click.app/register')">
            <a href="https://one-click.app/register">{{ t("common.connect") }}</a>
          </button>
        </div>
      `,
    },
  },
  {
    image: "/img/settings.png",
    title: t("features.code.title"),
    description: t("features.code.description"),
    area: "area-e",
  },
  {
    image: "/img/redo.png",
    title: t("features.speed.title"),
    description: t("features.speed.description"),
    area: "area-f",
  },
  {
    image: "/img/time.png",
    title: t("features.time.title"),
    description: t("features.time.description"),
    area: "area-g",
  },
  {
    image: "/img/picture.png",
    title: t("features.modern.title"),
    description: t("features.modern.description"),
    area: "area-h",
  },
]);
</script>
