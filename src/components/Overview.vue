<template>
  <div
    ref="overviewRef"
    :class="[
      'overview md:pt-40 pt-30 pb-10 xl:mt-[-250px] md:mt-[-200px] mt-[-100px] sm:mt-[-150px] ellipse scroll-animate-stagger',
      isOverviewVisible ? 'animate-in' : '',
      className,
    ]"
  >
    <div class="container relative">
      <button
        @click="handlePrevClick"
        class="swiper-button-prev"
        aria-label="Previous slide"
      />

      <button
        @click="handleNextClick"
        class="swiper-button-next"
        aria-label="Next slide"
      />

      <Swiper
        ref="swiperRef"
        :space-between="16"
        :slides-per-view="1"
        :modules="[Pagination, Autoplay, Navigation]"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :allow-touch-move="true"
        :grab-cursor="true"
        :touch-ratio="1"
        :touch-angle="45"
        :threshold="5"
        :touch-start-prevent-default="false"
        :touch-move-stop-propagation="false"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :pagination="{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet--active',
        }"
        :breakpoints="{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="(card, index) in cardsData" :key="index">
          <Card
            :image="card.image"
            :title="card.title"
            :descriptions="card.descriptions"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <button
      class="m-auto block w-[300px] mt-10"
      @click="openInNewTab('https://one-click.app/register')"
    >
      {{ t("common.register") }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { openInNewTab } from "../utils";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const [overviewRef, isOverviewVisible] = useScrollAnimation(0.25, "0px");
const swiperRef = ref(null);
const swiperInstance = ref(null);

const handlePrevClick = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
};

const handleNextClick = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const cardsData = computed(() => [
  {
    image: "/img/dynamic-qr.webp",
    title: t("products.dynamicQr.title"),
    descriptions: [
      t("products.dynamicQr.description.1"),
      t("products.dynamicQr.description.2"),
    ],
  },
  {
    image: "/img/qr-menu-catalog.webp",
    title: t("products.qrMenu.title"),
    descriptions: [
      t("products.qrMenu.description.1"),
      t("products.qrMenu.description.2"),
    ],
  },
  {
    image: "/img/qr-nfc-card.webp",
    title: t("products.nfcCard.title"),
    descriptions: [
      t("products.nfcCard.description.1"),
      t("products.nfcCard.description.2"),
      t("products.nfcCard.description.3"),
    ],
  },
  {
    image: "/img/qr-file.webp",
    title: t("products.qrFile.title"),
    descriptions: [t("products.qrFile.description")],
  },
  {
    image: "/img/digital-invitation.webp",
    title: t("products.digitalInvitation.title"),
    descriptions: [
      t("products.digitalInvitation.description.1"),
      t("products.digitalInvitation.description.2"),
    ],
  },
  {
    image: "/img/portfolio.webp",
    title: t("products.portfolio.title"),
    descriptions: [t("products.portfolio.description")],
  },
  {
    image: "/img/corporate-presentation.webp",
    title: t("products.corporatePresentation.title"),
    descriptions: [t("products.corporatePresentation.description")],
  },
  {
    image: "/img/landing.webp",
    title: t("products.landing.title"),
    descriptions: [t("products.landing.description")],
  },
]);
</script>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
};
</script>
