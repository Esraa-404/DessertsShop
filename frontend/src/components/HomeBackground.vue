<template>
  <div class="home-bg">
    <HomePage />
  </div>
</template>

<script setup>
import HomePage from "@/components/pages/Home.vue";  // استدعاء الصفحة من فولدر pages
</script>

<style scoped>
.home-bg {
position: fixed;   /* fixed بدل absolute يغطي الشاشة كلها مهما عمل scroll */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;        /* تحت الكونفيرم */
  overflow: hidden;}

.home-bg > * {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* لو في صورة */
  filter: blur(4px) brightness(0.7);}
</style>