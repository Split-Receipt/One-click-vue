<template>
  <div
    v-if="videos.length"
    :class="[
      className,
      'flex flex-col gap-4 justify-center items-center relative before:absolute before:inset-20 before:bg-gradient-to-b before:from-[#9560eb] before:to-[#3F1C7D] before:opacity-50 before:blur-[80px] before:rounded-full before:scale-75 before:-z-10',
    ]"
  >
    <div
      class="h-[382px] w-[200px] bg-[url('img/phonemockup.webp')] bg-contain bg-no-repeat relative overflow-hidden max-h-[400px]"
    >
      <video
        v-for="(video, index) in videos"
        :key="index"
        :ref="(el) => setVideoRef(el, index)"
        :src="video"
        :autoplay="index === currentVideoIndex"
        :class="[
          'absolute top-1/2 -translate-y-1/2 left-[47%] -translate-x-1/2 w-[170px] h-[365px] rounded-3xl transition-opacity duration-500',
          index === currentVideoIndex ? 'opacity-100' : 'opacity-0',
        ]"
        :loop="videos.length === 1"
        muted
        playsinline
        preload="metadata"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  info: {
    type: Object,
    required: true,
  },
});

const currentVideoIndex = ref(0);
const videos = computed(() => props.info?.videos || []);
const videoRefs = ref([]);

const setVideoRef = (el, index) => {
  if (el) {
    videoRefs.value[index] = el;
  }
};

const handleVideoEnd = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length;
};

onMounted(() => {
  if (videos.value.length <= 1) return;

  const currentVideo = videoRefs.value[currentVideoIndex.value];
  if (currentVideo) {
    currentVideo.addEventListener("ended", handleVideoEnd);
    currentVideo.play();
  }
});

onUnmounted(() => {
  const currentVideo = videoRefs.value[currentVideoIndex.value];
  if (currentVideo) {
    currentVideo.removeEventListener("ended", handleVideoEnd);
  }
});
</script>
