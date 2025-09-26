import { ref, onMounted, onUnmounted } from "vue";

export const useScrollAnimation = (threshold = 0.1, rootMargin = "0px") => {
  const isVisible = ref(false);
  const elementRef = ref(null);

  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.value) {
      observer.observe(elementRef.value);
    }

    // Store observer for cleanup
    elementRef.value._observer = observer;
  });

  onUnmounted(() => {
    if (elementRef.value && elementRef.value._observer) {
      elementRef.value._observer.disconnect();
    }
  });

  return [elementRef, isVisible];
};
