<template>
  <div
    ref="screenRef"
    :class="[
      'bg-[url(\'/img/background.svg\')] bg-cover lg:bg-[length:100%] lg:bg-bottom bg-top bg-no-repeat scroll-animate-stagger',
      isScreenVisible ? 'animate-in' : '',
      className,
    ]"
  >
    <div
      class="bg-[url('img/pattern.webp')] bg-[length:100%] bg-center w-screen h-screen flex flex-col items-center justify-center gap-10 relative md:px-10 px-5"
    >
      <div class="relative flex flex-col items-center md:gap-8 gap-5">
        <img
          src="/img/cursor.svg"
          class="absolute top-[-100px] left-0 md:top-[-170px] xl:top-1/2 xl:left-[-20%] xl:-translate-y-1/2 animate-bounce-slow transform transition-transform duration-1000 ease-out hover:scale-110 w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
          :style="{
            animation: 'float-up-right 3s ease-in-out infinite',
            transform: 'translateY(0px)',
          }"
          loading="lazy"
          alt="Cursor"
        />
        <h1 class="text-center" style="white-space: pre-line">
          {{ t("screen.title") }}
        </h1>
        <p class="text-center md:text-2xl text-lg md:w-1/2 w-full">
          {{ t("screen.subtitle") }}
        </p>
        <button
          class="bg-[#9560EB]"
          @click="openInNewTab('https://one-click.app/register')"
        >
          <a href="https://one-click.app/register">{{ t("common.connect") }}</a>
        </button>
        <img
          src="/img/message.svg"
          class="absolute bottom-[-25%] right-0 xl:top-1/2 xl:right-[-21%] xl:-translate-y-1/2 animate-bounce-slow transform transition-transform duration-1000 ease-out hover:scale-110 w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
          :style="{
            animation: 'float-down-left 3s ease-in-out infinite',
            transform: 'translateY(0px)',
          }"
          loading="lazy"
          alt="Message"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const [screenRef, isScreenVisible] = useScrollAnimation(0.1, "-100px");

const openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};
</script>

<style scoped>
@keyframes float-up-right {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-12px) translateX(8px);
  }
}

@keyframes float-down-left {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(12px) translateX(-8px);
  }
}

.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-8px) translateX(3px);
  }
}

/* Parallax effect on scroll */
:deep(.overflow-y-auto::-webkit-scrollbar) {
  width: 8px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb) {
  background: rgba(149, 96, 235, 0.3);
  border-radius: 4px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
  background: rgba(149, 96, 235, 0.5);
}
</style>
