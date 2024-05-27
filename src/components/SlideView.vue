<template>
  <div class="wrapper-slide">
    <Carousel :autoplay="7000" :wrap-around="true" :show-arrows="false" ref="carouselRef">
      <Slide v-for="slide in slides" :key="slide">
        <div class="img-slide">
          <img class="slideImg" :src="slide" />
        </div>
      </Slide>
    </Carousel>
    <div class="arrow left" @click="prevSlide">
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="arrow right" @click="nextSlide">
      <i class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import img1 from "@/assets/images/main-slide.png";
import img2 from "@/assets/images/002.png";
import img3 from "@/assets/images/003.png";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "SlideView",
  components: {
    Carousel,
    Slide,
  },
  setup() {
    const slides = ref([img1, img2, img3]);
    const carouselRef = ref(null);

    const nextSlide = () => {
      if (carouselRef.value && carouselRef.value.next) {
        carouselRef.value.next();
      }
    };

    const prevSlide = () => {
      if (carouselRef.value && carouselRef.value.prev) {
        carouselRef.value.prev();
      }
    };

    return {
      slides,
      nextSlide,
      prevSlide,
      carouselRef,
    };
  },
});
</script>

<style>
.wrapper-slide {
  position: relative;
  width: 100%;
  height: 600px;
}

.img-slide {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.slideImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: rgba(224, 217, 217, 0.986); /* 더 밝은 회색 */
  cursor: pointer;
  z-index: 100;
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}

.fas.fa-chevron-left,
.fas.fa-chevron-right {
  font-size: 36px;
}
</style>
