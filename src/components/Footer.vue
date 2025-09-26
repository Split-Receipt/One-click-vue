<template>
  <div
    id="contacts"
    ref="footerRef"
    :class="[
      'pt-8 pb-4 px-4 scroll-animate-stagger',
      isFooterVisible ? 'animate-in' : '',
      className,
    ]"
  >
    <div
      class="max-w-[1200px] mx-auto flex flex-col justify-between gap-5 sm:gap-10"
    >
      <div
        class="flex gap-4 flex-col sm:flex-row items-start justify-between sm:gap-8"
      >
        <div class="flex flex-col gap-2">
          <img
            src="/img/logo.webp"
            alt="logo"
            width="145"
            class="mb-3"
            loading="lazy"
          />
          <div class="flex gap-2 mb-2">
            <a
              v-for="(link, index) in socialLinks"
              :key="index"
              :href="link.href"
              target="_blank"
              class="bg-cover bg-center w-10 h-10 block"
              :style="{ backgroundImage: `url(${link.img})` }"
            />
          </div>
          <a
            v-for="(link, index) in legalLinks"
            :key="index"
            :href="link.href"
            :target="link.blank ? '_blank' : '_self'"
            rel="noopener noreferrer"
          >
            {{ link.text }}
          </a>
        </div>
        <div class="flex flex-col gap-2">
          <h4>{{ t("footer.info") }}</h4>
          <p v-for="(info, index) in companyInfo" :key="index">
            {{ info.text }}
          </p>
          <a href="tel:+51953245941">+51 953245941</a>
          <a href="mailto:soporteoneqliq@gmail.com">
            soporteoneqliq@gmail.com
          </a>
        </div>
        <div class="flex flex-col gap-2">
          <h4>{{ t("footer.siteMap") }}</h4>
          <a v-for="(link, index) in siteMap" :key="index" :href="link.href">
            {{ link.text }}
          </a>
        </div>
        <div class="flex flex-col gap-3">
          <h4>{{ t("footer.payment") }}</h4>
          <div
            v-for="(row, rowIndex) in paymentMethods"
            :key="rowIndex"
            :class="[
              'grid gap-2 justify-items-center items-center',
              row.length === 2 ? 'grid-cols-2' : 'grid-cols-3',
            ]"
          >
            <img
              v-for="(method, methodIndex) in row"
              :key="methodIndex"
              :src="method.src"
              :class="method.className"
              loading="lazy"
              :alt="method.src"
            />
          </div>
        </div>
      </div>
      <div class="text-xs flex flex-col gap-2 sm:flex-row sm:gap-5">
        <div>{{ t("footer.copyright") }}</div>
        <div>{{ t("footer.description") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollAnimation } from "../composables/useScrollAnimation.js";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { t, locale } = useI18n();
const [footerRef, isFooterVisible] = useScrollAnimation(0.1, "-50px");

const socialLinks = [
  { href: "https://www.facebook.com/share/1BdovG9JLT/", img: "/img/fb.png" },
  {
    href: "https://www.instagram.com/oneclick_webapp?igsh=N2x3cW5jODdmd2Vp",
    img: "/img/inst.png",
  },
  { href: "https://www.tiktok.com/@oneclick_webapp", img: "/img/tik.png" },
  {
    href: "https://www.linkedin.com/company/oneclickwebapp/",
    img: "/img/linkedin.png",
  },
];

const getDocPath = (filename) => {
  const fullFilename = `${filename}-${locale.value}.pdf`;
  return `/docs/${fullFilename}`;
};

const legalLinks = computed(() => [
  {
    href: getDocPath("privacy"),
    text: t("footer.privacy"),
    blank: true,
  },
  {
    href: getDocPath("terms"),
    text: t("footer.terms"),
    blank: true,
  },
  {
    href: getDocPath("partner"),
    text: t("footer.partner"),
    blank: true,
  },
  {
    href: getDocPath("faq"),
    text: t("footer.questions"),
    blank: true,
  },
  {
    href: t("footer.bookUrl"),
    text: t("footer.book"),
    blank: true,
  },
]);

const companyInfo = [
  { text: "Creator RA Studio SAC" },
  { text: "RUC 20606559578" },
  { text: "Jr. Policarpo Caballero, Cusco" },
];

const siteMap = computed(() => [
  { href: "#products", text: t("menu.products") },
  { href: "#features", text: t("menu.features") },
  { href: "#tariffs", text: t("menu.tariffs") },
  { href: "#contacts", text: t("menu.contacts") },
]);

const paymentMethods = [
  [
    { src: "/img/paypal.png", className: "payment-icon w-20 sm:w-25" },
    { src: "/img/visa.png", className: "payment-icon w-18 sm:w-20" },
  ],
  [
    { src: "/img/mastercard.png", className: "payment-icon w-18 sm:w-20" },
    { src: "/img/maestro.png", className: "payment-icon w-18 sm:w-20" },
  ],
  [
    { src: "/img/amexp.png", className: "payment-icon w-12 sm:w-13" },
    { src: "/img/yape.webp", className: "payment-icon w-12 sm:w-13" },
    { src: "/img/plin.png", className: "payment-icon w-12 sm:w-13" },
  ],
];
</script>
