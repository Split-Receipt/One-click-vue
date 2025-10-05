<template>
  <div
    ref="actionRef"
    :class="[
      'bg-[linear-gradient(to_bottom,black,transparent),url(\'/img/background.svg\')] bg-cover bg-center bg-no-repeat scroll-animate-stagger',
      isActionVisible ? 'animate-in' : '',
      className,
    ]"
  >
    <div class="bg-[url('img/pattern.webp')] bg-cover bg-top py-10 sm:py-20">
      <div
        class="container flex flex-col gap-10 items-center justify-between sm:gap-15 md:gap-20 sm:flex-row"
      >
        <div class="flex flex-col gap-10 w-full sm:w-1/2 items-center">
          <h2 class="text-center" style="white-space: pre-line">
            {{ t("action.title") }}
          </h2>
          <button class="w-full sm:max-w-[350px]" @click="openInNewTab('https://one-click.app/register')">
              {{ t("action.button") }}
          </button>
        </div>
        <img
          src="/img/mockup.webp"
          class="w-[300px] sm:w-1/2 rounded-[20px]"
          loading="lazy"
          alt="mockup"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";
import { openInNewTab } from "../utils";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const [actionRef, isActionVisible] = useScrollAnimation(0.1, "-50px");
</script>
