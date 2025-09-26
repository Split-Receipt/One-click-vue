<template>
  <div class="mb-5 md:mb-0 card h-full">
    <img
      :src="image"
      class="block"
      width="300"
      height="300"
      loading="lazy"
      :alt="title"
    />
    <div class="flex flex-col gap-2 mb-2">
      <h4>{{ title }}</h4>
      <p v-for="(description, index) in descriptions" :key="index">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
});
</script>
